const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    name: String
    lastname: String
    email: String
    phone: String
    profilePicture: String
    location: String
    createdAt: String
  }

  type Professional {
    _id: ID
    user: User
    aboutMe: String
    yearsOfExperience: String
    category: String
    expertise: String
    rating: Int
    url: String
    reviews: [Review]
  }

  type Review {
    _id: ID
    user: User
    comment: String
    rating: Int
    professional: Professional
  }

  type Query{
    users: [User]
    professionals (category: String, location: String, rating: Int): [Professional]
    review: [Review]

  }

  
  type Mutations{
    addUser (username: String!, name: String!, lastname: String!, email: String!, phone: String!, location: String!, profilePicture: String )
    addProfessional( user: ID!, aboutMe: String!, yearsOfExperience: Int!, category: String!, expertise: String!, url: String )
    addReview (user: ID!, comments: String!, professional: ID!)
  }
`;

module.exporst = typeDefs;
