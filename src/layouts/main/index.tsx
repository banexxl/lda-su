import Box from '@mui/material/Box';

import { usePathname } from 'src/routes/hooks';
import { Header } from './header';
import { Footer } from './footer';
import { HEADER } from '../config-layout';
import { useBoolean } from 'src/hooks/use-boolean';

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export const MainLayout = ({ children }: Props) => {

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: 1 }}>
      <Header headerOnDark={true} />
      {children}
      <Footer />
    </Box>
  );
}