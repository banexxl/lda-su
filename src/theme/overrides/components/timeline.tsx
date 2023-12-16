import { Theme } from '@mui/material/styles';

// ----------------------------------------------------------------------

export const timeline = (theme: Theme) => {
  return {
    MuiTimelineDot: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
        },
      },
    },
    MuiTimelineConnector: {
      styleOverrides: {
        root: {
          backgroundColor: theme.palette.divider,
        },
      },
    },
  };
}
