const db = require("../config/connection");
const { User, Review, Professional } = require("../models");
const userSeeds = require("./userSeeds.json");
const reviewSeeds = require("./reviewSeeds.json");
const professionalSeeds = require("./professionalSeeds.json");

db.once("open", async () => {
  try {
    await User.deleteMany({});
    const user = await User.create(userSeeds, { new: true });
    console.log(user[0]);

    await Review.deleteMany({});
    const seedsArray = reviewSeeds.map((review) => {
      return { ...review, user: user[0]._id.toString() };
    });
    await Review.create(seedsArray);

    await Professional.deleteMany({});
    const seedsProfessionalArray = professionalSeeds.map((professional) => {
      return { ...professional, user: user[0]._id.toString() };
    });
    await Professional.create(seedsProfessionalArray);

    console.log("All files seeded successfully!");

    process.exit(0);
  } catch (err) {
    console.error("Error seeding files:", err);
    process.exit(1);
  }
});
