'use client';
import Grid from '@mui/material/Grid';
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

          <Grid size={{ xs: 12, md: 8 }}>
            <Typography variant="h3" component="h1" sx={{ flexGrow: 1, pr: { md: 10 }, color: theme.palette.text.primary }}>
              {activity.title}
            </Typography>
            <br />
            {Array.isArray(activity.descriptions) && activity.descriptions.length > 0 ? (
              activity.descriptions.map((description, index) => (
                <Typography
                  key={index}
                  variant="body1"
                  component="h6"
                  sx={{
                    flexGrow: 1,
                    pr: { md: 10 },
                    textAlign: 'justify',
                    color: theme.palette.text.primary,
                  }}
                >
                  {description}
                  <br />
                  <br />
                </Typography>
              ))
            ) : typeof activity.descriptions === 'string' && activity.descriptions.length > 0 ? (
              <Typography
                variant="body1"
                component="h6"
                sx={{
                  flexGrow: 1,
                  pr: { md: 10 },
                  textAlign: 'justify',
                  color: theme.palette.text.primary,
                }}
              >
                {activity.descriptions}
                <br />
                <br />
              </Typography>
            ) : (
              <Typography
                variant="body2"
                sx={{ flexGrow: 1, pr: { md: 10 }, color: theme.palette.text.secondary }}
              >
                Trenutno nema opisa za ovu aktivnost.
              </Typography>
            )}
            <Typography>
              {activity.listTitle}
            </Typography>
            {activity.list && activity.list.length > 0 ? (
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
            ) : (
              <Typography
                variant="body2"
                sx={{ flexGrow: 1, pr: { md: 10 }, color: theme.palette.text.secondary }}
              >
                Trenutno nema stavki za ovu aktivnost.
              </Typography>
            )}

            {/* <Markdown content={content} firstLetter /> */}
            <Divider sx={{ mt: 8 }} />

            <SocialShare shareURL={'https://lda-subotica.org/aktivnost/' + activity.activityURL} />

            <Divider sx={{ mt: 8 }} />
            <Typography variant="h5" sx={{ color: theme.palette.text.primary, mt: '20px' }}>Linkovi</Typography>
            <Box sx={{ display: 'flex', gap: '20px' }}>
              {activity.links && activity.links.length > 0 ? (
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
              ) : (
                <Typography sx={{ color: theme.palette.text.secondary }}>
                  Trenutno nema linkova za ovu aktivnost.
                </Typography>
              )}
            </Box>
            {/* <Divider sx={{ mt: 8 }} />
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
            </Box> */}
            <Divider sx={{ mt: 8 }} />
            {/* <ActivityAuthor author={author} /> */}
            <Typography variant="h3" component="h1" sx={{ flexGrow: 1, my: 2, color: theme.palette.text.primary }}>
              Galerija
            </Typography>
            <ProjectDetailsGallery gallery={activity.gallery} />
            <Divider sx={{ mt: 8 }} />
            {activity.gallery?.some(isVideoUrl) ? (
              <Box sx={{ m: 10 }}>
                <Typography variant="h4" sx={{ mb: 5, color: theme.palette.text.primary }}>
                  Video aktivnosti
                </Typography>
                <Box sx={{ mb: 5, boxShadow: `5px 10px 20px ${theme.palette.primary.dark}` }}>
                  <ReactPlayer
                    url={activity.gallery.find(isVideoUrl) as string}
                    light
                    volume={1}
                    playing
                    muted
                    controls
                    width="100%"
                  />
                </Box>
              </Box>
            ) : null}

          </Grid>

        </Grid>
      </Container>

      {/* <Newsletter /> */}
    </>
  );
}
