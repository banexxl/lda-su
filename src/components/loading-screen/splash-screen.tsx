import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import { Theme, styled, SxProps } from '@mui/material/styles';

import { bgBlur } from 'src/theme/css';

import Logo from '../logo';
import { ProgressBar } from '../progress-bar';

// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
  ...bgBlur({
    blur: 2,
    opacity: 0.24,
    color: theme.palette.background.default,
  }),
  borderRadius: '60px',
  top: 0,
  zIndex: 9999,
  width: '100%',
  height: '100%',
  display: 'flex',
  position: 'absolute',
  alignItems: 'center',
  justifyContent: 'center',
}));

// ----------------------------------------------------------------------

type Props = {
  sx?: SxProps<Theme>;
};

export const SplashScreen = ({ sx }: Props) => {
  return (
    <>
      <ProgressBar />

      <StyledRoot sx={sx}>
        <m.div
          animate={{
            scale: [1, 0.96, 1, 0.96, 1],
            opacity: [1, 0.48, 1, 0.48, 1],
          }}
          transition={{
            duration: 2,
            ease: 'easeInOut',
            repeatDelay: 1,
            repeat: Infinity,
          }}
        >
          <Logo single sx={{ width: 200, height: 200, backgroundSize: 'cover', borderRadius: '240px' }} />
        </m.div>
      </StyledRoot>

      <Box sx={{ width: 1, height: '100vh' }} />
    </>
  );
}
