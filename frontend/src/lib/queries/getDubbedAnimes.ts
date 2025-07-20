import { gql } from "@apollo/client";

// obtem os animes dublados 
export const GET_DUBBED_ANIMES = gql`
  query GetDubbedAnimes {
    dubbedAnimes {
      id
      slug
      publicCode
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