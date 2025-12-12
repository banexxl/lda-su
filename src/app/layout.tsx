'use client'

import 'src/global.css';
import { SpeedInsights } from "@vercel/speed-insights/next"

// ----------------------------------------------------------------------

import { ThemeProvider } from 'src/theme';
import { primaryFont } from 'src/theme/typography';
// import { LocalizationProvider } from 'src/locales';

import { ProgressBar } from 'src/components/progress-bar';
import { MotionLazy } from 'src/components/animate/motion-lazy';
import { SettingsDrawer, SettingsProvider } from 'src/components/settings';
import { MainLayout } from 'src/layouts/main';
import { Analytics } from '@mui/icons-material';

type Props = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en" className={primaryFont.className}>
      <body>
        <Analytics />
        {/* <LocalizationProvider> */}
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
              <MainLayout>
                {children}
                <SpeedInsights />
              </MainLayout>
            </MotionLazy>
          </ThemeProvider>
        </SettingsProvider>
        {/* </LocalizationProvider> */}
      </body>
    </html>
  );
}
