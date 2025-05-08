import { gql } from "@apollo/client";

// has_next_season
export const GET_HAS_NEXT_SEASON = gql`
  query NextSeasonAnimes {
    nextSeasonAnimes {
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
      hasNextSeason
    }
  }
`;