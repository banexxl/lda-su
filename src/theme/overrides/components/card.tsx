import { Theme } from '@mui/material/styles';

// ----------------------------------------------------------------------

export const card = (theme: Theme) => {
  return {
    MuiCard: {
      styleOverrides: {
        root: {
          position: 'relative',
          boxShadow: `10px 10px 10px 3px ${theme.palette.primary.main}`,
          borderRadius: theme.shape.borderRadius * 2,
          zIndex: 0, // Fix Safari overflow: hidden with border radius
        },
      },
    },
    MuiCardHeader: {
      styleOverrides: {
        root: {
          padding: theme.spacing(3, 3, 0),
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: theme.spacing(3),
        },
      },
    },
  };
}
