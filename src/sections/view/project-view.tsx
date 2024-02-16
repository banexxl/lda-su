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
import { ProjectListSimilar } from '../project-summaries-list/project-summary-list-similar';
import { ProjectDetailsHeader } from '../project/project-item-details-header';
import { ProjectDetailsSummary } from '../project/project-item-details-summary';
import { ProjectDetailsGallery } from '../project/project-item-details-gallery';
// import { ProjectDetails } from '../project/project-item-details';
import { Project } from 'src/types/project';
import { EmailIcon, EmailShareButton, FacebookIcon, FacebookShareButton, LinkedinShareButton, TwitterShareButton, ViberIcon, ViberShareButton } from 'next-share';
import { SocialShare } from 'src/components/social-share/socials-share';

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
      <Container sx={{ overflow: 'hidden', color: theme.palette.text.primary }}>
        <CustomBreadcrumbs
          links={[
            { name: 'Home', href: '/' },
            { name: 'Projects', href: paths.pastProjectSummaries },
            { name: project.title },
          ]}
          sx={{ mt: 3, mb: 5, color: theme.palette.text.primary }}
        />

        <ProjectDetailsGallery gallery={project.gallery} />

        {/* <Grid container columnSpacing={8} rowSpacing={5} direction="row-reverse"> */}
        {/* <Grid xs={12} md={5} lg={4}>
            <ProjectDetails project={project} />
          </Grid> */}

        <Grid xs={12} md={7} lg={8}>
          <ProjectDetailsHeader project={project} />

          <Divider sx={{ my: 5 }} />

          <ProjectDetailsSummary project={project} />

          <SocialShare shareURL={'https://lda-subotica.org' + project.projectURL} />

        </Grid>
        {/* </Grid> */}
      </Container>

      <Divider sx={{ my: 10 }} />



      {/* <ProjectListSimilar projects={pojects.slice(-4)} /> */}

      {/* <Newsletter /> */}
    </>
  );
}
