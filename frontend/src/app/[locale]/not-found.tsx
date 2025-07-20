import React from "react";
import Link from "next/link";
import MinimalHeader from "../components/layout/MinimalHeader";
import MinimalFooter from "../components/layout/MinimalFooter";
import { getTranslations } from "next-intl/server";

interface NotFoundProps {
  params: {
    locale: string;
  };
}

const NotFound: React.FC<NotFoundProps> = async ({ params }) => {
  const locale = params?.locale || 'en';

  const t = await getTranslations('NotFoundPage');

  return (
    <>
      <MinimalHeader locale={locale} />
      <div className="flex flex-col items-center justify-center h-[515px] bg-[#000000]">
        <div className="w-full max-w-6xl mx-auto p-8">
          <div className="bg-[#000000] rounded-lg shadow-lg p-8 flex items-center gap-12">
            <img
              className="w-[425px] h-[413px] object-contain"
              src="https://www.crunchyroll.com/build/assets/img/yuzu-bucket.png"
              alt="Yuzu."
            />
            <div className="flex-1 space-y-4">
              <h3 className="text-[2rem] font-weight-700 text-[#FFFFFF]">
                {t('title')}
              </h3>
              <p className="text-[1rem] text-[#FFFFFF]">
                {t('message')}
              </p>
              <Link href={`/${locale}`} >
                <button
                  className="cursor-pointer px-4 py-2 font-bold text-[0.8rem] bg-orange-600 text-[#000000] hover:bg-[#FF640A] transition-colors duration-200 text-lg"
                >
                  {t('button')}
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <MinimalFooter />
    </>
  );
};

export default NotFound;