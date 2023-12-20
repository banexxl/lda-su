"use client"
import { Image } from "@mui/icons-material";
import { Box, Grid, ImageListItem, Typography, useTheme } from "@mui/material";
import { useSearchParams } from "next/navigation";


export default function ProfileView(props: any) {

     const theme = useTheme()
     console.log('props in view', props);

     return (
          <Box sx={{ margin: '50px', display: 'flex', justifyContent: 'flex-start', gap: '50px' }}>
               <Box sx={{ borderRadius: '10px', overflow: 'hidden', width: '300px', maxHeight: '300px', boxShadow: `10px 5px 5px ${theme.palette.primary.main}` }}>
                    <ImageListItem >
                         <img
                              src={`/assets/team/stanka-parac-damjanovic.jpg`}
                              alt={"no image"}
                              loading="lazy"
                         />
                    </ImageListItem>
               </Box>

               <Box >
                    <Typography variant="h4">Ime: {props.name}</Typography>
                    <Typography variant="subtitle1" color="textSecondary">
                         Email:{props.email}
                    </Typography>
                    <Typography variant="body1">Age: {props.dateOfBirth}</Typography>
                    <Typography variant="body1">Location: {props.location}</Typography>
                    <Typography variant="body1">Biografija{props.bio}</Typography>
               </Box>
          </Box >
     );
}