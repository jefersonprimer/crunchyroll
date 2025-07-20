import { gql } from "@apollo/client";

// obtem os animes dublados 
export const GET_ANIME_OF_DAY = gql`
  query {
    animeOfTheDay {
      id
      publicCode
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
      airingDay
    }
  }
`;