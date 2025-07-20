import { useState } from 'react';
import { gql, useMutation, useQuery } from '@apollo/client';

const VOTE_ANIME = gql`
  mutation VoteAnime($animeId: ID!, $score: Int!) {
    voteAnime(animeId: $animeId, score: $score)
  }
`;

const GET_USER_ANIME_VOTE = gql`
  query GetUserAnimeVote($animeId: ID!, $userId: ID!) {
    userAnimeVote(animeId: $animeId, userId: $userId) {
      score
    }
  }
`;

export function useUserAnimeVote(animeId: string, userId: string | null) {
  const { data, loading, error } = useQuery(GET_USER_ANIME_VOTE, {
    variables: { animeId, userId },
    skip: !animeId || !userId,
  });

  return {
    score: data?.userAnimeVote?.score ?? null,
    loading,
    error,
  };
}

const useVoteAnime = () => {
  const [success, setSuccess] = useState(false);
  const [voteAnimeMutation, { loading, error }] = useMutation(VOTE_ANIME, {
    onCompleted: () => setSuccess(true),
    onError: () => setSuccess(false),
  });

  // Adiciona userId para refetchQueries
  const voteAnime = async (animeId: string, score: number, userId?: string) => {
    setSuccess(false);
    await voteAnimeMutation({
      variables: { animeId, score },
      refetchQueries: userId
        ? [{ query: GET_USER_ANIME_VOTE, variables: { animeId, userId } }]
        : undefined,
    });
  };

  return { voteAnime, loading, error, success };
};

export default useVoteAnime; 