import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import { useTheme } from '@mui/material/styles';
import { paths } from 'src/routes/paths';
import Flag from 'react-world-flags'
import { useOffSetTop } from 'src/hooks/use-off-set-top';
import { useResponsive } from 'src/hooks/use-responsive';

import { bgBlur } from 'src/theme/css';

import Logo from 'src/components/logo';
import Label from 'src/components/label';

import { HEADER } from '../config-layout';
import { Searchbar } from '../common/searchbar';
import { navConfig } from './config-navigation';
import { HeaderShadow } from '../common/header-shadow';
import NavBasicDesktop from './nav-basic/desktop/nav-basic-desktop';
import NavBasicMobile from './nav-basic/mobile/nav-basic-mobile';
import { FlagSwitcher } from 'src/components/flag-switcher/flag-switcher';
import { ThemeSwitchToggle } from 'src/components/theme-switch/theme-switch';
// import { SettingsButton } from '../common/settings-button';
// import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------
type Props = {
  headerOnDark: boolean;
};

export const Header = ({ headerOnDark }: Props) => {
  const theme = useTheme();

  const offset = useOffSetTop();

  const mdUp = useResponsive('up', 'md');

  const renderContent = (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

      <Box sx={{ position: 'relative', height: '100px' }}>
        <Logo />
        <Link href="/" />
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '20px' }}>
        {mdUp ? (
          <Stack flexGrow={1} alignItems="center" sx={{ height: 1, marginRight: '20px' }}>
            <NavBasicDesktop data={navConfig} />
          </Stack>
        ) : (
          <Box sx={{ flexGrow: 1 }} />
        )}

        <Box sx={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', width: '100px' }}>
          <FlagSwitcher />
          <Searchbar />
          <ThemeSwitchToggle />
        </Box>

        {!mdUp && <NavBasicMobile data={navConfig} />}
      </Box>
    </Box>
  );

  return (
    <AppBar>
      <Toolbar
        disableGutters
        sx={{
          height: {
            xs: HEADER.H_MOBILE,
            md: HEADER.H_DESKTOP,
          },
          transition: theme.transitions.create(['height', 'background-color'], {
            easing: theme.transitions.easing.easeInOut,
            duration: theme.transitions.duration.shorter,
          }),
          ...(headerOnDark && {
            color: 'common.white',
          }),
          ...(offset && {
            ...bgBlur({ color: theme.palette.background.default }),
            color: 'text.primary',
            height: {
              md: HEADER.H_DESKTOP - 16,
            },
          }),
        }}
      >
        <Container>
          {renderContent}
        </Container>
      </Toolbar>

      {offset && <HeaderShadow />}
    </AppBar>
  );
}
