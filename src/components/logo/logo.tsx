import { memo } from 'react';

import euLogo from 'public/eu-flag-logo.jpg'
import Link from '@mui/material/Link';
import { useTheme } from '@mui/material/styles';
import Box, { BoxProps } from '@mui/material/Box';

import { RouterLink } from 'src/routes/components';

// ----------------------------------------------------------------------

interface LogoProps extends BoxProps {
  single?: boolean;
}

const Logo = ({ single = false, sx }: LogoProps) => {
  const theme = useTheme();

  const PRIMARY_MAIN = theme.palette.primary.main;

  return (
    <Link
      component={RouterLink}
      href="/"

      aria-label="go to homepage"
      sx={{ lineHeight: 0 }}
    >
      <Box
        sx={{
          width: single ? 64 : 100,
          lineHeight: 0,
          cursor: 'pointer',
          display: 'inline-flex',
          borderRadius: '10px',
          backgroundImage: `url(${euLogo.src})`,
          ...sx,
        }}
      />
    </Link>
  );
}

export default memo(Logo);
