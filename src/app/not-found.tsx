"use client";

import React from "react";
import { useRouter } from "next/navigation";

const NotFound: React.FC = () => {
  const router = useRouter();

  const handleGoBack = () => {
    router.push("/");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-center">
      <h1 className="text-6xl text-blue-500 font-bold">404</h1>
      <p className="text-xl text-gray-700 mt-4">Página não encontrada.</p>
      <button
        className="mt-6 px-6 py-3 text-white bg-blue-500 rounded-md hover:bg-blue-600 transition"
        onClick={handleGoBack}
      >
        Voltar para a página inicial
      </button>
    </div>
  );
};

export default NotFound;
