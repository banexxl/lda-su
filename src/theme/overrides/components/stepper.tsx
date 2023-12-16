import { Theme } from '@mui/material/styles';

// ----------------------------------------------------------------------

export const stepper = (theme: Theme) => {
  return {
    MuiStepConnector: {
      styleOverrides: {
        line: {
          borderColor: theme.palette.divider,
        },
      },
    },
  };
}
