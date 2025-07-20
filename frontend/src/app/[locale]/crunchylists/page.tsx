import { getTranslations } from 'next-intl/server';
import CrunchyListPageClient from './components/CrunchyListPageClient';
import Header from '@/app/components/layout/Header';
import Footer from '@/app/components/layout/Footer';

import Link from 'next/link';

export async function generateMetadata(props: { params: { locale: string } }) {
  const params = await props.params;
  const { locale } = params;
  const t = await getTranslations({ locale });
  return {
    title: t('Crunchylist.title'),
    description: t('Crunchylist.description'),
  };
}

const CrunchyListsPage = async (props: { params: Promise<{ locale: string }> }) => {
  const { locale } = await props.params;
  const t = await getTranslations({ locale });

  return (
    <div>
      <Header/>
        <div className="my-[60px]">
          <div className="flex justify-center items-center w-full h-full">
            <div className="w-full h-auto mx-auto">
              <div className="flex flex-col items-center w-full">
                <div className="text-center w-full h-[152px]">
                  <div className="text-center w-full h-[62px]">
                    <h1 className="text-2xl mb-6 gap-2 flex items-center justify-center">
                      <svg className="w-8 h-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" data-t="watchlist-svg" aria-labelledby="watchlist-svg" aria-hidden="true" role="img">
                        <path fill="#FFF" d="M17 18.113l-3.256-2.326A2.989 2.989 0 0 0 12 15.228c-.629 0-1.232.194-1.744.559L7 18.113V4h10v14.113zM18 2H6a1 1 0 0 0-1 1v17.056c0 .209.065.412.187.581a.994.994 0 0 0 1.394.233l4.838-3.455a1 1 0 0 1 1.162 0l4.838 3.455A1 1 0 0 0 19 20.056V3a1 1 0 0 0-1-1z"></path>
                      </svg>
                      <span className="text-[1.6rem] font-medium">{t('Crunchylist.mylists')}</span>
                    </h1>
                  </div>
                  <div className="flex justify-center gap-5 border-b-2 border-[#4A4E58] w-auto lg:w-[1058px] mx-auto mb-1">
                    <div className="flex gap-4">
                      <div role="tablist" className="flex">


                        <Link
                          href={`/${locale}/watchlist`}
                          className="flex justify-center items-center text-[#A0A0A0] no-underline px-[2.5rem] py-[1.5rem] text-sm cursor-pointer transition-all duration-300 ease-in-out hover:bg-[#141519] hover:text-[#FFFFFF]"
                        >
                          <span className="uppercase text-[0.875rem] font-extrabold">{t('Crunchylist.queue')}</span>
                        </Link>


                        <Link
                          href={`/${locale}/crunchylists`}
                          className="flex justify-center items-center text-[#FFFFFF] border-b-3 border-[#FF640A] no-underline px-[2.5rem] py-[1rem] text-sm cursor-pointer transition-all duration-300 ease-in-out hover:bg-[#141519]"
                        >
                          <span className="uppercase text-[0.875rem] font-extrabold">{t('Crunchylist.crunchylists')}</span>
                        </Link>


                        <Link
                          href={`/${locale}/history`}
                          className="flex justify-center items-center text-[#A0A0A0] no-underline px-[2.5rem] py-[1.5rem] text-sm cursor-pointer transition-all duration-300 ease-in-out hover:bg-[#141519] hover:text-[#FFFFFF]"
                        >
                          <span className="uppercase text-[0.875rem] font-extrabold">{t('Crunchylist.history')}</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        <div className="flex justify-center items-center w-full h-auto">
          <div className="w-full h-auto">
            <CrunchyListPageClient />
          </div>
        </div>
        </div>
      <Footer/>
    </div>
  );
}

export default CrunchyListsPage;