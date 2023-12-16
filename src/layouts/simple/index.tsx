import { HeaderSimple } from '../common/header-simple';

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export const SimpleLayout = ({ children }: Props) => {
  return (
    <>
      <HeaderSimple />

      {children}
    </>
  );
}
