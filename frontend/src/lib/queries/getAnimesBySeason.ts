// src/lib/queries/getAnimes.ts
import { gql } from "@apollo/client";

export const GET_ANIMES_BY_SEASON = gql`
    query {
        animes {
            id
            publicCode
            slug
            name
            audioType
            synopsis
            rating
            score
            imagePoster
            imageCardCompact
            totalEpisodes
            releaseDate
            seasons {
                id
                seasonName
                seasonNumber
                totalEpisodes
                season
            }
            createdAt
            updatedAt
        }
    }
`;