'use client';

import { SpeedInsights } from '@vercel/speed-insights/next';
import { ThemeProvider } from 'src/theme';
import { MotionLazy } from 'src/components/animate/motion-lazy';
import { ProgressBar } from 'src/components/progress-bar';
import { SettingsDrawer, SettingsProvider } from 'src/components/settings';
import { MainLayout } from 'src/layouts/main';

type Props = {
     children: React.ReactNode;
};

export const AppShell = ({ children }: Props) => {
     return (
          <SettingsProvider
               defaultSettings={{
                    themeMode: 'dark',
                    themeDirection: 'ltr',
                    themeColorPresets: 'default',
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
     );
};