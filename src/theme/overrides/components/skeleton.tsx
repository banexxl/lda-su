import { Theme } from '@mui/material/styles';

// ----------------------------------------------------------------------

export const skeleton = (theme: Theme) => {
  return {
    MuiSkeleton: {
      styleOverrides: {
        root: {
          backgroundColor: theme.palette.background.neutral,
        },
        rounded: {
          borderRadius: theme.shape.borderRadius * 2,
        },
      },
    },
  };
}
