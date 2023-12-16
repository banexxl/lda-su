'use client';

import { Newsletter } from '../newsletter';
import { ContactInfo } from '../contact/contact-info';
import { ContactForm } from '../contact/contact-form';

// ----------------------------------------------------------------------

export const ContactView = () => {
  return (
    <>
      <ContactInfo />

      <ContactForm />

      <Newsletter />
    </>
  );
}
