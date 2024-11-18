'use client';
import Grid from '@mui/material/Unstable_Grid2';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { paths } from 'src/routes/paths';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';
import { ActivityHero } from '../activity/activities-list/activities-hero';
import { SocialShare } from '../../components/social-share/socials-share';
import { ProjectDetailsGallery } from '../project/project-item-details-gallery';
import LinkIcon from '@mui/icons-material/Link';
import { Divider, Link, List, ListItem, ListItemIcon, ListItemText, MenuItem, Popover, useTheme } from '@mui/material';
import { Box } from '@mui/material';
import { Activity } from 'src/types/activity';
import { _socials } from 'src/_mock';
import { useCallback, useState } from 'react';
import { extractStringFromUrl } from 'src/utils/format-string';
import { isVideoUrl } from 'src/utils/is-url-video';
import ReactPlayer from 'react-player';

// ----------------------------------------------------------------------

type ActivityProps = {
  activity: Activity
}

export const ActivityView = ({ activity }: ActivityProps) => {

  const theme = useTheme()

  const [open, setOpen] = useState<HTMLElement | null>(null);

  const handleOpen = useCallback((event: React.MouseEvent<HTMLElement>) => {
    setOpen(event.currentTarget);
  }, []);

  const handleClose = useCallback(() => {
    setOpen(null);
  }, []);

  return (
    <>
      <ActivityHero activity={activity} />

      <Container>
        <CustomBreadcrumbs
          sx={{ my: 3 }}
          links={[
            { name: 'Početna', href: '/' },
            { name: 'Aktivnosti', href: paths.activitiesInProgress },
            { name: `${activity.title}` },
          ]}
        />
      </Container>

      <Divider sx={{ mb: { xs: 6, md: 10 } }} />

      <Container>

        <Grid container spacing={{ md: 8 }}>

          {/* <Box sx={{ position: 'absolute', right: 18, bottom: 28, zIndex: 8 }}>
            <Image
              visibleByDefault
              disabledEffect
              alt="Activity"
              src={activity.coverURL}
              sx={{ width: 546, height: 650 }}
            />
          </Box> */}

          <Grid xs={12} md={8}>
            <Typography variant="h3" component="h1" sx={{ flexGrow: 1, pr: { md: 10 }, color: theme.palette.text.primary }}>
              {activity.title}
            </Typography>
            <br />
            {[...Array(activity.descriptions.length)].map((_, index) => (
              <Typography key={index} variant="body1" component="h6" sx={{
                flexGrow: 1, pr: { md: 10 }, textAlign: 'justify', color: theme.palette.text.primary
              }}>
                {activity.descriptions[index]}
                <br />
                <br />
              </Typography>
            ))}
            <Typography>
              {activity.listTitle}
            </Typography>
            {activity.list.length > 0 && (
              <List dense sx={{
                flexGrow: 1, pr: { md: 10 }, textAlign: 'justify', color: theme.palette.text.primary
              }}>
                {activity.list.map((item, index) => (
                  <ListItem disablePadding key={index}>
                    {/* Your custom icon component or MUI's built-in icons */}
                    <ListItemIcon>
                      <Typography variant="body2" color="textSecondary">
                        {index + 1}
                      </Typography>

                    </ListItemIcon>
                    {/* Text content for the list item */}
                    <ListItemText primary={item} />
                  </ListItem>
                ))}
              </List>
            )}

            {/* <Markdown content={content} firstLetter /> */}
            <Divider sx={{ mt: 8 }} />

            <SocialShare shareURL={'https://lda-subotica.org/aktivnost/' + activity.activityURL} />

            <Divider sx={{ mt: 8 }} />
            <Typography variant="h5" sx={{ color: theme.palette.text.primary, mt: '20px' }}>Linkovi</Typography>
            <Box sx={{ display: 'flex', gap: '20px' }}>
              <List>
                {activity.links.map((link, index) => (
                  <ListItem key={index}>
                    <LinkIcon sx={{ mr: '5px' }} />
                    <Link href={link} target="_blank" rel="noopener">
                      {extractStringFromUrl(link)}
                    </Link>
                  </ListItem>
                ))}
              </List>
            </Box>
            <Divider sx={{ mt: 8 }} />
            <Typography variant="h5" sx={{ color: theme.palette.text.primary, mt: '20px' }}>
              Publikacije
            </Typography>
            <Box sx={{ display: 'flex', gap: '20px' }}>
              <List>
                {activity.publications?.map((publication, index) => (
                  <ListItem key={index}>
                    <LinkIcon sx={{ mr: '5px' }} />
                    <Link href={publication} target="_blank" rel="noopener">
                      {decodeURIComponent(extractStringFromUrl(publication))}
                    </Link>
                  </ListItem>
                ))}
              </List>
            </Box>
            <Divider sx={{ mt: 8 }} />
            {/* <ActivityAuthor author={author} /> */}
            <Typography variant="h3" component="h1" sx={{ flexGrow: 1, my: 2, color: theme.palette.text.primary }}>
              Galerija
            </Typography>
            <ProjectDetailsGallery gallery={activity.gallery} />
            <Divider sx={{ mt: 8 }} />
            {
              activity.gallery.some(isVideoUrl) ? (
                <Box sx={{ m: 10 }}>
                  <Box sx={{ mb: 5, boxShadow: `5px 10px 20px ${theme.palette.primary.dark}` }} >
                    <ReactPlayer
                      url={activity.gallery.find(isVideoUrl) as string}
                      light={true}
                      volume={1}
                      playing={true}  // Auto-play the video
                      muted={true}    // Mute the video to comply with browser policies
                      controls={true} // Optional: Show video controls
                      width={'100%'}
                    />
                  </Box>
                </Box>
              ) : null
            }

          </Grid>

        </Grid>
      </Container>

      {/* <Newsletter /> */}
    </>
  );
}
