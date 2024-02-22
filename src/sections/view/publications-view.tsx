"use client"
import { Box, Divider, Grid, Link, List, ListItem, Typography, useTheme } from "@mui/material"
// import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { Publication } from "src/types/publication";

type PublicationsViewProps = {
     publications: Publication[];
};

export const PublicationsView = ({ publications }: PublicationsViewProps) => {

     const theme = useTheme()

     return (
          <Box>
               <Divider sx={{ mb: '30px' }} />
               <Typography variant="h3" sx={{ color: theme.palette.text.primary, textAlign: 'center' }}>Publikacije</Typography>
               <Box sx={{ width: '100vw', my: '50px' }}>
                    <Grid container spacing={2}>
                         {publications.map((publication, index) => (
                              <Grid item xs={6} md={3} key={index}>
                                   <ListItem sx={{ my: '5px' }}>
                                        <Link href={publication.publicationURL} target="_blank" rel="noopener">
                                             <img src={publication.publicationImageURL} alt={"publication image"} width={180} height={200} style={{ borderRadius: '5px' }} />
                                             <Typography
                                                  sx={{
                                                       fontSize: '.8rem',
                                                       overflowWrap: 'break-word',
                                                       wordBreak: 'break-all',
                                                       maxWidth: '100%',
                                                       textAlign: 'center'
                                                  }}
                                             >
                                                  {publication.publicationTitle}
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

