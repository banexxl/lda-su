import { memo } from 'react';

import ldaSuLogo from 'public/viber_slika_mala_200x.png'
import ldaSuSmallLogo from 'public/assets/logo/logo-small.png'
import Link from '@mui/material/Link';
import { useTheme } from '@mui/material/styles';
import Box, { BoxProps } from '@mui/material/Box';
import Image from 'next/image'
import { RouterLink } from 'src/routes/components';
import { useResponsive } from 'src/hooks/use-responsive';

// ----------------------------------------------------------------------

interface LogoProps extends BoxProps {
  single?: boolean;
}

const Logo = ({ single = true, sx }: LogoProps) => {

  const mdUp = useResponsive('up', 'md');

  return (
    <Link
      component={RouterLink}
      href="/"
      aria-label="go to homepage"
      sx={{ lineHeight: 0 }}
    >
      {
        mdUp ?
          <Box
            sx={{
              backgroundImage: `url(${ldaSuLogo.src})`,
              backgroundSize: 'cover',
              alignItems: 'center',
              justifyContent: 'center',
              width: mdUp ? '150px' : '120px',
              height: mdUp ? '90px' : '68px',
              cursor: 'pointer',
              display: 'inline-flex',
              marginTop: mdUp ? '0px' : '20px',
              borderRadius: '5px ',
              ...sx,
            }}
          />
          :
          <Box
            sx={{
              backgroundImage: `url(${ldaSuSmallLogo.src})`,
              backgroundSize: 'cover',
              alignItems: 'center',
              justifyContent: 'center',
              width: '60px',
              height: '60px',
              cursor: 'pointer',
              display: 'inline-flex',
              marginTop: '20px',
              borderRadius: '15px ',
              ...sx,
            }}
          />
      }
    </Link>
  );
}

export default memo(Logo);
