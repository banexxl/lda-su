'use client';

import { useEffect } from 'react';

import Divider from '@mui/material/Divider';
import { useTheme } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { paths } from 'src/routes/paths';
import { useBoolean } from 'src/hooks/use-boolean';

import { _tours, _socials } from 'src/_mock';
import { SplashScreen } from 'src/components/loading-screen';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';
import { ProjectSummaryDetailsGallery } from '../project-summary/project-summary-details-gallery';
import { ProjectSummaryDetails } from '../project-summary/project-summary-details';
import { ProjectSummary } from 'src/types/projectSummary';
import { ProjectSummaryDetailsHeader } from '../project-summary/project-summary-details-header';
import { ProjectSummaryDetailsSummary } from '../project-summary/project-summary-details-summary';
import { SocialShare } from 'src/components/social-share/socials-share';

// ----------------------------------------------------------------------

type ProjectSummaryProps = {
  projectSummary: ProjectSummary
}

export const ProjectSummaryView = ({ projectSummary }: ProjectSummaryProps) => {

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
            { name: 'Naslovna', href: '/' },
            { name: 'Projekti', href: paths.pastProjectSummaries },
            { name: projectSummary.title },
          ]}
          sx={{ mt: 3, mb: 5, color: theme.palette.text.primary }}
        />

        <ProjectSummaryDetailsGallery gallery={projectSummary.gallery} />

        <Grid container columnSpacing={8} rowSpacing={5} direction="row-reverse">
          <Grid size={{ xs: 12, md: 5, lg: 4 }}>
            <ProjectSummaryDetails projectSummary={projectSummary} />
          </Grid>

          <Grid size={{ xs: 12, md: 7, lg: 8 }}>
            <ProjectSummaryDetailsHeader projectSummary={projectSummary} />

            <Divider sx={{ my: 5 }} />

            <ProjectSummaryDetailsSummary projectSummary={projectSummary} />

            <SocialShare shareURL={'https://lda-subotica.org/pregled-projekta/' + projectSummary.projectSummaryURL} />
          </Grid>
        </Grid>
      </Container>

      <Divider sx={{ my: 10 }} />

      {/* <ProjectListSimilar projects={pojects.slice(-4)} /> */}

      {/* <Newsletter /> */}
    </>
  );
}
