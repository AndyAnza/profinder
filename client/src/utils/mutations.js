import { gql } from "@apollo/client";

export const ADD_USER = gql`
  mutation addUser(
    $username: String!
    $name: String!
    $lastname: String!
    $email: String!
    $password: String!
    $phone: String!
    $location: String!
    $profilePicture: String
  ) {
    addUser(
      username: $username
      name: $name
      lastname: $lastname
      email: $email
      password: $password
      phone: $phone
      location: $location
      profilePicture: $profilePicture
    ) {
      token
      user {
        _id
        username
        name
        lastname
        email
        phone
        profilePicture
        location
        createdAt
      }
    }
  }
`;

export const ADD_REVIEW = gql`
  mutation addReview(
    $user: ID!
    $comment: String
    $rating: Int
    $professional: ID!
  ) {
    addReview(
      user: $user
      comment: $comment
      rating: $rating
      professional: $professional
    ) {
      _id
      user {
        _id
      }
      comment
      rating
      professional {
        _id
      }
      createdAt
    }
  }
`;
