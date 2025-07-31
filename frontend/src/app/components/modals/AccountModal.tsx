import React from 'react';
import Link from 'next/link';
import { useRouter, useParams } from "next/navigation";
import { useTranslations } from 'next-intl';
import { UserProfile } from "@/types/header";

interface AccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  userProfile: UserProfile | null;
}

const AccountModal: React.FC<AccountModalProps> = ({ isOpen, onClose, userProfile }) => {
  const router = useRouter();
  const params = useParams();
  const locale = params.locale as string;
  const t = useTranslations('accountModal');

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 flex justify-center items-start z-[1000]" 
      onClick={onClose}
    >
      <div 
        className="absolute top-[60px] right-[15px] bg-[#141519] py-2 min-w-[350px] animate-[slideDown_0.2s_ease-out]  h-screen z-[1100] overflow-y-auto" 
        onClick={e => e.stopPropagation()}
      >
        {userProfile && (
          <Link href="/profile">
            <div className="flex items-center gap-3 px-4 py-2.5 relative cursor-pointer hover:bg-[#23252B]">
              <img
                key={userProfile.profile_image_url}
                src={userProfile.profile_image_url || '/default-avatar.jpg'}
                alt="Profile"
                className="w-[54px] h-[54px] rounded-full object-cover"
              />
              <span className="text-[20px] font-medium">{userProfile.display_name}</span>
              <svg
                className="w-6 h-6 ml-auto cursor-pointer fill-white"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                data-t="edit-svg"
                aria-labelledby="edit-svg"
                aria-hidden="true"
                role="img"
              >
                <path d="M18.566 6.368l-1.339 1.657-2.833-2.37 1.308-1.57a.994.994 0 0 1 .612-.317.716.716 0 0 1 .568.16l1.532 1.255c.17.148.288.377.317.612a.726.726 0 0 1-.165.573zM5.852 19.087l1.412-4.8.224-.272 2.82 2.338-.215.259-4.24 2.475zm10.26-9.696l-4.674 5.607-2.828-2.343 4.657-5.645 2.845 2.38zm4.368-3.81a2.775 2.775 0 0 0-.927-1.743L18.02 2.583c-1.027-.899-2.697-.743-3.658.357L5.789 13.304a.895.895 0 0 0-.166.312l-2.087 7.101a.881.881 0 0 0 1.29 1.01l6.29-3.67a.894.894 0 0 0 .232-.198l6.489-7.785 2.078-2.572c.452-.517.652-1.2.565-1.92z" />
              </svg>
            </div>
          </Link>
        )}
        <div className="mx-0 p-4 border-b-2 border-[#23252B] w-full box-border">
          <a 
            tabIndex={0} 
            className="block bg-[#FAB818] text-black no-underline py-2.5 px-4 font-medium transition-colors duration-200 text-center hover:bg-[#e0a616]" 
            data-t="upsell-btn" 
            href="https://www.crunchyroll.com/premium?referrer=newweb_organic_acct_menu&return_url=https%3A%2F%2Fwww.crunchyroll.com%2Fpt-br%2F#plans"
          >
            <span className="flex items-center justify-center gap-2 text-sm uppercase font-extrabold">
              <svg 
                className="w-6 h-6 fill-current" 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                data-t="premium-svg" 
                aria-labelledby="premium-svg" 
                aria-hidden="true" 
                role="img"
              >
                <path d="M18.188 17l1.667-5.606-4.26 1.864L12 7.688l-3.596 5.57-4.259-1.864L5.812 17h12.376zm-14.08 1.285L1.614 9.9a1 1 0 0 1 1.36-1.2l4.673 2.045 3.512-5.442a1 1 0 0 1 1.68 0l3.514 5.442 4.674-2.046a1 1 0 0 1 1.36 1.201l-2.494 8.386a1 1 0 0 1-.959.715H5.067a1 1 0 0 1-.959-.715z" />
              </svg>
              {t('freeTrial')}
            </span>
          </a>
        </div>
        <div className="flex flex-col gap-2">
          <div className="mx-0 pb-1.5 border-b-2 border-[#23252B] w-full box-border">
            <Link href={`/${locale}/profile-selection`} className="flex items-center gap-3 py-3 px-4 text-white no-underline border-none bg-transparent w-full text-left cursor-pointer transition-colors duration-200 hover:bg-[rgba(255,255,255,0.1)]">
              <svg className="w-6 h-6 fill-current opacity-80" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" data-t="switch-svg" aria-labelledby="switch-svg" aria-hidden="true" role="img"><path fillRule="evenodd" clipRule="evenodd" d="M17.278 10.95a1 1 0 0 0 1.414 1.414l4.327-4.327a.996.996 0 0 0 .002-1.416l-4.329-4.328a1 1 0 1 0-1.414 1.414L19.9 6.328H9.656a1 1 0 0 0 0 2h10.242l-2.62 2.622ZM7.036 13.707a1 1 0 1 0-1.415-1.414L1.293 16.62a.996.996 0 0 0-.208 1.113.994.994 0 0 0 .215.309l4.321 4.321a1 1 0 0 0 1.415-1.414l-2.622-2.621h9.243a1 1 0 1 0 0-2H4.414l2.622-2.622Z"></path></svg>
              <span className="text-sm">{t('switchProfile')}</span>
            </Link>
            <Link href="/settings" className="flex items-center gap-3 py-3 px-4 text-white no-underline border-none bg-transparent w-full text-left cursor-pointer transition-colors duration-200 hover:bg-[rgba(255,255,255,0.1)]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                className="fill-current opacity-80"
              >
                <path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.07.62-.07.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z" />
              </svg>
              <span className="text-sm">{t('settings')}</span>
            </Link>
          </div>
          <div className="mx-0 pb-1.5 border-b-2 border-[#23252B] w-full box-border">
            <Link href="/watchlist" className="flex items-center gap-3 py-3 px-4 text-white no-underline border-none bg-transparent w-full text-left cursor-pointer transition-colors duration-200 hover:bg-[rgba(255,255,255,0.1)]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                className="fill-current opacity-80"
              >
                <path d="M17 18.113l-3.256-2.326A2.989 2.989 0 0 0 12 15.228c-.629 0-1.232.194-1.744.559L7 18.113V4h10v14.113zM18 2H6a1 1 0 0 0-1 1v17.056c0 .209.065.412.187.581a.994.994 0 0 0 1.394.233l4.838-3.455a1 1 0 0 1 1.162 0l4.838 3.455A1 1 0 0 0 19 20.056V3a1 1 0 0 0-1-1z" />
              </svg>
              <span className="text-sm">{t('queue')}</span>
            </Link>
            <Link href="/watchlist" className="flex items-center gap-3 py-3 px-4 text-white no-underline border-none bg-transparent w-full text-left cursor-pointer transition-colors duration-200 hover:bg-[rgba(255,255,255,0.1)]">
              <svg xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24" data-t="custom-list-svg"
                aria-labelledby="custom-list-svg"
                aria-hidden="true" role="img"
                width="24"
                height="24"
                className="fill-current opacity-80"
              >
                <path d="M22 17v2H6v-2h16zM3 17c.552 0 1 .448 1 1s-.448 1-1 1-1-.448-1-1 .448-1 1-1zm19-6v2H6v-2h16zM3 11c.552 0 1 .448 1 1s-.448 1-1 1-1-.448-1-1 .448-1 1-1zm19-6v2H6V5h16zM3 5c.552 0 1 .448 1 1s-.448 1-1 1-1-.448-1-1 .448-1 1-1z"></path>
              </svg>
              <span className="text-sm">{t('crunchyLists')}</span>
            </Link>
            <Link href="/watchlist" className="flex items-center gap-3 py-3 px-4 text-white no-underline border-none bg-transparent w-full text-left cursor-pointer transition-colors duration-200 hover:bg-[rgba(255,255,255,0.1)]">
              <svg xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24" data-t="history-svg"
                aria-labelledby="history-svg" 
                aria-hidden="true" role="img"
                width="24"
                height="24"
                className="fill-current opacity-80"
              >
                <path d="M11 7a1 1 0 0 1 2 0v5.411l-3.293 3.293a1 1 0 0 1-1.414-1.414L11 11.583V7zm1-5c5.514 0 10 4.486 10 10s-4.486 10-10 10a9.977 9.977 0 0 1-6.667-2.547 1 1 0 1 1 1.334-1.49A7.986 7.986 0 0 0 12 20c4.411 0 8-3.589 8-8s-3.589-8-8-8c-4.072 0-7.436 3.06-7.931 7H6l-3 3-3-3h2.051C2.554 5.954 6.823 2 12 2z"></path>
              </svg>
              <span className="text-sm">{t('history')}</span>
            </Link>
          </div>
          <div className="mx-0 pb-1.5 border-b-2 border-[#23252B] w-full box-border">
            <Link href="/watchlist" className="flex items-center gap-3 py-3 px-4 text-white no-underline border-none bg-transparent w-full text-left cursor-pointer transition-colors duration-200 hover:bg-[rgba(255,255,255,0.1)]">
              <svg xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" data-t="notification-svg" 
                aria-labelledby="notification-svg" 
                aria-hidden="true" 
                role="img"
                width="24"
                height="24"
                className="fill-current opacity-80"
              >
                <path d="M4.382 18L6 15.274V11c0-4.252 2.355-7 6-7s6 2.748 6 7v4.274L19.62 18H4.382zM12 21a1.993 1.993 0 0 1-1.722-1h3.444c-.347.595-.985 1-1.722 1zm9.806-3.234L20 14.726V11c0-5.299-3.29-9-8-9s-8 3.701-8 9v3.726L2.16 17.829a1.488 1.488 0 0 0 .066 1.459A1.49 1.49 0 0 0 3.502 20h4.64c.448 1.721 2 3 3.859 3s3.41-1.279 3.859-3h4.64c.525 0 1.002-.267 1.278-.713.275-.446.298-.992.029-1.521z"></path>
              </svg> 
              <span className="text-sm">{t('notifications')}</span>
            </Link>
            <Link href="/watchlist" className="flex items-center gap-3 py-3 px-4 text-white no-underline border-none bg-transparent w-full text-left cursor-pointer transition-colors duration-200 hover:bg-[rgba(255,255,255,0.1)]">
              <svg xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 40 40" data-t="gift-svg" 
                aria-labelledby="gift-svg" 
                aria-hidden="true" 
                role="img"
                width="24"
                height="24"
                className="fill-current opacity-80"
              >
                <path d="M13.963 3c2.827 0 4.882.872 6.044 2.95 1.118-2.003 3.069-2.886 5.742-2.947l.3-.003h.256c1.311.007 2.294.105 3.328.465 1.906.662 3.267 2.148 3.362 4.294L33 8v.295l-.003.286c-.021 1.321-.26 2.471-.748 3.419H37v10l-3.001-.001L34 37H6l-.001-15.001L3 22V12h4.763c-.488-.948-.727-2.098-.748-3.419l-.003-.286V8c0-2.276 1.39-3.848 3.367-4.535 1.034-.36 2.017-.458 3.328-.465h.256zM18.5 21.999 8.999 22v12l9.501-.001v-12zM30.999 22l-9.499-.001v12l9.499.001V22zm-17.062-7.001L6 15v4l12.5-.001V15h-4.488l-.075-.001zM34 15l-7.926-.001L26 15h-4.5v3.999L34 19v-4zm-7.578-8.998h-.611c-2.728.059-3.505 1.165-3.72 3.485l-.018.221-.026.413-.018.435-.01.458-.007.986H26c2.842 0 3.665-1.006 3.903-2.308l.021-.127.032-.25.022-.257.013-.26.006-.265L30 8c0-1.52-1.55-1.885-2.852-1.972l-.144-.009-.3-.012-.282-.005zm-12.833 0-.282.005-.3.012c-1.328.071-2.995.405-2.995 1.981l.003.533.006.264.013.261.022.256.032.251c.208 1.363.99 2.435 3.924 2.435H18l-.007-.986-.01-.458-.018-.435-.026-.413c-.187-2.471-.925-3.645-3.738-3.706h-.612z"></path>
              </svg>
              <span className="text-sm">{t('giftCard')}</span>
            </Link>
          </div>
          <button 
            className="flex items-center gap-3 py-3 px-4 text-white no-underline border-none bg-transparent w-full text-left cursor-pointer transition-colors duration-200 hover:bg-[rgba(255,255,255,0.1)]"
            onClick={() => {
              try {
                // Remove token from cookies only (consistent with useAuth)
                document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
                
                // Clear any remaining auth state
                sessionStorage.clear();
                
                // Dispatch auth event
                window.dispatchEvent(new Event('auth-state-changed'));
                
                // Close modal
                onClose();
                
                // Navigate to login using window.location for a full page reload
                window.location.href = `/${locale}/login`;
              } catch (error) {
                console.error('Error during logout:', error);
                // Fallback to direct navigation
                window.location.href = `/${locale}/login`;
              }
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" 
              data-t="sign-out-svg" 
              aria-labelledby="sign-out-svg" 
              aria-hidden="true" 
              role="img"
              width="24"
              height="24"
              className="fill-current opacity-80"
            >
              <path d="M15 15a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v5a1 1 0 1 1-2 0V4H6v16h8v-4a1 1 0 0 1 1-1zm8.923-2.618a1 1 0 0 1-.217.326l-4 3.999A.993.993 0 0 1 19 17a.999.999 0 0 1-.707-1.707L20.586 13H15a1 1 0 0 1 0-2h5.586l-2.293-2.293a.999.999 0 1 1 1.414-1.414l3.999 4a.992.992 0 0 1 .217 1.089z"></path>
            </svg>
            <span className="text-sm">{t('signOut')}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccountModal;