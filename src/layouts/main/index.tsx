import Box from '@mui/material/Box';

import { usePathname } from 'src/routes/hooks';
import backgroundURL from "../../../public/background-scaled-wpv_1024x.jpg"
import { Header } from './header';
import { Footer } from './footer';
import { HEADER } from '../config-layout';
import { Container, Stack } from '@mui/system';
import { Drawer, IconButton, Typography } from '@mui/material';
import Logo from 'src/components/logo';
import { useBoolean } from 'src/hooks/use-boolean';
import Iconify from 'src/components/iconify';
import NavBasicMobile from './nav-basic/mobile/nav-basic-mobile';

// ----------------------------------------------------------------------

const pathsOnDark = ['/travel'];

const spacingLayout = [...pathsOnDark, '/'];

const BASIC_NAV_ITEMS = [
  { title: 'Home', path: '#' },
  {
    title: 'Page',
    path: '#',
    children: [
      {
        title: 'Page 1',
        path: '#',
        children: [
          { title: 'Page 1.1', path: '#' },
          { title: 'Page 1.2', path: '#' },
        ],
      },
      {
        title: 'Page 2',
        path: '#',
        children: [
          { title: 'Page 2.1', path: '#' },
          { title: 'Page 2.2', path: '#' },
          {
            title: 'Page 2.3',
            path: '#',
            children: [
              { title: 'Page 2.3.1', path: '#' },
              { title: 'Page 2.3.2', path: '#' },
              { title: 'Page 2.3.3', path: '#' },
            ],
          },
        ],
      },
      { title: 'Page 3', path: '#' },
    ],
  },
  { title: 'Blog', path: '#' },
  { title: 'About', path: '#' },
  { title: 'Contact', path: '#' },
  { title: 'External', path: 'https://www.google.com/' },
];

type Props = {
  children: React.ReactNode;
};

export const MainLayout = ({ children }: Props) => {
  const pathname = usePathname();
  const mobileOpen = useBoolean();
  const actionPage = (arr: string[]) =>
    arr.some((path) => pathname === path || pathname === `${path}/`);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: 1 }}>
      <Header headerOnDark={actionPage(pathsOnDark)} />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          backgroundImage: `url(${backgroundURL.src})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'repeat-y',
        }}
      >
        {!actionPage(spacingLayout) && <Spacing />}

        <Drawer
          open={mobileOpen.value}
          onClose={mobileOpen.onFalse}
          PaperProps={{
            sx: {
              width: 260,
            },
          }}
        >
          <Logo sx={{ m: 2 }} />
          <NavBasicMobile
            data={BASIC_NAV_ITEMS}
            slotProps={{
              rootItem: {
                fontSize: 15,
                fontFamily: (theme) => theme.typography.fontSecondaryFamily,
              },
            }}
          />
        </Drawer>
        {children}
      </Box>

      <Footer />
    </Box>
  );
}

// ----------------------------------------------------------------------

const Spacing = () => {
  return (
    <Box
      sx={{
        height: { xs: HEADER.H_MOBILE, md: HEADER.H_DESKTOP },
      }}
    />
  );
}
