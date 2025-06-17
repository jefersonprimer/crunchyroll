import Link from "next/link";
import { useTranslations } from 'next-intl';

const PerfilModal = () => {
  const t = useTranslations('perfilModal');

  return (
    <>
      <div className="flex flex-col items-center p-5 border-b border-gray-300 w-[388px] h-[500px]">
        <img
          src="#"
          alt="foto de perfil"
          className="w-20 h-20 rounded-full object-cover"
        />
        <h2 className="text-lg font-bold my-2">{t('title')}</h2>
        <Link href="/profiles/manage/7a5f7a55-f9dc-5b4e-862b-6610af73f7bb">
          <span className="cursor-pointer text-gray-600">✏️</span>
        </Link>
        <div className="bg-yellow-400 text-gray-900 p-2 text-center rounded-md mt-2">
         {t('freeTrial')}
        </div>
      </div>

      <div className="flex flex-col gap-2 p-2">
        <button className="w-full text-left p-2 hover:bg-gray-200">
          {t('switchProfile')}
        </button>
        <button className="w-full text-left p-2 hover:bg-gray-200">
          {t('settings')}
        </button>
      </div>

      <div className="flex flex-col gap-2 p-2">
        <Link href="#" className="text-blue-500">
        {t('queue')}
        </Link>
        <Link href="#" className="text-blue-500">
        {t('crunchyLists')}
        </Link>
        <Link href="#" className="text-blue-500">
          {t('history')}
        </Link>
      </div>

      <Link href="#" className="block p-2 text-left">
        <div className="bg-gray-200 p-2 rounded-md">
          <h2>{t('notifications')}</h2>
          <span>{t('giftCard.title')}</span>
          <span>{t('giftCard.description')}</span>
        </div>
      </Link>

      <button className="w-full text-red-500 p-2 hover:bg-red-100">Sair</button>
    </>
  );
};

export default PerfilModal;


