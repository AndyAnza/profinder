import { gql } from "@apollo/client";

//filters only by category
export const QUERY_PROFESSIONALS = gql`
  query professionals($location: String, $category: String, $rating: Int) {
    professionals(location: $location, category: $category, rating: $rating) {
      _id
      user {
        name
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
