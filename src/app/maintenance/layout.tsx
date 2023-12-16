'use client';

import { CompactLayout } from 'src/layouts/compact';

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export const Layout = ({ children }: Props) => {
  return <CompactLayout>{children}</CompactLayout>;
}
