// src/lib/queries/getAnimes.ts
import { gql } from "@apollo/client";

export const GET_ANIMES = gql`
  query {
    animes {
      id
      publicCode
      slug
      name
      audioType
      imagePoster
      synopsis
      rating
      score
      genres {
        name
      }
      totalEpisodes
      seasons{
      	seasonNumber
      }

      episodes{
        title
        duration
        updatedAt
        synopsis
      }

      contentSources {
        authors
        title
        sourceType
      }
    }
  }
`;
