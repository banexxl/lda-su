"use client"
import 'src/global.css';

// ----------------------------------------------------------------------

import { ThemeProvider } from 'src/theme';
import { primaryFont } from 'src/theme/typography';
import { LocalizationProvider } from 'src/locales';

import { ProgressBar } from 'src/components/progress-bar';
import { MotionLazy } from 'src/components/animate/motion-lazy';
import { SettingsDrawer, SettingsProvider } from 'src/components/settings';
import { MainLayout } from 'src/layouts/main';
import { NextIntlClientProvider, useLocale } from 'next-intl';

// ----------------------------------------------------------------------

// export const metadata = {
//   title: 'LDA Subotica',
//   description:
//     'LDA Subotica',
//   keywords: 'LDA,Subotica',
//   viewport: { width: 'device-width', initialScale: 1, maximumScale: 1 }
// };

type Props = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: Props) {

  const locale = useLocale();

  return (
    <html className={primaryFont.className}>
      <body>
        <NextIntlClientProvider locale={locale}>
          <SettingsProvider
            defaultSettings={{
              themeMode: 'dark', // 'light' | 'dark'
              themeDirection: 'ltr', //  'rtl' | 'ltr'
              themeColorPresets: 'default', // 'default' | 'preset01' | 'preset02' | 'preset03' | 'preset04' | 'preset05'
            }}
          >
            <ThemeProvider>
              <MotionLazy>
                <ProgressBar />
                <SettingsDrawer />
                <MainLayout>{children}</MainLayout>
              </MotionLazy>
            </ThemeProvider>
          </SettingsProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
