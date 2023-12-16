import { Theme, alpha } from '@mui/material/styles';

// ----------------------------------------------------------------------

export const paper = (theme: Theme) => {
  return {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
        outlined: {
          borderColor: alpha(theme.palette.grey[500], 0.16),
        },
      },
    },
  };
}
