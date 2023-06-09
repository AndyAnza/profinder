const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    name: String!
    lastname: String!
    email: String!
    phone: String!
    profilePicture: String
    location: String!
    createdAt: String
  }

  type Professional {
    _id: ID!
    user: User!
    aboutMe: String
    yearsOfExperience: Int
    category: String
    expertise: String
    income: String
    rating: Int
    url: String
    reviews: [Review]
  }

  type Review {
    _id: ID!
    user: User!
    comment: String
    rating: Int
    professional: Professional!
    createdAt: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(userId: ID!): User
    professionals(
      category: String
      location: String
      rating: Int
    ): [Professional]
    profile(userId: ID!): Professional
    review: [Review]
    me: User
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(
      username: String!
      name: String!
      lastname: String!
      email: String!
      password: String!
      phone: String!
      location: String!
      profilePicture: String
    ): Auth
    addProfessional(
      user: ID!
      aboutMe: String!
      category: String!
      yearsOfExperience: Int!
      expertise: String!
      income: String
      url: String
    ): User
    addReview(
      user: ID!
      comment: String
      rating: Int
      professional: ID!
      createdAt: String
    ): Review
    removeUser(userId: ID!): User
    updateProfessional(
      user: ID!
      name: String
      lastname: String
      phone: String
      email: String
      aboutMe: String
      yearsOfExperience: Int
      expertise: String
      income: String
      url: String
    ): Professional
  }
`;

module.exports = typeDefs;
