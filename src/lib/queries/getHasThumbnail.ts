import { gql } from "@apollo/client";

// has_thumbnail
export const GET_HAS_THUMBNAIL = gql`
  query hasThumbnail {
      hasThumbnail {
      id
      slug
      name
      audioType
      imagePoster
      imageLogo
      imageThumbnail
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