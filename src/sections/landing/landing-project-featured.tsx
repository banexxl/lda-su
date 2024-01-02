import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { Project } from 'src/types/project';;

import { ProjectItem } from '../project-list/project-item';

// ----------------------------------------------------------------------

type Props = {
  projects: Project[];
};

export const LandingProjectFeatured = ({ projects }: Props) => {
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
        {projects.map((project: any) => (
          <ProjectItem key={project.id} project={project} />
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
