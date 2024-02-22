import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import { alpha, useTheme } from '@mui/material/styles';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { fDate } from 'src/utils/format-time';

import Image from 'src/components/image';
import TextMaxLine from 'src/components/text-max-line';

import { Activity } from 'src/types/activity';

import { ActivityTimeBlock } from '../common/activities-time-block';
import { Typography } from '@mui/material';

// ----------------------------------------------------------------------

type Props = {
  activity: Activity;
  largeActivity?: boolean;
};

export const FeaturedActivityItem = ({ activity, largeActivity }: Props) => {

  const theme = useTheme();

  return (
    <Box sx={{ borderRadius: 2, overflow: 'hidden', position: 'relative' }}>
      <Image
        src={activity.coverURL}
        alt={activity.title}
        ratio="1/1"
        overlay={`linear-gradient(to bottom, ${alpha(theme.palette.primary.main, 0)} 60%, ${theme.palette.primary.main
          } 99%)`}
      />

      <Stack
        spacing={1}
        sx={{
          p: 3,
          bottom: 0,
          zIndex: 9,
          position: 'absolute',
          color: 'common.white',
          ...(largeActivity && {
            p: { xs: 3, md: 5 },
          }),
        }}
      >
        <ActivityTimeBlock
          published={fDate(activity.publishedDate)}
          // duration={activity.duration}
          sx={{ color: 'inherit', opacity: 0.72 }}
        />

        <Link component={RouterLink} href={'/aktivnost/' + activity.activityURL} >
          <TextMaxLine
            sx={{
              typography: 'h6',
              ...(largeActivity && {
                typography: { xs: 'h6', md: 'h4' },
              }),
              color: theme.palette.text.primary
            }}
          >
            {activity.title}
          </TextMaxLine>
        </Link>

        {largeActivity && <TextMaxLine sx={{ opacity: 0.48 }}>{activity.descriptions[0]}</TextMaxLine>}

        <Stack direction="row" alignItems="center" sx={{ typography: 'body2', pt: 1.5, display: 'flex', justifyContent: 'space-between', color: theme.palette.primary.lighter }}>
          {/* <Avatar
            src={activity.author}
            sx={{
              mr: 1,
              width: 32,
              height: 32,
              ...(largeActivity && {
                width: { xs: 32, md: 40 },
                height: { xs: 32, md: 40 },
              }),
            }}
          /> */}
          {activity.author}
        </Stack>
      </Stack>
    </Box >
  );
}
