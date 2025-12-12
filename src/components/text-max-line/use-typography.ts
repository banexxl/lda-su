import { useTheme } from '@mui/material/styles';

import { TypographyPropsVariantOverrides } from '@mui/material/Typography';
import { OverridableStringUnion } from '@mui/types';

type Variant = OverridableStringUnion<
  'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'subtitle1' | 'subtitle2' | 'body1' | 'body2' | 'caption' | 'button' | 'overline',
  TypographyPropsVariantOverrides
>;

import { useWidth } from 'src/hooks/use-responsive';

// ----------------------------------------------------------------------

const remToPx = (value: string) => {
  return Math.round(parseFloat(value) * 16);
}

export const useTypography = (variant: Variant) => {
  const theme = useTheme();

  const breakpoints = useWidth();

  const key = theme.breakpoints.up(breakpoints === 'xl' ? 'lg' : breakpoints);

  const hasResponsive =
    variant === 'h1' ||
    variant === 'h2' ||
    variant === 'h3' ||
    variant === 'h4' ||
    variant === 'h5' ||
    variant === 'h6';

  const getFont: any =
    hasResponsive && (theme.typography as any)[variant][key]
      ? (theme.typography as any)[variant][key]
      : (theme.typography as any)[variant];

  const fontSize = remToPx(getFont.fontSize);

  const lineHeight = Number(theme.typography[variant].lineHeight) * fontSize;

  const { fontWeight, letterSpacing } = theme.typography[variant];

  return { fontSize, lineHeight, fontWeight, letterSpacing };
}
