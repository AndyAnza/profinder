const { signToken } = require("../utils/auth");
const { AuthenticationError } = require("apollo-server-express");
const { User, Professional, Review } = require("../models");

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id });
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    professionals: async (parent, args) => {
      const filters = {};
      if (args.rating) {
        filters.rating = args.rating;
      }
      if (args.category) {
        filters.category = args.category;
      }
      if (args.location) {
        filters.location = args.location;
      }
      const professionals = await Professional.find(filters)
        .populate("user")
        .populate("reviews");
      console.log(professionals);
      return professionals;
    },
  },
  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);
      return { user, token };
    },
    //addProfessional: async (parent, args) => {
    //   const professional = await Professional.create(args);
    //   return professional;
    // },
    // Funciona en apollo pero no se guarda en Compass
    addProfessional: async (parent, args, context) => {
      const { user, aboutMe, category, yearsOfExperience, expertise, url } =
        args;

      const professional = await User.findOneAndUpdate(
        { _id: user }, // Assuming `user` is the ID of the user associated with the professional
        {
          $addToSet: {
            profession: {
              aboutMe,
              category,
              yearsOfExperience,
              expertise,
              url,
            },
          },
        },
        { new: true, runValidators: true }
      );

      return professional;
    },

    addReview: async (parent, { user, comment, rating, professional }) => {
      try {
        const review = new Review({
          user,
          comment,
          rating,
          professional,
        });
        const savedReview = await review.save();

        return savedReview;
      } catch (error) {
        throw new Error("Failed to add review");
      }
    },

    //si sirve
    removeUser: async (parent, { userId }) => {
      return User.findOneAndDelete({ _id: userId });
    },

    updateProfessional: async (parent, args) => {
      const professional = await Professional.findOneAndUpdate(
        { _id: professional._id },
        { $set: args },
        { new: true, runValidators: true }
      );
      return professional;
    },
    //si sirve
    login: async (parent, args) => {
      const user = await User.findOne({ email: args.email });
      if (user) {
        const correctPw = await user.isCorrectPassword(args.password);
        if (correctPw) {
          const token = signToken(user);
          return { user, token };
        }
      }
    },
  },
};
module.exports = resolvers;
