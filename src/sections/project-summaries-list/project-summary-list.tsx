import Box from '@mui/material/Box';
import Pagination, { paginationClasses } from '@mui/material/Pagination';
import { ProjectSummaryItem } from './project-summary-item';
import { ProjectSummaryItemSkeleton } from './project-summary-item-skeleton';
import { ProjectSummary } from 'src/types/projectSummary';

// ----------------------------------------------------------------------

type Props = {
  projectSummary: ProjectSummary[];
  loading?: boolean;
};

export const ProjectList = ({ projectSummary, loading }: Props) => {
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
        {(loading ? [...Array(12)] : projectSummary).map((projectSummary, index) =>
          projectSummary ? (
            <ProjectSummaryItem key={projectSummary._id} projectSummary={projectSummary} />
          ) : (
            <ProjectSummaryItemSkeleton key={index} />
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
