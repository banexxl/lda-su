import { LinkProps } from '@mui/material/Link';
import { TypographyProps, TypographyPropsVariantOverrides } from '@mui/material/Typography';
import { OverridableStringUnion } from '@mui/types';

// ----------------------------------------------------------------------

type IProps = TypographyProps & LinkProps;

export interface TextMaxLineProps extends IProps {
  line?: number;
  asLink?: boolean;
  persistent?: boolean;
  children: React.ReactNode;
  variant?: OverridableStringUnion<
    'inherit' | 'button' | 'caption' | 'overline' | 'subtitle1' | 'subtitle2' | 'body1' | 'body2' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6',
    TypographyPropsVariantOverrides
  >;
}
