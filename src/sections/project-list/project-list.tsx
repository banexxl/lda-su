import Box from '@mui/material/Box';
import Pagination, { paginationClasses } from '@mui/material/Pagination';

import { ITourProps } from 'src/types/project';

import { ProjectItem } from './project-item';
import { ProjectItemSkeleton } from './project-item-skeleton';

// ----------------------------------------------------------------------

type Props = {
  tours: ITourProps[];
  loading?: boolean;
};

export const ProjectList = ({ tours, loading }: Props) => {
  return (
    <>
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
        {(loading ? [...Array(12)] : tours).map((tour, index) =>
          tour ? (
            <ProjectItem key={tour.id} tour={tour} />
          ) : (
            <ProjectItemSkeleton key={index} />
          )
        )}
      </Box>

      <Pagination
        count={10}
        color="primary"
        sx={{
          my: 10,
          [`& .${paginationClasses.ul}`]: {
            justifyContent: 'center',
          },
        }}
      />
    </>
  );
}
