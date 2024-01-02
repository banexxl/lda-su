"use client"
import { Box, Divider, Grid, Link, List, ListItem, Typography, useTheme } from "@mui/material"
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';

type PublicationsViewProps = {
     publications: string[];
};

export const PublicationsView = ({ publications }: PublicationsViewProps) => {

     const extractFileName = (url: string) => {
          const parts = url.split('/');
          return parts[parts.length - 1]; // Get the last part (file name)
     };

     const theme = useTheme()

     return (
          <Box>
               <Divider sx={{ mb: '30px' }} />
               <Typography variant="h3" sx={{ color: theme.palette.text.primary, textAlign: 'center' }}>Publikacije</Typography>
               <Box sx={{ width: '100vw' }}>
                    <Grid columns={2}>
                         {publications.map((publicationUrl, index) => (
                              <ListItem key={publicationUrl} sx={{ my: '5px' }}>
                                   <PictureAsPdfIcon sx={{ mr: '5px' }} />
                                   <Link href={publicationUrl} target="_blank" rel="noopener">
                                        <Typography sx={{ fontSize: '.8rem', wordWrap: 'break-word' }}>
                                             {extractFileName(publicationUrl)}
                                        </Typography>
                                   </Link>
                              </ListItem>
                         ))}
                    </Grid>
               </Box>
               <Divider sx={{ mb: '30px' }} />
          </Box>
     )
}

