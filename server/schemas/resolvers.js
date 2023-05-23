const { signToken } = require("../utils/auth");
const { AuthenticationError } = require("apollo-server-express");
const { User, Professional } = require("../models");

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id });
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    filterCategory: async (parent, args) => {
      const professionals = await Professional.find({
        category: args.category,
      });
      return professionals;
    },
    filterLocation: async (parent, args) => {
      const professionals = await Professional.find({
        location: args.location,
      });
      return professionals;
    },
  },
  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);
      return { user, token };
    },
    addProfessional: async (parent, args, context) => {
      const professional = await User.findOneAndUpdate(
        { _id: context.user._id },
        { $addToSet: { profession: args } },
        { new: true, runValidators: true }
      );
      return professional;
    },
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

// filtro por categoria
// filtro por location
// filtro por rating
