import { useState } from 'react';
import { gql, useMutation, useQuery } from '@apollo/client';

const VOTE_EPISODE = gql`
  mutation VoteEpisode($episodeId: ID!, $voteType: String!) {
    voteEpisode(episodeId: $episodeId, voteType: $voteType)
  }
`;

const GET_USER_EPISODE_VOTE = gql`
  query GetUserEpisodeVote($episodeId: ID!, $userId: ID!) {
    userEpisodeVote(episodeId: $episodeId, userId: $userId) {
      vote_type
    }
  }
`;

export function useUserEpisodeVote(episodeId: string, userId: string | null) {
  const { data, loading, error, refetch } = useQuery(GET_USER_EPISODE_VOTE, {
    variables: { episodeId, userId },
    skip: !episodeId || !userId,
  });

  return {
    voteType: data?.userEpisodeVote?.vote_type ?? null,
    loading,
    error,
    refetch,
  };
}

const useVoteEpisode = () => {
  const [success, setSuccess] = useState(false);
  const [voteEpisodeMutation, { loading, error }] = useMutation(VOTE_EPISODE, {
    onCompleted: () => setSuccess(true),
    onError: () => setSuccess(false),
  });

  const voteEpisode = async (episodeId: string, voteType: 'like' | 'dislike', userId?: string) => {
    setSuccess(false);
    await voteEpisodeMutation({
      variables: { episodeId, voteType },
      refetchQueries: userId
        ? [{ query: GET_USER_EPISODE_VOTE, variables: { episodeId, userId } }]
        : undefined,
    });
  };

  return { voteEpisode, loading, error, success };
};

export default useVoteEpisode; 