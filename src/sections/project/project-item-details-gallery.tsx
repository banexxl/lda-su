import { m } from 'framer-motion';

import Box from '@mui/material/Box';

import Image from 'src/components/image';
import { varTranHover } from 'src/components/animate';
import { Lightbox, useLightbox } from 'src/components/lightbox';

// ----------------------------------------------------------------------

type Props = {
  gallery?: string[];
};

export const ProjectDetailsGallery = ({ gallery }: Props) => {
  const slides = Array.isArray(gallery)
    ? gallery.map((slide) => ({ src: slide }))
    : [];

  const lightbox = useLightbox(slides);

  return (
    <>
      <Box
        sx={{
          gap: 1,
          display: 'grid',
          gridTemplateColumns: {
            xs: 'repeat(1, 1fr)',
            md: 'repeat(2, 1fr)',
          },
          mb: { xs: 5, md: 10 },
        }}
      >
        {
          slides.length > 0 ?
            <PhotoItem photo={slides[0].src} onOpenLightbox={() => lightbox.onOpen(slides[0].src)} />
            :
            null
        }
        <Box
          sx={{
            gap: 1,
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
          }}
        >
          {slides.slice(1, 10).map((slide) => (
            <PhotoItem
              key={slide.src}
              photo={slide.src}
              onOpenLightbox={() => lightbox.onOpen(slide.src)}
            />
          ))}
        </Box>
      </Box>

      <Lightbox
        index={lightbox.selected}
        slides={slides}
        open={lightbox.open}
        close={lightbox.onClose}
      />
    </>
  );
}

// ----------------------------------------------------------------------

type PhotoItemProps = {
  photo: string;
  onOpenLightbox: VoidFunction;
};

export const PhotoItem = ({ photo, onOpenLightbox }: PhotoItemProps) => {
  return (
    <m.div
      whileHover="hover"
      variants={{
        hover: { opacity: 0.8 },
      }}
      transition={varTranHover()}
    >
      <Image
        alt="photo"
        src={photo}
        //ratio="1/1"
        onClick={onOpenLightbox}
        sx={{ borderRadius: 2, cursor: 'pointer', height: '100%', width: 'auto' }}
      />
    </m.div >
  );
}
