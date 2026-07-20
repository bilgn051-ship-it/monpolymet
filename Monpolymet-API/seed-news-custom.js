const mongoose = require('mongoose');

const newNews = [
  {
    title: {
      mn: "Монполимет группийн үүсгэн байгуулагч Ц.Гарамжав Хөдөлмөрийн баатар цол хүртлээ",
      en: "Founder of Monpolymet Group Ts.Garamjav awarded the Hero of Labor of Mongolia",
    },
    category: {
      mn: "Амжилт",
      en: "Awards",
    },
    publishedAt: new Date("2026-07-06T00:00:00Z"),
    imageUrl: "https://scontent-iad6-1.xx.fbcdn.net/v/t39.30808-6/739965777_1655510646582270_4408561242659445022_n.jpg?stp=dst-jpg_tt6&cstp=mx2048x1536&ctp=p600x600&_nc_cat=100&ccb=1-7&_nc_sid=cae128&_nc_ohc=I6eFABKt_Q4Q7kNvwGbG98L&_nc_oc=AdrcgOLheOktEYTLZBVWnOlDmKLMFl8cS3oae72Titj1ZqXsVOn1Lxwm6n4rm43QER0&_nc_zt=23&_nc_ht=scontent-iad6-1.xx&_nc_gid=vC872H9dmRXJSMpl0E1xPQ&_nc_ss=7b20f&oh=00_AQDJjzOmthhjEYtJAGaHYhtV5K4k_p6ecKEjs1TRytpKHA&oe=6A601D3D",
    content: {
      mn: "Манай Монполимет группийн үүсгэн байгуулагч, Аж үйлдвэрийн гавьяат ажилтан, Монгол Улсын зөвлөх инженер Ц.Гарамжав өнөөдөр /2026.07.06/ Монгол Улсын Хөдөлмөрийн баатар цол хүртлээ. Тэрбээр Монгол Улсын хөгжил цэцэглэлтэд үнэтэй хувь нэмэр оруулсан билээ.",
      en: "Founder of Monpolymet Group, Honored Industrial Worker, and Consulting Engineer of Mongolia Ts.Garamjav was awarded the Hero of Labor of Mongolia today (2026.07.06). She has made a valuable contribution to the development and prosperity of Mongolia.",
    },
    isPublished: true
  },
  {
    title: {
      mn: "Монполимет групп ТОП-100 аж ахуйн нэгжээр 21 дэх удаагаа шалгарлаа",
      en: "Monpolymet Group was selected as a TOP 100 enterprise for the 21st time",
    },
    category: {
      mn: "Амжилт",
      en: "Awards",
    },
    publishedAt: new Date("2026-06-25T00:00:00Z"),
    imageUrl: "https://scontent-iad6-1.xx.fbcdn.net/v/t39.30808-6/721757218_1635570728576262_3258625618694720457_n.jpg?stp=dst-jpg_tt6&cstp=mx2048x1366&ctp=p600x600&_nc_cat=107&ccb=1-7&_nc_sid=cae128&_nc_ohc=YdhyDWLvdMcQ7kNvwGrBWKJ&_nc_oc=AdoMjbwYMjwJqv4houFH6bWBwKohcaondzwDwC2g_7eakJm8fK803FM_eBIh1fAmark&_nc_zt=23&_nc_ht=scontent-iad6-1.xx&_nc_gid=xb8gpOW13u3kbWtebmPt1w&_nc_ss=7b20f&oh=00_AQBzJZBKkO0Db4dQvbEY0ZoVuf_0LoWe8xOuXK6cPYSzPw&oe=6A5FF9FB",
    content: {
      mn: "ТОП-100 аж ахуйн нэгжээр 21 дэх удаагаа шалгарсан нь Монполимет группийн тогтвортой өсөлт, хариуцлагатай бизнесийн зарчим, хамтын ажиллагааны үр дүн юм.",
      en: "Being selected as a TOP 100 enterprise for the 21st time is a result of Monpolymet Group's sustainable growth, responsible business principles, and collaboration.",
    },
    isPublished: true
  },
  {
    title: {
      mn: "Монполимет групп “Монцемент Билдинг Материалс” ххк ТОП 100 аж ахуйн нэгжээр шалгарлаа.",
      en: "Monpolymet Group, 'Moncement Building Materials' LLC was selected as a TOP 100 enterprise.",
    },
    category: {
      mn: "Амжилт",
      en: "Awards",
    },
    publishedAt: new Date("2024-11-21T00:00:00Z"),
    imageUrl: "https://monpolymet.mn/wp-content/uploads/2024/11/467316563_1117016913764982_6953976156202560817_n-640x360.jpg",
    content: {
      mn: "Монполимет Группийн хэмжээнд үйлдвэр бүтээн байгуулалтын салбарт үйл ажиллагаа явуулж эхэлсэн цагаас хойш 20 гаруй удаа Монгол Улсын “ТОП-100” аж ахуйн нэгж, шилдэг хариуцлагатай татвар төлөгчөөр шалгарсан билээ.",
      en: "Monpolymet Group has been selected as one of the TOP 100 enterprises and best responsible taxpayers in Mongolia more than 20 times since it started operating in the industrial construction sector.",
    },
    isPublished: true
  },
  {
    title: {
      mn: "Гэр бүлд ээлтэй шилдэг ажил олгогч Монцемент Билдинг Материалс ХХК",
      en: "MONCEMENT BUILDING MATERIALS LLC, THE BEST FAMILY-FRIENDLY EMPLOYER",
    },
    category: {
      mn: "Амжилт",
      en: "Awards",
    },
    publishedAt: new Date("2023-05-29T00:00:00Z"),
    imageUrl: "https://monpolymet.mn/wp-content/uploads/2023/05/GWA-640x438.jpg",
    content: {
      mn: "Үндэсний үйлдвэрлэгч #Монцемент_Билдинг_Материалс_ХХК “New Work Summit: Good Workplace Awards 2023” үйл ажиллагааны “Good workplace for Family support” буюу Гэр бүлд ээлтэй шилдэг ажил олгогчоор шалгарлаа. Манай хамт олон энэ шагналыг хоёр дахь удаагаа гардаж байна.",
      en: "Moncement Building Materials LLC, a major manufacturer was named the most family-friendly employer at the New York Summit: Good Workplace Awards 2023 activities. This is our team’s 2nd time presenting the honor.",
    },
    isPublished: true
  },
  {
    title: {
      mn: "“Нэг мод – Нэг амь- 2023” аян",
      en: "Campaign “One Tree – One Life 2023”",
    },
    category: {
      mn: "Нийгмийн хариуцлага",
      en: "CSR",
    },
    publishedAt: new Date("2023-05-29T00:00:00Z"),
    imageUrl: "https://monpolymet.mn/wp-content/uploads/2023/05/MicrosoftTeams-image-16-640x608.png",
    content: {
      mn: "Монполимет Группээс жил бүр зохион байгуулдаг “Нэг мод – Нэг амь” уламжлалт аян эхэлж байна.",
      en: "Monpolymet Group’s traditional campaign “One tree – One life” has begun.",
    },
    isPublished: true
  },
  {
    title: {
      mn: "Монгол Улсын 2022 оны “Топ-100” аж ахуйн нэгжийн нэг боллоо",
      en: "MONPOLYMET GROUP HAS BECOME THE ONE OF THE TOP 100 BUSINESSES IN MONGOLIA.",
    },
    category: {
      mn: "Амжилт",
      en: "Awards",
    },
    publishedAt: new Date("2023-05-29T00:00:00Z"),
    imageUrl: "https://monpolymet.mn/wp-content/uploads/2023/05/MicrosoftTeams-image-25-640x368.jpg",
    content: {
      mn: "Үндэсний үйлдвэрлэгч Монполимет Групп Монгол Улсын 2022 оны “Топ-100” аж ахуйн нэгжийн нэг боллоо. Ийнхүү бид “Топ-100” аж ахуйн нэгжид 16 дахь удаагаа эрэмбэлэгдэж байна.",
      en: "A national manufacturer Monpolymet Group has been named one of the Mongolia’s “TOP 100” companies for 2022. We have been named to the list for the 16th time.",
    },
    isPublished: true
  },
  {
    title: {
      mn: "Ойн цэвэрлэгээ хийв",
      en: "FOREST CLEANING",
    },
    category: {
      mn: "Нийгмийн хариуцлага",
      en: "CSR",
    },
    publishedAt: new Date("2023-04-18T00:00:00Z"),
    imageUrl: "https://monpolymet.mn/wp-content/uploads/2023/04/339772062_23853979202440031_9152250015155330780_n.jpg",
    content: {
      mn: "Тарьж, ургуулсан ойн төгөлүүддээ ойн цэвэрлэгээ хийлээ. Ойн цэвэрлэгээг жил бүр хийдэг бөгөөд ойг хамгаалах, хөнөөлт шавжийн хор хохирлоос сэргийлэх, түймрийн эрсдэлийг бууруулах, ойн төлөв байдлыг сайжруулах, моддыг доройтож хөгшрөхөөс хамгаалах олон чухал ач холбогдолтой юм.",
      en: "We have just carried out over all cleaning in our small forest areas that we created and nourished. We carry out forest cleaning on annual basis to protect the trees, prevent from insect infestation, reduce fire risks, improve general wellbeing of the forest, and to prevent the forest from fast aging.",
    },
    isPublished: true
  },
  {
    title: {
      mn: "Тэтгэлэгт тэнцсэн оюутнууддаа ажлын байрны урилга гардууллаа",
      en: "Students who are qualified for the scholarships that are announced by Monpolymet group and Eternal Sustainable Development Fund were awarded with their scholarship certificates and invitations to work in the company after their graduation.",
    },
    category: {
      mn: "Нийгмийн хариуцлага",
      en: "CSR",
    },
    publishedAt: new Date("2023-04-18T00:00:00Z"),
    imageUrl: "https://monpolymet.mn/wp-content/uploads/2023/04/zurag-ok-640x220.jpg",
    content: {
      mn: "Монполимет Групп, Мөнх тогтвортой хөгжил сангийн нэрэмжит тэтгэлэгт тэнцсэн оюутнууддаа батламж болон сургуулиа төгсөөд группийн салбар компаниудад ажиллах ажлын байрны урилгыг гардуулан өглөө.",
      en: "We didn’t only focus on the grades when we selected the scholarship candidates. We also considered their social participations, their personal attitudes, and abilities on working in teams.",
    },
    isPublished: true
  }
];

const uri = 'mongodb://localhost:27017/monpolymet';

const newsSchema = new mongoose.Schema({
  title: { mn: String, en: String },
  category: { mn: String, en: String },
  publishedAt: Date,
  imageUrl: String,
  content: { mn: String, en: String },
  isPublished: Boolean
}, { collection: 'newsarticles' });

const News = mongoose.model('NewsArticle', newsSchema);

async function seed() {
  try {
    await mongoose.connect(uri);
    console.log('Connected to DB');
    
    await News.deleteMany({});
    console.log('Cleared existing newsarticles');
    
    await News.insertMany(newNews);
    console.log('Successfully inserted', newNews.length, 'news articles!');
    
  } catch (err) {
    console.error('Error seeding DB', err);
  } finally {
    await mongoose.disconnect();
  }
}

seed();
