import { Injectable } from '@nestjs/common';

@Injectable()
export class ChatService {
    private knowledgeBase = {
        mn: [
            {
                keywords: ['ажил', 'ажлын байр', 'хүний нөөц', 'анкет', 'ажилд орох', 'ваканси'],
                title: '💼 Нээлттэй ажлын байрууд',
                response: `Монполимет Групп нь чадварлаг мэргэжилтнүүдийг ажилд урьж байна.\n• Уул уурхайн инженер, оператор\n• Үйлдвэрлэлийн техникч & Механик\n• Санхүү, нягтлан бодох бүртгэл\n• Байгаль орчны мэргэжилтэн\n\nХүний нөөцийн цэснээс дэлгэрэнгүй анкет болон шаардлагыг харна уу.`,
                action: { text: 'Ажлын байр үзэх ↗', page: 'careers' }
            },
            {
                keywords: ['цемент', 'монцемент', 'үйлдвэр', 'барилга'],
                title: '🏭 Монцемент Үйлдвэр',
                response: `Монцемент Билдинг Материалс ХХК нь жилд 1 сая тонн өндөр чанарын цемент үйлдвэрлэх хүчин чадалтай, байгаль орчинд ээлтэй хуурай аргын үйлдвэр юм.`,
                action: { text: 'Бизнесийн салбарууд ↗', page: 'companies' }
            },
            {
                keywords: ['худалдан авалт', 'тендер', 'бэлтгэн нийлүүлэгч', 'түншлэл'],
                title: '📦 Худалдан авалт & Тендер',
                response: `Монполимет Групп нь хариуцлагатай, чанартай бараа материал нийлүүлэгчидтэй хамтран ажилладаг. Тендерийн мэдээллийг Худалдан авалт хуудаснаас харна уу.`,
                action: { text: 'Тендерүүдийг харах ↗', page: 'procurement' }
            },
            {
                keywords: ['байгаль', 'нөхөн сэргээлт', 'тогтвортой', 'csr', 'мод'],
                title: '🌿 Тогтвортой хөгжил & Нөхөн сэргээлт',
                response: `Бид 1,200+ гаруй га талбайд 100% биологийн нөхөн сэргээлт хийж, 300,000+ гаруй мод тарьж уржуулсан үндэсний жишиг компани юм.`,
                action: { text: 'Тогтвортой хөгжил ↗', page: 'csr' }
            },
            {
                keywords: ['тухай', 'компани', 'гарамжав', 'мөнхнасан', 'түүх'],
                title: '🏢 Монполимет Группийн тухай',
                response: `Монполимет Групп нь 1992 онд байгуулагдсан, уул уурхай, цементийн үйлдвэрлэл, барилга угсралтын чиглэлээр 30 гаруй жил үйл ажиллагаа явуулж буй тэргүүлэгч групп юм.`,
                action: { text: 'Компанийн тухай ↗', page: 'about' }
            },
            {
                keywords: ['холбоо барих', 'утас', 'хаяг', 'байршил', 'имэйл'],
                title: '📞 Холбоо барих мэдээлэл',
                response: `📍 Хаяг: МҮХАҮТ-ын хажууд, Монполимет Группийн төв байр, Улаанбаатар\n☎️ Утас: +976 11 311888\n✉️ Имэйл: info@monpolymet.mn`,
                action: { text: 'Холбоо барих хуудас ↗', page: 'contact' }
            }
        ],
        en: [
            {
                keywords: ['job', 'career', 'careers', 'hiring', 'vacancy', 'apply'],
                title: '💼 Open Positions',
                response: `Monpolymet Group invites talented professionals to join our team. Explore open roles in Mining, Cement Production, and Administration on our Careers page.`,
                action: { text: 'View Careers ↗', page: 'careers' }
            },
            {
                keywords: ['cement', 'moncement', 'plant', 'factory'],
                title: '🏭 Moncement Building Materials',
                response: `Moncement LLC is an EBRD-backed eco-friendly dry-process cement plant producing 1 million tons annually.`,
                action: { text: 'View Sectors ↗', page: 'companies' }
            },
            {
                keywords: ['procurement', 'tender', 'supplier', 'vendor'],
                title: '📦 Procurement & Tenders',
                response: `Monpolymet Group partners with quality suppliers. Check open procurement tenders on our site.`,
                action: { text: 'View Procurement ↗', page: 'procurement' }
            },
            {
                keywords: ['contact', 'phone', 'address', 'email'],
                title: '📞 Contact Information',
                response: `📍 Location: Monpolymet HQ, Ulaanbaatar\n☎️ Phone: +976 11 311888\n✉️ Email: info@monpolymet.mn`,
                action: { text: 'Contact Us Page ↗', page: 'contact' }
            }
        ]
    };

    async processMessage(message: string, lang = 'mn') {
        const qLower = (message || '').toLowerCase();
        const kb = this.knowledgeBase as Record<string, Array<{ keywords: string[]; title: string; response: string; action: { text: string; page: string } }>>;
        const list = kb[lang] || kb.mn;

        for (const item of list) {
            if (item.keywords.some((kw: string) => qLower.includes(kw))) {
                return {
                    title: item.title,
                    response: item.response,
                    action: item.action,
                    timestamp: new Date().toISOString(),
                };
            }
        }

        return {
            title: lang === 'mn' ? '🤖 AI Туслах' : '🤖 AI Assistant',
            response:
                lang === 'mn'
                    ? `Баярлалаа. Би Монполимет Группийн үйлдвэрлэл, нээлттэй ажлын байр, худалдан авалт, тогтвортой хөгжлийн мэдээллээр туслах боломжтой.`
                    : `Thank you for your message. How can I help you regarding Monpolymet operations, careers, or procurement?`,
            action: { text: lang === 'mn' ? 'Холбоо барих ↗' : 'Contact Us ↗', page: 'contact' },
            timestamp: new Date().toISOString(),
        };
    }
}
