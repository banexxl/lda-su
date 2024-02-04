import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { alpha, useTheme } from '@mui/material/styles';

import { fDate } from 'src/utils/format-time';

import { _socials } from 'src/_mock';
import { bgGradient } from 'src/theme/css';

import Iconify from 'src/components/iconify';

import { Activity } from 'src/types/activity';
import { MenuItem, Popover } from '@mui/material';
import { useCallback, useState } from 'react';

// ----------------------------------------------------------------------

type Props = {
  activity: Activity;
};

export const ActivityHero = ({ activity }: Props) => {
  const theme = useTheme();

  const [open, setOpen] = useState<HTMLElement | null>(null);

  const handleOpen = useCallback((event: React.MouseEvent<HTMLElement>) => {
    setOpen(event.currentTarget);
  }, []);

  const handleClose = useCallback(() => {
    setOpen(null);
  }, []);
  return (
    <Box
      sx={{
        py: 20,
        position: 'relative',
        ...bgGradient({
          startColor: `${alpha(theme.palette.primary.main, 0)} 70%`,
          endColor: `${theme.palette.primary.main} 99%`,
          imgUrl: activity.coverURL,
        }),
      }}
    >
      <Container>
        <Grid container spacing={3}>
          <Grid xs={12} md={6}>
            <Stack
              spacing={3}
              alignItems={{
                xs: 'center',
                md: 'flex-start',
              }}
              sx={{
                color: 'common.white',
                textAlign: {
                  xs: 'center',
                  md: 'left',
                },
              }}
            >
              {/* <Typography variant="body2" sx={{ opacity: 0.72 }}>
                {fDate(activity.fromDate, 'dd/MM/yyyy p')}
              </Typography>

              <Typography variant="body2" sx={{ opacity: 0.72 }}>
                {fDate(activity.toDate, 'dd/MM/yyyy p')}
              </Typography> */}

              <Typography variant="h2" component="h1">
                {activity.title}
              </Typography>

              <Typography variant="caption" sx={{ opacity: 0.72 }}>
                {fDate(activity.publishedDate, 'dd/MM/yyyy p')}
              </Typography>

              <Stack direction="row">
                <Popover
                  open={!!open}
                  onClose={handleClose}
                  anchorEl={open}
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                  transformOrigin={{ vertical: 'top', horizontal: 'center' }}
                  slotProps={{
                    paper: {
                      sx: { width: 220, backgroundColor: theme.palette.primary.dark },
                    },
                  }}
                >
                  {_socials.map((social) => (
                    <MenuItem key={social.value} onClick={handleClose}>
                      <Iconify icon={social.icon} width={24} sx={{ mr: 1, color: social.color }} />
                      <Typography sx={{ color: theme.palette.text.primary }}>
                        Share via {social.label}
                      </Typography>
                    </MenuItem>
                  ))}
                </Popover>
              </Stack>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
