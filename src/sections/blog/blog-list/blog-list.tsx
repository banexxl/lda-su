import Box from '@mui/material/Box';
import Pagination, { paginationClasses } from '@mui/material/Pagination';

import backgroundURL from "/public/larger.png"
import { Blog } from 'src/types/blog';

import { PostItem } from './blog-item';

// ----------------------------------------------------------------------

type Props = {
  posts: Blog[];
};

export const BlogList = ({ posts }: Props) => {
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
        {posts.slice(0, 8).map((post) => (
          <PostItem key={post.id} post={post} />
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
