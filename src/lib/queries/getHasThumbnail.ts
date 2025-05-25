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
      imageCardCompact
      synopsis
      rating
      score
      totalEpisodes
      seasons{
        seasonNumber
      }
       episodes {
        id
        title
        slug
        duration
        synopsis
        image
        videoUrl
        releaseDate
        createdAt
        updatedAt
        versions {
          id
          languageType
          videoUrl
        }
      }
    }
  }
`;