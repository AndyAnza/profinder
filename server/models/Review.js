/*Review Model:
- Represents reviews or ratings for products.
- Fields may include user reference, product reference, rating, review text, etc.
*/
const { Schema, model } = require("mongoose");
const userSchema = require("./User");
const professionalSchema = require("./Professional");

const reviewSchema = new Schema({
  user: {
    //
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  professional: {
    //
    type: Schema.Types.ObjectId,
    ref: "Professional",
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  comment: {
    type: String,
    required: true,
    min_length: 1,
    max_length: 280,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Review = model("Review", reviewSchema);

module.exports = Review;
