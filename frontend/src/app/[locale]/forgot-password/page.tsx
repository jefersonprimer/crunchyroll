import { Metadata } from 'next';
import ForgotPasswordClient from './ForgotPasswordClient';
import MinimalFooter from '@/app/components/layout/MinimalFooter';
import HeaderLogin from '@/app/components/layout/HeaderLogin';

export const metadata: Metadata = {
  title: 'Redefinir senha para Crunchyroll',
  description: 'Redefinir senha para Crunchyroll',
};

export default function ForgotPasswordPage() {
  return (
    <div>
      <HeaderLogin />
        <ForgotPasswordClient />
      <MinimalFooter />
    </div>
  );
}
