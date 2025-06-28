"use client";

import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";

const YuzuSection = () => {
  const params = useParams();
  const locale = params.locale as string;
  const t = useTranslations("fallback_recommendation");

  return (
    <div className="flex justify-center items-center py-[50px] px-[80px] pb-[80px]">
      <div className="text-center">
        <img
          className="max-w-full h-auto"
          src="https://www.crunchyroll.com/build/assets/img/home/yuzu.png"
          srcSet="https://www.crunchyroll.com/build/assets/img/home/yuzu@2x.png 2x"
          alt="Yuzu."
        />
        <h3 className="pb-[40px]">
          {t('title')} <br />
          {t('subtitle')}
        </h3>
        <a
          className="mt-[20px] no-underline"
          data-t="view-all-btn"
          href={`/${locale}/videos/popular`}
        >
          <span className="py-[10px] px-[20px] border-2 border-solid border-[#ff640a] text-[#ff640a] no-underline uppercase">
            {t('button')}
          </span>
        </a>
      </div>
    </div>
  );
};

export default YuzuSection; 