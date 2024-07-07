import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import LinkIcon from '@mui/icons-material/Link';
import { fDate } from 'src/utils/format-time';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import Iconify, { IconifyProps } from 'src/components/iconify';

import { Project } from 'src/types/project';
import { Link, List, ListItem, useTheme } from '@mui/material';
import { extractStringFromUrl, extractURLName } from 'src/utils/format-string';

// ----------------------------------------------------------------------

type Props = {
  project: Project;
};

export const ProjectDetailsSummary = ({ project }: Props) => {

  const theme = useTheme()

  return (
    <Stack spacing={5}>
      <Stack spacing={3}>

        <Typography variant="h5" sx={{ color: theme.palette.text.primary }}>Pregled Projekta</Typography>
        <Box
          sx={{
            rowGap: 2.5,
            columnGap: 3,
            display: 'grid',
            gridTemplateColumns: {
              xs: 'repeat(1, 1fr)',
              sm: 'repeat(2, 1fr)',
            },
          }}
        >
          {/* <OverviewItem icon="carbon:calendar" label="Trajanje projekta" text={`${fDate(project.startDateTime, 'yyyy/MM/dd')} - ${fDate(project.endDateTime, 'yyyy/MM/dd')}`} /> */}
          <OverviewItem icon="carbon:user" label="Organizatori" text={
            project.organizers.length === 0 ? project.applicants.join(', ') :
              project.applicants.join(', ') + ', ' + project.organizers.join(', ')} />
          <OverviewItem icon="carbon:location" label="Lokacije" text={project.locations.join(', ')} />
          <OverviewItem icon="carbon:mobile" label="Telefon" text={'+38124554587'} />
          {/* <OverviewItem icon="carbon:time" label="Datum početka" text={fDate(project.startDateTime, 'yyyy/MM/dd')} /> */}
          <OverviewItem icon="carbon:collapse-categories" label="Kategorija" text={
            project.category == 'youth' ? 'Mladi' :
              project.category == 'culture' ? 'Kultura' :
                project.category == 'democracy' ? 'Demokratija' :
                  project.category == 'economy' ? 'Ekonomija' :
                    project.category == 'eu-integrations' ? 'EU integracije' :
                      project.category == 'intercultural-dialogue' ? 'Interkulturalni dijalog' :
                        project.category == 'migrations' ? 'Migracije' :
                          project.category == 'other' ? 'Ostalo' : '/'
          }
          />
          <OverviewItem icon="carbon:user-multiple" label="Aplikanti" text={project.applicants.join(', ')} />
          <OverviewItem icon="carbon:money" label="Donatori" text={project.donators.join(', ')} />
        </Box>
      </Stack>

      <Divider />
      <Typography variant="h5" sx={{ color: theme.palette.text.primary }}>Linkovi</Typography>
      <Box sx={{ display: 'flex', gap: '20px' }}>
        <List>
          {project.links.map((link, index) => (
            <ListItem key={index}>
              <LinkIcon sx={{ mr: '5px' }} />
              <Link href={link} target="_blank" rel="noopener">
                {extractURLName(link)}
              </Link>
            </ListItem>
          ))}
        </List>
      </Box>
      <Divider sx={{ mb: '30px' }} />
      <Typography variant="h5" sx={{ color: theme.palette.text.primary }}>Publikacije</Typography>
      <Box sx={{ display: 'flex', gap: '20px' }}>
        <List>
          {project.publications.map((publicationUrl, index) => (
            <ListItem key={index}>
              <PictureAsPdfIcon sx={{ mr: '5px' }} />
              <Link href={publicationUrl} target="_blank" rel="noopener">
                {decodeURIComponent(extractStringFromUrl(publicationUrl))}
              </Link>
            </ListItem>
          ))}
        </List>
      </Box>
      <Divider sx={{ mb: '30px' }} />
    </Stack >
  );
}

// ----------------------------------------------------------------------

type OverviewItemProp = {
  text: string;
  label: string;
  icon: IconifyProps;
};

function OverviewItem({ icon, label, text = '-' }: OverviewItemProp) {
  return (
    <Stack spacing={1.5} direction="row" alignItems="flex-start">
      <Iconify icon={icon} minWidth={24} />
      <Stack spacing={0.5}>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {label}
        </Typography>
        <Typography>{text}</Typography>
      </Stack>
    </Stack>
  );
}

// ----------------------------------------------------------------------

type HighlightItemProps = {
  label: string;
  text: string;
};

function HighlightItem({ label, text }: HighlightItemProps) {
  return (
    <Stack spacing={1}>
      <Typography
        variant="subtitle1"
        sx={{ color: 'primary.main', display: 'flex', alignItems: 'center' }}
      >
        <Box
          component="span"
          sx={{
            width: 12,
            height: 2,
            borderRadius: 1,
            bgcolor: 'currentColor',
            mr: 1.5,
          }}
        />
        {label}
      </Typography>
      <Typography>{text}</Typography>
    </Stack>
  );
}