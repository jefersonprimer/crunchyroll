import { gql } from "@apollo/client";

// is_popular
export const GET_POPULAR_ANIMES = gql`
  query PopularAnimes {
    popularAnimes {
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
      genres{
        id
        name	
      }
      seasons{
        seasonNumber
      }
      isPopular
    }
  }
`;