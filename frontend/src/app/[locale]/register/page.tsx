import MinimalFooter from '../../components/layout/MinimalFooter';
import HeaderLogin from '../../components/layout/HeaderLogin';
import RegisterForm from './RegisterForm';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata(props: { params: { locale: string } }) {
  const params = await props.params;
  const { locale } = await params;
  const t = await getTranslations({ locale });
  return {
    title: 'Cadastre-se no Crunchyroll: curta anime a qualquer hora!',
    description: 'curta anime a qualquer hora!'
  };
}

interface Props {
  params: Promise<{ locale: string }>;
}

export default async function RegisterPage({ params }: Props) {
  const { locale } = await params;

  return (
    <div className='flex flex-col min-h-screen bg-black'>

      <HeaderLogin />
        <RegisterForm locale={locale}/>
      <MinimalFooter/>
    </div>
  );
};