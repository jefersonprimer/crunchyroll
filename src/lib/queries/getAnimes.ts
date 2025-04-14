// src/lib/queries/getAnimes.ts
import { gql } from '@apollo/client';

export const GET_ANIMES = gql`
  query GetAnimes {
    animes {
      id
      title
      genres {
        name
      }
    }
  }
`;
