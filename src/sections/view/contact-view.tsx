'use client';

// import { Newsletter } from '../newsletter';
import { ContactInfo } from '../contact/contact-info';
import { ContactForm } from '../contact/contact-form';
import { Box } from '@mui/material';

// ----------------------------------------------------------------------

export const ContactView = (props: { mapApiKey: string }) => {
  return (
    <Box >

      <ContactInfo />

      <ContactForm mapApiKey={props.mapApiKey} />

      {/* <Newsletter /> */}

    </Box>
  );
}
