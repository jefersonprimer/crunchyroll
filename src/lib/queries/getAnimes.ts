// src/lib/queries/getAnimes.ts
import { gql } from "@apollo/client";

export const GET_ANIMES = gql`
  query {
    animes {
      id
      slug
      name
      audioType
      imageBannerMobile
      imageBannerDesktop
      imagePoster
      imageLogo
      synopsis
      rating
      score
      genres {
        id
        name
      }
      totalEpisodes
      seasons {
        seasonName
        totalEpisodes
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
      createdAt
      updatedAt
    }
  }
`;

export const GET_EPISODES = gql`
  query GetEpisodes($animeId: ID!) {
    episodesByAnime(animeId: $animeId) {
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
      season
      versions {
        id
        languageType
        videoUrl
      }
    }
  }
`;
