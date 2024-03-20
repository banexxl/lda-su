import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import LinkIcon from '@mui/icons-material/Link';
import { fDate } from 'src/utils/format-time';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { TOUR_SERVICE_OPTIONS } from 'src/_mock';

import Iconify, { IconifyProps } from 'src/components/iconify';

import { Link, List, ListItem, useTheme } from '@mui/material';
import { ProjectSummary } from 'src/types/projectSummary';
import { extractNameFromUrl, extractStringFromUrl } from 'src/utils/format-string';

// ----------------------------------------------------------------------

type Props = {
  projectSummary: ProjectSummary;
};

export const ProjectSummaryDetailsSummary = ({ projectSummary }: Props) => {

  const theme = useTheme()

  return (
    <Stack spacing={5}>
      <Stack spacing={3}>

        <Typography variant="h5" sx={{ color: theme.palette.text.primary }}>Pregled Projekta</Typography>
        <Box
          sx={{
            rowGap: 2.5,
            columnGap: 10,
            display: 'grid',
            gridTemplateColumns: {
              xs: 'repeat(1, 1fr)',
              sm: 'repeat(2, 1fr)',
            },
            gridColumn: 'span 5'
          }}
        >
          <OverviewItem icon="carbon:calendar" label="Trajanje projekta" text={`${fDate(projectSummary.projectStartDateTime, 'YYYY/MM/DD')} - ${fDate(projectSummary.projectEndDateTime, 'YYYY/MM/DD')}`} />
          <OverviewItem icon="carbon:user" label="Organizatori" text={projectSummary.organizers.join(', ')} />
          <OverviewItem icon="carbon:location" label="Lokacije" text={projectSummary.locations.join(', ')} />
          <OverviewItem icon="carbon:mobile" label="Telefon" text={'+38124554587'} />
          <OverviewItem icon="carbon:time" label="Datum početka" text={fDate(projectSummary.projectStartDateTime, 'YYYY/MM/DD')} />
          <OverviewItem icon="carbon:collapse-categories" label="Kategorija" text={
            projectSummary.category == 'youth' ? 'Mladi' :
              projectSummary.category == 'culture' ? 'Kultura' :
                projectSummary.category == 'democracy' ? 'Demokratija' :
                  projectSummary.category == 'economy' ? 'Ekonomija' :
                    projectSummary.category == 'eu-integrations' ? 'EU integracije' :
                      projectSummary.category == 'intercultural-dialogue' ? 'Interkulturalni dijalog' :
                        projectSummary.category == 'migrations' ? 'Migracije' :
                          projectSummary.category == 'other' ? 'Ostalo' : '/'
          }
          />
          <OverviewItem icon="carbon:user-multiple" label="Aplikanti" text={projectSummary.applicants.join(', ')} />
          <OverviewItem icon="carbon:money" label="Donatori" text={projectSummary.donators.join(', ')} />
        </Box>
      </Stack>
      <Divider />
      <Typography variant="h5" sx={{ color: theme.palette.text.primary }}>Linkovi</Typography>
      <Box sx={{ display: 'flex', gap: '20px' }}>
        <List>
          {projectSummary.links.map((link, index) => (
            <ListItem key={index}>
              <LinkIcon sx={{ mr: '5px' }} />
              <Link href={link} target="_blank" rel="noopener">
                {extractNameFromUrl(link)}
              </Link>
            </ListItem>
          ))}
        </List>
      </Box>
      <Divider sx={{ mb: '30px' }} />
      <Typography variant="h5" sx={{ color: theme.palette.text.primary }}>Publikacije</Typography>
      <Box sx={{ display: 'flex', gap: '20px' }}>
        <List>
          {projectSummary.publications.map((publicationUrl, index) => (
            <ListItem key={index}>
              <PictureAsPdfIcon sx={{ mr: '5px' }} />
              <Link href={publicationUrl} target="_blank" rel="noopener">
                {extractStringFromUrl(publicationUrl)}
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