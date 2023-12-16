import { Theme } from '@mui/material/styles';

import { menuItem } from '../../css';

// ----------------------------------------------------------------------

export const menu = (theme: Theme) => {
  return {
    MuiMenuItem: {
      styleOverrides: {
        root: {
          ...menuItem(theme),
        },
      },
    },
  };
}
