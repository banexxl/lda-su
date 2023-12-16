import { Error500View } from 'src/sections/error/500-view';

// ----------------------------------------------------------------------

export const metadata = {
  title: '500 Internal Server Error',
};

export const Page500 = () => {
  return <Error500View />;
}
