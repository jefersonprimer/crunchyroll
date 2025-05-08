import { gql } from "@apollo/client";

// obtem os filmes
export const GET_MOVIES = gql`
    query {
        movie {
            id
            name
        }
    }
`;