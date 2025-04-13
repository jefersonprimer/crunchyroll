import React from "react";

interface MaturityRatingProps {
  rating: number;
}

const MaturityRating: React.FC<MaturityRatingProps> = ({ rating }) => {
  let maturityText = "";
  let backgroundColor = "";

  // Definindo o texto e a cor de fundo de acordo com a classificação
  switch (rating) {
    case 10:
      maturityText = "A10";
      backgroundColor = "bg-[#00BFFF]"; // Azul claro para A10
      break;
    case 12:
      maturityText = "A12";
      backgroundColor = "bg-[#FFD700]"; // Amarelo dourado para A12
      break;
    case 14:
      maturityText = "A14";
      backgroundColor = "bg-[#FFA500]"; // Laranja para A14
      break;
    case 16:
      maturityText = "A16";
      backgroundColor = "bg-[#FF8C00]"; // Laranja mais intenso para A16
      break;
    case 18:
      maturityText = "A18";
      backgroundColor = "bg-[#FF0000]"; // Vermelho para A18
      break;
    default:
      maturityText = "Classificação Indisponível";
      backgroundColor = "bg-[#D3D3D3]"; // Cinza para classificações desconhecidas
  }

  return (
    <span
      className={`inline-flex border border-white rounded-[1px] text-white text-[10px] px-[1px] text-center items-center justify-center tracking-[-1px] w-auto h-auto scale-x-[0.9] scale-y-[1.2] origin-center ${backgroundColor}`}
    >
      {maturityText}
    </span>
  );
};

export default MaturityRating;
