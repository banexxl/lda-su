'use client';

import { useEffect } from 'react';

import Container from '@mui/material/Container';

import { useBoolean } from 'src/hooks/use-boolean';

import { _tours } from 'src/_mock';

import { ProjectSummary } from 'src/types/projectSummary';
import ProjectSummaryList from '../project-summaries-list/project-summary-list';
import { Typography } from '@mui/material';
import { useResponsive } from 'src/hooks/use-responsive';

// ----------------------------------------------------------------------


type ProjectSummariesListProps = {
  completedProjectSummaries?: ProjectSummary[];
  inProgressProjectSummaries?: ProjectSummary[];
  featuredProjectSummaries?: ProjectSummary[];
}

export const ProjectsSummariesView = ({ completedProjectSummaries, inProgressProjectSummaries, featuredProjectSummaries }: ProjectSummariesListProps) => {

  const mdUp = useResponsive('up', 'md');
  const loading = useBoolean(true);

  useEffect(() => {
    const fakeLoading = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      loading.onFalse();
    };
    fakeLoading();
  }, [loading]);

  return (
    <>
      <Container>
        {/* <Filters
          sx={{
            mt: 5,
            mb: { xs: 5, md: 10 },
          }}
        /> */}
        {
          completedProjectSummaries!.length > 0 ?
            <ProjectSummaryList projectSummaries={completedProjectSummaries!} loading={loading.value} />
            : inProgressProjectSummaries!.length > 0 ?
              <ProjectSummaryList projectSummaries={inProgressProjectSummaries!} loading={loading.value} />
              : featuredProjectSummaries!.length > 0 ?
                <ProjectSummaryList projectSummaries={featuredProjectSummaries!} loading={loading.value} />
                :
                <Typography variant="h2" sx={{ textAlign: 'center', marginTop: '150px', marginBottom: '450px', fontSize: mdUp ? '3rem' : '1.5rem' }} paragraph>Trenutno nemamo aktivnih projekata</Typography>
        }
      </Container>

      {/* <Newsletter /> */}
    </>
  );
}
