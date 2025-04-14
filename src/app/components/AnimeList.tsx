import { useQuery } from '@apollo/client';
import { GET_ANIMES } from '../../../src/lib/queries/getAnimes';

const AnimeList: React.FC = () => {
  const { loading, error, data } = useQuery(GET_ANIMES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 p-4">
      {data?.animes.map((anime: { id: string; name: string; imagePoster: string }) => (
        <li key={anime.id} className="bg-white rounded shadow p-2 text-center">
          <img
            src={anime.imagePoster}
            alt={anime.name}
            className="w-full h-auto object-cover rounded"
          />
          <p className="mt-2 text-sm font-medium">{anime.name}</p>
        </li>
      ))}
    </ul>
  );
};

export default AnimeList;
