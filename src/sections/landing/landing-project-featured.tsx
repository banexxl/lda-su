import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { Project } from 'src/types/project';;

import { ProjectSummaryItem } from '../project-summaries-list/project-summary-item';
import { ProjectSummary } from 'src/types/projectSummary';

// ----------------------------------------------------------------------

type Props = {
  projectSummaries: ProjectSummary[];
};

export const LandingProjectSummariesFeatured = ({ projectSummaries }: Props) => {
  return (
    <Container
      sx={{
        py: { xs: 5, md: 10 },
      }}
    >
      <Stack spacing={3} sx={{ textAlign: 'center' }}>
        <Typography variant="h3">Istaknuti projekti</Typography>

        <Typography sx={{ color: 'text.secondary' }}>
          Pogledajte naše istaknute projekte, i povezane aktivnosti
        </Typography>
      </Stack>

      <Box
        sx={{
          display: 'grid',
          my: { xs: 8, md: 10 },
          gap: { xs: 4, md: 3 },
          gridTemplateColumns: {
            xs: 'repeat(1, 1fr)',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(4, 1fr)',
          },
        }}
      >
        {projectSummaries.map((projectSummary: any) => (
          <ProjectSummaryItem key={projectSummary._id} projectSummary={projectSummary} />
        ))}
      </Box>

      <Box sx={{ textAlign: 'center' }}>
        <Button
          component={RouterLink}
          href={paths.allProjects}
          size="large"
          variant="outlined"
        >
          Pogledajte sve projekte
        </Button>
      </Box>
    </Container>
  );
}
