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
    // filtro category y rating si funciona
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
    // si sirve
    addProfessional: async (parent, args) => {
      const professional = await Professional.create(args);
      return professional;
    },
    // si sirve
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
