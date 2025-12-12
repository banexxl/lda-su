import React, { useState } from 'react';
import { Box, Typography, Grid } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import { ProjectSummaryItem } from './project-summary-item';
import { ProjectSummaryItemSkeleton } from './project-summary-item-skeleton';
import { ProjectSummary } from 'src/types/projectSummary';

type ProjectSummaryListProps = {
  projectSummaries?: ProjectSummary[];
  loading?: boolean;
}

const ProjectSummaryList = ({ projectSummaries, loading }: ProjectSummaryListProps) => {

  const [page, setPage] = useState(1);
  const projectsPerPage = 12;

  const handleChangePage = (event: any, value: any) => {
    setPage(value);
  };

  // Handle missing or empty project list
  if (!projectSummaries || projectSummaries.length === 0) {
    if (loading) {
      return (
        <>
          <Typography variant="h3">Projekti</Typography>
          <Box
            sx={{
              columnGap: 3,
              display: 'grid',
              rowGap: { xs: 4, md: 5 },
              gridTemplateColumns: {
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(2, 1fr)',
                md: 'repeat(4, 1fr)',
              },
            }}
          >
            {[...Array(8)].map((_, index) => (
              <Grid size={{ xs: 12 }} key={index}>
                <ProjectSummaryItemSkeleton />
              </Grid>
            ))}
          </Box>
        </>
      );
    }

    return (
      <>
        <Typography variant="h3" paragraph>Projekti</Typography>
        <Typography sx={{ textAlign: 'center', mb: 4 }}>
          Trenutno nema dostupnih projekata.
        </Typography>
      </>
    );
  }

  const startIndex = (page - 1) * projectsPerPage;
  const paginatedProjects = projectSummaries.slice(startIndex, startIndex + projectsPerPage);

  return (
    <>
      {
        projectSummaries[0].status == 'completed' ?
          <Typography variant="h3" paragraph>Završeni projekti</Typography>
          : projectSummaries[0].status == 'in-progress' ?
            <Typography variant="h3" paragraph>Projekti u toku</Typography>
            :
            <Typography variant="h3" paragraph>Projekti</Typography>
      }

      <Box
        sx={{
          columnGap: 3,
          display: 'grid',
          rowGap: { xs: 4, md: 5 },
          gridTemplateColumns: {
            xs: 'repeat(1, 1fr)',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(4, 1fr)',
          },
        }}
      >

        {(loading ? [...Array(8)] : paginatedProjects).map((projectSummary, index) =>
          projectSummary ? (
            <Grid size={{ xs: 8 }} key={Math.floor(Math.random() * 999)}>
              <ProjectSummaryItem projectSummary={projectSummary} />
            </Grid>
          ) : (
            <Grid size={{ xs: 12 }} key={index}>
              <ProjectSummaryItemSkeleton />
            </Grid>
          )
        )}
      </Box>

      <Box mt={4} display="flex" justifyContent="center" sx={{ marginBottom: '20px' }}>
        <Pagination
          count={Math.ceil(projectSummaries.length / projectsPerPage)}
          page={page}
          onChange={handleChangePage}
          color='primary'
        />
      </Box>
    </>
  );
};

export default ProjectSummaryList;
