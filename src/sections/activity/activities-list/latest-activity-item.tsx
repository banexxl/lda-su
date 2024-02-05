import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { fDate } from 'src/utils/format-time';

import Image from 'src/components/image';
import TextMaxLine from 'src/components/text-max-line';

import { Activity } from 'src/types/activity';

import { ActivityTimeBlock } from '../common/activities-time-block';

// ----------------------------------------------------------------------

type Props = {
  post: Activity;
};

export const LatestActivityItem = ({ post }: Props) => {
  return (
    <Stack spacing={2.5}>
      <Image src={post.coverURL} alt={post.title} ratio="1/1" sx={{ borderRadius: 2 }} />

      <Stack spacing={1}>
        {/* <ActivityTimeBlock createdAt={fDate(post.createdAt)} duration={post.duration} /> */}

        <Link component={RouterLink} href={paths.alda.alda} >
          <TextMaxLine variant="h6" persistent>
            {post.title}
          </TextMaxLine>
        </Link>
      </Stack>

      <Stack spacing={1} direction="row" alignItems="center">
        <Avatar src={post.author} sx={{ width: 32, height: 32 }} />
        <Typography variant="body2">{post.author}</Typography>
      </Stack>
    </Stack>
  );
}
