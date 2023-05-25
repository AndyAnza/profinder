import { gql } from '@apollo/client';


export const QUERY_PROFESSIONALS = gql`
  query professionals {
    professionals {
      _id
      
    }
  }
`;