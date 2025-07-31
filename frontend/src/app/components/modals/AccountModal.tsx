import React, { useEffect } from 'react';
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

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 flex justify-center items-start z-[1000]" 
      onClick={onClose}
    >
      <div 
        className="absolute top-[60px] right-0 bg-[#141519] py-3 w-[388px] h-[619px] animate-[slideDown_0.2s_ease-out] z-[1100] overflow-y-auto" 
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
          <Link
            tabIndex={0} 
            className="block bg-[#FAB818] text-black no-underline py-2.5 px-4 font-medium transition-colors duration-200 text-center hover:bg-[#e0a616]" 
            data-t="upsell-btn" 
            href="https://www.crunchyroll.com/premium?referrer=newweb_organic_acct_menu&return_url=https%3A%2F%2Fwww.crunchyroll.com%2Fpt-br%2F#plans"
          >
            <span className="flex items-center justify-center gap-2">
              <svg 
                className="w-6 h-6" 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                data-t="premium-svg" 
                aria-labelledby="premium-svg" 
                aria-hidden="true" 
                role="img"
                fill="currentColor"
              >
                <path d="M18.188 17l1.667-5.606-4.26 1.864L12 7.688l-3.596 5.57-4.259-1.864L5.812 17h12.376zm-14.08 1.285L1.614 9.9a1 1 0 0 1 1.36-1.2l4.673 2.045 3.512-5.442a1 1 0 0 1 1.68 0l3.514 5.442 4.674-2.046a1 1 0 0 1 1.36 1.201l-2.494 8.386a1 1 0 0 1-.959.715H5.067a1 1 0 0 1-.959-.715z" />
              </svg>
              <span className="font-extrabold text-sm uppercase">{t('freeTrial')}</span>
            </span>
          </Link>
        </div>
        <div className="flex flex-col">
          <div className="border-b-2 border-[#23252B] w-full box-border py-3">
            <Link href={`/${locale}/profile-selection`} 
              className="flex items-center gap-3 py-3.5 px-4 text-[#DADADA] hover:text-white no-underline border-none bg-transparent w-full text-left cursor-pointer transition-colors duration-200 hover:bg-[#23252B]">
            <svg 
              className="w-6 h-6"
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" 
              data-t="switch-svg" 
              aria-hidden="true" 
              role="img"
              fill="currentColor"
            >
              <path fillRule="evenodd" clipRule="evenodd" d="M17.278 10.95a1 1 0 0 0 1.414 1.414l4.327-4.327a.996.996 0 0 0 .002-1.416l-4.329-4.328a1 1 0 1 0-1.414 1.414L19.9 6.328H9.656a1 1 0 0 0 0 2h10.242l-2.62 2.622ZM7.036 13.707a1 1 0 1 0-1.415-1.414L1.293 16.62a.996.996 0 0 0-.208 1.113.994.994 0 0 0 .215.309l4.321 4.321a1 1 0 0 0 1.415-1.414l-2.622-2.621h9.243a1 1 0 1 0 0-2H4.414l2.622-2.622Z">
              </path>
            </svg>
              <span className="text-base font-medium">{t('switchProfile')}</span>
            </Link>
            <Link href={`/${locale}/account/preferences`} 
              className="flex items-center gap-3 py-3.5 px-4 text-[#DADADA] hover:text-white no-underline border-none bg-transparent w-full text-left cursor-pointer transition-colors duration-200 hover:bg-[#23252B]">
              <svg 
                className="w-6 h-6"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24" 
                data-t="settings-svg" 
                aria-hidden="true" 
                role="img"
                fill="currentColor"
              >
                <path d="M12,15.2 C10.2331429,15.2 8.8,13.7668571 8.8,12 C8.8,10.2331429 10.2331429,8.8 12,8.8 C13.7668571,8.8 15.2,10.2331429 15.2,12 C15.2,13.7668571 13.7668571,15.2 12,15.2 L12,15.2 Z M19.9691429,11.5005714 C19.9691429,11.3542857 19.9108571,11.224 19.7965714,11.1097143 C19.6822857,10.9954286 19.5622857,10.928 19.4377143,10.9062857 L18.344,10.7497143 C18.0102857,10.7085714 17.792,10.5314286 17.688,10.2182857 L17.2811429,9.21828571 C17.1348571,8.928 17.1565714,8.64571429 17.344,8.37485714 L18.0308571,7.50057143 C18.2182857,7.22971429 18.208,6.96914286 18,6.71885714 L17.2502857,6 C17.0205714,5.792 16.7702857,5.78171429 16.4994286,5.96914286 L15.6251429,6.62514286 C15.3542857,6.83314286 15.072,6.86514286 14.7817143,6.71885714 L13.7817143,6.312 C13.656,6.27085714 13.536,6.18285714 13.4217143,6.04685714 C13.3062857,5.912 13.2502857,5.78171429 13.2502857,5.656 L13.0937143,4.56228571 C13.072,4.43771429 13.0045714,4.31771429 12.8902857,4.20342857 C12.776,4.08914286 12.6457143,4.03085714 12.4994286,4.03085714 C12.3954286,4.01028571 12.2285714,4 12,4 L11.5005714,4.03085714 C11.3542857,4.03085714 11.224,4.08914286 11.1097143,4.20342857 C10.9942857,4.31771429 10.9268571,4.43771429 10.9062857,4.56228571 L10.7497143,5.656 C10.7085714,5.98971429 10.5314286,6.208 10.2194286,6.312 L9.21942857,6.71885714 C8.92685714,6.86514286 8.64571429,6.83314286 8.37485714,6.62514286 L7.50057143,5.96914286 C7.22971429,5.78171429 6.96914286,5.792 6.71885714,6 L6,6.71885714 C5.792,6.96914286 5.78171429,7.22971429 5.96914286,7.50057143 L6.62514286,8.37485714 C6.83314286,8.64685714 6.864,8.928 6.71885714,9.21942857 L6.312,10.2194286 C6.27085714,10.344 6.18171429,10.464 6.04685714,10.5782857 C5.91085714,10.6937143 5.78171429,10.7497143 5.656,10.7497143 L4.56228571,10.9062857 C4.43771429,10.928 4.31771429,10.9954286 4.20342857,11.1097143 C4.088,11.224 4.03085714,11.3542857 4.03085714,11.5005714 C4.01028571,11.6045714 4,11.7714286 4,12 L4.03085714,12.4994286 C4.03085714,12.6457143 4.088,12.776 4.20342857,12.8902857 C4.31771429,13.0057143 4.43771429,13.0731429 4.56228571,13.0937143 L5.656,13.2502857 C5.78171429,13.2502857 5.91085714,13.3074286 6.04685714,13.4217143 C6.18171429,13.5371429 6.27085714,13.656 6.312,13.7817143 L6.71885714,14.7817143 C6.864,15.0731429 6.83314286,15.3542857 6.62514286,15.6251429 L5.96914286,16.5005714 C5.78171429,16.7714286 5.76,16.9897143 5.90628571,17.1565714 C5.92685714,17.1771429 5.95314286,17.208 5.984,17.2502857 C6.016,17.2914286 6.05142857,17.3382857 6.09371429,17.3908571 C6.13485714,17.4422857 6.17714286,17.4902857 6.21828571,17.5314286 C6.26057143,17.5737143 6.30171429,17.6148571 6.344,17.656 C6.38514286,17.6982857 6.42628571,17.7394286 6.46857143,17.7817143 C6.50971429,17.8228571 6.552,17.8548571 6.59428571,17.8742857 C6.67657143,17.9588571 6.81714286,18.0205714 7.016,18.0628571 C7.21371429,18.104 7.37485714,18.0937143 7.50057143,18.0308571 L8.37485714,17.3748571 C8.64571429,17.1668571 8.92685714,17.136 9.21828571,17.2811429 L10.2182857,17.688 C10.344,17.7291429 10.464,17.8182857 10.5782857,17.9531429 C10.6925714,18.0891429 10.7497143,18.2182857 10.7497143,18.344 L10.9062857,19.4377143 C10.9268571,19.5622857 10.9942857,19.6822857 11.1097143,19.7965714 C11.224,19.9108571 11.3542857,19.968 11.4994286,19.968 C11.6034286,19.9897143 11.7702857,20 12,20 L12.4994286,19.9691429 C12.6457143,19.9691429 12.776,19.9108571 12.8902857,19.7965714 C13.0045714,19.6822857 13.072,19.5622857 13.0937143,19.4377143 L13.2502857,18.344 C13.2502857,18.2182857 13.3074286,18.0891429 13.4217143,17.9531429 C13.536,17.8182857 13.656,17.7291429 13.7817143,17.688 L14.7817143,17.2811429 C15.0731429,17.136 15.3542857,17.1668571 15.6251429,17.3748571 L16.5005714,18.0308571 C16.7702857,18.2182857 17.0308571,18.208 17.2811429,18 L18,17.2811429 C18.208,17.0308571 18.2182857,16.7714286 18.032,16.4994286 L17.344,15.6251429 C17.1565714,15.3542857 17.136,15.0731429 17.2811429,14.7817143 L17.688,13.7817143 C17.792,13.4685714 18.0102857,13.2914286 18.344,13.2502857 L19.4377143,13.0937143 C19.5622857,13.0731429 19.6822857,13.0057143 19.7965714,12.8902857 C19.9108571,12.776 19.9691429,12.6457143 19.9691429,12.4994286 C19.9897143,12.3965714 20,12.2297143 20,12 L19.9691429,11.5005714 Z">
                </path>
              </svg>
              <span className="text-base font-medium">{t('settings')}</span>
            </Link>
          </div>

          
          <div className="border-b-2 border-[#23252B] w-full box-border py-3">
            <Link href={`/${locale}/watchlist`} 
              className="flex items-center gap-3 py-3.5 px-4 text-[#DADADA] hover:text-white no-underline border-none bg-transparent w-full text-left cursor-pointer transition-colors duration-200 hover:bg-[#23252B]">
              <svg
                className="w-6 h-6"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                fill="currentColor"
              >
                <path d="M17 18.113l-3.256-2.326A2.989 2.989 0 0 0 12 15.228c-.629 0-1.232.194-1.744.559L7 18.113V4h10v14.113zM18 2H6a1 1 0 0 0-1 1v17.056c0 .209.065.412.187.581a.994.994 0 0 0 1.394.233l4.838-3.455a1 1 0 0 1 1.162 0l4.838 3.455A1 1 0 0 0 19 20.056V3a1 1 0 0 0-1-1z" />
              </svg>
              <span className="text-base font-medium">{t('queue')}</span>
            </Link>

            <Link href={`/${locale}/crunchylists`} className="flex items-center gap-3 py-3.5 px-4 text-[#DADADA] hover:text-white no-underline border-none bg-transparent w-full text-left cursor-pointer transition-colors duration-200 hover:bg-[#23252B]">
              <svg 
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                viewBox="0 0 24 24" data-t="custom-list-svg"
                aria-labelledby="custom-list-svg"
                aria-hidden="true" role="img"
                width="24"
                height="24"
                fill="currentColor"
              >
                <path d="M22 17v2H6v-2h16zM3 17c.552 0 1 .448 1 1s-.448 1-1 1-1-.448-1-1 .448-1 1-1zm19-6v2H6v-2h16zM3 11c.552 0 1 .448 1 1s-.448 1-1 1-1-.448-1-1 .448-1 1-1zm19-6v2H6V5h16zM3 5c.552 0 1 .448 1 1s-.448 1-1 1-1-.448-1-1 .448-1 1-1z"></path>
              </svg>
              <span className="text-base font-medium">{t('crunchyLists')}</span>
            </Link>

            <Link href={`/${locale}/history`} className="flex items-center gap-3 py-3.5 px-4 text-[#DADADA] hover:text-white no-underline border-none bg-transparent w-full text-left cursor-pointer transition-colors duration-200 hover:bg-[#23252B]">
              <svg 
                className="w-6 h-6"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24" data-t="history-svg"
                aria-labelledby="history-svg" 
                aria-hidden="true" role="img"
                width="24"
                height="24"
                fill="currentColor"
              >
                <path d="M11 7a1 1 0 0 1 2 0v5.411l-3.293 3.293a1 1 0 0 1-1.414-1.414L11 11.583V7zm1-5c5.514 0 10 4.486 10 10s-4.486 10-10 10a9.977 9.977 0 0 1-6.667-2.547 1 1 0 1 1 1.334-1.49A7.986 7.986 0 0 0 12 20c4.411 0 8-3.589 8-8s-3.589-8-8-8c-4.072 0-7.436 3.06-7.931 7H6l-3 3-3-3h2.051C2.554 5.954 6.823 2 12 2z"></path>
              </svg>
              <span className="text-base font-medium">{t('history')}</span>
            </Link>
          </div>

          <div className="w-full box-border py-3">
            <Link href={`/${locale}/notifications`} className="flex items-center gap-3 py-3.5 px-4 text-[#DADADA] hover:text-white no-underline border-none bg-transparent w-full text-left cursor-pointer transition-colors duration-200 hover:bg-[#23252B]">
              <svg xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" data-t="notification-svg" 
                aria-labelledby="notification-svg" 
                aria-hidden="true" 
                role="img"
                width="24"
                height="24"
                className="w-6 h-6"
                fill="currentColor"
              >
                <path d="M4.382 18L6 15.274V11c0-4.252 2.355-7 6-7s6 2.748 6 7v4.274L19.62 18H4.382zM12 21a1.993 1.993 0 0 1-1.722-1h3.444c-.347.595-.985 1-1.722 1zm9.806-3.234L20 14.726V11c0-5.299-3.29-9-8-9s-8 3.701-8 9v3.726L2.16 17.829a1.488 1.488 0 0 0 .066 1.459A1.49 1.49 0 0 0 3.502 20h4.64c.448 1.721 2 3 3.859 3s3.41-1.279 3.859-3h4.64c.525 0 1.002-.267 1.278-.713.275-.446.298-.992.029-1.521z"></path>
              </svg> 
              <span className="text-base font-medium">{t('notifications')}</span>
            </Link>
            
            <Link href={`/${locale}/redeem`} 
              className="flex flex-col gap-3 py-3.5 px-4 text-[#DADADA] hover:text-white no-underline border-none bg-transparent w-full text-left cursor-pointer transition-colors duration-200 hover:bg-[#23252B]">
              <div className="flex text-left gap-3">
                <svg 
                  className="w-6 h-6"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 40 40" data-t="gift-svg"
                  aria-labelledby="gift-svg"
                  aria-hidden="true"
                  role="img"
                  width="24"
                  height="24"
                  fill="currentColor"
                >
                  <path d="M13.963 3c2.827 0 4.882.872 6.044 2.95 1.118-2.003 3.069-2.886 5.742-2.947l.3-.003h.256c1.311.007 2.294.105 3.328.465 1.906.662 3.267 2.148 3.362 4.294L33 8v.295l-.003.286c-.021 1.321-.26 2.471-.748 3.419H37v10l-3.001-.001L34 37H6l-.001-15.001L3 22V12h4.763c-.488-.948-.727-2.098-.748-3.419l-.003-.286V8c0-2.276 1.39-3.848 3.367-4.535 1.034-.36 2.017-.458 3.328-.465h.256zM18.5 21.999 8.999 22v12l9.501-.001v-12zM30.999 22l-9.499-.001v12l9.499.001V22zm-17.062-7.001L6 15v4l12.5-.001V15h-4.488l-.075-.001zM34 15l-7.926-.001L26 15h-4.5v3.999L34 19v-4zm-7.578-8.998h-.611c-2.728.059-3.505 1.165-3.72 3.485l-.018.221-.026.413-.018.435-.01.458-.007.986H26c2.842 0 3.665-1.006 3.903-2.308l.021-.127.032-.25.022-.257.013-.26.006-.265L30 8c0-1.52-1.55-1.885-2.852-1.972l-.144-.009-.3-.012-.282-.005zm-12.833 0-.282.005-.3.012c-1.328.071-2.995.405-2.995 1.981l.003.533.006.264.013.261.022.256.032.251c.208 1.363.99 2.435 3.924 2.435H18l-.007-.986-.01-.458-.018-.435-.026-.413c-.187-2.471-.925-3.645-3.738-3.706h-.612z"></path>
                </svg>
                <div className="flex flex-col">
                  <span className="text-base font-medium">{t('giftCard')}</span>
                  <p className="text-sm text-[#A0A0A] font-medium">Você um Cartão de Presente? Resgate Aqui.</p>
                </div>
              </div>
            </Link>
          </div>
        </div>
        
        <div className="sticky -bottom-4 bg-[#141519] border-t-2 border-[#23252B] py-3 z-60 w-full h-auto">
          <button 
            className="flex items-center gap-3 py-3.5 px-4 text-[#DADADA] hover:text-white no-underline border-none bg-transparent w-full text-left cursor-pointer transition-colors duration-200 hover:bg-[#23252B]"
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
            <svg 
              className="w-6 h-6"
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" 
              data-t="sign-out-svg" 
              aria-labelledby="sign-out-svg" 
              aria-hidden="true" 
              role="img"
              width="24"
              height="24"
              fill="currentColor"
            >
              <path d="M15 15a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v5a1 1 0 1 1-2 0V4H6v16h8v-4a1 1 0 0 1 1-1zm8.923-2.618a1 1 0 0 1-.217.326l-4 3.999A.993.993 0 0 1 19 17a.999.999 0 0 1-.707-1.707L20.586 13H15a1 1 0 0 1 0-2h5.586l-2.293-2.293a.999.999 0 1 1 1.414-1.414l3.999 4a.992.992 0 0 1 .217 1.089z"></path>
            </svg>
            <span className="text-base font-medium">{t('signOut')}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccountModal;