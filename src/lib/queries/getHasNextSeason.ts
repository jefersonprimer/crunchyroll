import { gql } from "@apollo/client";

// has_next_season
export const GET_HAS_NEXT_SEASON = gql`
  query NextSeasonAnimes {
    nextSeasonAnimes {
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
      hasNextSeason
    }
  }
`;