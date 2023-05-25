/*Product Model:
- Represents the products available for sale.
- Fields may include title, description, price, quantity, category, images, etc.
*/
const { Schema, model } = require("mongoose");
const User = require("./User");
const Review = require("./Review");
const professionalSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: User,
      required: true,
    },
    aboutMe: {
      type: String,
      required: true,
    },
    yearsOfExperience: {
      type: Number,
      required: true,
      max: 70,
    },
    category: {
      type: String,
      required: true,
      enum: ["Enfermería", "Carpintería", "Electricista", "Construcción"],
    },
    expertise: {
      type: String,
      required: true,
    },
    reviews: [
      {
        type: Schema.Types.ObjectId,
        ref: Review,
      },
    ],
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    url: {
      type: String,
      required: false,
      match: [
        /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/,
        "Please write a valid url address",
      ],
    },
    updatedAt: {
      //*
      type: Date,
      default: Date.now,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

// professionalSchema.virtual("rating").get(function () {
//   return this.rating.length;
// });

const Professional = model("Professional", professionalSchema);

module.exports = Professional;
