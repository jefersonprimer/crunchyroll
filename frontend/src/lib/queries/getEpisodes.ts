import { gql } from "@apollo/client";

export const GET_EPISODES = gql`
  query GetAnimeEpisodes($animeId: String!) {
    anime(id: $animeId) {
      episodes {
        id
        title
        videoUrl
        slug
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
  }
`;
