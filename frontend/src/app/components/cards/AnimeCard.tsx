import { ImageSkeleton, NameSkeleton, AudioTypeSkeleton } from './AnimeCardSkeleton';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useRouter, useParams } from "next/navigation";
import { useFavorites } from "../../[locale]/contexts/FavoritesContext";
import { useQuery } from '@apollo/client';
import { GET_ANIMES } from "@/lib/queries/getAnimes";
import { Anime } from "@/types/anime";
import { useLists } from "../../[locale]/contexts/ListsContext";
import CreateModal from "../../[locale]/crunchylists/[listId]/components/CreateModal";

import MaturityRating from '../elements/MaturityRating';
import AddToListModal from "../modals/AddToListModal";
import PlayButton from '../buttons/PlayButton';
import BookmarkButton from '../buttons/BookmarkButton';
import AddButton from '../buttons/AddButton';

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
  const [showText, setShowText] = useState(false);
  const [showImage, setShowImage] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

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

  useEffect(() => {
    const textTimer = setTimeout(() => setShowText(true), 500);
    const imageTimer = setTimeout(() => setShowImage(true), 1000);
    return () => {
      clearTimeout(textTimer);
      clearTimeout(imageTimer);
    };
  }, []);

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
    <div className="w-[250.59px] h-[436.89px] flex justify-center items-center mx-auto hover:w-[236.59px] hover:h-[422.89px]">
    <div className="relative w-[220.59px] h-[406.89px] overflow-hidden cursor-pointer text-left group hover:w-[236.59px] hover:h-[422.89px]">
      <Link href={`/${locale}/series/${anime.publicCode}/${anime.slug}`} className="block w-full h-full text-inherit no-underline">
        <div className="relative w-full h-[330.89px]">
          {(!showImage || !imageLoaded) && (
            <div className="absolute top-0 left-0 w-full h-full z-[2]">
              <ImageSkeleton />
            </div>
          )}
          <img
            src={anime.imagePoster}
            alt={anime.name}
            className="w-[220.59px] h-[330.89px] object-cover group-hover:w-[236.59px] group-hover:h-[422.89px]"
            style={{ display: showImage ? (imageLoaded ? 'block' : 'none') : 'none' }}
            onLoad={() => setImageLoaded(true)}
          />
        </div>

        {isFavorited && (
          <div className="absolute top-0 right-0 z-[3] w-0 h-0 border-[36px] border-t-0 border-l-transparent border-r-black border-b-transparent flex items-start justify-end text-[#FF640A] opacity-100 transition-opacity duration-200 group-hover:opacity-0">
            <svg
              className="w-4 mt-[2px] mr-[-35px] fill-[#FF640A]"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              aria-hidden="true"
              role="img"
            >
              <path d="M4 2h8a1 1 0 0 1 1 1v9.92a1 1 0 0 1-1.625.78L8 11l-3.375 2.7A1 1 0 0 1 3 12.92V3a1 1 0 0 1 1-1z" />
            </svg>
          </div>
        )}

        <div className="absolute bottom-0 w-[220.59px] h-[76px] bg-black/50 text-white flex flex-col justify-start opacity-100 transition-opacity duration-300 group-hover:opacity-0">
          {showText ? (
            <>
              <p className="pt-[10px] truncate text-[14px] font-bold">{anime.name}</p>
              <p className="pt-[10px] text-[12px] m-0">{t(`audioTypes.${anime.audioType}`)}</p>
            </>
          ) : (
            <>
              <NameSkeleton />
              <AudioTypeSkeleton />
            </>
          )}
        </div>

        <div className="absolute top-0 left-0 right-0 bottom-0 p-3 text-white text-left opacity-0 bg-[rgba(20,21,25,0.8)] transition-opacity duration-200 z-[2] w-full h-full flex flex-col justify-start items-start group-hover:opacity-100 group-hover:bg-[rgba(20,21,25,0.9)]">
          <h3 className="truncate overflow-hidden text-ellipsis line-clamp-3 w-[220px] text-sm font-medium my-2">{anime.name}</h3>
          <div className="w-full flex items-center gap-2 m-0">
            <MaturityRating rating={anime.rating} size={4} />
            <span className="flex items-center gap-[5px]">
              {anime.score}
              <svg
                className="w-4 h-4 text-[#f1f1f1] inline-flex items-center"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                role="img"
                fill="#f1f1f1"
              >
                <title>Avaliação</title>
                <path d="M15.266 8.352L11.988 1.723 8.73 8.352 1.431 9.397 6.71 14.528 5.465 21.849 11.999 18.39 18.544 21.85 17.285 14.528 22.57 9.398z" />
              </svg>
            </span>
          </div>
          <span className="text-sm font-semibold text-[#A0A0A0] m-0">
            {anime.seasons?.length ?? "N/A"} {t(`seasons.${anime.seasons?.length === 1 ? 'singular' : 'plural'}`)}
          </span>
          <span className="text-sm font-semibold text-[#A0A0A0] m-0">
            {anime.totalEpisodes ?? "N/A"} {t(`episodes.${anime.totalEpisodes === 1 ? 'singular' : 'plural'}`)}
          </span>
          <p className="overflow-hidden text-ellipsis line-clamp-6 w-[208px] mt-2 text-sm font-medium">
            {anime.synopsis}
          </p>
        </div>
      </Link>

      <div className="absolute bottom-[10px] left-[10px] rounded-full p-0 cursor-pointer opacity-0 transition-opacity duration-300 z-[3] flex items-center gap-4 group-hover:opacity-100">
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