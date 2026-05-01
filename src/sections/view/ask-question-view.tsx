'use client';

import * as Yup from 'yup';
import { useState } from 'react';
import { useFormik } from 'formik';
import toast from 'react-hot-toast';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CircularProgress from '@mui/material/CircularProgress';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import Pagination from '@mui/material/Pagination';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { alpha, useTheme } from '@mui/material/styles';
import { QuestionAnswer } from 'src/types/question-answer';

type AskQuestionViewProps = {
     initialQuestions: QuestionAnswer[];
};

type AskQuestionFormValues = {
     fullName: string;
     email: string;
     question: string;
};

const formatDateTime = (value?: Date | string | null) => {
     if (!value) {
          return null;
     }

     const date = new Date(value);

     if (Number.isNaN(date.getTime())) {
          return null;
     }

     return new Intl.DateTimeFormat('sr-RS', {
          dateStyle: 'medium',
          timeStyle: 'short',
     }).format(date);
};

export const AskQuestionView = ({ initialQuestions }: AskQuestionViewProps) => {
     const theme = useTheme();
     const [questions, setQuestions] = useState(initialQuestions);
     const [page, setPage] = useState(1);
     const [questionFilter, setQuestionFilter] = useState('');
     const [answerFilter, setAnswerFilter] = useState<'all' | 'answered' | 'unanswered'>('all');
     const [sortDirection, setSortDirection] = useState<'desc' | 'asc'>('desc');
     const itemsPerPage = 3;

     const AskQuestionSchema = Yup.object().shape({
          fullName: Yup.string().required('Ime i prezime je obavezno'),
          email: Yup.string().required('Email je obavezan').email('Unesite ispravnu email adresu'),
          question: Yup.string().required('Pitanje je obavezno').min(10, 'Pitanje mora imati barem 10 karaktera'),
     });

     const formik = useFormik<AskQuestionFormValues>({
          initialValues: {
               fullName: '',
               email: '',
               question: '',
          },
          validationSchema: AskQuestionSchema,
          onSubmit: async (values, helpers) => {
               try {
                    const response = await fetch('/api/send-question', {
                         method: 'POST',
                         headers: {
                              Accept: 'application/json',
                              'Content-Type': 'application/json',
                         },
                         body: JSON.stringify(values),
                    });

                    const result = await response.json();

                    if (!response.ok) {
                         if (response.status === 429) {
                              throw new Error('Previše zahteva. Sačekajte malo pa pokušajte ponovo.');
                         }

                         throw new Error(result.message || result.statusText || 'Pitanje nije poslato!');
                    }

                    setQuestions((currentQuestions) => [result.question, ...currentQuestions]);
                    setPage(1);
                    helpers.resetForm();
                    toast.success('Pitanje je uspešno poslato. Uskoro ćemo Vam odgovoriti!');
               } catch (error: any) {
                    toast.error(error.message || 'Došlo je do greške prilikom slanja pitanja.');
               } finally {
                    helpers.setSubmitting(false);
               }
          },
     });

     const normalizedQuestionFilter = questionFilter.trim().toLowerCase();

     const filteredQuestions = questions.filter((item) => {
          const hasAnswer = Boolean(item.answer && item.answer.trim());

          if (answerFilter === 'answered' && !hasAnswer) {
               return false;
          }

          if (answerFilter === 'unanswered' && hasAnswer) {
               return false;
          }

          if (!normalizedQuestionFilter) {
               return true;
          }

          return item.question.toLowerCase().includes(normalizedQuestionFilter);
     });

     const sortedQuestions = [...filteredQuestions].sort((firstItem, secondItem) => {
          const firstTimestamp = new Date(firstItem.questionDateTime).getTime();
          const secondTimestamp = new Date(secondItem.questionDateTime).getTime();

          return sortDirection === 'desc'
               ? secondTimestamp - firstTimestamp
               : firstTimestamp - secondTimestamp;
     });

     const pageCount = Math.ceil(sortedQuestions.length / itemsPerPage);
     const paginatedQuestions = sortedQuestions.slice((page - 1) * itemsPerPage, page * itemsPerPage);

     const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
          setQuestionFilter(event.target.value);
          setPage(1);
     };

     const handleSortChange = (event: React.ChangeEvent<HTMLInputElement>) => {
          setSortDirection(event.target.value as 'desc' | 'asc');
          setPage(1);
     };

     const handleAnswerFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
          setAnswerFilter(event.target.value as 'all' | 'answered' | 'unanswered');
          setPage(1);
     };

     const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
          setPage(value);
     };

     return (
          <Container sx={{ py: { xs: 6, md: 10 } }}>
               <Grid container spacing={4} alignItems="flex-start">
                    <Grid size={{ xs: 12, md: 5 }}>
                         <Paper
                              sx={{
                                   p: { xs: 3, md: 4 },
                                   borderRadius: 3,
                                   border: `1px solid ${alpha(theme.palette.primary.main, 0.16)}`,
                              }}
                         >
                              <Stack spacing={3}>
                                   <Box>
                                        <Typography variant="h3" sx={{ mb: 1 }}>
                                             Postavite pitanje
                                        </Typography>
                                        <Typography color="text.secondary">
                                             Pošaljite ime, email adresu i pitanje. Odgovori na pristigla pitanja biće prikazani desno čim budu dostupni.
                                        </Typography>
                                   </Box>

                                   <form onSubmit={formik.handleSubmit}>
                                        <Stack spacing={2.5}>
                                             <TextField
                                                  fullWidth
                                                  name="fullName"
                                                  label="Ime i prezime"
                                                  value={formik.values.fullName}
                                                  onChange={formik.handleChange}
                                                  onBlur={formik.handleBlur}
                                                  error={formik.touched.fullName && Boolean(formik.errors.fullName)}
                                                  helperText={formik.touched.fullName && formik.errors.fullName}
                                             />

                                             <TextField
                                                  fullWidth
                                                  name="email"
                                                  label="Email adresa"
                                                  value={formik.values.email}
                                                  onChange={formik.handleChange}
                                                  onBlur={formik.handleBlur}
                                                  error={formik.touched.email && Boolean(formik.errors.email)}
                                                  helperText={formik.touched.email && formik.errors.email}
                                             />

                                             <TextField
                                                  fullWidth
                                                  name="question"
                                                  label="Vaše pitanje"
                                                  multiline
                                                  rows={6}
                                                  value={formik.values.question}
                                                  onChange={formik.handleChange}
                                                  onBlur={formik.handleBlur}
                                                  error={formik.touched.question && Boolean(formik.errors.question)}
                                                  helperText={formik.touched.question && formik.errors.question}
                                             />

                                             <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
                                                  <Button
                                                       type="submit"
                                                       variant="contained"
                                                       size="large"
                                                       disabled={formik.isSubmitting}
                                                       sx={{
                                                            bgcolor: 'grey.900',
                                                            color: 'common.white',
                                                            '&:hover': {
                                                                 bgcolor: 'grey.800',
                                                            },
                                                            '&.Mui-disabled': {
                                                                 bgcolor: 'grey.700',
                                                                 color: 'common.white',
                                                            },
                                                       }}
                                                  >
                                                       {formik.isSubmitting ? (
                                                            <>
                                                                 <CircularProgress size={18} thickness={5} sx={{ color: 'common.white', mr: 1.25 }} />
                                                                 Slanje...
                                                            </>
                                                       ) : 'Pošalji pitanje'}
                                                  </Button>
                                             </Box>
                                        </Stack>
                                   </form>
                              </Stack>
                         </Paper>
                    </Grid>

                    <Grid size={{ xs: 12, md: 7 }}>
                         <Paper
                              sx={{
                                   p: { xs: 3, md: 4 },
                                   borderRadius: 3,
                                   background: `linear-gradient(180deg, ${alpha(theme.palette.primary.light, 0.12)} 0%, ${alpha(theme.palette.background.paper, 0.96)} 100%)`,
                              }}
                         >
                              <Stack spacing={2.5}>
                                   <Box>
                                        <Typography variant="h4" sx={{ mb: 1 }}>
                                             Pitanja i odgovori
                                        </Typography>
                                        <Typography color="text.secondary">
                                             Najnovija pitanja su prikazana prva. Ako odgovor još nije dodat, pitanje ostaje vidljivo dok ne bude obrađeno.
                                        </Typography>
                                   </Box>

                                   <Grid container spacing={2}>
                                        <Grid size={{ xs: 12, md: 4 }}>
                                             <TextField
                                                  fullWidth
                                                  label="Filtriraj po pitanju"
                                                  placeholder="Unesite deo pitanja"
                                                  value={questionFilter}
                                                  onChange={handleFilterChange}
                                             />
                                        </Grid>

                                        <Grid size={{ xs: 12, md: 4 }}>
                                             <TextField
                                                  select
                                                  fullWidth
                                                  label="Status odgovora"
                                                  value={answerFilter}
                                                  onChange={handleAnswerFilterChange}
                                             >
                                                  <MenuItem value="all">Sva pitanja</MenuItem>
                                                  <MenuItem value="answered">Odgovorena</MenuItem>
                                                  <MenuItem value="unanswered">Neodgovorena</MenuItem>
                                             </TextField>
                                        </Grid>

                                        <Grid size={{ xs: 12, md: 4 }}>
                                             <TextField
                                                  select
                                                  fullWidth
                                                  label="Sortiraj po datumu"
                                                  value={sortDirection}
                                                  onChange={handleSortChange}
                                             >
                                                  <MenuItem value="desc">Najnovije prvo</MenuItem>
                                                  <MenuItem value="asc">Najstarije prvo</MenuItem>
                                             </TextField>
                                        </Grid>
                                   </Grid>

                                   <Stack spacing={2.5}>
                                        {paginatedQuestions.length > 0 ? paginatedQuestions.map((item) => {
                                             const questionDate = formatDateTime(item.questionDateTime);
                                             const answerDate = formatDateTime(item.answerDateTime);
                                             const hasAnswer = Boolean(item.answer && item.answer.trim());

                                             return (
                                                  <Paper
                                                       key={item._id ?? `${item.email}-${item.questionDateTime}`}
                                                       variant="outlined"
                                                       sx={{
                                                            p: 2.5,
                                                            borderRadius: 2.5,
                                                            borderColor: alpha(theme.palette.primary.main, 0.14),
                                                       }}
                                                  >
                                                       <Stack spacing={1.5}>
                                                            <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2, flexWrap: 'wrap' }}>
                                                                 <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                                                                      {item.fullName}
                                                                 </Typography>
                                                                 {questionDate && (
                                                                      <Typography variant="body2" color="text.secondary">
                                                                           Postavljeno: {questionDate}
                                                                      </Typography>
                                                                 )}
                                                            </Box>

                                                            <Typography variant="body2" color="text.secondary">
                                                                 {item.email}
                                                            </Typography>

                                                            <Box>
                                                                 <Typography variant="overline" color="text.secondary">
                                                                      Pitanje
                                                                 </Typography>
                                                                 <Typography>
                                                                      {item.question}
                                                                 </Typography>
                                                            </Box>

                                                            <Divider />

                                                            <Box>
                                                                 <Typography variant="overline" color="text.secondary">
                                                                      Odgovor
                                                                 </Typography>
                                                                 <Typography color={hasAnswer ? 'text.primary' : 'text.secondary'}>
                                                                      {hasAnswer ? item.answer : 'Odgovor će biti dodat uskoro.'}
                                                                 </Typography>
                                                                 {answerDate && (
                                                                      <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1 }}>
                                                                           Odgovoreno: {answerDate}
                                                                      </Typography>
                                                                 )}
                                                            </Box>
                                                       </Stack>
                                                  </Paper>
                                             );
                                        }) : (
                                             <Typography color="text.secondary">
                                                  {questions.length > 0 ? 'Nema rezultata za zadati filter.' : 'Još nema postavljenih pitanja.'}
                                             </Typography>
                                        )}
                                   </Stack>

                                   {pageCount > 1 && (
                                        <Box sx={{ display: 'flex', justifyContent: 'center', pt: 1 }}>
                                             <Pagination
                                                  count={pageCount}
                                                  page={page}
                                                  onChange={handlePageChange}
                                                  color="primary"
                                                  shape="rounded"
                                             />
                                        </Box>
                                   )}
                              </Stack>
                         </Paper>
                    </Grid>
               </Grid>
          </Container>
     );
};