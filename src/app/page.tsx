import { unstable_setRequestLocale } from 'next-intl/server';
import { redirect } from 'next/navigation';
import { locales } from 'src/middleware';
// ----------------------------------------------------------------------

export const metadata = {
  title: 'LDA Subotica: Home',
  icons: {
    icon: '/favicon.ico',
  },
};

export function generateStaticParams() {
  return locales.map((locale) => { locale });
}

export default async function LandingPage(params: any) {

  console.log('localeeeeeeeeeee', params);

  unstable_setRequestLocale(params);

  redirect('/sr')
} 
