'use client';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';

import { _mock, _categories, _travelPosts } from 'src/_mock';

import { Newsletter } from '../newsletter';
import { NewsSidebar } from '../news/common/news-sidebar';
import { NewsList } from '../news/news-list/news-list';
import { NewsSearchMobile } from '../news/common/news-search-mobile';
import { FeaturedNews } from '../news/news-list/featured-news';
import { TrendingTopics } from '../news/news-list/trending-topics-news-list';

// ----------------------------------------------------------------------

export const PostsView = () => {
  return (
    <>
      <NewsSearchMobile />

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

      <Newsletter />
    </>
  );
}
