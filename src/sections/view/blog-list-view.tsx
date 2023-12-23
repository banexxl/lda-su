'use client';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';

import { _mock, _categories, _travelPosts } from 'src/_mock';

// import { Newsletter } from '../newsletter';
import { BlogSidebar } from '../blog/common/blog-sidebar';
import { BlogList } from '../blog/blog-list/blog-list';
import { BlogSearchMobile } from '../blog/common/blog-search-mobile';
import { FeaturedBlog } from '../blog/blog-list/featured-blog';
import { TrendingTopics } from '../blog/blog-list/trending-topics-blog-list';

// ----------------------------------------------------------------------

export const PostsView = () => {
  return (
    <>
      <BlogSearchMobile />

      {/* <FeaturedPosts posts={_travelPosts.slice(-5)} /> */}

      <TrendingTopics />

      <Container
        sx={{
          mt: { xs: 4, md: 10 },
        }}
      >
        <Grid container spacing={{ md: 8 }}>
          <Grid xs={12} md={8}>
            {/* <Posts posts={_travelPosts} /> */}
          </Grid>

          <Grid xs={12} md={4}>
            {/* <PostSidebar
              categories={_categories}
              recentPosts={{ list: _travelPosts.slice(-4) }}
            /> */}
          </Grid>
        </Grid>
      </Container>

      {/* <Newsletter /> */}
    </>
  );
}
