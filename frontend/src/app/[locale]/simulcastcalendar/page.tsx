import CalendarClient from "./components/CalendarClient";

// Função para buscar mensagens do locale
async function getMessages(currentLocale: string) {
  try {
    const messages = await import(`../../../locale/${currentLocale}.json`);
    return messages.default || messages;
  } catch (error) {
    console.error(`Erro ao carregar mensagens para o locale ${currentLocale}:`, error);
    return {};
  }
}

export async function generateMetadata({ params }: { params: { locale: string } }) {
  const { locale } = await params;
  const messages = await getMessages(locale);
  return {
    title: messages.simulcastcalendar?.title,
    description: messages.simulcastcalendar?.description,
  };
}

export default function CalendarPage() {
  return <CalendarClient />;
}


