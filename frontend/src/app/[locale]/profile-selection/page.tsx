import { getTranslations } from 'next-intl/server';
import HeaderLogin from '@/app/components/layout/HeaderLogin';
import MinimalFooter from '@/app/components/layout/MinimalFooter';
import ProfileSelectionClient from './ProfileSelectionClient';

export async function generateMetadata(props: { params: { locale: string } }) {
  const params = await props.params;
  const { locale } = await params;
  const t = await getTranslations({ locale });
  return {
    title: t('profileSelection.title') + ' - Crunchyroll',
    description: t('profileSelection.subtitle')
  };
}

interface Props {
  params: Promise<{ locale: string }>;
}

export default async function ProfileSelectionPage({ params }: Props) {
  const { locale } = await params;

  return (
    <div className='flex flex-col min-h-screen relative'>
      <HeaderLogin />
      <div className="flex justify-center items-center flex-1 flex-col py-10 w-full max-w-[1200px] mx-auto px-4 relative z-10">
        <ProfileSelectionClient locale={locale} />
      </div>
      <MinimalFooter />
    </div>
  );
} 