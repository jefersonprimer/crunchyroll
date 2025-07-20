export const extractEpisodeNumber = (title: string): number => {
  const match = title.match(/Episódio (\d+)/i) || title.match(/Ep (\d+)/i);
  return match ? parseInt(match[1], 10) : 0;
};

export const safeJoin = (
  array: any[] | undefined | null,
  separator: string = ", "
) => {
  return array && Array.isArray(array)
    ? array.join(separator)
    : "Não disponível";
};
