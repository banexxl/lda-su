import { Theme } from '@mui/material/styles';

// ----------------------------------------------------------------------

export const typography = (theme: Theme) => {
  return {
    MuiTypography: {
      styleOverrides: {
        paragraph: {
          marginBottom: theme.spacing(2),
        },
        gutterBottom: {
          marginBottom: theme.spacing(1),
        },
      },
    },
  };
}
