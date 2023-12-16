import { Theme } from '@mui/material/styles';

// ----------------------------------------------------------------------

export const treeView = (theme: Theme) => {
  return {
    MuiTreeItem: {
      styleOverrides: {
        label: {
          ...theme.typography.body2,
        },
        iconContainer: {
          width: 'auto',
        },
      },
    },
  };
}
