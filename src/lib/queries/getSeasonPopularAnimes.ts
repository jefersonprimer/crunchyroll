import { gql } from "@apollo/client";

// is_season_popular
export const GET_SEASON_POPULAR_ANIMES = gql`
  query SeasonPopularAnimes {
    seasonPopularAnimes {
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
        isSeasonPopular
    }
  }
`;


