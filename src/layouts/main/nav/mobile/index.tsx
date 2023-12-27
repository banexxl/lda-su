import { useEffect } from 'react';

import List from '@mui/material/List';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';

import { usePathname } from 'src/routes/hooks';

import { useBoolean } from 'src/hooks/use-boolean';

import Logo from 'src/components/logo';
import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';

import { NavList } from './nav-list';
import { NavProps } from '../types';
import { NAV } from '../../../config-layout';
import { useTheme } from '@mui/material';

// ----------------------------------------------------------------------

export const NavMobile = ({ data }: any) => {

  const pathname = usePathname();
  const theme = useTheme()
  const mobileOpen = useBoolean();

  useEffect(() => {
    if (mobileOpen.value) {
      mobileOpen.onFalse();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <>
      <IconButton onClick={mobileOpen.onTrue} sx={{ ml: 1, color: theme.palette.primary.main }}>
        <Iconify icon="carbon:menu" />
      </IconButton>

      <Drawer
        open={mobileOpen.value}
        onClose={mobileOpen.onFalse}
        PaperProps={{
          sx: {
            pb: 5,
            width: NAV.W_VERTICAL,
            color: theme.palette.primary.light
          },
        }}
      >
        <Scrollbar>
          <Logo sx={{ mx: 2.5, my: 3 }} />
          <List component="nav" disablePadding>
            {data.map((list: any) => (
              <NavList key={list.title} data={list} />
            ))}
          </List>

        </Scrollbar>
      </Drawer>
    </>
  );
}
