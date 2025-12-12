"use client";

import * as Yup from 'yup';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useFormik } from 'formik';
import TextField from '@mui/material/TextField';
import { ContactMap } from './contact-map';
import Box from '@mui/material/Box';
import toast from 'react-hot-toast';

// ----------------------------------------------------------------------

export const ContactForm = (props: { mapApiKey: string }) => {
  type ContactFormValues = {
    fullName: string;
    email: string;
    subject: string;
    message: string;
  };

  const ContactSchema = Yup.object().shape({
    fullName: Yup.string().required('Full name is required'),
    email: Yup.string().required('Email is required').email('That is not an email'),
    subject: Yup.string().required('Subject is required'),
    message: Yup.string().required('Message is required'),
  });

  const formik = useFormik<ContactFormValues>({
    initialValues: {
      fullName: '',
      email: '',
      subject: '',
      message: '',
    },
    validationSchema: ContactSchema,
    onSubmit: async (values: ContactFormValues) => {
      try {
        const response = await fetch('/api/send-contact-email', {
          method: "POST",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        });

        if (response.ok) {
          formik.resetForm();
          toast.success('Poruka poslata! Hvala Vam na kontaktu!');
        } else {
          toast.error('Poruka iz nekog razloga nije poslata!');
        }
      } catch (error: any) {
        toast.error('Došlo je do greške prilikom slanja poruke.');
      } finally {
        formik.setSubmitting(false);
      }
    },
  });

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
        <form onSubmit={formik.handleSubmit} style={{ width: '100%' }}>
          <Stack spacing={2.5} alignItems="flex-start">
            <TextField
              name="fullName"
              label="Ime i prezime"
              value={formik.values.fullName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.fullName && Boolean(formik.errors.fullName)}
              helperText={formik.touched.fullName && formik.errors.fullName}
            />

            <TextField
              name="email"
              label="Email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />

            <TextField
              name="subject"
              label="Tema poruke"
              value={formik.values.subject}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.subject && Boolean(formik.errors.subject)}
              helperText={formik.touched.subject && formik.errors.subject}
            />

            <TextField
              name="message"
              multiline
              rows={4}
              label="Poruka"
              sx={{ pb: 2.5 }}
              value={formik.values.message}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.message && Boolean(formik.errors.message)}
              helperText={formik.touched.message && formik.errors.message}
            />

            <Button
              size="large"
              type="submit"
              variant="contained"
              color='primary'
              disabled={formik.isSubmitting}
              sx={{
                alignSelf: { xs: 'center', md: 'unset' },
              }}
            >
              Pošalji poruku
            </Button>
          </Stack>
        </form>
        <ContactMap mapApiKey={props.mapApiKey} />
      </Box>
    </Container>
  );
}
