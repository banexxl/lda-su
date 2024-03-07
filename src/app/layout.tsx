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
  return children
}
