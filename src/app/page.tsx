import { redirect } from 'next/navigation';
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
