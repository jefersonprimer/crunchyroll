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
        w-[1230px] h-[400px] 
        
       
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
