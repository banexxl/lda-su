import React, { useEffect, useRef, useState } from 'react'
import { Loader } from "@googlemaps/js-api-loader"
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material';

export type ContactPageProps = {
     mapApiKey: string
}

export const ContactMap = (props: ContactPageProps) => {

     const theme = useTheme()
     //const mapContainer = useRef(null);
     //const map = useRef<maplibregl.Map>();
     const [lat, setLat] = useState(46.10198678304014)
     const [lng, setLng] = useState(19.664961012691393)
     //const [currentLocation, setCurrentLocation] = useState<GeolocationPosition>()

     //GOOGLE MAPS
     const mapRef = useRef<HTMLDivElement>(null);

     useEffect(() => {
          const loader = new Loader({
               apiKey: props.mapApiKey,
               version: 'weekly',
          });

          loader.load().then(() => {
               const map = new google.maps.Map(mapRef.current!, {
                    center: { lat, lng },
                    zoom: 14,
               });

               new google.maps.Marker({
                    position: { lat, lng },
                    map,
               });
          });
     }, [lat, lng, props.mapApiKey]);


     ///////////////////////////////////////////////
     // const options = {
     //           enableHighAccuracy: true,
     //           timeout: 5000,
     //           maximumAge: 0
     // };

     // function success(pos: GeolocationPosition) {
     //           setCurrentLocation(pos)
     // }

     // function error(err: any) {
     //           console.warn(`ERROR(${err.code}): ${err.message}`);
     // }

     // navigator.geolocation.getCurrentPosition(success, error, options);

     // useEffect(() => {
     //           if (map.current) return; //stops map from intializing more than once
     //           map.current = new maplibregl.Map({
     //                     container: mapContainer.current!,
     //                     style: `https://api.maptiler.com/maps/streets-v2/style.json?key=${props.mapApiKey}`,
     //                     center: [lng, lat],
     //                     zoom: 18,
     //                     maplibreLogo: false,
     //           });

     //           map.current.addControl(new maplibregl.NavigationControl({ showZoom: true, showCompass: true }), 'top-left');
     //           new maplibregl.Marker({ color: Colors.primary })
     //                     .setLngLat([20.912097948648388, 44.01262879017728])
     //                     .addTo(map.current)

     //           return () => {
     //                     map.current?.remove;
     //           }
     // });

     return (

          <Box ref={mapRef} sx={{ boxShadow: `10px 10px 5px ${theme.palette.primary.dark}`, borderRadius: '10px', width: { md: '500px', xs: '80%' }, height: { md: '500px', xs: '200px' } }} />

     )
}
