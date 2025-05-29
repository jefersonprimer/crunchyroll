import { gql } from "@apollo/client";

// obtem os filmes
export const GET_MOVIES = gql`
    query {
        movie {
            id
            slug
            name
            audioType
            imagePoster
            synopsis
            rating
            score
            genres{
            id
            name	
            }
            totalEpisodes
            seasons{
            seasonNumber
            }
        }
    }
`;