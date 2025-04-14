import { gql } from "@apollo/client";

export const GET_EPISODES = gql`
  query GetEpisodes {
    episodes {
      id
      title
      slug
      animeId
    }
  }
`;
