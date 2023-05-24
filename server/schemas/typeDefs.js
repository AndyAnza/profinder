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
    profession: Professional
  }

  type Professional {
    _id: ID!
    user: User!
    aboutMe: String!
    yearsOfExperience: String!
    category: String!
    expertise: String!
    rating: Int
    url: String
    reviews: [Review]
  }

  type Review {
    _id: ID!
    user: User!
    comment: String!
    rating: Float
    professional: Professional!
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]!
    user(userId: ID!): User
    professionals(
      category: String
      location: String
      rating: Float
    ): [Professional]
    review: [Review]
    me: User
    filterCategory(category: String!): [Professional]
    filterLocation(location: String!): [Professional]
    filterRating(rating: Float!): [Professional]
  }

  type Mutations {
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
      yearsOfExperience: Int!
      category: String!
      expertise: String!
      url: String
    ): User
    addReview(user: ID!, comments: String!, professional: ID!): Review
    removeUser(userId: ID!): User
    updateProfessional(
      userID: ID!
      aboutMe: String!
      yearsOfExperience: Int!
      category: String!
      expertise: String!
      url: String
    ): Professional
  }
`;

module.exports = typeDefs;
