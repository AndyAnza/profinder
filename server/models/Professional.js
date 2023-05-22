/*Product Model:
- Represents the products available for sale.
- Fields may include title, description, price, quantity, category, images, etc.
*/
const { Schema, model } = require("mongoose");
const userSchema = require("./User");

const professionialSchema = new Schema({
  username: {
    userSchema,
    type: String,
    required: true,
  },
  name: {
    userSchema,
    type: String,
    required: true,
  },
  lastname: {
    userSchema,
    type: String,
    required: true,
  },
  email: {
    userSchema,
    type: String,
    required: true,
  },
  location: {
    //*might move it into the userSchema
    type: String,
    required: true,
    enum: ["CDMX", "Monterrey"],
  },
  aboutMe: {
    type: String,
    required: true,
  },
  yearsOfExperience: {
    type: Number,
    required: true,
    min: 0,
  },
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
});
