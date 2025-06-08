import { gql } from "@apollo/client";

// is_new_release
export const GET_LATEST_RELEASES = gql`
  query LatestReleases {
    latestReleases {
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
        genres{
          id
          name	
        }
        totalEpisodes
        seasons{
          seasonNumber
        }
    }
  }
`;