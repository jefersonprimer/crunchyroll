import { gql } from "@apollo/client";

// is_releasing
export const GET_RELEASING_ANIMES = gql`
  query ReleasingAnimes {
    releasingAnimes {
      id
      publicCode
      slug
      name
      audioType
      imagePoster
      imageCardCompact
      synopsis
      rating
      score
      totalEpisodes
      seasons{
        seasonNumber
      }
    }
  }
`;