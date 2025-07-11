import { useCallback } from 'react';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { FilterTime } from '../filters/filter-time';
import { Project } from 'src/types/project';

// ----------------------------------------------------------------------

type Props = {
  project: Project;
};

declare global {
  interface Window {
    FB: any;
  }
}

export const ProjectDetails = ({ project }: Props) => {

  const theme = useTheme()
  const router = useRouter();

  const handleClickReserve = useCallback(() => {
    router.push(paths.alda.alda);
  }, [router]);

  return (
    <Card sx={{ p: 3 }}>
      <Stack spacing={3}>
        <Stack spacing={1.5}>
          {/* <Typography variant="body2" sx={{ color: 'text.disabled' }}>Početak projektne aktivnosti</Typography> */}
          {/* <Box
            sx={{
              py: 0.5,
              px: 1.5,
              borderRadius: 1,
              bgcolor: (theme) => alpha(theme.palette.grey[500], 0.08),
            }}
          >

            <FilterTime
              sx={{ color: theme.palette.text.primary }}
              departureDay={project.startDateTime}
              onChangeDepartureDay={() => { }}
            />
          </Box> */}

          {/* <Typography variant="body2" sx={{ color: 'text.disabled' }}>Kraj projektne aktivnosti</Typography>
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
              departureDay={project.endDateTime}
              onChangeDepartureDay={() => { }}
            />
          </Box> */}
        </Stack>
        <Divider />
        <Stack sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography variant="body2" sx={{ color: 'text.disabled' }}>
            Organizatori
          </Typography>
          <Typography sx={{ color: theme.palette.text.primary }}>
            {project.organizers.join(', ')}
          </Typography>
        </Stack>

        <Stack sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography variant="body2" sx={{ color: 'text.disabled' }}>
            Objavljeno
          </Typography>
          <FilterTime
            sx={{ color: theme.palette.text.primary }}
            departureDay={project.published}
            onChangeDepartureDay={() => { }}
          />
        </Stack>
      </Stack>

      <Divider />
    </Card>
  );
}
