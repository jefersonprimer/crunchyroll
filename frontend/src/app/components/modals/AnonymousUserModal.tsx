'use client';

import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';

interface AnonymousUserModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AnonymousUserModal({ isOpen, onClose }: AnonymousUserModalProps) {
  const params = useParams();
  const locale = params.locale as string;
  const t = useTranslations('anonymousUserModal');

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[1000] flex justify-end items-start"
      onClick={onClose}
    >
      <div
        className="bg-[#141519] mt-[60px] mr-[15px] w-[360px] py-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-full">
          <div className="max-h-[calc(100vh-120px)] overflow-y-auto">
            <div className="mb-4 last:mb-0">
              <a
                href={`/${locale}/register`}
                className="block p-3 text-white no-underline transition-colors hover:bg-white/10"
                tabIndex={0}
              >
                <div className="flex flex-col gap-1">
                  <h5 className="text-base font-semibold m-0">{t('createAccount.title')}</h5>
                  <div className="text-sm text-gray-400">
                    <p className="m-0">{t('createAccount.description')}</p>
                  </div>
                </div>
              </a>

              <a
                href={`/${locale}/login`}
                className="block p-3 text-white no-underline transition-colors hover:bg-white/10"
                tabIndex={0}
              >
                <div className="flex flex-col gap-1">
                  <h5 className="text-base font-semibold m-0">{t('login.title')}</h5>
                  <div className="text-sm text-gray-400">
                    <p className="m-0">{t('login.description')}</p>
                  </div>
                </div>
              </a>

              <a
                href={`/${locale}/redeem`}
                className="block p-3 text-white no-underline transition-colors hover:bg-white/10"
                tabIndex={0}
              >
                <div className="flex flex-col gap-1">
                  <h5 className="text-base font-semibold m-0">{t('giftCard.title')}</h5>
                  <div className="text-sm text-gray-400">
                    <p className="m-0">{t('giftCard.description')}</p>
                  </div>
                </div>
              </a>
            </div>

            <div className="mb-0 px-3">
              <a
                href="https://www.crunchyroll.com/premium?referrer=newweb_organic_acct_menu&return_url=https%3A%2F%2Fwww.crunchyroll.com%2Fpt-br%2F#plans"
                className="block w-full bg-[#FAB818] px-3 py-2 no-underline transition-opacity hover:opacity-90"
                tabIndex={0}
              >
                <span className="flex items-center justify-center gap-2 text-black font-semibold text-sm">
                  <svg
                    className="w-5 h-5 fill-black"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <path d="M18.188 17l1.667-5.606-4.26 1.864L12 7.688l-3.596 5.57-4.259-1.864L5.812 17h12.376zm-14.08 1.285L1.614 9.9a1 1 0 0 1 1.36-1.2l4.673 2.045 3.512-5.442a1 1 0 0 1 1.68 0l3.514 5.442 4.674-2.046a1 1 0 0 1 1.36 1.201l-2.494 8.386a1 1 0 0 1-.959.715H5.067a1 1 0 0 1-.959-.715z" />
                  </svg>
                  {t('freeTrial')}
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
