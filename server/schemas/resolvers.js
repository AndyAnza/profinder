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
    addProfessional: async (parent, args, context) => {
      const { user, aboutMe, yearsOfExperience, expertise, category } = args;

      const professional = await User.findOneAndUpdate(
        { _id: user }, // Assuming `user` is the ID of the user associated with the professional
        {
          $addToSet: {
            profession: {
              aboutMe,
              yearsOfExperience,
              expertise,
              category,
            },
          },
        },
        { new: true, runValidators: true }
      );

      return professional;
    },
    //addReview hecho por Diana
    //*
    // addReview: async (parent, args, context) => {
    //   const user = await User.findOne({ _id: context.user._id });
    //   if (!user) {
    //     throw new Error("User not found");
    //   }
    //   const professional = await Professional.findById(args.professional);
    //   if (!professional) {
    //     throw new Error("Professional not found");
    //   }
    //   const review = new Review({
    //     user: user._id,
    //     comment: args.comments,
    //     rating: args.rating,
    //     professional: professional._id,
    //   });
    //   await review.save();
    //   professional.reviews.push(review._id);
    //   await professional.save();
    //   return review;
    // },

    // addReview: async (parent, args, context) => {
    //   const user = await User.findOne({ _id: context.user._id });
    //   if (!user) {
    //     throw new Error("User not found");
    //   }

    //   const professional = await Professional.findById(args.professional);
    //   if (!professional) {
    //     throw new Error("Professional not found");
    //   }

    //   const review = new Review({
    //     user: user._id,
    //     comment: args.comments,
    //     rating: args.rating,
    //     professional: professional._id,
    //   });

    //   await review.save();
    //   professional.reviews.push(review._id);
    //   await professional.save();

    //   return review;
    // },

    addReview: async (parent, args, context) => {
      const user = await User.findOne({ _id: context.user._id });
      if (!user) {
        throw new Error("User not found");
      }

      const professional = await Professional.findById(args.professional);
      if (!professional) {
        throw new Error("Professional not found");
      }

      const review = await Review.create({
        user: user._id,
        comment: args.comments,
        rating: args.rating,
        professional: professional._id,
      });

      professional.reviews.push(review._id);
      await professional.save();

      return review;
    },

    removeUser: async (parent, { userId }) => {
      return User.findOneAndDelete({ _id: userId });
    },
    //*
    updateProfessional: async (parent, args, context) => {
      const professional = await Professional.findOneAndUpdate(
        { _id: context.professional._id },
        { args },
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
