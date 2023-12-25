import { memo } from 'react';

import euLogo from 'public/eu.png'
import Link from '@mui/material/Link';
import { useTheme } from '@mui/material/styles';
import Box, { BoxProps } from '@mui/material/Box';

import { RouterLink } from 'src/routes/components';

// ----------------------------------------------------------------------

interface LogoProps extends BoxProps {
  single?: boolean;
}

const Logo = ({ single = true, sx }: LogoProps) => {
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
          backgroundImage: `url(${euLogo.src})`,
          backgroundSize: 'cover',
          alignItems: 'center',
          justifyContent: 'center',
          width: 50,
          height: 50,
          cursor: 'pointer',
          display: 'inline-flex',
          borderRadius: '10px',
          ...sx,
        }}
      />
    </Link>
  );
}

export default memo(Logo);
