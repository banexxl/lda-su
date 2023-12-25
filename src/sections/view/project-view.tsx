'use client';

import { useEffect } from 'react';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import { alpha, useTheme } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import { paths } from 'src/routes/paths';

import { useBoolean } from 'src/hooks/use-boolean';

import { _tours, _socials } from 'src/_mock';

import Iconify from 'src/components/iconify';
import { SplashScreen } from 'src/components/loading-screen';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';
import { FaViber } from "react-icons/fa";
// import { Newsletter } from '../newsletter';
import { ProjectListSimilar } from '../project-list/project-list-similar';
import { ProjectDetailsHeader } from '../project/project-details-header';
import { ProjectDetailsSummary } from '../project/project-details-summary';
import { ProjectDetailsGallery } from '../project/project-details-gallery';
import { ProjectDetails } from '../project/project-details';
import { Project } from 'src/types/project';
import { EmailIcon, EmailShareButton, FacebookIcon, FacebookShareButton, LinkedinShareButton, TwitterShareButton, ViberIcon, ViberShareButton } from 'next-share';

// ----------------------------------------------------------------------

type ProjectProps = {
  project: Project
}

export const ProjectView = ({ project }: ProjectProps) => {

  const loading = useBoolean(true);
  const theme = useTheme()
  useEffect(() => {
    const fakeLoading = async () => {
      await new Promise((resolve) => setTimeout(resolve, 500));
      loading.onFalse();
    };
    fakeLoading();
  }, [loading]);

  if (loading.value) {
    return <SplashScreen />;
  }

  return (
    <>
      <Container sx={{ overflow: 'hidden' }}>
        <CustomBreadcrumbs
          links={[
            { name: 'Home', href: '/' },
            { name: 'Projects', href: paths.projects },
            { name: project.title },
          ]}
          sx={{ mt: 3, mb: 5, color: theme.palette.text.primary }}
        />

        <ProjectDetailsGallery galery={project.gallery} />

        <Grid container columnSpacing={8} rowSpacing={5} direction="row-reverse">
          <Grid xs={12} md={5} lg={4}>
            <ProjectDetails project={project} />
          </Grid>

          <Grid xs={12} md={7} lg={8}>
            <ProjectDetailsHeader project={project} />

            <Divider sx={{ my: 5 }} />

            <ProjectDetailsSummary project={project} />

            <Stack direction="row" flexWrap="wrap" sx={{ mt: 5 }}>
              <Typography variant="subtitle2" sx={{ mt: 0.75, mr: 1.5, color: theme.palette.text.primary }}>
                Share:
              </Typography>

              <Stack direction="row" alignItems="center" flexWrap="wrap">
                <FacebookShareButton
                  url={'https://github.com/next-share'}
                  quote={'next-share is a social share buttons for your next React apps.'}
                  hashtag={'#nextshare'}
                >
                  <Button
                    key={'fb'}
                    size="small"
                    variant="outlined"
                    startIcon={<Iconify icon={'carbon:logo-facebook'} />}
                    sx={{
                      m: 0.5,
                      flexShrink: 0,
                      color: theme.palette.primary.lighter,
                      borderColor: theme.palette.primary.lighter,
                      '&:hover': {
                        borderColor: theme.palette.primary.dark,
                        bgcolor: alpha(theme.palette.primary.dark, 0.08),
                      },
                    }}
                  >
                    Facebook
                  </Button>
                </FacebookShareButton>
                <TwitterShareButton
                  url={'https://github.com/next-share'}
                  title={'next-share is a social share buttons for your next React apps.'}
                >
                  <Button
                    key={'fb'}
                    size="small"
                    variant="outlined"
                    startIcon={<Iconify icon={'carbon:logo-twitter'} />}
                    sx={{
                      m: 0.5,
                      flexShrink: 0,
                      color: theme.palette.primary.lighter,
                      borderColor: theme.palette.primary.lighter,
                      '&:hover': {
                        borderColor: theme.palette.primary.dark,
                        bgcolor: alpha(theme.palette.primary.dark, 0.08),
                      },
                    }}
                  >
                    Twitter
                  </Button>
                </TwitterShareButton>
                <LinkedinShareButton url={'https://github.com/next-share'}>
                  <Button
                    key={'fb'}
                    size="small"
                    variant="outlined"
                    startIcon={<Iconify icon={'carbon:logo-linkedin'} />}
                    sx={{
                      m: 0.5,
                      flexShrink: 0,
                      color: theme.palette.primary.lighter,
                      borderColor: theme.palette.primary.lighter,
                      '&:hover': {
                        borderColor: theme.palette.primary.dark,
                        bgcolor: alpha(theme.palette.primary.dark, 0.08),
                      },
                    }}
                  >
                    Linkedin
                  </Button>
                </LinkedinShareButton>
                <ViberShareButton
                  url={'https://github.com/next-share'}
                  title={'next-share is a social share buttons for your next React apps.'}
                >
                  <Button
                    key={'fb'}
                    size="small"
                    variant="outlined"
                    startIcon={<FaViber />}
                    sx={{
                      m: 0.5,
                      flexShrink: 0,
                      color: theme.palette.primary.lighter,
                      borderColor: theme.palette.primary.lighter,
                      '&:hover': {
                        borderColor: theme.palette.primary.dark,
                        bgcolor: alpha(theme.palette.primary.dark, 0.08),
                      },
                    }}
                  >
                    Viber
                  </Button>
                </ViberShareButton>
                <EmailShareButton
                  url={'https://github.com/next-share'}
                  subject={'Next Share'}
                  body="body"
                >
                  <Button
                    key={'fb'}
                    size="small"
                    variant="outlined"
                    startIcon={<AlternateEmailIcon />}
                    sx={{
                      m: 0.5,
                      flexShrink: 0,
                      color: theme.palette.primary.light,
                      borderColor: theme.palette.primary.light,
                      '&:hover': {
                        borderColor: theme.palette.primary.dark,
                        bgcolor: alpha(theme.palette.primary.dark, 0.08),
                      },
                    }}
                  >
                    Email
                  </Button>
                </EmailShareButton>
              </Stack>
            </Stack>
          </Grid>
        </Grid>
      </Container>

      <Divider sx={{ my: 10 }} />

      {/* <ProjectListSimilar projects={pojects.slice(-4)} /> */}

      {/* <Newsletter /> */}
    </>
  );
}
