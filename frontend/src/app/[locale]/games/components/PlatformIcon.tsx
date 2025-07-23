// src/components/game-cards/PlatformIcon.tsx
import React from 'react';

type PlatformType = 'apple' | 'play';

interface PlatformIconProps {
  platform: PlatformType;
  link: string;
}

const AppleIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="w-6 h-6 fill-current text-gray-400 group-hover:text-white transition-colors duration-200">
    <title>Apple Store</title>
    <path d="M19.9494 8.81868C19.8334 8.90869 17.7851 10.0628 17.7851 12.6291C17.7851 15.5974 20.3914 16.6475 20.4695 16.6735C20.4575 16.7375 20.0554 18.1116 19.0953 19.5118C18.2392 20.7439 17.3451 21.974 15.9849 21.974C14.6248 21.974 14.2747 21.1839 12.7045 21.1839C11.1744 21.1839 10.6303 22 9.38616 22C8.14201 22 7.27391 20.8599 6.27579 19.4597C5.11966 17.8156 4.18555 15.2613 4.18555 12.8371C4.18555 8.94869 6.71384 6.88649 9.20214 6.88649C10.5243 6.88649 11.6264 7.75458 12.4565 7.75458C13.2466 7.75458 14.4788 6.83448 15.9829 6.83448C16.553 6.83448 18.6012 6.88649 19.9494 8.81868ZM15.2688 5.18832C15.8909 4.45024 16.331 3.42614 16.331 2.40204C16.331 2.26003 16.319 2.11601 16.293 2C15.2808 2.038 14.0767 2.67407 13.3506 3.51615C12.7806 4.16422 12.2485 5.18832 12.2485 6.22642C12.2485 6.38244 12.2745 6.53845 12.2865 6.58846C12.3505 6.60046 12.4545 6.61446 12.5585 6.61446C13.4666 6.61446 14.6088 6.0064 15.2688 5.18832Z"></path>
  </svg>
);

const PlayIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" className="w-6 h-6 fill-current text-gray-400 group-hover:text-white transition-colors duration-200">
    <title>Play Store</title>
    <path d="M4.50972 2.01344C4.88103 1.96523 5.25755 2.0476 5.57482 2.24644L16.3923 8.39588L13.6547 11.1669L4.50972 2.01344ZM3.6776 2.84557C3.62543 3.02673 3.6002 3.21459 3.60271 3.4031V20.5949C3.6002 20.7834 3.62543 20.9713 3.6776 21.1524L12.8309 11.999L3.6776 2.84557ZM13.663 12.8311L4.50972 21.9846C4.8812 22.0371 5.25922 21.9544 5.57482 21.7516L16.3923 15.6021L13.663 12.8311ZM20.7526 10.8839L17.4741 9.01998L14.4785 11.999L17.4658 14.9863L20.7443 13.1224C21.826 12.5066 21.826 11.4914 20.7443 10.8756L20.7526 10.8839Z"></path>
  </svg>
);

const PlatformIcon: React.FC<PlatformIconProps> = ({ platform, link }) => {
  return (
    <a
      tabIndex={0}
      className="group flex items-center justify-center p-1 rounded-full hover:bg-gray-700 transition-colors duration-200"
      target="_blank" // Abrir em nova aba
      rel="noopener noreferrer" // Segurança
      aria-label={`Link to ${platform === 'apple' ? 'Apple' : 'Google Play'} download`}
      href={link}
    >
      <span className="sr-only">Available on: </span>
      {platform === 'apple' ? <AppleIcon /> : <PlayIcon />}
    </a>
  );
};

export default PlatformIcon;