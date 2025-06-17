import Image from "next/image";

const PremiumUpsell = () => {
  return (
    <div className="w-[1351px] h-[108px]">
      <div className="w-[1234px] h-[108px] relative mx-auto bg-gray-900 overflow-hidden flex items-center justify-between px-6">
          {/* Background */}
        <Image
          className="absolute inset-0 w-full h-full object-cover"
          src="https://www.crunchyroll.com/build/assets/img/series_premium_upsell/background.png"
          alt="Background"
          width={1234}
          height={108}
        />

        {/* Esquerda: Coroa + Estrela + Texto */}
        <div className="relative z-10 flex items-center gap-4 text-white">
          {/* Coroa */}
          <Image
            className="w-24 h-24"
            src="https://www.crunchyroll.com/build/assets/img/series_premium_upsell/upsell-icon.png"
            alt="Premium Icon"
            width={56}
            height={56}
          />

          {/* Estrela Primária */}
          <Image
            className="w-8"
            src="https://www.crunchyroll.com/build/assets/img/series_premium_upsell/stars-primary.png"
            alt="Stars"
            width={64}
            height={16}
          />

          {/* Texto */}
          <div>
            <h4 className="text-lg font-semibold">
              Watch this series without ads!
            </h4>
            <p className="text-sm mt-1">
              Try Crunchyroll Premium free for 7 days.
            </p>
          </div>
        </div>

        {/* Direita: Estrela Secundária + Botão */}
        <div className="relative z-10 flex items-center gap-4">
          {/* Estrela Secundária */}
          <Image
            className="w-8"
            src="https://www.crunchyroll.com/build/assets/img/series_premium_upsell/stars-secondary.png"
            alt="Stars Secondary"
            width={64}
            height={16}
          />

          {/* Botão CTA */}
          <a
            href="https://www.crunchyroll.com/premium?referrer=newweb_organic_series"
            className="flex items-center px-5 py-2 bg-[#FAB818] text-[#000000] text-sm font-semibold shadow hover:bg-orange-600 transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-5 h-5 mr-1"
            >
              <path d="M18.188 17l1.667-5.606-4.26 1.864L12 7.688l-3.596 5.57-4.259-1.864L5.812 17h12.376zm-14.08 1.285L1.614 9.9a1 1 0 0 1 1.36-1.2l4.673 2.045 3.512-5.442a1 1 0 0 1 1.68 0l3.514 5.442 4.674-2.046a1 1 0 0 1 1.36 1.201l-2.494 8.386a1 1 0 0 1-.959.715H5.067a1 1 0 0 1-.959-.715z"></path>
            </svg>
            START FREE TRIAL
          </a>
        </div>
      </div>
    </div>
  );
};

export default PremiumUpsell;
