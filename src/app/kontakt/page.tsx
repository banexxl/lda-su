import { ContactView } from 'src/sections/view/contact-view';
import { generateSeoMetadata } from 'src/lib/seo';

// ----------------------------------------------------------------------

export const metadata = generateSeoMetadata({
  title: 'Contact us',
  description: 'Kontaktirajte LDA Suboticu za pitanja o projektima, aktivnostima, partnerstvima i lokalnim inicijativama.',
  path: '/kontakt',
  keywords: ['kontakt', 'contact', 'LDA Subotica'],
});

export default function ContactPage() {

  const mapApiKey = process.env.NEXT_PUBLIC_MAP_API!

  return <ContactView mapApiKey={mapApiKey} />;
}
