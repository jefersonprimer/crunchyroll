import { gql } from "@apollo/client";

// is_new_release
export const GET_LATEST_RELEASES = gql`
  query LatestReleases {
    latestReleases {
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
    }
  }
`;