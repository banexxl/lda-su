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

  const startIndex = (page - 1) * projectsPerPage;
  const paginatedProjects = projectSummaries!.slice(startIndex, startIndex + projectsPerPage);

  return (
    <>
      {
        projectSummaries![0].status == 'completed' ?
          <Typography variant="h3" paragraph>Završeni projekti</Typography>
          : projectSummaries![0].status == 'in-progress' ?
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
            <Grid item xs={8} key={projectSummary._id}>
              <ProjectSummaryItem projectSummary={projectSummary} />
            </Grid>
          ) : (
            <Grid item xs={12} key={index}>
              <ProjectSummaryItemSkeleton />
            </Grid>
          )
        )}
      </Box>

      <Box mt={4} display="flex" justifyContent="center">
        <Pagination
          count={Math.ceil(projectSummaries!.length / projectsPerPage)}
          page={page}
          onChange={handleChangePage}
        />
      </Box>
    </>
  );
};

export default ProjectSummaryList;
