import { memo } from 'react';

import Link from '@mui/material/Link';
import { useTheme } from '@mui/material/styles';
import Box, { BoxProps } from '@mui/material/Box';

import { RouterLink } from 'src/routes/components';
import Image from 'next/image';

// ----------------------------------------------------------------------

interface LogoProps extends BoxProps {
  single?: boolean;
}

function Logo({ single = false, sx }: LogoProps) {
  const theme = useTheme();

  const PRIMARY_MAIN = theme.palette.primary.main;

  return (
    <Link
      component={RouterLink}
      href="/"
      color="inherit"
      aria-label="go to homepage"
      sx={{ lineHeight: 0 }}
    >
      <Box
        sx={{
          width: single ? 64 : 75,
          lineHeight: 0,
          cursor: 'pointer',
          display: 'inline-flex',
          borderRadius: '10px',
          ...sx,
        }}
      >
        <Image src={'/assets/logo_main.jpg'} height={100} width={100} alt={'nologo'} />
      </Box>
    </Link>
  );
}

export default memo(Logo);
