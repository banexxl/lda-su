import { NextIntlClientProvider, useMessages } from 'next-intl';
import 'src/global.css';

export const metadata = {
  title: 'LDA Subotica',
  description:
    'LDA Subotica',
  keywords: 'LDA,Subotica',
  viewport: { width: 'device-width', initialScale: 1, maximumScale: 1 }
};

type Props = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: Props) {

  const messages = useMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      {children}
    </NextIntlClientProvider>
  )
}
