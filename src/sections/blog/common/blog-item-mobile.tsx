import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';

import { fDate } from 'src/utils/format-time';

import Image from 'src/components/image';
import TextMaxLine from 'src/components/text-max-line';

import { Blog } from 'src/types/blog';

import { BlogTimeBlock } from './blog-time-block';

// ----------------------------------------------------------------------

type Props = {
  post: Blog;
  onSiderbar?: boolean;
};

export const BlogItemMobile = ({ post, onSiderbar }: Props) => {
  return (
    <Stack
      spacing={2}
      direction="row"
      alignItems={{ xs: 'flex-start', md: 'unset' }}
      sx={{ width: 1 }}
    >
      <Image
        alt={post.title}
        src={post.coverUrl}
        sx={{
          width: 80,
          height: 80,
          flexShrink: 0,
          borderRadius: 1.5,
        }}
      />

      <Stack spacing={onSiderbar ? 0.5 : 1}>
        <Link color="inherit">
          <TextMaxLine variant={onSiderbar ? 'subtitle2' : 'h6'}>{post.title}</TextMaxLine>
        </Link>

        {/* <BlogTimeBlock createdAt={fDate(post.createdAt)} duration={post.duration} /> */}
      </Stack>
    </Stack>
  );
}
