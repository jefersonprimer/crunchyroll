import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

interface TabsNavigationProps {
  selectedTab: string;
  onTabChange: (tab: string) => void;
  labels: {
    fila: string;
    crunchylists: string;
    historico: string;
    'Minhas Listas': string;
  };
  children?: React.ReactNode;
}

const TabsNavigation: React.FC<TabsNavigationProps> = ({ selectedTab, onTabChange, labels, children }) => {
  const params = useParams();
  const locale = params?.locale as string || 'pt-br';
  return (
    <div className="flex justify-center items-center h-full mt-[60px] mb-[60px]">
      <div className="w-[1066px] h-auto mx-auto">
        <div className="flex flex-col items-center w-full">
          <div className="w-full text-center">
            <h1 className="text-2xl mb-6 gap-2 flex items-center justify-center">
              <svg className="w-8 h-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" data-t="watchlist-svg" aria-labelledby="watchlist-svg" aria-hidden="true" role="img">
                <path fill="#FFF" d="M17 18.113l-3.256-2.326A2.989 2.989 0 0 0 12 15.228c-.629 0-1.232.194-1.744.559L7 18.113V4h10v14.113zM18 2H6a1 1 0 0 0-1 1v17.056c0 .209.065.412.187.581a.994.994 0 0 0 1.394.233l4.838-3.455a1 1 0 0 1 1.162 0l4.838 3.455A1 1 0 0 0 19 20.056V3a1 1 0 0 0-1-1z"></path>
              </svg>
              <span className="text-[1.6rem] font-medium">{labels['Minhas Listas']}</span>
            </h1>
            <div className="flex justify-center gap-5 border-b-2 border-gray-600 w-[96.5%] mx-auto mb-1">
              <div className="flex gap-4">
                <div role="tablist" className="flex">
                  <Link
                    href={`/${locale}/watchlist`}
                    className={`no-underline px-8 py-5 text-sm cursor-pointer transition-all duration-300 ease-in-out hover:bg-[#141519] ${
                      selectedTab === 'fila' ? 'text-white font-bold border-b-3 border-[#FF640A]' : 'text-[#A0A0A0] hover:text-white active:text-white'
                    }`}
                  >
                    <span className="uppercase">{labels.fila}</span>
                  </Link>
                  <Link
                    href={`/${locale}/crunchylists`}
                    className={`no-underline px-8 py-5 text-sm cursor-pointer transition-all duration-300 ease-in-out hover:bg-[#141519] ${
                      selectedTab === 'crunchylists' ? 'text-white font-bold border-b-3 border-[#FF640A]' : 'text-[#A0A0A0] hover:text-white active:text-white'
                    }`}
                  >
                    <span className="uppercase">{labels.crunchylists}</span>
                  </Link>
                  <Link
                    href={`/${locale}/history`}
                    className={`no-underline px-8 py-5 text-sm cursor-pointer transition-all duration-300 ease-in-out hover:bg-[#141519] ${
                      selectedTab === 'historico' ? 'text-white font-bold border-b-3 border-[#FF640A]' : 'text-[#A0A0A0] hover:text-white active:text-white'
                    }`}
                  >
                    <span className="uppercase">{labels.historico}</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center items-center w-full p-5">
            <div className="w-full">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TabsNavigation; 