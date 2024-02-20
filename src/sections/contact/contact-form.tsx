import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import Swal, { SweetAlertResult } from 'sweetalert2'
import { useResponsive } from 'src/hooks/use-responsive';

import Image from 'src/components/image';
import { FormProvider, RHFTextField } from 'src/components/hook-form';
import { ContactMap } from './contact-map';
import { Box } from '@mui/material';

// ----------------------------------------------------------------------

export const ContactForm = () => {
  const mdUp = useResponsive('up', 'md');

  const ContactSchema = Yup.object().shape({
    fullName: Yup.string().required('Full name is required'),
    email: Yup.string().required('Email is required').email('That is not an email'),
    subject: Yup.string().required('Subject is required'),
    message: Yup.string().required('Message is required'),
  });

  const defaultValues = {
    fullName: '',
    subject: '',
    email: '',
    message: '',
  };

  const methods = useForm({
    resolver: yupResolver(ContactSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {

    try {
      reset();
      await fetch('/api/send-contact-email', {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify(data)
      }).then(async (response: Response) => {
        console.log(await response.json());

        if (response.ok) {
          Swal.fire({
            title: 'Hvala Vam na kontaktu!',
            text: 'Poruka poslata!',
            icon: 'success',
            confirmButtonText: '<i class="fa fa-thumbs-up"></i> OK!',
            confirmButtonAriaLabel: 'Thumbs up, great!',
            showCloseButton: true,
          }).then((result: SweetAlertResult) => {
            result.isConfirmed ?
              window.location.href = '/kontakt'
              : null
          })
        } else {
          Swal.fire({
            title: 'Eh!',
            text: 'Poruka iz nekog razloga nije poslata!',
            icon: 'error',
            confirmButtonText: '<i class="fa fa-thumbs-up"></i> OK!',
            confirmButtonAriaLabel: 'Thumbs down',
            showCloseButton: true,
          })
        }
      })
    } catch (error: any) {
      console.log(error)
    }
  })

  return (
    <Container
      sx={{
        py: { xs: 5, md: 15 },
      }}
    >

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <Stack
          spacing={2}
          sx={{
            mb: 5,
            textAlign: { xs: 'center', md: 'left' },
          }}
        >
          <Typography variant="h3">Budite slobodni nam pišete</Typography>

          <Typography sx={{ color: 'text.secondary' }}>
            Očekujte odgovor u roku od dva radna dana
          </Typography>
        </Stack>
        <FormProvider methods={methods} onSubmit={onSubmit}>
          <Stack spacing={2.5} alignItems="flex-start">
            <RHFTextField name="fullName" label="Ime i prezime" />

            <RHFTextField name="email" label="Email" />

            <RHFTextField name="subject" label="Tema poruke" />

            <RHFTextField name="message" multiline rows={4} label="Poruka" sx={{ pb: 2.5 }} />

            <LoadingButton
              size="large"
              type="submit"
              variant="contained"

              loading={isSubmitting}
              sx={{
                alignSelf: { xs: 'center', md: 'unset' },
              }}
            >
              Send
            </LoadingButton>
          </Stack>
        </FormProvider>
        <ContactMap mapApiKey={process.env.NEXT_PUBLIC_MAP_API!} />
      </Box>
    </Container >
  );
}
