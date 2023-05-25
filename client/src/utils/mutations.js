import { gql } from "@apollo/client";

export const ADD_USER = gql`
  mutation addUser($username: String!) {
    addUser(username: $username) {
      _id
    }
  }
`;

export const ADD_REVIEW = gql`
  mutation AddReview(
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
