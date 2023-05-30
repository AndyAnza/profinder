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
    profile: async (parent, args, context) => {
      if (context.user) {
        const profile = await Professional.findOne({ user: args.userId })
          .populate("user")
          .populate("reviews");
        return profile;
      }
      throw new AuthenticationError("You need to be logged in!");
    },

    // filtro category y rating si funciona
    professionals: async (parent, args) => {
      const filters = {};
      const userFilters = {};
      if (args.rating) {
        filters.rating = args.rating;
      }
      if (args.category) {
        filters.category = args.category;
      }
      if (args.location) {
        userFilters.location = args.location;
      }
      // Find users based on location
      const usersWithLocation = await User.find(userFilters);
      const userIdsWithLocation = usersWithLocation.map((user) => user._id);
      // Add user IDs to filters
      if (args.location) {
        filters.user = { $in: userIdsWithLocation };
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
    addProfessional: async (parent, args, context) => {
      if (context.user) {
        const professional = await Professional.create(args);
        return professional;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    // si sirve
    addReview: async (
      parent,
      { user, comment, rating, professional },
      context
    ) => {
      if (context.user) {
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
      } else {
        throw new AuthenticationError("You need to be logged in!");
      }
    },
    // si sirve
    updateProfessional: async (parent, args, context) => {
      const { _id, ...updateFields } = args;
      if (context.user) {
        const professional = await Professional.findOneAndUpdate(
          { user: context.user._id },
          updateFields,
          { new: true }
        );
        console.log(professional);
        return professional;
      }
      throw new AuthenticationError("You need to be logged in!");
    },

    //si sirve
    removeUser: async (parent, { userId }, context) => {
      console.log(context);
      if (context.user) {
        await Professional.findOneAndDelete({ user: context.user._id });
        return User.findOneAndDelete({ _id: context.user._id });
      }
      throw new AuthenticationError("You need to be logged in!");
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
