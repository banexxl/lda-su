import { unstable_setRequestLocale } from 'next-intl/server';
import { locales } from 'src/middleware';
import { NotFoundView } from 'src/sections/error/not-found-view';

// ----------------------------------------------------------------------

export const metadata = {
  title: '404 Page Not Found!',
};

export function generateStaticParams() {
  return locales.map((locale) => locale);
}
export default function NotFoundPage({ params: { locale } }: any) {

  unstable_setRequestLocale(locale);

  return <NotFoundView />;
}
