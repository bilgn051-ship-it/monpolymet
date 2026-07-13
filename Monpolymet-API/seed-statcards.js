const mongoose = require("mongoose");

async function seed() {
  await mongoose.connect("mongodb://127.0.0.1:27017/monpolymet", {
  });

  const StatCard = mongoose.model("StatCard", new mongoose.Schema({}, { strict: false }));

  await StatCard.deleteMany({});
  
  await StatCard.insertMany([
    {
      variant: "tall",
      colorTheme: "beige",
      icon: "Leaf",
      statValue: "1,000+ га",
      title: { mn: "Нөхөн сэргээсэн талбай", en: "Reclaimed Area" },
      description: { mn: "Байгальд ээлтэй үйл ажиллагаа", en: "Eco-friendly operations" },
      imageUrl: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800",
      targetPage: "csr",
      order: 1,
      isActive: true
    },
    {
      variant: "ticker",
      colorTheme: "dark",
      statValue: "30+",
      title: { mn: "Жилийн туршлага", en: "Years of Operation" },
      description: { mn: "1993 оноос хойш", en: "Since 1993" },
      order: 2,
      isActive: true
    },
    {
      variant: "ticker",
      colorTheme: "light-blue",
      statValue: "2,000+",
      title: { mn: "Ажилтан", en: "Employees" },
      description: { mn: "Хамт олон", en: "Our team" },
      order: 3,
      isActive: true
    }
  ]);

  console.log("Seeded stat cards correctly!");
  process.exit(0);
}
seed().catch(console.error);
