import { Theme } from '@mui/material/styles';

// ----------------------------------------------------------------------

export const appBar = (theme: Theme) => {
  return {
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
        },
      },
    },
  };
}
