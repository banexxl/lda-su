import { memo, useEffect } from 'react';

import Stack from '@mui/material/Stack';

import { Drawer, List, useTheme } from '@mui/material';
import { usePathname } from 'src/routes/hooks';

import { useBoolean } from 'src/hooks/use-boolean';
import { NavProps } from '../types';
import IconButton from '@mui/material/IconButton';
import Iconify from 'src/components/iconify/iconify';
import { NAV } from 'src/layouts/config-layout';
import Scrollbar from 'src/components/scrollbar';
import Logo from 'src/components/logo';
import { NavList } from './nav-list';

// ----------------------------------------------------------------------

const NavBasicMobile = ({ data, slotProps, ...other }: NavProps) => {


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
              <NavList key={list.title} data={list} depth={1} />
            ))}
          </List>

        </Scrollbar>
      </Drawer>

    </>
  )
}

export default memo(NavBasicMobile);
