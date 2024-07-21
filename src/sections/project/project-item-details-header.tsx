import { useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
// import Avatar from '@mui/material/Avatar';
// import Popover from '@mui/material/Popover';
// import Checkbox from '@mui/material/Checkbox';
// import MenuItem from '@mui/material/MenuItem';
// import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

// import { fShortenNumber } from 'src/utils/format-number';

import { _socials } from 'src/_mock';

import Iconify from 'src/components/iconify';

import { Project } from 'src/types/project';
import { Divider, List, ListItem, ListItemIcon, ListItemText, useTheme } from '@mui/material';
import { fDate } from 'src/utils/format-time';
import moment from 'moment';


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
          <Typography variant="caption" sx={{ opacity: 0.72 }}>
            Objavljeno: {fDate(project.published, 'yyyy/MM/dd')}
          </Typography>
          <Divider />
          {project.showProjectDetails ?
            <Box>
              <br />
              <Typography sx={{ fontWeight: 'bold' }}>
                NAZIV PROJEKTA:
              </Typography> {project.subTitle}
              <Typography sx={{ fontWeight: 'bold' }}>
                NOSILAC PROJEKTA:
              </Typography>{project.applicants.join(', ')}
              <Typography sx={{ fontWeight: 'bold' }}>
                PARTNERI:
              </Typography >{project.organizers.join(', ')}
              <Typography sx={{ fontWeight: 'bold' }}>
                DONATOR:
              </Typography>{project.donators.join(', ')}
              {project.dateFrom != undefined && project.subOrganizers.length > 0 ?
                <Box>
                  <Typography>
                    PERIOD IMPLEMENTACIJE: {moment(project.dateFrom).format('DD/MM/yyyy')} - {moment(project.dateTo).format('DD/MM/yyyy')}
                  </Typography>
                  <Typography>
                    PRIDRUŽENI PARTNERI: {project.subOrganizers.join(', ')}
                  </Typography>
                </Box>
                : null
              }
            </Box>
            : null
          }
          <br />
          {
            project.list.length > 0 && !project.showListOnBottom && (
              <List dense sx={{
                flexGrow: 1, pr: { md: 10 }, textAlign: 'justify', color: theme.palette.text.primary
              }}>
                <Typography>
                  {project.listTitle}
                </Typography>
                {project.list.map((item, index) => (
                  <ListItem disablePadding key={index} style={{ display: 'flex', alignItems: 'flex-start' }}>
                    <ListItemIcon style={{ display: 'flex', alignItems: 'flex-start' }}>
                      <Typography variant="body2" color="textSecondary">
                        {index + 1}.
                      </Typography>
                    </ListItemIcon>
                    <ListItemText primary={item} style={{ display: 'flex', alignItems: 'flex-start' }} />
                  </ListItem>
                ))}
              </List>
            )
          }
          <br />
          {[...Array(project.paragraphs.length)].map((_, index) => (
            <Typography key={index} variant="body1" component="h6" sx={{
              flexGrow: 1, pr: { md: 10 }, textAlign: 'justify', color: theme.palette.text.primary
            }}>
              {project.paragraphs[index]}
              <br />
              <br />
            </Typography>
          ))}
          <br />
          {
            project.list.length > 0 && project.showListOnBottom && (
              <List dense sx={{
                flexGrow: 1, pr: { md: 10 }, textAlign: 'justify', color: theme.palette.text.primary
              }}>
                <Typography>
                  {project.listTitle}
                </Typography>
                {project.list.map((item, index) => (
                  <ListItem disablePadding key={index} style={{ display: 'flex', alignItems: 'flex-start' }}>
                    <ListItemIcon style={{ display: 'flex', alignItems: 'flex-start' }}>
                      <Typography variant="body2" color="textSecondary">
                        {index + 1}.
                      </Typography>
                    </ListItemIcon>
                    <ListItemText primary={item} style={{ display: 'flex', alignItems: 'flex-start' }} />
                  </ListItem>
                ))}
              </List>
            )
          }
        </Box>
        <Stack direction="row" alignItems="center" flexShrink={0}>
          {/* <IconButton onClick={handleOpen} color={open ? 'primary' : 'default'}>
            <Iconify icon="carbon:share" sx={{ color: theme.palette.text.primary }} />
          </IconButton> */}

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
            Projekat
          </Typography>

          <Link variant="subtitle2" color={theme.palette.text.primary} href={project.projectSummaryURL} sx={{ cursor: 'pointer' }}>
            {project.subTitle}
          </Link>
        </Stack>
      </Stack>


    </>
  );
}
