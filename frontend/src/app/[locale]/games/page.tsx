import Header from "./components/Header";
import HeroSection from "./components/HeroSection";

// src/App.tsx
import React from 'react';
import GameCatalogSection from './components/GameCatalogSection';
import { GameCardProps } from "./components/GameCard";
import MinimalFooter from "@/app/components/layout/MinimalFooter";

interface GameCatalogSectionProps {
    games: GameCardProps[]; // Array de dados dos jogos
  }

const dummyGames: GameCardProps[] = [
  {
    imageSrc: "https://a.storyblok.com/f/174976/1024x1024/8ade3a01ba/crg_metalslugtactics_img_tileimage-prereg_kv_gen_en_nocta_nob_1024x1024_static_06-2025.png/m/550x0/filters:quality(75):format(webp)",
    imageAlt: "Metal Slug Tactics game cover",
    badges: [
      { type: "premium", text: "Mega and Ultimate Exclusive" },
      { type: "preregistration", text: "Pre-Registration" },
    ],
    title: "Metal Slug Tactics",
    link: "card/metal-slug-tactics",
    description: "SUBSCRIPTION REQUIRED - EXCLUSIVE TO CRUNCHYROLL MEGA AND ULTIMATE FAN MEMBERSHIPSThe legendary METAL SLUG franchise is back—this time in tactical form! Deploy iconic heroes like Marco, Tarma, Fio, and Eri in explosive, grid-based battles packed with nostalgic flair and modern strategy. Whether you're a longtime fan or a newcomer to the battlefield, get ready for a deep, fast-paced tactical RPG wrapped in that unmistakable METAL SLUG style.KEY FEATURES- Tactical Turn-Based CombatPlan your moves, flank enemies, and unleash synchronized attacks to dominate the battlefield.- Deep Strategy, Fast-Paced ActionEach decision counts. Chain abilities, use terrain to your advantage, and adapt on the fly.- Build Your Dream SquadUnlock and upgrade classic METAL SLUG characters. Equip them with unique skills and custom loadouts.- Retro Look, Modern FeelStunning pixel art and animations faithfully recreate the METAL SLUG universe—optimized for mobile.- Epic Boss BattlesFace off against massive enemies and iconic bosses in thrilling strategic encounters.Ready, Aim, Deploy!Download Metal Slug Tactics now and command the battlefield—anytime, anywhere.____________Crunchyroll Premium members enjoy an ad-free experience, with full access to Crunchyroll's library of over 1,300 unique titles and 46,000 episodes, including simulcast series that premiere shortly after premiering in Japan. In addition, membership offers special benefits including offline viewing access, discount code to Crunchyroll Store, Crunchyroll Game Vault access, streaming simultaneously on multiple devices, and more!Privacy Policy: https://www.crunchyroll.com/games/privacyTerms: https://www.crunchyroll.com/games/terms/",
    genres: ["Action", "Role Playing"],
    platforms: [
      { type: "apple", link: "#apple-metalslug" },
      { type: "play", link: "#play-metalslug" },
    ],
  },
  {
    imageSrc: "https://a.storyblok.com/f/174976/1024x1024/f5b5822357/crg_themenofyoshiwaraohgiya_img_tileimagev02_character_aso_en_nocta_nob_1024x1024_static_06-2025-1.png/m/550x0/filters:quality(75):format(webp)",
    imageAlt: "The Men of Yoshiwara: Ohgiya game cover",
    badges: [
      { type: "premium", text: "Mega and Ultimate Exclusive" },
      { type: "new", text: "New" },
    ],
    title: "The Men of Yoshiwara: Ohgiya",
    link: "card/the-men-of-yoshiwara-ohgiya",
    description: "Uncover hidden desires and secret pasts in a world where romance burns brightest after dark. Who will steal your heart in the floating world of passion and intrigue?Continue your romance story with the visual novel mobile game, The Men of Yoshiwara: Ohgiya!<br>Deep in the center of an island lies the Yoshiwara, a dazzling district where passion and secrets intertwine. Play as the daughter of a prosperous merchant, guided by your bodyguard Musashi Takenouchi, as you enter Yoshiwara to find your own heart-racing romance story!<br>*The Men of Yoshiwara: Ohgiya is a standalone story, not a direct sequel to Kikuya. You can enjoy it fully without having played Kikuya!<br>ROMANTIC POSSIBILITIES- Takigawa conceals a lonely secret in the guise of arrogance. Can you break through his defenses to find his truth underneath?- Asagiri is a free and wild spirit who refuses to be tamed. He is a truly self-indulgent lover of women and is like a little brother to Takigawa.- Gakuto is a confident and rugged man. He holds a certain ambition, but has a lovable side to him.- Utsusemi grew up as an orphan. He longs to find his true parents.<br>Will you have chosen your perfect man by the end of a seemingly endless night?",
    genres: ["Romance", "Visual Novel / Interactive Story"],
    platforms: [
      { type: "apple", link: "#apple-yoshiwara" },
      { type: "play", link: "#play-yoshiwara" },
    ],
  },
  {
    imageSrc: "https://a.storyblok.com/f/174976/1024x1024/adf42454a7/crg_pubencounter_img_tileimage_kv_gen_en_nocta_nob_1024x1024_static_06-2025.png/m/550x0/filters:quality(75):format(webp)",
    imageAlt: "Pub Encounter game cover",
    badges: [
      { type: "premium", text: "Mega and Ultimate Exclusive" },
      { type: "new", text: "New" },
    ],
    title: "Pub Encounter",
    link: "card/pub-encounter",
    description: "Step into a cozy pub and uncover heartfelt stories in Pub Encounter!<br>Available exclusively for Crunchyroll Mega and Ultimate Fan Members.<br>Welcome to Pub Encounter – A Romantic Visual Novel of Sophisticated Love!<br>Step into a cozy, old-fashioned pub and immerse yourself in a heartwarming tale of love, fate, and companionship. Pub Encounter is a beautifully illustrated otome visual novel where you find yourself meeting a group of charming and distinguished older gentlemen, each with their own past, personality, and secrets. As you spend time together, bonds will form, emotions will deepen, and romance may blossom.<br>Will you find love in this intimate setting? Or will your journey lead to an unforgettable friendship? The choice is yours in Pub Encounter!<br>KEY FEATURES- A Mature &amp; Engaging Romance Story – Follow a beautifully written storyline that explores deep emotions, personal growth, and meaningful relationships. Each character has a unique past, and your choices shape the journey ahead.- Meet Five Charming Gentlemen – Engage in heartfelt conversations with a group of older, sophisticated men, each with distinct personalities and life experiences. Will you fall for the cool and mysterious businessman, the kind-hearted bartender, or the elegant writer?- Multiple Story Paths &amp; Endings – Your decisions influence how the story unfolds. Will you find romance, friendship, or an unexpected twist of fate? Explore different paths and unlock various endings based on your choices.- Gorgeous Artwork &amp; Stunning Character Designs – Experience breathtaking illustrations that bring the characters and their emotions to life. Every scene is beautifully crafted to enhance the storytelling.- Emotional Soundtrack &amp; Voice Acting – Enjoy a captivating atmosphere with a rich soundtrack that enhances the emotional depth of each moment. Some scenes even include Japanese voice acting, making the experience even more immersive.- Optimized for Mobile Play – With intuitive touch controls, you can easily navigate the story at your own pace. Save your progress, revisit past scenes, and enjoy an effortless visual novel experience.- Replayability &amp; Collectible CGs – Play through different story routes, make new choices, and unlock beautifully illustrated CGs for your personal collection.",
    genres: ["Role Playing", "Adventure"],
    platforms: [
      { type: "apple", link: "#apple-pubencounter" },
      { type: "play", link: "#play-pubencounter" },
    ],
  },
  {
    imageSrc: "https://a.storyblok.com/f/174976/1024x1024/c9b86b21b3/crg_shinchansummervacation_img_tileimage-prereg_kv_gen_en_nocta_nob_1024x1024_static_06-2025.png/m/550x0/filters:quality(75):format(webp)",
    imageAlt: "Shin chan: Me and the Professor on Summer Vacation game cover",
    badges: [
      { type: "premium", text: "Mega and Ultimate Exclusive" },
      { type: "preregistration", text: "Pre-Registration" },
    ],
    title: "Shin chan: Me and the Professor on Summer Vacation",
    link: "card/shin-chan-me-and-the-professor-summer-vacation",
    description: "Join Shin chan for a heartwarming and hilarious summer adventure!<br>Join Shinnosuke Nohara—better known as Shin chan—for a heartwarming, hilarious, and beautifully animated summer adventure!<br>In Shin chan: Me and the Professor on Summer Vacation – The Endless Seven-Day Journey, Japan’s favorite troublemaker embarks on a nostalgic journey through the countryside, filled with quirky characters, mysterious happenings, and the lazy, magical days of childhood summer.<br>Explore a charming rural townRun, fish, bug hunt, and explore the vibrant landscapes of Asso, Kumamoto, a place filled with secrets and surprises.<br>Meet the mysterious ProfessorA strange inventor lures Shin chan and his family into an unforgettable adventure with a bizarre camera and a time-looping twist.<br>Relive the joy of endless summerEach day is yours to enjoy—befriend townsfolk, complete daily tasks, uncover strange occurrences, and capture every moment in your summer journal.<br>Gorgeous hand-drawn styleExperience stunning visuals that blend anime-inspired artwork with watercolor landscapes and nostalgic charm.<br>Fully voiced in JapaneseImmerse yourself in the world of Shin chan with authentic Japanese voice acting and English subtitles.<br>--Key Features--Slice-of-life gameplay with open-ended explorationQuirky humor and heartfelt storytellingDaily activities like fishing, bug collecting, and photographyUnlock new events and mysteries each dayA relaxing game for fans of cozy adventures and anime<br>Get access with Crunchyroll Game VaultCrunchyroll Game Vault is your premium library of handpicked mobile games, available to Crunchyroll Premium members. No ads. No in-app purchases. Just pure, uninterrupted gaming.<br>Ready for a summer you’ll never forget?Join Shin chan on a timeless journey of friendship, family, and fun.",
    genres: ["Visual Novel / Interactive Story", "Adventure"],
    platforms: [
      { type: "apple", link: "#apple-shinchan" },
      { type: "play", link: "#play-shinchan" },
    ],
  },
];

async function getMessages(locale: string) {
    const messages = await import(`@/locale/${locale}.json`);
    return messages.default || messages;
}

export async function generateMetadata({ params }: { params: { locale: string } }) {
    const { locale } = await params;
    const messages = await getMessages(locale);
    return {
      title: messages.gamesPage.title,
      description: messages.gamesPage.description,
    };
}

const GamePage = () => {
    return (
        <>
            <Header/>
            <HeroSection/>
            <GameCatalogSection games={dummyGames} />
            <MinimalFooter/>
        </>
    );
}

export default GamePage;