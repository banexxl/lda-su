"use client"
import { Box, Divider, Grid, Link, List, ListItem, Typography, useTheme } from "@mui/material"
// import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { Publication } from "src/types/publication";

type PublicationsViewProps = {
     publications?: Publication[];
};

export const PublicationsView = ({ publications }: PublicationsViewProps) => {

     const theme = useTheme()

     return (
          <Box>
               <Divider sx={{ mb: '30px' }} />
               <Typography variant="h3" sx={{ color: theme.palette.text.primary, textAlign: 'center' }}>Publikacije</Typography>
               <Box sx={{ width: '100vw', my: '50px' }}>
                    {publications && publications.length > 0 ? (
                         <Grid container spacing={2}>
                              {publications.map((publication, index) => (
                                   <Grid size={{ xs: 6, md: 3 }} key={index}>
                                        <ListItem sx={{ my: '5px' }}>
                                             <Link href={publication.publicationURL} target="_blank" rel="noopener">
                                                  <img src={publication.publicationImageURL} alt={"publication image"} width={180} height={200} style={{ borderRadius: '5px' }} />
                                                  <Typography
                                                       sx={{
                                                            fontSize: '.8rem',
                                                            overflowWrap: 'break-word',
                                                            wordBreak: 'break-all',
                                                            maxWidth: '180px',
                                                            textAlign: 'center',
                                                            color: theme.palette.text.primary
                                                       }}
                                                  >
                                                       {publication.publicationTitle}
                                                  </Typography>
                                             </Link>
                                        </ListItem>
                                   </Grid>
                              ))}
                         </Grid>
                    ) : (
                         <Typography sx={{ textAlign: 'center', color: theme.palette.text.secondary }}>
                              Trenutno nema dostupnih publikacija.
                         </Typography>
                    )}
               </Box>
               <Divider sx={{ mb: '30px' }} />
          </Box>
     )
}

