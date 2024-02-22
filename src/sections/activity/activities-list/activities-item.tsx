import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { fDate } from 'src/utils/format-time';

import Image from 'src/components/image';
import TextMaxLine from 'src/components/text-max-line';

import { Activity } from 'src/types/activity';

import { ActivityTimeBlock } from '../common/activities-time-block';

// ----------------------------------------------------------------------

type Props = {
  activity: Activity;
};

export const ActivityItem = ({ activity }: Props) => {
  return (
    <Stack spacing={2.5}>
      <Image src={activity.coverURL} alt={activity.title} ratio="1/1" sx={{ borderRadius: 2 }} />

      <Stack spacing={1}>
        {/* <ActivityTimeBlock published={fDate(activity.publishedDate)} duration={activity.publishedDate.toString()} /> */}

        <Link component={RouterLink} href={paths.alda.alda} >
          <TextMaxLine variant="h5" persistent>
            {activity.title}
          </TextMaxLine>
        </Link>
      </Stack>

      <Stack direction="row" alignItems="center" sx={{ typography: 'body2' }}>
        <Avatar src={activity.author} sx={{ mr: 1 }} />
        {activity.author}
      </Stack>
    </Stack>
  );
}
