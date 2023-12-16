'use client';

import { MainLayout } from 'src/layouts/main';

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export const Layout = ({ children }: Props) => {
  return <MainLayout>{children}</MainLayout>;
}
