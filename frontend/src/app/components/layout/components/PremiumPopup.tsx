"use client";

import { useTranslations } from "next-intl";

export default function PremiumPopup() {
  const t = useTranslations("premiumPopup");

  return (
    <div className="absolute top-[calc(100%+15px)] left-1/2 -translate-x-1/2 z-[9999] bg-black text-white px-[15px] py-[10px] w-[360px] h-[166px] shadow-md">
      <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-b-[10px] border-b-black" />
      <a
        tabIndex={0}
        href="https://www.crunchyroll.com/pt-br/premium?referrer=newweb_header_modal&amp;return_url=https%3A%2F%2Fwww.crunchyroll.com%2Fpt-br%2Fcrunchylists#plans"
        className="block text-[#FFFFFF] no-underline"
      >
        <div className="absolute top-0 left-0 right-0 bottom-0 rounded-[4px]">
          <div className="relative w-full h-full">
            <svg
              className="absolute opacity-100 w-[44px] h-[44px] top-0 left-0"
              viewBox="0 0 50 36"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g transform="translate(2 -7)" fill="none" fillRule="evenodd">
                <path
                  stroke="#FAB818"
                  strokeWidth="2"
                  d="m15.225 33.094.214 1.078-.744.833 1.083-.215.853.733-.237-1.068.73-.855-1.068.24z"
                />
                <path
                  stroke="#FFF"
                  strokeWidth="2"
                  d="m6.602 16.97.24 1.124-.837.868 1.218-.224.96.764-.267-1.113.822-.891-1.202.25z"
                />
                <path
                  stroke="#FAB818"
                  strokeWidth="2.4"
                  d="m36.534 15.907.088 1.565-1.215 1.028 1.57-.09 1.059 1.205-.123-1.554 1.201-1.063-1.555.127z"
                />
              </g>
            </svg>

            <svg
              className="absolute opacity-100 w-[24px] h-[24px] top-0 right-0"
              viewBox="0 0 17 16"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g
                transform="translate(-276 -10)"
                stroke="#FAB818"
                strokeWidth="2"
                fill="none"
                fillRule="evenodd"
              >
                <path d="m284.748 17.598.078.375-.273.28.396-.062.313.265-.087-.373.268-.287-.391.07z" />
              </g>
            </svg>

            <svg
              className="absolute opacity-100 w-[64px] h-[64px] bottom-0 right-0"
              viewBox="0 0 75 79"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g transform="translate(-290 -89)" fill="none" fillRule="evenodd">
                <path
                  stroke="#FFC94D"
                  strokeWidth="1.68"
                  opacity=".688"
                  d="m343.9 145.118.037.41-.31.28.412-.038.289.306-.047-.406.305-.29-.406.048z"
                />
                <path
                  stroke="#FAB818"
                  opacity=".4"
                  d="m365.957 85.043-52.5 82.059M361.457 173.102l-66-41.03"
                />
              </g>
            </svg>

            <svg
              className="absolute opacity-100 w-[64px] h-[64px] bottom-0 left-0"
              viewBox="0 0 70 63"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g
                transform="translate(5 -105)"
                stroke="#FAB818"
                fill="none"
                fillRule="evenodd"
                opacity=".4"
              >
                <path d="M-43 73 93.876 192.954M-35.5 158.5l93.301-21.628" />
              </g>
            </svg>
          </div>
        </div>

        <div className="relative z[1000] pt-[10px] items-center w-[320px] h-[92px]">
          <div className="flex justify-center items-center">
            <span>
              <svg
                className="w-[24px] h-[24px] text-[#FFFFFF]"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                data-t="premium-svg"
                aria-labelledby="premium-svg"
                aria-hidden="true"
                role="img"
                fill="currentColor"
              >
                <title id="premium-svg">{t("premiumOnly")}</title>
                <path d="M18.188 17l1.667-5.606-4.26 1.864L12 7.688l-3.596 5.57-4.259-1.864L5.812 17h12.376zm-14.08 1.285L1.614 9.9a1 1 0 0 1 1.36-1.2l4.673 2.045 3.512-5.442a1 1 0 0 1 1.68 0l3.514 5.442 4.674-2.046a1 1 0 0 1 1.36 1.201l-2.494 8.386a1 1 0 0 1-.959.715H5.067a1 1 0 0 1-.959-.715z"></path>
              </svg>
            </span>
            <h3 className="text-[1.25rem] font-weight-600 mb-[8px] text-[#FFFFFF]">{t("freeTrial")}</h3>
          </div>
          <p className="text-[0.875rem] font-weight-600 text-[#FFFFFF]">
            {t("description")}
          </p>
        </div>
      </a>
    </div>
  );
} 

