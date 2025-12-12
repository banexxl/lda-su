import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';

import Iconify from 'src/components/iconify';

import { Activity } from 'src/types/activity';

// ----------------------------------------------------------------------

type Props = {
  prevPost?: Activity;
  nextPost?: Activity;
};

export const ActivityPrevAndNext = ({ prevPost, nextPost }: Props) => {
  return (
    <Grid container spacing={5} columnSpacing={0} sx={{ py: 8 }}>
      <Grid size={{ xs: 12, md: 6 }}>
        <PostItem
          title={prevPost?.title}
          coverUrl={prevPost?.coverURL}
          icon={<Iconify icon="carbon:chevron-left" width={18} sx={{ color: 'text.disabled' }} />}
        />
      </Grid>

      <Grid size={{ xs: 12, md: 6 }}>
        <PostItem
          isNext
          title={nextPost?.title}
          coverUrl={nextPost?.coverURL}
          icon={<Iconify width={24} icon="carbon:chevron-right" sx={{ color: 'text.disabled' }} />}
        />
      </Grid>
    </Grid>
  );
}

// ----------------------------------------------------------------------

type PostItemProps = {
  coverUrl?: string;
  title?: string;
  icon?: JSX.Element;
  isNext?: boolean;
};

function PostItem({ coverUrl, title, icon, isNext }: PostItemProps) {
  return (
    <CardActionArea sx={{ borderRadius: 2 }}>
      <Link underline="none">
        <Stack
          alignItems="center"
          direction={isNext ? 'row-reverse' : 'row'}
          spacing={.5}
          sx={{
            p: 2.5,
            pl: 1,
            ...(isNext && {
              pr: 1,
            }),
          }}
        >
          {icon}

          <Avatar src={coverUrl} sx={{ width: 64, height: 64 }} />

          <Stack
            spacing={0.5}
            sx={{
              ...(isNext && {
                textAlign: 'right',
              }),
            }}
          >
            <Typography variant="overline" sx={{ color: 'text.disabled' }}>
              {isNext ? 'Next Post' : 'Previous Post'}
            </Typography>

            <Typography variant="subtitle1">{title}</Typography>
          </Stack>
        </Stack>
      </Link>
    </CardActionArea>
  );
}
