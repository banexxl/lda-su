import { useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Popover from '@mui/material/Popover';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import { fShortenNumber } from 'src/utils/format-number';

import { _socials } from 'src/_mock';

import Iconify from 'src/components/iconify';

import { Project } from 'src/types/project'; import { Divider, useTheme } from '@mui/material';
;

// ----------------------------------------------------------------------

type Props = {
  project: Project;
};

export const ProjectDetailsHeader = ({ project }: Props) => {

  const theme = useTheme()

  const [open, setOpen] = useState<HTMLElement | null>(null);

  const handleOpen = useCallback((event: React.MouseEvent<HTMLElement>) => {
    setOpen(event.currentTarget);
  }, []);

  const handleClose = useCallback(() => {
    setOpen(null);
  }, []);

  // const handleChangeFavorite = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
  //   setFavorite(event.target.checked);
  // }, []);

  return (
    <>
      <Stack
        spacing={3}
        direction={{ xs: 'column', md: 'row' }}
        sx={{
          mb: 3,
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', textAlign: 'justify' }}>
          <Typography variant="h3" component="h1" sx={{ flexGrow: 1, pr: { md: 10 }, color: theme.palette.text.primary }}>
            {project.title}
          </Typography>
          <br />
          <Typography sx={{ color: theme.palette.text.disabled }}>
            {project.subTitle}
          </Typography>
          <br />
          <Divider />
          <br />
          <Typography variant="body1" component="h6" sx={{ flexGrow: 1, pr: { md: 10 }, textAlign: 'justify', color: theme.palette.text.primary }}>
            {project.paragraph1}
          </Typography>
          <br />
          <Typography variant="body1" component="h6" sx={{ flexGrow: 1, pr: { md: 10 }, textAlign: 'justify', color: theme.palette.text.primary }}>
            {project.paragraph2}
          </Typography>
          <br />
          <Typography variant="body1" component="h6" sx={{ flexGrow: 1, pr: { md: 10 }, textAlign: 'justify', color: theme.palette.text.primary }}>
            {project.paragraph3}
          </Typography>
          <br />
          <Typography variant="body1" component="h6" sx={{ flexGrow: 1, pr: { md: 10 }, textAlign: 'justify', color: theme.palette.text.primary }}>
            {project.paragraph4}
          </Typography>
          <br />
        </Box>
        <Stack direction="row" alignItems="center" flexShrink={0}>
          <IconButton onClick={handleOpen} color={open ? 'primary' : 'default'}>
            <Iconify icon="carbon:share" sx={{ color: theme.palette.text.primary }} />
          </IconButton>

          {/* <Checkbox
            color="error"
            sx={{ color: theme.palette.error.light }}
            checked={favorite}
            onChange={handleChangeFavorite}
            icon={<Iconify icon="carbon:favorite" />}
            checkedIcon={<Iconify icon="carbon:favorite-filled" />}
          /> */}
        </Stack>
      </Stack>

      <Stack spacing={3} direction={{ xs: 'column', md: 'row' }}>
        <Stack spacing={0.5} direction="row" alignItems="center">
          <Iconify icon="carbon:star-filled" sx={{ color: 'warning.main' }} />

          {/* <Box sx={{ typography: 'h6' }}>
            {Number.isInteger(ratingNumber) ? `${ratingNumber}.0` : ratingNumber}
          </Box>

          <Link variant="body2" sx={{ color: 'text.secondary' }}>
            ({fShortenNumber(totalReviews)} reviews)
          </Link> */}
        </Stack>

        <Stack direction="row" alignItems="center" sx={{ typography: 'body2', color: theme.palette.text.primary }}>
          <Iconify icon="carbon:location" sx={{ mr: 0.5, color: theme.palette.text.primary }} />
          {project.locations.join(', ')}
        </Stack>

        <Stack direction="row" alignItems="center">
          {/* <Avatar src={tourGuide?.avatarUrl} sx={{ width: 24, height: 24 }} /> */}

          <Typography variant="body2" sx={{ color: 'text.secondary', mx: 0.5 }}>
            Project title
          </Typography>

          <Link variant="subtitle2" color={theme.palette.text.primary}>
            {project.title}
          </Link>
        </Stack>
      </Stack>

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
    </>
  );
}
