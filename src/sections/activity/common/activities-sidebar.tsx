import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Chip from '@mui/material/Chip';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Stack, { StackProps } from '@mui/material/Stack';
import InputAdornment from '@mui/material/InputAdornment';

import { useResponsive } from 'src/hooks/use-responsive';

import { _socials } from 'src/_mock';

import Iconify from 'src/components/iconify';

import { Activity, ActivityCategoryProps } from 'src/types/activity';

import { ActivityItemMobile } from './activities-item-mobile';
// ----------------------------------------------------------------------

interface Props extends StackProps {
  author?: string;
  popularTags?: string[];
  categories?: ActivityCategoryProps[];
  recentActivities?: {
    list: Activity[];
  };
}

export const ActivitySidebar = ({
  author,
  categories,
  popularTags,
  recentActivities,
  sx,
  ...other
}: Props) => {
  const mdUp = useResponsive('up', 'md');

  // const renderAuthor = author && (
  //   <Stack spacing={2} direction="row" sx={{ mb: { md: 5 } }}>
  //     <Avatar src={author} sx={{ width: 64, height: 64 }} />

  //     <Stack>
  //       <Typography variant="h5">{author}</Typography>

  //       <Typography variant="body2" sx={{ mt: 0.5, mb: 2, color: 'text.secondary' }}>
  //         {author}
  //       </Typography>

  //       <Stack direction="row">
  //         {_socials.map((social) => (
  //           <IconButton key={social.value}>
  //             <Iconify icon={social.icon} sx={{ color: social.color }} />
  //           </IconButton>
  //         ))}
  //       </Stack>
  //     </Stack>
  //   </Stack>
  // );

  const renderCategories = categories && (
    <Stack spacing={1}>
      <Typography variant="h5" gutterBottom>
        Categories
      </Typography>

      {categories.map((category) => (
        <Stack key={category.label} direction="row" alignItems="center">
          <Box
            sx={{
              mr: 2,
              width: 6,
              height: 6,
              borderRadius: '50%',
              bgcolor: 'primary.main',
            }}
          />

          <Link variant="body2" href={category.path} >
            {category.label}
          </Link>
        </Stack>
      ))}
    </Stack>
  );

  const renderRecentPosts = recentActivities && (
    <Stack spacing={3}>
      <Typography variant="h5">Recent Posts</Typography>

      {recentActivities.list.map((activity) => (
        <ActivityItemMobile key={activity._id} activity={activity} onSiderbar />
      ))}
    </Stack>
  );

  const renderPopularTags = popularTags && (
    <Stack spacing={3}>
      <Typography variant="h5">Popular Tags</Typography>

      <Stack direction="row" flexWrap="wrap" spacing={1}>
        {popularTags.map((tag) => (
          <Chip key={tag} label={tag} variant="soft" size="small" onClick={() => { }} />
        ))}
      </Stack>
    </Stack>
  );

  return (
    <>
      {/* {mdUp && renderAuthor} */}

      {/* {mdUp && (
        <TextField
          fullWidth
          hiddenLabel
          placeholder="Search..."
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Iconify icon="carbon:search" width={24} sx={{ color: 'text.disabled' }} />
              </InputAdornment>
            ),
          }}
        />
      )} */}

      <Stack
        spacing={5}
        sx={{
          pt: { md: 5 },
          pb: { xs: 8, md: 10 },
          ...sx,
        }}
        {...other}
      >
        {renderCategories}

        {renderRecentPosts}

        {renderPopularTags}

      </Stack>
    </>
  );
}
