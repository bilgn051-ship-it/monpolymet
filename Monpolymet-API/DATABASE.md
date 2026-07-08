# Monpolymet — MongoDB Schema Design

Database: `monpolymet` (MongoDB, accessed through Mongoose / `@nestjs/mongoose`).

Every section of the public website is backed by a collection (or a field of one),
so the entire site is manageable from the Admin Dashboard.

## Conventions

- **Localization** — every visitor-facing string is a `LocalizedString`
  embedded object: `{ mn: string, en: string }`. The frontend picks the field
  matching the active language. Applicant-submitted data (name, phone,
  message…) is *not* localized — it is stored as entered.
- **Singletons** — pages with one-off structured content (About, HSE,
  Careers, Home) each have a `*PageContent` collection holding exactly one
  document, identified by a unique `key`. This keeps their shape explicit and
  type-safe instead of using a generic key-value store.
- **Ordered lists** — repeating content that editors reorder (slides, values,
  FAQs…) carries an integer `order` field; the public API sorts by it.
- **Soft visibility** — `isActive` / `isPublished` / `isOpen` flags hide items
  from the public site without deleting them.
- **Timestamps** — all collections use Mongoose `timestamps`
  (`createdAt` / `updatedAt`).
- **Icons** — icon fields store a `lucide-react` icon name (e.g. `'Leaf'`);
  the frontends map the name to the component.

## Collections

### Cross-page

| Collection | Purpose | Key fields |
|---|---|---|
| `users` | Admin-dashboard accounts | `email` (unique), `passwordHash`, `name`, `role` (`admin`\|`editor`), `isActive` |
| `pages` | Per-page nav label, header block (tag/title/subtitle rendered by `SectionHeader`), SEO meta, visibility | `key` (unique: `home`,`about`,`sectors`,`csr`,`hse`,`careers`,`tour`,`media`), `navLabel`, `header{tag,title,subtitle}`, `seo{title,description}`, `isActive` |
| `sitesettings` | Singleton `key='site'`: global chrome — logo, footer text, contacts, socials, brand downloads | `logoUrl`, `footerDescription`, `address`, `phone`, `email`, `socialLinks[{platform,url}]`, `brandAssetsDescription`, `brandAssets[{label,fileUrl}]`, `copyrightName` |

### Home page

| Collection | Website section | Key fields |
|---|---|---|
| `heroslides` | Full-screen hero slideshow | `mediaType` (`image`\|`video`), `mediaUrl`, `title`, `subtitle`, `ctas[{label,targetPage,style}]`, `order`, `isActive` |
| `statcards` | Bento stats grid | `variant` (`tall`\|`standard`\|`ticker`), `icon`, `statValue`, `title`, `description`, `targetPage`, `colorTheme`, `imageUrl` (tall), `ticker{tabs,unit,changeLabel}` (ticker), `order`, `isActive` |
| `homepagecontents` | Singleton `key='home'`: CEO greeting section | `ceoSection{sectionTitle,quote,name,role,imageUrl}` |

The home "recent news" carousel reads the newest 4+ documents from
`newsarticles` — it has no collection of its own.

### About page

| Collection | Website section | Key fields |
|---|---|---|
| `aboutpagecontents` | Singleton `key='about'`: intro, vision, mission, section headings, leadership greeting text | `intro{title,text,imageUrl}`, `vision{title,text}`, `mission{title,text}`, `valuesTitle`, `historyTitle`, `leadershipTitle`, `leadershipGreeting{title,text}` |
| `corevalues` | Core-values card grid | `title`, `description`, `icon`, `order` |
| `timelineevents` | Company-history timeline | `year` (display string), `title`, `description`, `order` |
| `teammembers` | Leadership profiles | `name`, `role`, `bio`, `education`, `imageUrl`, `isFounder` (rendered as the large greeting block), `order` |

### Sectors page

| Collection | Website section | Key fields |
|---|---|---|
| `sectors` | Subsidiary tabs (Moncement, Toson mine, transport…) | `slug` (unique), `title`, `description`, `projects`, `websiteUrl`, `icon`, `imageUrl`, `metrics[{label,value}]`, `highlights[LocalizedString]`, `order`, `isActive` |

### CSR page

| Collection | Website section | Key fields |
|---|---|---|
| `csrinitiatives` | Alternating image/text rows (restoration, community…) | `icon`, `title`, `description`, `imageUrl`, `stats[{value,label}]`, `order`, `isActive` |

### HSE page

| Collection | Website section | Key fields |
|---|---|---|
| `hsepagecontents` | Singleton `key='hse'`: section titles + policy checklist | `policiesTitle`, `policies[LocalizedString]`, `documentsTitle` |
| `hsedocuments` | Downloadable reports | `title`, `fileUrl`, `fileSize`, `fileType`, `order` |

### Careers page

| Collection | Website section | Key fields |
|---|---|---|
| `careerspagecontents` | Singleton `key='careers'`: why-us block + recruitment steps | `whyUs{title,text,imageUrl}`, `stepsTitle`, `steps[{step,title,description}]`, `faqTitle` |
| `jobs` | Open vacancies | `title`, `category`, `location`, `employmentType`, `description`, `isOpen` |
| `jobapplications` | CV submissions from the public form | `name`, `phone`, `email`, `position` (free text), `message`, `job` (optional ref → `jobs`), `status` (`new`\|`reviewed`\|`shortlisted`\|`rejected`) — indexed by `createdAt` |
| `faqs` | FAQ accordion | `question`, `answer`, `order` |

### Media page

| Collection | Website section | Key fields |
|---|---|---|
| `newsarticles` | News grid (and home carousel) | `title`, `content`, `category`, `imageUrl`, `publishedAt` (indexed desc), `isPublished` |

### Virtual Tour page

| Collection | Website section | Key fields |
|---|---|---|
| `tourscenes` | 360° panorama scene buttons | `slug` (unique), `title`, `panoramaUrl`, `order`, `isActive` |

## Relationships

```
jobapplications.job ──optional ref──▶ jobs
```

Everything else is deliberately reference-free: content types are
independent, list items embed their sub-structures (metrics, stats, CTAs,
steps), and pages assemble from their own collections. This matches MongoDB
best practice for content that is always read together and edited as a unit.

## What stays in frontend code (not the database)

Purely functional UI strings — button labels ("Read more", "Download",
"Apply"), form-field labels, validation messages, loading/error text, and
the admin dashboard's own UI. These live in each frontend's i18n file
because they describe the interface, not the company's content. Every piece
of *content* a visitor reads is in the database.

## Mapping from the old frontend shape

The current site stores bilingual fields side-by-side (`titleMn` /
`titleEn`). In the database this becomes `title: { mn, en }` — e.g. the
seed/mock data migrates as:

```js
// old (src/data/mockData.js)          // new (newsarticles document)
{ titleMn: "…", titleEn: "…",          { title:    { mn: "…", en: "…" },
  contentMn: "…", contentEn: "…",  →     content:  { mn: "…", en: "…" },
  categoryMn: "…", categoryEn: "…",      category: { mn: "…", en: "…" },
  date: "2026-06-15", image: "…" }       publishedAt: ISODate("2026-06-15"),
                                          imageUrl: "…", isPublished: true }
```

`src/i18n/translations.js` content blocks (about texts, HSE policies, FAQ
items, recruitment steps…) seed the corresponding singletons/collections
the same way.
