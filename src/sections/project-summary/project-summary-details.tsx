import { useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import { alpha, useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { fCurrency } from 'src/utils/format-number';
import { FilterTime } from '../filters/filter-time';
import { ProjectSummary } from 'src/types/projectSummary';
import { fDate } from 'src/utils/format-time';

// ----------------------------------------------------------------------

type Props = {
  projectSummary: ProjectSummary;
};

declare global {
  interface Window {
    FB: any;
  }
}

const ShareOnFacebook = () => {
  const handleShare = () => {
    // Open Facebook share dialog
    window.FB.ui({
      method: 'share',
      href: 'https://www.your-website.com/page-to-share', // Replace with the URL of the page you want to share
    }, (response: any) => {
      if (response && !response.error_message) {
        console.log('Post shared successfully!');
      } else {
        console.error('Failed to share post:', response.error_message);
      }
    });
  };

  return (
    <button onClick={handleShare}>Share on Facebook</button>
  );
};

export const ProjectSummaryDetails = ({ projectSummary }: Props) => {

  const theme = useTheme()
  const router = useRouter();

  const handleClickReserve = useCallback(() => {
    router.push(paths.alda.alda);
  }, [router]);

  return (
    <Card sx={{ p: 3 }}>
      <Stack spacing={3}>
        <Stack spacing={1.5}>
          <Typography variant="body2" sx={{ color: 'text.disabled' }}>Početak projekta</Typography>
          <Box
            sx={{
              py: 0.5,
              px: 1.5,
              borderRadius: 1,
              bgcolor: (theme) => alpha(theme.palette.grey[500], 0.08),
            }}
          >

            <FilterTime
              sx={{ color: theme.palette.text.primary }}
              departureDay={new Date(fDate(projectSummary.projectStartDateTime, 'yyyy/MM/dd'))}
              onChangeDepartureDay={() => { }}
            />
          </Box>

          <Typography variant="body2" sx={{ color: 'text.disabled' }}>Kraj projekta</Typography>
          <Box
            sx={{
              py: 0.5,
              px: 1.5,
              borderRadius: 1,
              bgcolor: (theme) => alpha(theme.palette.grey[500], 0.08),
            }}
          >

            <FilterTime
              sx={{ color: theme.palette.text.primary }}
              departureDay={new Date(fDate(projectSummary.projectEndDateTime, 'yyyy/MM/dd'))}
              onChangeDepartureDay={() => { }}
            />
          </Box>
        </Stack>
        <Divider />
        <Stack sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography variant="body2" sx={{ color: 'text.disabled' }}>
            Organizatori
          </Typography>
          <Typography sx={{ color: theme.palette.text.primary, marginBottom: '30px' }}>
            {projectSummary.organizers.join(', ')}
          </Typography>
        </Stack>

        {/* <Stack sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography variant="body2" sx={{ color: 'text.disabled' }}>
            {projectSummary.publishedDateTime.toString()}
          </Typography>
          <FilterTime
            sx={{ color: theme.palette.text.primary }}
            departureDay={projectSummary.publishedDateTime}
            onChangeDepartureDay={() => { }}
          />
        </Stack> */}
      </Stack>

      <Divider />
    </Card>
  );
}
