import Header from "./components/Header";
import HeroSection from "./components/HeroSection";

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
        </>
    );
}

export default GamePage;