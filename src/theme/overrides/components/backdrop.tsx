import { alpha, Theme } from '@mui/material/styles';

// ----------------------------------------------------------------------

export const backdrop = (theme: Theme) => {
  return {
    MuiBackdrop: {
      styleOverrides: {
        root: {
          backgroundColor: alpha(theme.palette.grey[900], 0.8),
        },
        invisible: {
          background: 'transparent',
        },
      },
    },
  };
}
