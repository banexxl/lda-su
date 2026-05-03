import type { Metadata } from 'next';

// ----------------------------------------------------------------------

import { defaultMetadata } from 'src/lib/seo';
import { AppShell } from './app-shell';
import { primaryFont } from 'src/theme/typography';
import { Analytics } from '@mui/icons-material';

type Props = {
  children: React.ReactNode;
};

export const metadata: Metadata = defaultMetadata;

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en" className={primaryFont.className}>
      <body>
        <Analytics />
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
