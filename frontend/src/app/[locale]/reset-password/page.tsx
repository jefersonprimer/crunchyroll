
import HeaderLogin from '@/app/components/layout/HeaderLogin';
import MinimalFooter from '@/app/components/layout/MinimalFooter';
import ResetPasswordForm from './ResetPasswordForm';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata(props: { params: { locale: string } }) {
  const params = await props.params;
  const { locale } = await params;
  const t = await getTranslations({ locale });
  return {
    title: 'Redefinir senha para Crunchyroll',
    description: 'Redefinir senha para Crunchyroll'
  };
}

interface Props {
  params: Promise<{ locale: string }>;
}

export default async function ResetPasswordPage({ params }: Props) {
  const { locale } = await params;

  return (
    <div>
      <HeaderLogin />
      <div className="flex flex-col items-center justify-center bg-[#000000] text-white p-5">
        <ResetPasswordForm locale={locale} />
      </div>
      <MinimalFooter/>
    </div>
  );
};