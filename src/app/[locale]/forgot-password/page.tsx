import { Metadata } from 'next';
import ForgotPasswordClient from './ForgotPasswordClient';

export const metadata: Metadata = {
  title: 'Redefinir senha para Crunchyroll',
  description: 'Redefinir senha para Crunchyroll',
};

export default function ForgotPasswordPage() {
  return <ForgotPasswordClient />;
}
