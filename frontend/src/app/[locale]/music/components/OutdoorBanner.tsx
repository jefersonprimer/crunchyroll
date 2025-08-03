// src/components/OutdoorBanner.tsx
import React from 'react';

export interface OutdoorBannerProps {
  /** O URL para onde o banner irá direcionar ao ser clicado. */
  link: string;
  /** O título principal do banner. Usado também como alt text para a imagem. */
  title: string;
  /** URL da imagem para telas mobile pequenas (largura < 35.5em, ~568px). */
  mobileSmallSrc: string;
  /** URL da imagem para telas desktop grandes. */
  desktopLargeSrc: string;
  // Você pode adicionar mais sources se precisar de mais breakpoints específicos
}

const OutdoorBanner: React.FC<OutdoorBannerProps> = ({
  link,
  title,
  mobileSmallSrc,
  desktopLargeSrc,
}) => {
  return (
    <div className="w-full bg-gray-900 overflow-hidden lg:max-w-[1050px] h-[350px] mx-auto">
      <a
        tabIndex={0}
        href={link}
        title={title}
        target="_self"
        className="block relative group" // 'group' para efeitos de hover nos filhos
        data-t="feed-banner"
      >
        <div className="relative w-full pb-[26.66%] md:pb-[26.66%] lg:pb-[26.66%] overflow-hidden lg:max-w-[1050px] h-[350px] mx-auto">
          <picture>
            {/* Source para mobile pequeno - adjust media query as needed for your design system */}
            <source
              media="(max-width: 35.5em)" // Equivalente a ~568px
              srcSet={mobileSmallSrc}
              sizes="100vw"
            />
            {/* Imagem padrão para desktop e maiores */}
            <img
              className="absolute inset-0 w-full  object-cover transition-transform duration-300 lg:max-w-[1050px] h-[350px]"
              loading="lazy"
              src={desktopLargeSrc}
              alt={title}
              data-t="original-image"
              sizes="100vw"
            />
          </picture>
        </div>
      </a>
    </div>
  );
};

export default OutdoorBanner;