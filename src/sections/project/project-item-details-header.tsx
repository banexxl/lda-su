import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { _socials } from 'src/_mock';
import Iconify from 'src/components/iconify';
import { Project } from 'src/types/project';
import { Divider, List, ListItem, ListItemIcon, ListItemText, useTheme } from '@mui/material';
import { fDate } from 'src/utils/format-time';
import moment from 'moment';
import { normalizeQuillHtml } from 'src/utils/html-to-text';
import { useMemo } from 'react';
import DOMPurify from 'dompurify';


// ----------------------------------------------------------------------

type Props = {
  project: Project;
};

export const ProjectDetailsHeader = ({ project }: Props) => {

  const theme = useTheme()

  const safeHtml = useMemo(() => {
    const normalized = normalizeQuillHtml(project.quillEditorData ?? '');
    // allow harmless formatting attributes Quill uses
    return DOMPurify.sanitize(normalized, {
      USE_PROFILES: { html: true },
      ALLOWED_ATTR: [
        'class', 'style', 'href', 'target', 'rel', 'alt', 'title',
        'src', 'width', 'height', 'dir', 'spellcheck'
      ],
    });
  }, [project.quillEditorData]);

  return (
    <>
      <Stack
        spacing={3}
        direction={{ xs: 'column', md: 'row' }}
        sx={{
          mb: 3,
        }}
      >
        {
          project.quillEditorData !== '' ?
            <Box
              className="quill-content"
              sx={{ color: theme.palette.text.primary }}
              // eslint-disable-next-line react/no-danger
              dangerouslySetInnerHTML={{ __html: safeHtml }}
            />
            :
            <Box sx={{ display: 'flex', flexDirection: 'column', textAlign: 'justify' }}>
              <Typography variant="h3" component="h1" sx={{ flexGrow: 1, pr: { md: 10 }, color: theme.palette.text.primary }}>
                {project.title}
              </Typography>
              <br />
              <Typography sx={{ color: theme.palette.text.disabled }}>
                {project.subTitle}
              </Typography>
              <br />
              <Typography variant="caption" sx={{ opacity: 0.72 }}>
                Objavljeno: {fDate(project.published, 'yyyy/MM/dd')}
              </Typography>
              <Divider />
              {project.showProjectDetails ?
                <Box>
                  <br />
                  <Typography sx={{ fontWeight: 'bold' }}>
                    NAZIV PROJEKTA:
                  </Typography> {project.subTitle}
                  <Typography sx={{ fontWeight: 'bold' }}>
                    NOSILAC PROJEKTA:
                  </Typography>{(project.applicants ?? []).join(', ')}
                  <Typography sx={{ fontWeight: 'bold' }}>
                    PARTNERI:
                  </Typography >{(project.organizers ?? []).join(', ')}
                  <Typography sx={{ fontWeight: 'bold' }}>
                    DONATOR:
                  </Typography>{(project.donators ?? []).join(', ')}
                  {project.dateFrom != undefined && (project.subOrganizers?.length ?? 0) > 0 ?
                    <Box>
                      <Typography>
                        PERIOD IMPLEMENTACIJE: {moment(project.dateFrom).format('DD/MM/yyyy')} - {moment(project.dateTo).format('DD/MM/yyyy')}
                      </Typography>
                      <Typography>
                        PRIDRUŽENI PARTNERI: {(project.subOrganizers ?? []).join(', ')}
                      </Typography>
                    </Box>
                    : null
                  }
                </Box>
                : null
              }
              <br />
              {
                project.list.length > 0 && !project.showListOnBottom && (
                  <List dense sx={{
                    flexGrow: 1, pr: { md: 10 }, textAlign: 'justify', color: theme.palette.text.primary
                  }}>
                    <Typography>
                      {project.listTitle}
                    </Typography>
                    {project.list.map((item, index) => (
                      <ListItem disablePadding key={index} style={{ display: 'flex', alignItems: 'flex-start' }}>
                        <ListItemIcon style={{ display: 'flex', alignItems: 'flex-start' }}>
                          <Typography variant="body2" color="textSecondary">
                            {index + 1}.
                          </Typography>
                        </ListItemIcon>
                        <ListItemText primary={item} style={{ display: 'flex', alignItems: 'flex-start' }} />
                      </ListItem>
                    ))}
                  </List>
                )
              }
              <br />
              {(project.paragraphs ?? []).map((paragraph, index) => (
                <Typography
                  key={index}
                  variant="body1"
                  component="h6"
                  sx={{
                    flexGrow: 1,
                    pr: { md: 10 },
                    textAlign: 'justify',
                    color: theme.palette.text.primary,
                  }}
                >
                  {paragraph}
                  <br />
                  <br />
                </Typography>
              ))}
              <br />
              {
                project.list.length > 0 && project.showListOnBottom && (
                  <List dense sx={{
                    flexGrow: 1, pr: { md: 10 }, textAlign: 'justify', color: theme.palette.text.primary
                  }}>
                    <Typography>
                      {project.listTitle}
                    </Typography>
                    {project.list.map((item, index) => (
                      <ListItem disablePadding key={index} style={{ display: 'flex', alignItems: 'flex-start' }}>
                        <ListItemIcon style={{ display: 'flex', alignItems: 'flex-start' }}>
                          <Typography variant="body2" color="textSecondary">
                            {index + 1}.
                          </Typography>
                        </ListItemIcon>
                        <ListItemText primary={item} style={{ display: 'flex', alignItems: 'flex-start' }} />
                      </ListItem>
                    ))}
                  </List>
                )
              }

              {
                project.hasTranslation && (
                  <Box sx={{ display: 'flex', flexDirection: 'column', textAlign: 'justify' }}>
                    <Divider />
                    <Typography variant="h3" component="h1" sx={{ flexGrow: 1, pr: { md: 10 }, color: theme.palette.text.primary }}>
                      {project.title_eng}
                    </Typography>
                    <br />
                    <Typography sx={{ color: theme.palette.text.disabled }}>
                      {project.subTitle_eng}
                    </Typography>
                    <br />
                    <Typography variant="caption" sx={{ opacity: 0.72 }}>
                      Published: {fDate(project.published, 'yyyy/MM/dd')}
                    </Typography>
                    <Divider sx={{ mt: 3, mb: 3 }} />
                    {(project.paragraphs_eng ?? []).map((paragraph, index) => (
                      <Typography
                        key={index}
                        variant="body1"
                        component="h6"
                        sx={{
                          flexGrow: 1,
                          pr: { md: 10 },
                          textAlign: 'justify',
                          color: theme.palette.text.primary,
                        }}
                      >
                        {paragraph}
                        <br />
                        <br />
                      </Typography>
                    ))}
                    <Divider />
                  </Box>
                )
              }
            </Box>
        }
      </Stack>

      <Stack spacing={3} direction={{ xs: 'column', md: 'row' }}>
        <Stack spacing={0.5} direction="row" alignItems="center">
          <Iconify icon="carbon:star-filled" sx={{ color: 'warning.main' }} />
        </Stack>

        <Stack direction="row" alignItems="center" sx={{ typography: 'body2', color: theme.palette.text.primary }}>
          <Iconify icon="carbon:location" sx={{ mr: 0.5, color: theme.palette.text.primary }} />
          {(project.locations ?? []).join(', ')}
        </Stack>

        <Stack direction="row" alignItems="center">
          {/* <Avatar src={tourGuide?.avatarUrl} sx={{ width: 24, height: 24 }} /> */}

          <Typography variant="body2" sx={{ color: 'text.secondary', mx: 0.5 }}>
            Projekat
          </Typography>

          <Link variant="subtitle2" color={theme.palette.text.primary} href={project.projectSummaryURL} sx={{ cursor: 'pointer' }}>
            {project.subTitle}
          </Link>
        </Stack>
      </Stack>
    </>
  );
}
