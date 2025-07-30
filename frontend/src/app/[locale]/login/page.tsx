import MinimalFooter from '@/app/components/layout/MinimalFooter';
import HeaderLogin from '@/app/components/layout/HeaderLogin';
import LoginForm from './LoginForm';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata(props: { params: { locale: string } }) {
  const params = await props.params;
  const { locale } = await params;
  const t = await getTranslations({ locale });
  return {
    title: 'Crunchyroll Login: Stream Anime Online Com Sua Conta',
    description: 'Stream Anime Online Com Sua Conta'
  };
}

interface Props {
  params: Promise<{ locale: string }>;
}

export default async function LoginPage({ params }: Props) {
  const { locale } = await params;

  return (
    <div className='flex flex-col min-h-screen bg-black'>
      <HeaderLogin />
      <div className="flex justify-center items-center flex-1 flex-col py-10 w-full max-w-[1200px] mx-auto">
        <h1 className='text-[34px] font-normal text-center mb-[30px] text-white'>Login</h1>
        <LoginForm locale={locale} />
      </div>
      <MinimalFooter />
    </div>
  );
}
