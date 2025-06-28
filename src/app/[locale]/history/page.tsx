import Header from "@/app/components/layout/Header";
import Footer from "../simulcastcalendar/components/Footer";
import HistoryPageClient from "./HistoryPageClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Histórico de Animes Recentes | Crunchyroll',
  description: 'Gerencie sua Crunchylistas | Crunchyroll'
}

const HistoryPage = () => {
  return (
    <div>
      <Header/>
        <HistoryPageClient/>
      <Footer/>
    </div>
  );
};

export default HistoryPage;
