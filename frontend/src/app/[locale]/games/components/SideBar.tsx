import React, { useState, useRef, useEffect } from "react";

interface SideBarProps {
  open: boolean;
  onClose: () => void;
}

const genreList = [
  "action",
  "adventure",
  "comedy",
  "drama",
  "fantasy",
  "music",
  "romance",
  "sci-fi",
  "seinen",
  "shojo",
  "shonen",
  "slice-of-life",
  "sports",
  "supernatural",
  "thriller",
];

const genreNames: Record<string, string> = {
  action: "Action",
  adventure: "Adventure",
  comedy: "Comedy",
  drama: "Drama",
  fantasy: "Fantasy",
  music: "Music",
  romance: "Romance",
  "sci-fi": "Sci-Fi",
  seinen: "Seinen",
  shojo: "Shojo",
  shonen: "Shonen",
  "slice-of-life": "Slice of Life",
  sports: "Sports",
  supernatural: "Supernatural",
  thriller: "Thriller",
};

const SideBar: React.FC<SideBarProps> = ({ open, onClose }) => {
  const [genreOpen, setGenreOpen] = useState(false);
  const genreRef = useRef<HTMLLIElement>(null);
  const [gamesOpen, setGamesOpen] = useState(false);
  const gamesRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    if (!genreOpen) return;
    function handleClickOutside(event: MouseEvent) {
      if (genreRef.current && !genreRef.current.contains(event.target as Node)) {
        setGenreOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [genreOpen]);

  useEffect(() => {
    if (!gamesOpen) return;
    function handleClickOutside(event: MouseEvent) {
      if (gamesRef.current && !gamesRef.current.contains(event.target as Node)) {
        setGamesOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [gamesOpen]);

  if (!open) return null;
  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 z-10" onClick={onClose} />
      {/* Sidebar */}
      <aside className="fixed top-[60px] left-0 w-[280px] h-[calc(100vh-60px)] bg-[rgb(20,21,25)] shadow-lg z-50 py-4 overflow-y-auto animate-slideIn">
        <nav>
          <div className="mb-2">
            <span className="block text-xs font-bold text-gray-400 uppercase mb-2 px-4">Browse</span>
            <ul className="space-y-1">
              <li><a href="https://crunchyroll.com/videos/popular" className="block px-4 py-2  hover:bg-[#23252B] text-white">Popular</a></li>
              <li><a href="https://crunchyroll.com/videos/new" className="block px-4 py-2  hover:bg-[#23252B] text-white">New</a></li>
              <li><a href="https://crunchyroll.com/simulcasts" className="block px-4 py-2  hover:bg-[#23252B] text-white">Simulcast Season</a></li>
              <li ref={genreRef}>
                <div
                  tabIndex={0}
                  className="flex items-center justify-between px-4 py-2 hover:bg-[#23252B] cursor-pointer text-white"
                  onClick={() => setGenreOpen((v) => !v)}
                >
                  <span>Genres</span>
                  <span className={`ml-2 transition-transform duration-200 ${genreOpen ? 'rotate-180' : 'rotate-0'}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor"><path fillRule="evenodd" d="M7.41 8.59 12 13.17l4.59-4.58L18 10l-6 6-6-6z"/></svg>
                  </span>
                </div>
                {genreOpen && (
                  <ul className="bg-[#2F3138]">
                    {genreList.map((genre) => (
                      <li key={genre}>
                        <a
                          href={`http://localhost:3000/pt-br/videos/${genre}`}
                          className="block pl-8 px-4 py-2 text-white hover:bg-[#4A4E58]"
                          onClick={onClose}
                        >
                          {genreNames[genre]}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
              <div className="border border-[#23252B]"/>
              <div className="mt-2">
                <ul className="space-y-1">
                  <li><a href="https://crunchyroll.com/news" className="block px-4 py-2  hover:bg-[#23252B] text-white">News</a></li>
                </ul>
              </div>
              <li ref={gamesRef}>
                <div
                  tabIndex={0}
                  className="flex items-center justify-between px-4 py-2 hover:bg-[#23252B] cursor-pointer text-white"
                  onClick={() => setGamesOpen((v) => !v)}
                >
                  <span>Games</span>
                  <span className={`ml-2 transition-transform duration-200 ${gamesOpen ? 'rotate-180' : 'rotate-0'}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor"><path fillRule="evenodd" d="M7.41 8.59 12 13.17l4.59-4.58L18 10l-6 6-6-6z"/></svg>
                  </span>
                </div>
                {gamesOpen && (
                  <ul className="css-134qq81 ebbvwim0 bg-[#2F3138]">
                    <li><a href="https://crunchyroll.com/games/" className="submenu-item-title block pl-8 px-4 py-2 text-white hover:bg-[#4A4E58]" onClick={onClose}>Crunchyroll Games Home</a></li>
                    <li><a href="https://crunchyroll.com/games/streetfighterduel/" className="submenu-item-title block pl-8 px-4 py-2 text-white hover:bg-[#4A4E58]" onClick={onClose}>Street Fighter: Duel</a></li>
                    <li><a href="https://crunchyroll.com/games/eminenceinshadow/" className="submenu-item-title block pl-8 px-4 py-2 text-white hover:bg-[#4A4E58]" onClick={onClose}>The Eminence in Shadow: Master of Garden</a></li>
                    <li><a href="https://www.myherogame.com/" className="submenu-item-title block pl-8 px-4 py-2 text-white hover:bg-[#4A4E58]" onClick={onClose}>My Hero Academia: The Strongest Hero</a></li>
                    <li><a href="http://bloodlinegame.com/" className="submenu-item-title block pl-8 px-4 py-2 text-white hover:bg-[#4A4E58]" onClick={onClose}>Bloodline: The Last Royal Vampire</a></li>
                    <li><a href="https://onepunchmanworld.com/" className="submenu-item-title block pl-8 px-4 py-2 text-white hover:bg-[#4A4E58]" onClick={onClose}>One Punch Man: World</a></li>
                  </ul>
                )}
              </li>
              <li><a href="https://crunchyroll.com/animeawards/" className="block px-4 py-2  hover:bg-[#23252B] text-white">Anime Awards</a></li>
              <li><a href="https://store.crunchyroll.com/" className="block px-4 py-2  hover:bg-[#23252B] text-white">Store</a></li>
            </ul>
          </div>
          
          
        </nav>
      </aside>
    </>
  );
};

export default SideBar;