import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useOnScreen } from "@/app/[locale]/hooks/useOnScreen";

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
  const { ref, isIntersecting } = useOnScreen({ threshold: 0.1 });
  const [showImage, setShowImage] = React.useState(false);

  React.useEffect(() => {
    if (isIntersecting) {
      const timeout = setTimeout(() => setShowImage(true), 500);
      return () => clearTimeout(timeout);
    }
  }, [isIntersecting]);

  return (
    <div ref={ref} className="block relative w-[1230px] h-[400px] overflow-hidden no-underline">
      <Link
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full h-full block"
      >
        {showImage ? (
          <Image
            src={imageUrl}
            alt={altText}
            className="w-full h-full object-cover"
            fill
          />
        ) : (
          <div className="w-full h-full bg-[#141519] animate-pulse" />
        )}
      </Link>
    </div>
  );
};

export default OutdoorCard;


