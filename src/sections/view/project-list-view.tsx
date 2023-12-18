'use client';

import { useEffect } from 'react';

import Container from '@mui/material/Container';

import { useBoolean } from 'src/hooks/use-boolean';

import { _tours } from 'src/_mock';

import { Newsletter } from '../newsletter';
import { Filters } from '../filters/filters';
import { ProjectList } from '../project-list/project-list';

// ----------------------------------------------------------------------

export const ProjectsView = () => {
  const loading = useBoolean(true);

  useEffect(() => {
    const fakeLoading = async () => {
      await new Promise((resolve) => setTimeout(resolve, 500));
      loading.onFalse();
    };
    fakeLoading();
  }, [loading]);

  return (
    <>
      <Container>
        <Filters
          sx={{
            mt: 5,
            mb: { xs: 5, md: 10 },
          }}
        />

        {/* <TourList projects={_tours} loading={loading.value} /> */}
      </Container>

      <Newsletter />
    </>
  );
}
