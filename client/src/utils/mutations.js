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

export const ADD_PROFESSIONAL = gql`
  mutation addProfessional(
    $user: ID!
    $aboutMe: String!
    $category: String!
    $yearsOfExperience: Int!
    $expertise: String!
    $income: String
    $url: String
  ) {
    addProfessional(
      user: $user
      aboutMe: $aboutMe
      category: $category
      yearsOfExperience: $yearsOfExperience
      expertise: $expertise
      income: $income
      url: $url
    ) {
      _id
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

export const REMOVE_USER = gql`
  mutation removeUser($userId: ID!) {
    removeUser(userId: $userId) {
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
`;

export const UPDATE_PROFESSIONAL = gql`
  mutation updateProfessional(
    $user: ID!
    $name: String
    $lastname: String
    $phone: String
    $email: String
    $aboutMe: String
    $expertise: String
    $yearsOfExperience: Int
    $income: String
  ) {
    updateProfessional(
      name: $name
      lastname: $lastname
      phone: $phone
      email: $email
      aboutMe: $aboutMe
      expertise: $expertise
      yearsOfExperience: $yearsOfExperience
      user: $user
      income: $income
    ) {
      aboutMe
      yearsOfExperience
      expertise
      income
    }
  }
`;

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        username
      }
    }
  }
`;
