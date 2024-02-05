'use client';
import Grid from '@mui/material/Unstable_Grid2';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { paths } from 'src/routes/paths';
import { Markdown } from 'src/components/markdown';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';
import Image from 'src/components/image';
import { ActivityTags } from '../activity/common/activities-tags';
import { ActivitySidebar } from '../activity/common/activities-sidebar';
import { ActivityHero } from '../activity/activities-list/activities-hero';
import { SocialShare } from '../../components/social-share/socials-share';
import { LatestActivities } from '../activity/activities-list/latest-activities';
import { ProjectDetailsGallery } from '../project/project-item-details-gallery';
import { Divider, List, ListItem, ListItemIcon, ListItemText, MenuItem, Popover, useTheme } from '@mui/material';
import { Box } from '@mui/material';
import { Activity } from 'src/types/activity';
import { _socials } from 'src/_mock';
import Iconify from 'src/components/iconify';
import { useCallback, useState } from 'react';

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
            { name: 'Aktivnosti', href: paths.activitiesALDA },
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
                flexGrow: 1, pr: { md: 10 }, textAlign: 'justify', color: theme.palette.text.primary, ":first-letter": {
                  textTransform: 'capitalize',
                  fontWeight: 'bold',
                  fontSize: '2rem'
                }
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

            <SocialShare shareURL={'https://lda-subotica.org' + activity.activityURL} />

            <Divider sx={{ mt: 8 }} />

            {/* <ActivityAuthor author={author} /> */}
            <Typography variant="h3" component="h1" sx={{ flexGrow: 1, padding: { md: 1, lg: 2 }, color: theme.palette.text.primary }}>
              Galerija
            </Typography>
            <ProjectDetailsGallery galery={activity.galery} />
          </Grid>

        </Grid>
      </Container>

      {/* <Newsletter /> */}
    </>
  );
}
