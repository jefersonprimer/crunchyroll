import React from 'react';

export const EpisodeSearchCardSkeleton: React.FC = () => {
  return (
    <div className="block w-full p-4 bg-[#141519] rounded-lg">
      <div className="flex gap-4">
        {/* Imagem skeleton à esquerda */}
        <div className="flex-shrink-0">
          <div className="w-24 h-16 bg-[#2a2a2a] rounded animate-pulse" />
        </div>

        {/* Conteúdo skeleton à direita */}
        <div className="flex-1 min-w-0">
          {/* Nome do anime skeleton */}
          <div className="mb-1">
            <div className="w-24 h-3 bg-[#2a2a2a] rounded animate-pulse" />
          </div>

          {/* Título do episódio skeleton */}
          <div className="mb-2">
            <div className="w-full h-4 bg-[#2a2a2a] rounded animate-pulse mb-1" />
            <div className="w-3/4 h-4 bg-[#2a2a2a] rounded animate-pulse" />
          </div>

          {/* Informações adicionais skeleton */}
          <div className="flex items-center gap-4">
            <div className="w-16 h-3 bg-[#2a2a2a] rounded animate-pulse" />
            <div className="w-12 h-3 bg-[#2a2a2a] rounded animate-pulse" />
            <div className="w-8 h-3 bg-[#2a2a2a] rounded animate-pulse" />
          </div>

          {/* Sinopse skeleton */}
          <div className="mt-2">
            <div className="w-full h-3 bg-[#2a2a2a] rounded animate-pulse mb-1" />
            <div className="w-2/3 h-3 bg-[#2a2a2a] rounded animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
}; 