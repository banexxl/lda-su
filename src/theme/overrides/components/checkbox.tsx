import { Theme } from '@mui/material/styles';

// ----------------------------------------------------------------------

export const checkbox = (theme: Theme) => {
  return {
    MuiCheckbox: {
      styleOverrides: {
        root: {
          padding: theme.spacing(1),
        },
      },
    },
  };
}
