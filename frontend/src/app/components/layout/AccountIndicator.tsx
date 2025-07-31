'use client';

import { useMultipleAccountsContext } from '@/app/[locale]/contexts/MultipleAccountsContext';
import { useParams } from 'next/navigation';
import Link from 'next/link';

const AccountIndicator: React.FC = () => {
  const { currentAccount } = useMultipleAccountsContext();
  const params = useParams();
  const locale = params.locale as string;

  if (!currentAccount) {
    return null;
  }

  return (
    <div className="flex items-center gap-2">
      <Link 
        href={`/${locale}/profile-selection`}
        className="flex items-center gap-2 text-white hover:text-orange-500 transition-colors duration-200"
        title="Trocar perfil"
      >
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center text-white text-sm font-bold">
          {currentAccount.profile_image_url ? (
            <img
              src={currentAccount.profile_image_url}
              alt={currentAccount.display_name}
              className="w-full h-full rounded-full object-cover"
            />
          ) : (
            currentAccount.display_name.charAt(0).toUpperCase()
          )}
        </div>
        <span className="text-sm font-medium hidden md:block">
          {currentAccount.display_name}
        </span>
      </Link>
    </div>
  );
};

export default AccountIndicator; 