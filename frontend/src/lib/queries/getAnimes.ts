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
      airingDay
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
        season
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
        seasonId
        versions {
          id
          languageType
          videoUrl
        }
        subtitles{
          language
          subtitleUrl
        }
        thumbnail{
          previewSpriteUrl
          mainThumbnailUrl
        }
        likes_count
        dislikes_count
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
      season
      seasonNumber
      episodeNumber
      seasonId
      versions {
        id
        languageType
        videoUrl
      }
      subtitles{
        language
        subtitleUrl
      }
      thumbnail{
        previewSpriteUrl
        mainThumbnailUrl
      }
      likes_count
      dislikes_count
    }
  }
`;
