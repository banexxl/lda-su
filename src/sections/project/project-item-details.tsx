import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
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

  return (
    <Card sx={{ p: 3 }}>
      <Stack spacing={3}>
        <Stack spacing={1.5}>
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
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label={null}
              value={new Date(project.published)}
              readOnly
              slotProps={{
                textField: {
                  fullWidth: true,
                  sx: { color: theme.palette.text.primary },
                },
              }}
            />
          </LocalizationProvider>
        </Stack>
      </Stack>

      <Divider />
    </Card>
  );
}
