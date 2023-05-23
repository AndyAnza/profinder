/*Review Model:
- Represents reviews or ratings for products.
- Fields may include user reference, product reference, rating, review text, etc.
*/
const { Schema, model } = require("mongoose");
const User = require("./User");
const Professional = require("./Professional");

const reviewSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  comment: {
    type: String,
    required: false,
    minlength: 1,
    maxlength: 280,
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Review = model("Review", reviewSchema);

module.exports = Review;
