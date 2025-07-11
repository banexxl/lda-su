import { useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Popover from '@mui/material/Popover';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { _socials } from 'src/_mock';
import Iconify from 'src/components/iconify';
import ExpandCircleDownIcon from '@mui/icons-material/ExpandCircleDown';
import { Accordion, AccordionDetails, AccordionSummary, Divider, Link, useTheme } from '@mui/material';
import { ProjectSummary } from 'src/types/projectSummary';
import { fDate } from 'src/utils/format-time';
import { RouterLink } from 'src/routes/components';

// ----------------------------------------------------------------------

type Props = {
  projectSummary: ProjectSummary;
};

export const ProjectSummaryDetailsHeader = ({ projectSummary }: Props) => {

  const theme = useTheme()

  const [open, setOpen] = useState<HTMLElement | null>(null);

  const handleClose = useCallback(() => {
    setOpen(null);
  }, []);

  // Get current year
  const currentYear = new Date().getFullYear();

  // Group projects by year
  const groupedProjects = Object.entries(
    projectSummary.projectSummaryDescriptions.reduce((acc: { [key: string]: any[] }, desc, index) => {
      const year = new Date(projectSummary.projectSummaryDateTime[index]).getFullYear();

      if (!acc[year]) acc[year] = [];
      acc[year].push(index);

      return acc;
    }, {})
  ).sort(([a], [b]) => Number(a) - Number(b)); // Sort years in descending order

  // Extract available years
  const availableYears = groupedProjects.map(([year]) => Number(year));

  // Determine the default expanded year
  const defaultExpandedYear = availableYears.find((year) => year <= currentYear);

  return (
    <>
      <Stack
        spacing={3}
        direction={{ xs: 'column', md: 'row' }}
        sx={{
          mb: 3,
        }}
      >

        <Box sx={{ display: 'flex', flexDirection: 'column', textAlign: 'justify', mb: '50px' }}>
          <Typography variant="h3" component="h1" sx={{ flexGrow: 1, pr: { md: 10 }, color: theme.palette.text.primary, mb: '50px' }}>
            {projectSummary.title}
          </Typography>

          {groupedProjects.map(([year, projects]: [string, any[]]) => (
            <Accordion key={year} defaultExpanded={Number(year) === defaultExpandedYear}>
              <AccordionSummary expandIcon={<ExpandCircleDownIcon />}>
                <Typography
                  variant="h4"
                  onMouseOver={(e) => (e.currentTarget.style.textShadow = "0 0 10px #fff")}
                  onMouseOut={(e) => (e.currentTarget.style.textShadow = "none")}
                  style={{ cursor: "pointer" }}
                >
                  Projektne aktivnosti iz {year}.
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                {projects.map((index: any) => (
                  <Box key={index} sx={{ display: 'flex', flexDirection: 'column', textAlign: 'justify' }}>
                    <br />
                    <Divider />
                    <br />
                    <Typography sx={{ color: theme.palette.text.disabled }}>
                      {fDate(projectSummary.projectSummaryDateTime[index], 'yyyy/MM/dd')}
                    </Typography>
                    <br />
                    <Typography sx={{ color: theme.palette.text.disabled, fontSize: '1.3rem' }}>
                      {projectSummary.projectSummarySubtitles[index]}
                    </Typography>
                    <br />
                    <Typography variant="body1" component="h6" sx={{
                      flexGrow: 1, pr: { md: 10 }, textAlign: 'justify', color: theme.palette.text.primary
                    }}>
                      {projectSummary.projectSummaryDescriptions[index]}
                      {projectSummary.projectSummarySubtitleURLs[index] && (
                        <Link component={RouterLink} href={projectSummary.projectSummarySubtitleURLs[index]} color={'primary.main'} underline='none' sx={{ marginBottom: '5px' }}>
                          ...pročitaj ostatak teksta.
                        </Link>
                      )}
                    </Typography>
                    <br />
                  </Box>
                ))}
              </AccordionDetails>
            </Accordion>
          ))}

        </Box>
        <Stack direction="row" alignItems="center" flexShrink={0}>
          {/* <IconButton onClick={handleOpen} color={open ? 'primary' : 'default'}>
            <Iconify icon="carbon:share" sx={{ color: theme.palette.text.primary }} />
          </IconButton> */}

          {/* <Checkbox
            color="error"
            sx={{ color: theme.palette.error.light }}
            checked={favorite}
            onChange={handleChangeFavorite}
            icon={<Iconify icon="carbon:favorite" />}
            checkedIcon={<Iconify icon="carbon:favorite-filled" />}
          /> */}
        </Stack>
      </Stack>

      <Stack spacing={3} direction={{ xs: 'column', md: 'row' }}>
        <Stack spacing={0.5} direction="row" alignItems="center">
          <Iconify icon="carbon:star-filled" sx={{ color: 'warning.main' }} />

          {/* <Box sx={{ typography: 'h6' }}>
            {Number.isInteger(ratingNumber) ? `${ratingNumber}.0` : ratingNumber}
          </Box>

          <Link variant="body2" sx={{ color: 'text.secondary' }}>
            ({fShortenNumber(totalReviews)} reviews)
          </Link> */}
        </Stack>

        <Stack direction="row" alignItems="center" sx={{ typography: 'body2', color: theme.palette.text.primary }}>
          <Iconify icon="carbon:location" sx={{ mr: 0.5, color: theme.palette.text.primary }} />
          {projectSummary.locations.join(', ')}
        </Stack>

        <Stack direction="row" alignItems="center">
          {/* <Avatar src={tourGuide?.avatarUrl} sx={{ width: 24, height: 24 }} /> */}

          <Typography variant="body2" sx={{ color: 'text.secondary', mx: 0.5 }}>
            Projekat
          </Typography>

          <Typography variant="subtitle2" color={theme.palette.text.primary}>
            {projectSummary.title}
          </Typography>
        </Stack>
      </Stack>

      <Popover
        open={!!open}
        onClose={handleClose}
        anchorEl={open}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        transformOrigin={{ vertical: 'top', horizontal: 'center' }}
        slotProps={{
          paper: {
            sx: { width: 220, backgroundColor: theme.palette.primary.dark },
          },
        }}
      >
        {_socials.map((social) => (
          <MenuItem key={social.value} onClick={handleClose}>
            <Iconify icon={social.icon} width={24} sx={{ mr: 1, color: social.color }} />
            <Typography sx={{ color: theme.palette.text.primary }}>
              Share via {social.label}
            </Typography>
          </MenuItem>
        ))}
      </Popover>
    </>
  );
}
