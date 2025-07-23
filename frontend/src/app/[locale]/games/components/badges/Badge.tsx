// src/components/badges/Badge.tsx
import React from 'react';

// Icone SVG para o badge Premium
const PremiumBadgeIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="11" height="14" viewBox="0 0 11 14" aria-hidden="true" className="inline-block align-middle mr-0.5">
    <path d="M10.6047 7.02357C8.6314 6.62476 8.4514 5.5467 8.19521 2.92326C8.17444 2.6927 7.95982 2.51196 7.69672 2.51196C7.43361 2.51196 7.22592 2.68646 7.19822 2.92326C6.94897 5.5467 6.76204 6.62476 4.78875 7.02357C4.56026 7.06719 4.39404 7.25411 4.39404 7.46598C4.39404 7.67785 4.55334 7.85857 4.78875 7.90842C6.76204 8.30724 6.94204 9.38529 7.19822 12.0087C7.219 12.2393 7.43361 12.42 7.69672 12.42C7.95982 12.42 8.16752 12.2455 8.19521 12.0087C8.44447 9.38529 8.6314 8.30724 10.6047 7.90842C10.8332 7.8648 10.9994 7.67785 10.9994 7.46598C10.9994 7.25411 10.8401 7.07342 10.6047 7.02357Z" fill="#ff640a"></path><path d="M3.84096 9.85952C2.70639 9.57799 2.60155 8.80776 2.45377 6.93265C2.43947 6.76798 2.32024 6.6405 2.1677 6.6405C2.01515 6.6405 1.89598 6.76798 1.88168 6.93265C1.73867 8.80245 1.63378 9.57268 0.494437 9.85952C0.360958 9.89139 0.265625 10.0242 0.265625 10.1729C0.265625 10.3216 0.360958 10.4545 0.494437 10.4863C1.62901 10.7679 1.7339 11.5381 1.88168 13.4132C1.89598 13.5779 2.01515 13.7053 2.1677 13.7053C2.32024 13.7053 2.43947 13.5779 2.45377 13.4132C2.59678 11.5434 2.70162 10.7732 3.84096 10.4863C3.97444 10.4545 4.06977 10.3216 4.06977 10.1729C4.06977 10.0242 3.97444 9.89139 3.84096 9.85952Z" fill="#ff640a"></path><path d="M4.9758 2.98059C3.92735 2.78447 3.83048 2.24791 3.69391 0.941676C3.6807 0.826964 3.57052 0.738159 3.42956 0.738159C3.28859 0.738159 3.17847 0.826964 3.16525 0.941676C3.0331 2.24421 2.93617 2.78077 1.88332 2.98059C1.75997 3.00279 1.67188 3.09529 1.67188 3.1989C1.67188 3.30251 1.75997 3.39503 1.88332 3.41724C2.93176 3.61336 3.02869 4.14992 3.16525 5.45615C3.17847 5.57086 3.28859 5.65967 3.42956 5.65967C3.57052 5.65967 3.6807 5.57086 3.69391 5.45615C3.82607 4.15362 3.92295 3.61706 4.9758 3.41724C5.09914 3.39503 5.18724 3.30251 5.18724 3.1989C5.18724 3.09529 5.09914 3.00279 4.9758 2.98059Z" fill="#ff640a"></path>
  </svg>
);

export type BadgeType = "premium" | "new" | "preregistration";

interface BadgeProps {
  type: BadgeType;
  children: React.ReactNode;
}

const Badge: React.FC<BadgeProps> = ({ type, children }) => {
  const baseClasses = "inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full";
  let specificClasses = "";
  let icon = null;

  switch (type) {
    case "premium":
      specificClasses = "bg-orange-500 text-white";
      icon = <PremiumBadgeIcon />;
      break;
    case "new":
      specificClasses = "bg-blue-500 text-white";
      break;
    case "preregistration":
      specificClasses = "bg-purple-500 text-white";
      break;
    default:
      specificClasses = "bg-gray-500 text-white";
  }

  return (
    <span className={`${baseClasses} ${specificClasses}`}>
      {icon}
      {children}
    </span>
  );
};

export default Badge;