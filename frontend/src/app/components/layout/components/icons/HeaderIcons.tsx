interface IconProps {
  className?: string;
}

export const DropdownIcon: React.FC<IconProps> = ({ className }) => (
  <svg
    className={`w-[24px] h-[24px] ml-0 cursor-pointer ${className || ''}`}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    data-t="dropdown-svg"
    aria-labelledby="dropdown-svg"
    aria-hidden="true"
    role="img"
    fill="currentColor"
  >
    <path d="M7 10h10l-5 5z"></path>
  </svg>
);

export const SearchIcon = () => (
  <svg
  className="w-[24px] h-[24px] ml-0 cursor-pointer"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    data-t="search-svg"
    aria-labelledby="search-svg"
    aria-hidden="false"
    role="img"
    fill="currentColor"
  >
    <path d="M15.474 14.035l6.235 6.26a1 1 0 1 1-1.418 1.41l-6.228-6.253a7.5 7.5 0 1 1 1.41-1.418zM9.5 15a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11z"></path>
  </svg>
);

export const WatchlistIcon = () => (
  <svg
    className="w-[24px] h-[24px] ml-0 cursor-pointer"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    data-t="watchlist-svg"
    aria-labelledby="watchlist-svg"
    aria-hidden="false"
    role="img"
    fill="currentColor"
  >
    <path d="M17 18.113l-3.256-2.326A2.989 2.989 0 0 0 12 15.228c-.629 0-1.232.194-1.744.559L7 18.113V4h10v14.113zM18 2H6a1 1 0 0 0-1 1v17.056c0 .209.065.412.187.581a.994.994 0 0 0 1.394.233l4.838-3.455a1 1 0 0 1 1.162 0l4.838 3.455A1 1 0 0 0 19 20.056V3a1 1 0 0 0-1-1z"></path>
  </svg>
);

export const UserIcon = () => (
  <svg
    className="w-[24px] h-[24px] ml-0 cursor-pointer"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    data-t="user-settings-svg"
    aria-labelledby="user-settings-svg"
    aria-hidden="true"
    role="img"
    fill="currentColor"
  >
    <path d="M12 20a6.01 6.01 0 0 1-5.966-5.355L12 12.088l5.966 2.557A6.01 6.01 0 0 1 12 20m0-16c1.654 0 3 1.346 3 3s-1.345 3-2.999 3h-.002A3.003 3.003 0 0 1 9 7c0-1.654 1.346-3 3-3m7.394 9.081l-4.572-1.959A4.997 4.997 0 0 0 17 7c0-2.757-2.243-5-5-5S7 4.243 7 7c0 1.71.865 3.22 2.178 4.122l-4.572 1.959A.999.999 0 0 0 4 14c0 4.411 3.589 8 8 8s8-3.589 8-8c0-.4-.238-.762-.606-.919"></path>
  </svg>
);

export const PremiumIcon = () => (
  <svg 
    className="w-[24px] h-[24px] cursor-pointer"
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    data-t="premium-filled-svg" 
    aria-hidden="true" 
    role="img"
    fill="#FAB818"
  >
    <path fillRule="evenodd" 
    clipRule="evenodd" 
    d="M2 8L8 9L12 3L16 9L22 8L18 19H6L2 8Z">
    </path>
  </svg>
);

export const HamburgerIcon = () => (
  <svg
    className="w-[24px] h-[24px] ml-0 cursor-pointer"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    aria-labelledby="menu-svg"
    aria-hidden="true"
    role="img"
    fill="currentColor"
  >
    <title id="menu-svg">Menu</title>
    <path d="M21 4a1 1 0 0 1 0 2H3a1 1 0 0 1 0-2h18zm0 7a1 1 0 0 1 0 2H3a1 1 0 0 1 0-2h18zm0 7a1 1 0 0 1 0 2H3a1 1 0 0 1 0-2h18z"></path>
  </svg>
); 

