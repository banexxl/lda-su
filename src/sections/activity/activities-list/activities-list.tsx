import Box from '@mui/material/Box';
import Pagination, { paginationClasses } from '@mui/material/Pagination';

import backgroundURL from "/public/larger.png"
import { Activity } from 'src/types/activity';

import { PostItem } from './activities-item';

// ----------------------------------------------------------------------

type Props = {
  posts: Activity[];
};

export const ActivityList = ({ posts }: Props) => {
  return (
    <>
      <Box
        sx={{
          columnGap: 4,
          display: 'grid',
          rowGap: { xs: 4, md: 5 },
          gridTemplateColumns: {
            xs: 'repeat(1, 1fr)',
            sm: 'repeat(2, 1fr)',
          },
          backgroundImage: `url(${backgroundURL.src})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'repeat',
        }}
      >
        {posts.slice(0, 8).map((activity) => (
          <PostItem key={Math.floor(Math.random() * 999)} activity={activity} />
        ))}
      </Box>

      <Pagination
        count={10}
        color="primary"
        sx={{
          py: { xs: 8, md: 10 },
          [`& .${paginationClasses.ul}`]: {
            justifyContent: 'center',
          },
        }}
      />
    </>
  );
}
