import React from "react";
import Link from "next/link";
import Image from "next/image";

interface OutdoorCardProps {
  link: string;
  imageUrl: string;
  altText?: string;
}

const OutdoorCard: React.FC<OutdoorCardProps> = ({
  link,
  imageUrl,
  altText = "Outdoor do Anime",
}) => {
  return (
    <Link
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="block relative 
        w-[1350px] h-[450px] 
        max-[1536px]:w-[1200px] max-[1536px]:h-[400px]
        max-[1280px]:w-[1000px] max-[1280px]:h-[350px]
        max-[1024px]:w-[800px] max-[1024px]:h-[300px]
        max-[768px]:w-[600px] max-[768px]:h-[250px]
        max-[640px]:w-[371px] max-[640px]:h-[166px]
        overflow-hidden no-underline"
    >
      <Image
        src={imageUrl}
        alt={altText}
        className="w-full h-full object-cover"
        fill
      />
    </Link>
  );
};

export default OutdoorCard;
