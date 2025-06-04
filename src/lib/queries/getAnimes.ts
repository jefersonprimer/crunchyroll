// src/lib/queries/getAnimes.ts
import { gql } from "@apollo/client";

export const GET_ANIMES = gql`
  query {
    animes {
      id
      publicCode
      slug
      name
      audioType
      imageBannerMobile
      imageBannerDesktop
      imageCardCompact
      imagePoster
      imageLogo
      synopsis
      rating
      score
      audioLanguages
      subtitles
      contentSources{
        authors
        sourceType
        copyright 
      }
      contentAdvisory
      genres {
        id
        name
      }
      totalEpisodes
      seasons {
        id
        seasonName
        seasonNumber
        totalEpisodes
      }
      episodes {
        id
        publicCode
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
