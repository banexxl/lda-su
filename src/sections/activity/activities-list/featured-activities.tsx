import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

import { Activity } from 'src/types/activity';

import { FeaturedActivityItem } from './featured-activities-item';
import { Grid, Pagination, Typography } from '@mui/material';
import { useState } from 'react';
import { ProjectSummaryItemSkeleton } from 'src/sections/project-summaries-list/project-summary-item-skeleton';

// ----------------------------------------------------------------------

type Props = {
  activites: Activity[];
  loading: boolean;
};

export const Activities = ({ activites, loading }: Props) => {

  const [page, setPage] = useState(1);
  const projectsPerPage = 9;

  const handleChangePage = (event: any, value: any) => {
    setPage(value);
  };

  const startIndex = (page - 1) * projectsPerPage;
  const paginatedProjects = activites!.slice(startIndex, startIndex + projectsPerPage);

  const activitiesMultipleStatusCheck = (activites: Activity[]) => {
    let completed = false;
    let inProgress = false;
    let toDo = false;

    activites.forEach(activity => {
      if (activity.status == 'completed') {
        completed = true;
      } else if (activity.status == 'in-progress') {
        inProgress = true;
      } else if (activity.status == 'to-do') {
        toDo = true;
      }
    });

    if (completed && inProgress) {
      return true
    } else if (inProgress && toDo) {
      return true
    } else if (toDo && completed) {
      return true
    } else {
      return false
    }
  }


  return (
    <Container
      sx={{
        pt: { xs: 10, md: 5 },
        pb: 10,
        alignItems: 'center',
      }}
    >
      {
        activitiesMultipleStatusCheck(activites) == true ?
          <Typography variant='h3' sx={{ display: 'flex', mb: '20px', justifyContent: 'center' }}>
            Sve aktivnosti
          </Typography>
          :
          activites[0]?.status == 'completed' ?
            <Typography variant='h3' sx={{ display: 'flex', mb: '20px', justifyContent: 'center' }}>
              Završene aktivnosti
            </Typography>
            :
            activites[0]?.status == 'in-progress' ?
              <Typography variant='h3' sx={{ display: 'flex', mb: '20px', justifyContent: 'center' }}>
                Aktivnosti u toku
              </Typography>
              :
              activites[0]?.status == 'to-do' ?
                <Typography variant='h3' sx={{ display: 'flex', mb: '20px', justifyContent: 'center' }}>
                  Buduće aktivnosti
                </Typography>
                :
                <Typography variant='h3' sx={{ display: 'flex', mb: '20px', justifyContent: 'center' }}>
                  Trenutno nemamo aktivnosti
                </Typography>
      }

      <Box
        sx={{
          gap: 3,
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            md: '1fr',
          },
          gridTemplateRows: {
            xs: '2fr',
            md: '2fr'
          }
        }}
      >
        <Box
          sx={{
            gap: 3,
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(3, 1fr)',
            },
          }}
        >
          {(loading ? [...Array(8)] : paginatedProjects).map((activity, index) =>
            activity ? (
              <Grid item xs={8} key={Math.floor(Math.random() * 999)}>
                <FeaturedActivityItem key={Math.floor(Math.random() * 999)} activity={activity} />
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
            count={Math.ceil(activites!.length / projectsPerPage)}
            page={page}
            onChange={handleChangePage}
            color='primary'
          />
        </Box>
      </Box>
    </Container>
  );
}
