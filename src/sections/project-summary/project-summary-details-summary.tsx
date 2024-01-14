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

// ----------------------------------------------------------------------

type Props = {
  projectSummary: ProjectSummary;
};

export const ProjectSummaryDetailsSummary = ({ projectSummary }: Props) => {

  const theme = useTheme()

  const extractFileName = (url: string) => {
    const parts = url.split('/');
    return parts[parts.length - 1]; // Get the last part (file name)
  };

  const extractNameFromUrl = (url: string) => {
    const regex = /^https?:\/\/(?:www\.)?([^/]+)\.\w+\/?/;
    const match = url.match(regex);
    if (match && match.length > 1) {
      return match[1];
    }
    return ''; // Return empty string if the match is not found
  };

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
          <OverviewItem icon="carbon:calendar" label="Available" text={`${fDate(projectSummary.projectStartDateTime, 'dd/MM/yyyy')} - ${fDate(projectSummary.projectEndDateTime, 'dd/MM/yyyy')}`} />
          <OverviewItem icon="carbon:user" label="Contact name" text={projectSummary.organizers.join(', ')} />
          <OverviewItem icon="carbon:location" label="Location" text={projectSummary.locations.join(', ')} />
          <OverviewItem icon="carbon:mobile" label="Contact phone" text={'+38124554587'} />
          <OverviewItem icon="carbon:time" label="Start Date" text={projectSummary.projectStartDateTime.toString()} />
          <OverviewItem icon="carbon:collapse-categories" label="Category" text={projectSummary.category} />
          <OverviewItem icon="carbon:user-multiple" label="Applicants" text={projectSummary.applicants.join(', ')} />
          <OverviewItem icon="carbon:money" label="Donators" text={projectSummary.donators.join(', ')} />
        </Box>
      </Stack>
      <Divider sx={{ mb: '30px' }} />
      <Typography variant="h5" sx={{ color: theme.palette.text.primary }}>Publikacije</Typography>
      <Box sx={{ display: 'flex', gap: '20px' }}>
        <List>
          {projectSummary.publications.map((publicationUrl, index) => (
            <ListItem key={index}>
              <PictureAsPdfIcon sx={{ mr: '5px' }} />
              <Link href={publicationUrl} target="_blank" rel="noopener">
                {extractFileName(publicationUrl)}
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
      <Iconify icon={icon} width={24} />
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