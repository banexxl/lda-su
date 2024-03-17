import { redirect } from 'next/navigation';
import { locales } from 'src/middleware';
// ----------------------------------------------------------------------

export const metadata = {
  title: 'LDA Subotica: Home',
  icons: {
    icon: '/favicon.ico',
  },
};



export default async function RootPage() {
  redirect('/sr')
} 
