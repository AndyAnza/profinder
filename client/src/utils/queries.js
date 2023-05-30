import { gql } from "@apollo/client";

//filters only by category
export const QUERY_PROFESSIONALS = gql`
  query professionals($location: String, $category: String, $rating: Int) {
    professionals(location: $location, category: $category, rating: $rating) {
      _id
      user {
        name
        lastname
        email
        phone
        profilePicture
      }
      aboutMe
      yearsOfExperience
      category
      expertise
      income
      rating
      url
    }
  }
`;

export const QUERY_ME = gql`
  query me {
    me {
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

export const GET_PROFILE = gql`query profile($userId: ID!) {
  profile(userId: $userId) {
    _id
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
    aboutMe
    yearsOfExperience
    category
    expertise
    income
    rating
    url
    reviews {
      _id
      comment
      rating
      createdAt
      user {
        username
      }
    }
  }
}`;
