'use client';

import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Unstable_Grid2';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { paths } from 'src/routes/paths';

import { _mock, _categories, _travelPosts } from 'src/_mock';

import { Markdown } from 'src/components/markdown';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import { BlogTags } from '../blog/common/blog-tags';
import { Newsletter } from '../newsletter';
import { BlogAuthor } from '../blog/common/blog-author';
import { BlogSidebar } from '../blog/common/blog-sidebar';
import { PostHero } from '../blog/blog-list/blog-hero';
import { BlogSocialsShare } from '../blog/common/blog-socials-share';
import { LatestBlog } from '../blog/blog-list/latest-blog';

// ----------------------------------------------------------------------

export const BlogView = () => {

  const { author, content } = _travelPosts[0];

  return (
    <>
      {/* <PostHero post={_travelPosts[0]} /> */}

      <Container>
        <CustomBreadcrumbs
          sx={{ my: 3 }}
          links={[
            { name: 'Home', href: '/' },
            { name: 'Blog', href: paths.alda.alda },
            { name: "title" },
          ]}
        />
      </Container>

      <Divider sx={{ mb: { xs: 6, md: 10 } }} />

      <Container>
        <Grid container spacing={{ md: 8 }}>
          <Grid xs={12} md={8}>
            <Typography variant="h5" sx={{ mb: 5 }}>
              'description'
            </Typography>

            <Markdown content={content} firstLetter />

            <BlogSocialsShare />

            <Divider sx={{ mt: 8 }} />

            {/* <PostAuthor author={author} /> */}
          </Grid>

        </Grid>
      </Container>

      <Newsletter />
    </>
  );
}
