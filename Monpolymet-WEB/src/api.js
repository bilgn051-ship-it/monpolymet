/**
 * Public website ↔ API bridge. Reads live published content from the
 * Monpolymet API and submits CV applications. Responses are mapped back to
 * the flat `*Mn` / `*En` shape the existing components already consume, so
 * the UI works whether data comes from the API or the bundled fallback.
 */
const defaultHost = typeof window !== 'undefined' && window.location.hostname ? window.location.hostname : 'localhost';
const BASE_URL = import.meta.env.VITE_API_URL ?? `http://${defaultHost}:4000/api`;

export async function getJson(path) {
  const res = await fetch(`${BASE_URL}${path}`);
  if (!res.ok) throw new Error(`Request failed: ${res.status}`);
  const text = await res.text();
  return text ? JSON.parse(text) : null;
}

const mapNews = (d) => ({
  id: d._id,
  titleMn: d.title?.mn ?? '',
  titleEn: d.title?.en ?? '',
  categoryMn: d.category?.mn ?? '',
  categoryEn: d.category?.en ?? '',
  date: (d.publishedAt ?? '').slice(0, 10),
  image: d.imageUrl,
  contentMn: d.content?.mn ?? '',
  contentEn: d.content?.en ?? '',
  views: d.views ?? 0,
});

const mapJob = (d) => ({
  id: d._id,
  titleMn: d.title?.mn ?? '',
  titleEn: d.title?.en ?? '',
  categoryMn: d.category?.mn ?? '',
  categoryEn: d.category?.en ?? '',
  locationMn: d.location?.mn ?? '',
  locationEn: d.location?.en ?? '',
  typeMn: d.employmentType?.mn ?? '',
  typeEn: d.employmentType?.en ?? '',
  descMn: d.description?.mn ?? '',
  descEn: d.description?.en ?? '',
});

export async function fetchNews() {
  const data = await getJson('/public/news');
  return data.map(mapNews);
}

export async function incrementNewsView(id) {
  try {
    const res = await fetch(`${BASE_URL}/public/news/${id}/view`, { method: 'PATCH' });
    if (!res.ok) return null;
    const data = await res.json();
    return data.views ?? 0;
  } catch {
    return null;
  }
}

export async function fetchJobs() {
  const data = await getJson('/public/jobs');
  return data.map(mapJob);
}

const mapTimeline = (d) => ({
  id: d._id,
  year: d.year,
  titleMn: d.title?.mn ?? '',
  titleEn: d.title?.en ?? '',
  descMn: d.description?.mn ?? '',
  descEn: d.description?.en ?? '',
  order: d.order ?? 0,
});

export async function fetchTimeline() {
  const data = await getJson('/public/timeline');
  return data.map(mapTimeline);
}

const mapHeroSlide = (d) => ({
  id: d._id,
  mediaType: d.mediaType,
  mediaUrl: d.mediaUrl,
  titleMn: d.title?.mn ?? '',
  titleEn: d.title?.en ?? '',
  subtitleMn: d.subtitle?.mn ?? '',
  subtitleEn: d.subtitle?.en ?? '',
  ctas: (d.ctas ?? []).map(cta => ({
    labelMn: cta.label?.mn ?? '',
    labelEn: cta.label?.en ?? '',
    targetPage: cta.targetPage,
    style: cta.style ?? 'primary',
  })),
  order: d.order ?? 0,
});

export async function fetchHeroSlides() {
  const data = await getJson('/public/hero-slides');
  return data.map(mapHeroSlide);
}

const mapStatCard = (d) => ({
  id: d._id,
  variant: d.variant,
  icon: d.icon,
  statValue: d.statValue,
  titleMn: d.title?.mn ?? '',
  titleEn: d.title?.en ?? '',
  descriptionMn: d.description?.mn ?? '',
  descriptionEn: d.description?.en ?? '',
  colorTheme: d.colorTheme,
  order: d.order ?? 0,
  targetPage: d.targetPage,
  imageUrl: d.imageUrl,
  ticker: d.ticker,
});

export async function fetchStatCards() {
  const data = await getJson('/public/stat-cards');
  return data.map(mapStatCard);
}

const mapCsrStat = (d) => ({
  id: d._id,
  value: d.value,
  prefix: d.prefix ?? '',
  suffix: d.suffix ?? '',
  titleMn: d.title?.mn ?? '',
  titleEn: d.title?.en ?? '',
  subMn: d.sub?.mn ?? '',
  subEn: d.sub?.en ?? '',
  order: d.order ?? 0,
});

export async function fetchCsrStats() {
  const data = await getJson('/public/csr-stats');
  return data.map(mapCsrStat);
}

const mapCsrHighlight = (d) => ({
  titleMn: d.title?.mn ?? '',
  titleEn: d.title?.en ?? '',
  subtitleMn: d.subtitle?.mn ?? '',
  subtitleEn: d.subtitle?.en ?? '',
  imageUrl: d.imageUrl,
  buttonTextMn: d.buttonText?.mn ?? '',
  buttonTextEn: d.buttonText?.en ?? '',
  bullets: (d.bullets ?? []).map(b => ({
    icon: b.icon,
    textMn: b.text?.mn ?? '',
    textEn: b.text?.en ?? '',
  })),
});

export async function fetchCsrHighlight() {
  const data = await getJson('/public/csr-highlight');
  return data ? mapCsrHighlight(data) : null;
}

const mapHomeContent = (d) => ({
  ceoSection: {
    sectionTitleMn: d.ceoSection?.sectionTitle?.mn ?? '',
    sectionTitleEn: d.ceoSection?.sectionTitle?.en ?? '',
    quoteMn: d.ceoSection?.quote?.mn ?? '',
    quoteEn: d.ceoSection?.quote?.en ?? '',
    nameMn: d.ceoSection?.name?.mn ?? '',
    nameEn: d.ceoSection?.name?.en ?? '',
    roleMn: d.ceoSection?.role?.mn ?? '',
    roleEn: d.ceoSection?.role?.en ?? '',
    imageUrl: d.ceoSection?.imageUrl,
  }
});

export async function fetchHomeContent() {
  const data = await getJson('/public/home-content');
  return mapHomeContent(data);
}

const mapCoreValue = (d) => ({
  id: d._id,
  titleMn: d.title?.mn ?? '',
  titleEn: d.title?.en ?? '',
  descMn: d.description?.mn ?? '',
  descEn: d.description?.en ?? '',
  icon: d.icon,
  order: d.order ?? 0,
});

export async function fetchCoreValues() {
  const data = await getJson('/public/core-values');
  return data.map(mapCoreValue);
}

const mapTeam = (d) => ({
  id: d._id,
  nameMn: d.name?.mn ?? '',
  nameEn: d.name?.en ?? '',
  roleMn: d.role?.mn ?? '',
  roleEn: d.role?.en ?? '',
  bioMn: d.bio?.mn ?? '',
  bioEn: d.bio?.en ?? '',
  eduMn: d.education?.mn ?? '',
  eduEn: d.education?.en ?? '',
  imageUrl: d.imageUrl,
  isFounder: d.isFounder ?? false,
  order: d.order ?? 0,
});

export async function fetchTeam() {
  const data = await getJson('/public/team');
  return data.map(mapTeam);
}

const mapAboutContent = (d) => ({
  collageImages: (d.collageImages || []).map(img => img.url),
  intro: {
    titleMn: d.intro?.title?.mn ?? '',
    titleEn: d.intro?.title?.en ?? '',
    textMn: d.intro?.text?.mn ?? '',
    textEn: d.intro?.text?.en ?? '',
    imageUrl: d.intro?.imageUrl,
  },
  vision: {
    titleMn: d.vision?.title?.mn ?? '',
    titleEn: d.vision?.title?.en ?? '',
    textMn: d.vision?.text?.mn ?? '',
    textEn: d.vision?.text?.en ?? '',
  },
  mission: {
    titleMn: d.mission?.title?.mn ?? '',
    titleEn: d.mission?.title?.en ?? '',
    textMn: d.mission?.text?.mn ?? '',
    textEn: d.mission?.text?.en ?? '',
  },
  valuesTitleMn: d.valuesTitle?.mn ?? '',
  valuesTitleEn: d.valuesTitle?.en ?? '',
  historyTitleMn: d.historyTitle?.mn ?? '',
  historyTitleEn: d.historyTitle?.en ?? '',
  leadershipTitleMn: d.leadershipTitle?.mn ?? '',
  leadershipTitleEn: d.leadershipTitle?.en ?? '',
  leadershipGreeting: {
    titleMn: d.leadershipGreeting?.title?.mn ?? '',
    titleEn: d.leadershipGreeting?.title?.en ?? '',
    textMn: d.leadershipGreeting?.text?.mn ?? '',
    textEn: d.leadershipGreeting?.text?.en ?? '',
  }
});

export async function fetchAboutContent() {
  const data = await getJson('/public/about-content');
  return mapAboutContent(data);
}

const mapSector = (d) => ({
  id: d._id,
  slug: d.slug,
  titleMn: d.title?.mn ?? '',
  titleEn: d.title?.en ?? '',
  descMn: d.description?.mn ?? '',
  descEn: d.description?.en ?? '',
  projectsMn: d.projects?.mn ?? '',
  projectsEn: d.projects?.en ?? '',
  websiteUrl: d.websiteUrl,
  icon: d.icon,
  imageUrl: d.imageUrl,
  logoUrl: d.logoUrl ?? null,
  metrics: (d.metrics ?? []).map(m => ({
    labelMn: m.label?.mn ?? '',
    labelEn: m.label?.en ?? '',
    valMn: m.value?.mn ?? '',
    valEn: m.value?.en ?? '',
  })),
  highlightsMn: (d.highlights ?? []).map(h => h.mn ?? ''),
  highlightsEn: (d.highlights ?? []).map(h => h.en ?? ''),
  order: d.order ?? 0,
});

export async function fetchSectors() {
  const data = await getJson('/public/sectors');
  return data.map(mapSector);
}

const mapCsr = (d) => ({
  id: d._id,
  icon: d.icon,
  titleMn: d.title?.mn ?? '',
  titleEn: d.title?.en ?? '',
  descMn: d.description?.mn ?? '',
  descEn: d.description?.en ?? '',
  imageUrl: d.imageUrl,
  stats: (d.stats ?? []).map(s => ({
    value: s.value,
    labelMn: s.label?.mn ?? '',
    labelEn: s.label?.en ?? '',
  })),
  order: d.order ?? 0,
});

export async function fetchCsr() {
  const data = await getJson('/public/csr');
  return data.map(mapCsr);
}


const mapTour = (d) => ({
  id: d._id,
  slug: d.slug,
  titleMn: d.title?.mn ?? '',
  titleEn: d.title?.en ?? '',
  panoramaUrl: d.panoramaUrl,
  order: d.order ?? 0,
});

export async function fetchTour() {
  const data = await getJson('/public/tour');
  return data.map(mapTour);
}

const mapFaq = (d) => ({
  id: d._id,
  questionMn: d.question?.mn ?? '',
  questionEn: d.question?.en ?? '',
  answerMn: d.answer?.mn ?? '',
  answerEn: d.answer?.en ?? '',
  order: d.order ?? 0,
});

export async function fetchFaqs() {
  const data = await getJson('/public/faqs');
  return data.map(mapFaq);
}

const mapCareersContent = (d) => ({
  bannerTitle: {
    mn: d.bannerTitle?.mn ?? '',
    en: d.bannerTitle?.en ?? '',
  },
  bannerButtonText: {
    mn: d.bannerButtonText?.mn ?? '',
    en: d.bannerButtonText?.en ?? '',
  },
  bannerImage: d.bannerImage ?? '',
});

export async function fetchCareersContent() {
  const data = await getJson('/public/careers-content');
  return mapCareersContent(data);
}

const mapSettings = (d) => ({
  logoUrl: d.logoUrl,
  footerDescriptionMn: d.footerDescription?.mn ?? '',
  footerDescriptionEn: d.footerDescription?.en ?? '',
  addressMn: d.address?.mn ?? '',
  addressEn: d.address?.en ?? '',
  phone: d.phone,
  email: d.email,
  socialLinks: d.socialLinks ?? [],
  brandAssetsDescriptionMn: d.brandAssetsDescription?.mn ?? '',
  brandAssetsDescriptionEn: d.brandAssetsDescription?.en ?? '',
  brandAssets: d.brandAssets ?? [],
  copyrightName: d.copyrightName,
  navigation: d.navigation ?? [],
  footerNavigation: d.footerNavigation ?? [],
});

export async function fetchSettings() {
  const data = await getJson('/public/settings');
  return mapSettings(data);
}

export async function updateSettings(settingsData) {
  const res = await fetch(`${BASE_URL}/dashboard/settings`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(settingsData),
  });
  if (!res.ok) throw new Error(`Request failed: ${res.status}`);
  return mapSettings(await res.json());
}

export async function submitApplication(sub) {
  const res = await fetch(`${BASE_URL}/applications`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: sub.name,
      phone: sub.phone,
      email: sub.email || undefined,
      position: sub.position,
      message: sub.message || undefined,
    }),
  });
  if (!res.ok) throw new Error(`Request failed: ${res.status}`);
  return res.json();
}

const mapPage = (d) => ({
  id: d._id,
  key: d.key,
  navLabelMn: d.navLabel?.mn ?? '',
  navLabelEn: d.navLabel?.en ?? '',
  header: {
    tagMn: d.header?.tag?.mn ?? '',
    tagEn: d.header?.tag?.en ?? '',
    titleMn: d.header?.title?.mn ?? '',
    titleEn: d.header?.title?.en ?? '',
    subtitleMn: d.header?.subtitle?.mn ?? '',
    subtitleEn: d.header?.subtitle?.en ?? '',
  },
  seo: {
    titleMn: d.seo?.title?.mn ?? '',
    titleEn: d.seo?.title?.en ?? '',
    descriptionMn: d.seo?.description?.mn ?? '',
    descriptionEn: d.seo?.description?.en ?? '',
  }
});

export async function fetchPages() {
  try {
    const data = await getJson('/public/pages');
    return data.map(mapPage);
  } catch (err) {
    return [];
  }
}

const mapProcurementContent = (d) => ({
  header: {
    titleMn: d.header?.title?.mn ?? '',
    titleEn: d.header?.title?.en ?? '',
    subtitleMn: d.header?.subtitle?.mn ?? '',
    subtitleEn: d.header?.subtitle?.en ?? '',
    imageUrl: d.header?.imageUrl ?? '',
  },
  intro: {
    titleMn: d.intro?.title?.mn ?? '',
    titleEn: d.intro?.title?.en ?? '',
    textMn: d.intro?.text?.mn ?? '',
    textEn: d.intro?.text?.en ?? '',
  },
  contactInfo: {
    phone: d.contactInfo?.phone ?? '',
    email: d.contactInfo?.email ?? '',
  }
});

export async function fetchProcurementContent() {
  try {
    const data = await getJson('/public/procurement-content');
    return mapProcurementContent(data);
  } catch (err) {
    return null;
  }
}

export async function submitSupplierRegistration(formData, attachedFile) {
  const payload = new FormData();
  payload.append('companyName', formData.companyName);
  payload.append('regNumber', formData.regNumber);
  payload.append('category', formData.category);
  payload.append('email', formData.email);
  payload.append('phone', formData.phone);
  payload.append('description', formData.description || '');
  if (attachedFile) {
    payload.append('file', attachedFile);
  }

  const res = await fetch(`${BASE_URL}/public/supplier-register`, {
    method: 'POST',
    body: payload,
  });

  if (!res.ok) throw new Error(`Request failed with status ${res.status}`);
  return res.json();
}
