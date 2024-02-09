import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';

import { fDate } from 'src/utils/format-time';

import Image from 'src/components/image';
import TextMaxLine from 'src/components/text-max-line';

import { Activity } from 'src/types/activity';

import { ActivityTimeBlock } from './activities-time-block';

// ----------------------------------------------------------------------

type Props = {
  activity: Activity;
  onSiderbar?: boolean;
};

export const ActivityItemMobile = ({ activity, onSiderbar }: Props) => {
  return (
    <Stack
      spacing={2}
      direction="row"
      alignItems={{ xs: 'flex-start', md: 'unset' }}
      sx={{ width: 1 }}
    >
      <Image
        alt={activity.title}
        src={activity.coverURL}
        sx={{
          width: 80,
          height: 80,
          flexShrink: 0,
          borderRadius: 1.5,
        }}
      />

      <Stack spacing={onSiderbar ? 0.5 : 1}>
        <Link >
          <TextMaxLine variant={onSiderbar ? 'subtitle2' : 'h6'}>{activity.title}</TextMaxLine>
        </Link>

        <ActivityTimeBlock published={fDate(activity.publishedDate)} />
      </Stack>
    </Stack>
  );
}
