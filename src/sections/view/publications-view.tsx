"use client"
import { Box, Divider, Grid, Link, List, ListItem, Typography, useTheme } from "@mui/material"
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';

type PublicationsViewProps = {
     publications: string[];
};

export const PublicationsView = ({ publications }: PublicationsViewProps) => {

     const extractURLName = (url: string) => {
          const parts = url.split('/');
          return parts[parts.length - 1]; // Get the last part (file name)
     };

     const theme = useTheme()

     return (
          <Box>
               <Divider sx={{ mb: '30px' }} />
               <Typography variant="h3" sx={{ color: theme.palette.text.primary, textAlign: 'center' }}>Publikacije</Typography>
               <Box sx={{ width: '100vw' }}>
                    <Grid container spacing={2} sx={{ mt: '20px' }}>
                         {publications.map((publicationUrl, index) => (
                              <Grid item xs={12} xl={6}>
                                   <ListItem key={publicationUrl} sx={{ my: '5px' }}>
                                        <PictureAsPdfIcon sx={{ mr: '5px' }} />
                                        <Link href={publicationUrl} target="_blank" rel="noopener">
                                             <Typography
                                                  sx={{
                                                       fontSize: '.8rem',
                                                       overflowWrap: 'break-word',
                                                       wordBreak: 'break-all',
                                                       maxWidth: '100%',
                                                  }}>
                                                  {extractURLName(publicationUrl)}
                                             </Typography>
                                        </Link>
                                   </ListItem>
                              </Grid>
                         ))}
                    </Grid>
               </Box>
               <Divider sx={{ mb: '30px' }} />
          </Box>
     )
}

