"use client"
import { Box, Divider, Link, List, ListItem, Typography, useTheme } from "@mui/material"
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
               <Box >
                    <List>
                         {publications.map((publicationUrl, index) => (
                              <ListItem key={index}>
                                   <PictureAsPdfIcon sx={{ mr: '5px' }} />
                                   <Link href={publicationUrl} target="_blank" rel="noopener">
                                        <Typography sx={{ fontSize: '.8rem', wordWrap: 'break-word', display: 'inline-block' }}>
                                             {extractFileName(publicationUrl)}
                                        </Typography>
                                   </Link>
                              </ListItem>
                         ))}
                    </List>
               </Box>
               <Divider sx={{ mb: '30px' }} />
          </Box>
     )
}

