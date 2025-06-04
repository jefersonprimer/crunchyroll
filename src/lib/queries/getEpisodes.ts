import { gql } from "@apollo/client";

export const GET_EPISODES = gql`
  query GetEpisodeByPublicCode($publicCode: String!) {
    episodeByPublicCode(publicCode: $publicCode) {
      id
      publicCode
      title
      slug
      animeId
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
`;
