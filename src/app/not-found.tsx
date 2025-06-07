"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import HeaderSecundary from "./components/layout/HeaderSecundary";
import FooterSecundary from "./components/layout/FooterSecundary";

const NotFound: React.FC = () => {
  const router = useRouter();

  const handleGoBack = () => {
    router.push("/");
  };

  return (
    <>
      <HeaderSecundary />
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#000000]">
        <div className="w-full max-w-6xl mx-auto p-8">
          <div className="bg-[#000000] rounded-lg shadow-lg p-8 flex items-center gap-12">
            <img 
              className="w-[425px] h-[413px] object-contain" 
              src="https://www.crunchyroll.com/build/assets/img/yuzu-bucket.png" 
              alt="Yuzu."
            />
            <div className="flex-1 space-y-4">
              <h3 className="text-[2rem] font-weight-700 text-[#FFFFFF]">
                404 - Página Não Encontrada
              </h3>
              <p className="text-[1rem] text-[#FFFFFF]">
                O Yuzu disse que não tem nada aqui!
              </p>
              <Link href="/">
                <button
                  onClick={handleGoBack}
                  className="cursor-pointer px-4 py-2 font-bold text-[0.8rem] bg-orange-600 text-[#000000] hover:bg-[#FF640A] transition-colors duration-200 text-lg"
                >
                  ME LEVE EMBORA
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <FooterSecundary/>
    </>
  );
};

export default NotFound;
