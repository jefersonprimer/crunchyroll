import { gql } from "@apollo/client";

// is_popular
export const GET_POPULAR_ANIMES = gql`
  query PopularAnimes {
    popularAnimes {
      id
      slug
      name
      audioType
      imagePoster
      synopsis
      rating
      score
      totalEpisodes
      seasons{
        seasonNumber
      }
      isPopular
    }
  }
`;