import { useCallback } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import { alpha, useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
import { FilterTime } from '../filters/filter-time';
import { ProjectSummary } from 'src/types/projectSummary';

// ----------------------------------------------------------------------

type Props = {
  projectSummary: ProjectSummary;
};

declare global {
  interface Window {
    FB: any;
  }
}

export const ProjectSummaryDetails = ({ projectSummary }: Props) => {

  const theme = useTheme()

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
              departureDay={projectSummary.projectStartDateTime}
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
              departureDay={projectSummary.projectEndDateTime}
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
            {
              projectSummary.organizers.length === 0 ? projectSummary.applicants.join(', ') :
                projectSummary.applicants.join(', ') + ', ' + projectSummary.organizers.join(', ')}
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
