import { ImageSkeleton, NameSkeleton, AudioTypeSkeleton } from './AnimeCardSkeleton';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from "next/navigation";
import { useFavorites } from "../../[locale]/contexts/FavoritesContext";
import { useQuery } from '@apollo/client';
import { GET_ANIMES } from "@/lib/queries/getAnimes";
import { Anime } from "@/types/anime";

import MaturityRating from '../elements/MaturityRating';
import AddToListModal from "../modals/AddToListModal";
import PlayButton from '../buttons/PlayButton';
import BookmarkButton from '../buttons/BookmarkButton';
import AddButton from '../buttons/AddButton';

import Link from 'next/link';

import CreateModal from "../../[locale]/crunchylists/[listId]/components/CreateModal";
import { useLists } from "../../[locale]/contexts/ListsContext";
import useVoteAnime from '../../[locale]/hooks/useVoteAnime';

const AnimeCard: React.FC<{ anime: Anime }> = ({ anime }) => {
  const t = useTranslations();
  const { favorites, addFavorite, removeFavorite } = useFavorites();
  const { lists, createList } = useLists();
  const [showModal, setShowModal] = useState(false);
  const [showAddToListModal, setShowAddToListModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newListName, setNewListName] = useState("");
  const isFavorited = favorites.some((fav) => fav.id === anime.id);
  const router = useRouter();
  const params = useParams();
  const locale = params.locale as string;
  const [firstEpisode, setFirstEpisode] = useState<any | null>(null);
  const { voteAnime, loading: voting, error: voteError, success: voteSuccess } = useVoteAnime();
  const [selectedRating, setSelectedRating] = useState<number | null>(null);

  const handleVote = (rating: number) => {
    setSelectedRating(rating);
    voteAnime(anime.id, rating);
  };

  const { loading, data } = useQuery(GET_ANIMES);

  useEffect(() => {
    if (!loading && data?.animes) {
      const currentAnime = data.animes.find((a: Anime) => a.id === anime.id);
      if (currentAnime?.episodes && currentAnime.episodes.length > 0) {
        const firstEp = currentAnime.episodes[0];
        console.log('Setting first episode:', firstEp);
        setFirstEpisode({
          id: firstEp.id,
          slug: firstEp.slug,
          videoUrl: firstEp.videoUrl,
          publicCode: firstEp.publicCode
        });
      }
    }
  }, [data, loading, anime.id]);

  const handleFavoriteClick = () => {
    if (isFavorited) {
      removeFavorite(anime.id);
    } else {
      addFavorite(anime);
    }
  };

  const handleAddButtonClick = () => {
    if (lists.length === 0) {
      setShowCreateModal(true);
    } else {
      setShowAddToListModal(true);
    }
  };

  const handleCreateList = () => {
    if (newListName.trim()) {
      createList(newListName);
      setShowCreateModal(false);
      setNewListName("");
      setShowAddToListModal(true);
    }
  };

  return (
    <div
      className="flex justify-center items-center mx-auto 
        w-[150.66px] h-[286.48px] min-h-[320px] relative
        sm:w-[177.66px] sm:min-h-[350px]
        md:w-[150.66px] md:h-[286.48px] md:min-h-[320px]
        lg:w-[250.59px] lg:h-[436.89px]
        group"
    >
      <div
        className="relative overflow-hidden cursor-pointer text-left 
          w-[141.66px] min-h-[270.48px] h-auto
          sm:w-[161.66px] sm:min-h-[320.48px] sm:group-hover:h-[320.48px]
          md:w-[141.66px] md:min-h-[270.48px] 
          lg:w-[220.59px] lg:h-[406.89px] md:group-hover:h-[270.48px]
          transition-all duration-200 group-hover:w-[157.66px] group-hover:min-h-[320px] lg:group-hover:w-[236.59px] lg:group-hover:h-[422.89px]"
      >
        <Link
          href={`/${locale}/series/${anime.publicCode}/${anime.slug}`}
          className="block w-full h-full text-inherit no-underline"
        >
          <div className="relative w-full h-[80%] group-hover:h-full">
            {loading && (
              <div className="absolute top-0 left-0 w-full h-full z-[2]">
                <ImageSkeleton />
              </div>
            )}
            {!loading && (
              <img
                src={anime.imagePoster}
                alt={anime.name}
                className="block object-cover w-full h-full transition-all duration-200"
              />
            )}
          </div>

          {isFavorited && (
            <div className="absolute top-0 right-0 z-[3] w-0 h-0 border-[36px] border-t-0 border-l-transparent border-r-black border-b-transparent flex items-start justify-end text-[#FF640A] opacity-100 transition-opacity duration-200 group-hover:opacity-0">
              <svg
                className="text-[#FF640A] w-4 h-4 mt-[2px] mr-[-35px]"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                aria-hidden="true"
                role="img"
                fill="currentColor"
              >
                <path d="M4 2h8a1 1 0 0 1 1 1v9.92a1 1 0 0 1-1.625.78L8 11l-3.375 2.7A1 1 0 0 1 3 12.92V3a1 1 0 0 1 1-1z" />
              </svg>
            </div>
          )}

          <div
            className="absolute bottom-0 text-white flex flex-col justify-start opacity-100 transition-opacity group-hover:opacity-0
              w-[141.66px] min-h-[58px] h-[20%] sm:w-[161.66px] sm:min-h-[58px] lg:w-[220.59px] lg:h-[76px]"
          >
            {loading ? (
              <>
                <NameSkeleton />
                <AudioTypeSkeleton />
              </>
            ) : (
              <>
                <h3 className="text-sm text-white whitespace-normal truncate overflow-hidden text-ellipsis line-clamp-3 font-medium my-2">{anime.name}</h3>
                <span className="text-[#a0a0a0] m-0">{t(`audioTypes.${anime.audioType}`)}</span>
              </>
            )}
          </div>

          <div
            className="absolute top-0 left-0 right-0 bottom-0 text-white text-left opacity-0 bg-[rgba(20,21,25,0.8)] transition-opacity duration-200 z-[2] w-full h-full flex flex-col justify-start items-start group-hover:opacity-100 group-hover:bg-[rgba(20,21,25,0.9)] p-2 lg:p-3"
          >
            <h3 className="text-sm text-white whitespace-normal truncate overflow-hidden text-ellipsis line-clamp-3 font-medium my-2">{anime.name}</h3>
            <div className="w-full flex items-center gap-2 m-0">
              <MaturityRating rating={anime.rating} size={4} />
              <span className="flex items-center font-medium text-sm text-[#dadada] gap-1">
                {anime.score}
                <svg
                  className="text-[#dadada] w-4 h-4 inline-flex items-center"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  role="img"
                  fill="currentColor"
                >
                  <title>Avaliação</title>
                  <path d="M15.266 8.352L11.988 1.723 8.73 8.352 1.431 9.397 6.71 14.528 5.465 21.849 11.999 18.39 18.544 21.85 17.285 14.528 22.57 9.398z" />
                </svg>
              </span>
            </div>
            <span className="font-semibold text-sm text-[#A0A0A0] m-0">
              {anime.seasons?.length ?? "N/A"} {t(`seasons.${anime.seasons?.length === 1 ? 'singular' : 'plural'}`)}
            </span>
            <span className="font-semibold text-sm text-[#A0A0A0] m-0">
              {anime.totalEpisodes ?? "N/A"} {t(`episodes.${anime.totalEpisodes === 1 ? 'singular' : 'plural'}`)}
            </span>
            <p className="text-sm text-white font-medium overflow-hidden text-ellipsis line-clamp-6 mt-2">
              {anime.synopsis}
            </p>
          </div>
        </Link>

        <div
          className="absolute rounded-full p-0 cursor-pointer opacity-0 transition-opacity duration-300 z-[3] flex items-center gap-4 group-hover:opacity-100 bottom-2 left-2 lg:bottom-[10px] lg:left-[10px] lg:gap-3"
        >
          <PlayButton firstEpisode={firstEpisode} />
          <BookmarkButton isFavorited={isFavorited} onToggle={handleFavoriteClick} />
          <AddButton onClick={handleAddButtonClick} />
        </div>

        {showAddToListModal && (
          <AddToListModal
            anime={anime}
            onClose={() => setShowAddToListModal(false)}
          />
        )}
        {showCreateModal && (
          <CreateModal
            isOpen={showCreateModal}
            onClose={() => setShowCreateModal(false)}
            onCreate={handleCreateList}
            newListName={newListName}
            onNameChange={setNewListName}
            characterCount={newListName.length}
            maxCharacters={50}
          />
        )}
      </div>
    </div>
  );
};

export default AnimeCard;