"use client"
import { Box, Divider, Grid, Link, List, ListItem, Typography, useTheme, Pagination } from "@mui/material"
import { useState } from "react";
// import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { Publication } from "src/types/publication";

type PublicationsViewProps = {
     publications?: Publication[];
};


export const PublicationsView = ({ publications }: PublicationsViewProps) => {
     const theme = useTheme();
     const [page, setPage] = useState(1);
     const itemsPerPage = theme.breakpoints.up('md') ? 8 : 10;

     const totalPublications = publications ? publications.length : 0;
     const pageCount = Math.ceil(totalPublications / itemsPerPage);

     const handleChange = (_event: React.ChangeEvent<unknown>, value: number) => {
          setPage(value);
     };

     const paginatedPublications = publications
          ? publications.slice((page - 1) * itemsPerPage, page * itemsPerPage)
          : [];

     return (
          <Box>
               <Divider sx={{ mb: '30px' }} />
               <Typography variant="h3" sx={{ color: theme.palette.text.primary, textAlign: 'center' }}>Publikacije</Typography>
               <Box sx={{ width: '100vw', my: '50px' }}>
                    {paginatedPublications && paginatedPublications.length > 0 ? (
                         <>
                              <Grid container spacing={2}>
                                   {paginatedPublications.map((publication, index) => (
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
                              {pageCount > 1 && (
                                   <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                                        <Pagination
                                             count={pageCount}
                                             page={page}
                                             onChange={handleChange}
                                             color="primary"
                                             shape="rounded"
                                        />
                                   </Box>
                              )}
                         </>
                    ) : (
                         <Typography sx={{ textAlign: 'center', color: theme.palette.text.secondary }}>
                              Trenutno nema dostupnih publikacija.
                         </Typography>
                    )}
               </Box>
               <Divider sx={{ mb: '30px' }} />
          </Box>
     );
}

