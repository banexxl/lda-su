import { LightboxExternalProps } from 'yet-another-react-lightbox';

// ----------------------------------------------------------------------

export interface LightBoxProps extends Omit<LightboxExternalProps, 'slides'> {
  slides: LightboxExternalProps['slides'];
  disabledZoom?: boolean;
  disabledVideo?: boolean;
  disabledTotal?: boolean;
  disabledCaptions?: boolean;
  disabledSlideshow?: boolean;
  disabledThumbnails?: boolean;
  disabledFullscreen?: boolean;
  onGetCurrentIndex?: (index: number) => void;
}
