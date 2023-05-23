const db = require('../config/connection');
const { User, Review, Professional } = require('../models');
const userSeeds = require('./userSeeds.json');
const reviewSeeds = require('./reviewSeeds.json');
const professionalSeeds = require('./professionalSeeds.json');
  
db.once('open', async () => {
    try {
        await User.deleteMany({});
        await User.create(userSeeds);
        
        await Review.deleteMany({});
        await Review.create(reviewSeeds);
        
        await Professional.deleteMany({});
        await Professional.create(professionalSeeds);
        
        console.log('All files seeded successfully!');
        
        process.exit(0);
    } catch (err) {
        console.error('Error seeding files:', err);
        process.exit(1);
    }
});
  