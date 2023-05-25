/*User Model:
- Represents the users of your eCommerce app.
- Fields may include username, email, password (hashed), name, address, phone number, etc.
- May include additional fields for roles or permissions.
*/

const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  name: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [
      /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/,
      "Please write a valid email address",
    ],
  },
  phone: {
    type: String,
    required: true,
    trim: true,
    validate: {
      validator: function (value) {
        return /^\d{10}$/.test(value);
      },
      message: "Phone number should be 10 digits long",
    },
  },
  password: {
    type: String,
    required: true,
  },
  profilePicture: {
    //*
    type: String,
    required: false,
  },
  location: {
    type: String,
    required: true,
    enum: ["CDMX", "Monterrey"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// hash user password
userSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified("password")) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// custom method to compare and validate password for logging in
userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

//Model created based on the schema
const User = model("User", userSchema);

module.exports = User;
