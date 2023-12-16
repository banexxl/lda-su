import { ReactPlayerProps } from 'react-player';

import { StyledReactPlayer } from './styles';

// ----------------------------------------------------------------------

// https://github.com/CookPete/react-player

export const Player = ({ ...other }: ReactPlayerProps) => {
  return <StyledReactPlayer {...other} />;
}
