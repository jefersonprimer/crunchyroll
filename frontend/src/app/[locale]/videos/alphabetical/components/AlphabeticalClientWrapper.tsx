"use client";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import AlphabeticalClient from "./AlphabeticalClient";

interface Props {
  animes: any[];
  messages: any;
  audioFilter: string;
  activeLetter: string;
}

const AlphabeticalClientWrapper = ({ animes, messages, audioFilter, activeLetter }: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const onLetterChange = useCallback((letter: string) => {
    const params = new URLSearchParams(searchParams?.toString() || "");
    if (letter === "#") {
      params.delete("letter");
    } else {
      params.set("letter", letter);
    }
    router.push(`${pathname}?${params.toString()}`);
  }, [router, pathname, searchParams]);

  return (
    <AlphabeticalClient
      animes={animes}
      messages={messages}
      audioFilter={audioFilter}
      activeLetter={activeLetter}
      onLetterChange={onLetterChange}
    />
  );
};

export default AlphabeticalClientWrapper; 