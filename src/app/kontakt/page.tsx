import { ContactView } from 'src/sections/view/contact-view';

// ----------------------------------------------------------------------

export const metadata = {
  title: 'LDA Subotica: Contact us',
};

export default function ContactPage() {

  const mapApiKey = process.env.NEXT_PUBLIC_MAP_API!

  return <ContactView mapApiKey={mapApiKey} />;
}
