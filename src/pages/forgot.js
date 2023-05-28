import Head from 'next/head';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Box, Button, Container, Grid, Link, TextField, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Facebook as FacebookIcon } from '../icons/facebook';
import { Google as GoogleIcon } from '../icons/google';
import Axios from 'axios';
import apiUrl from '../config/endpoint';

// const apiUrl = "http://127.0.0.1:5000/"; 

const Forgot = () => {
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      email: ''
    },
    validationSchema: Yup.object({
      email: Yup
        .string()
        .email(
          'Must be a valid email')
        .max(255)
        .required(
          'Email is required')
    }),
    onSubmit: values  => {
        router.push('/');
    }
  });

  return (
    <>
      <Head>
        <title>ERP</title>
      </Head>
      <Box
        component="main"
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexGrow: 1,
          minHeight: '100%'
        }}
      >
        <Container maxWidth="sm">
          <form onSubmit={formik.handleSubmit}>
            <Box sx={{ my: 3 }}>
              <Typography
                color="textPrimary"
                variant="h4"
              >
                Forgot Password
              </Typography>

            </Box>
            <TextField
              error={Boolean(formik.touched.email && formik.errors.email)}
              fullWidth
              helperText={formik.touched.email && formik.errors.email}
              label="Email Address"
              margin="normal"
              name="email"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="email"
              value={formik.values.email}
              variant="outlined"
            />
            <Box sx={{ py: 2 }}>
              <Button
                color="primary"
                disabled={formik.isSubmitting}
                fullWidth
                size="large"
                type="submit"
                variant="contained"
              >
                Submit
              </Button>
            </Box>
            <Typography
              color="textSecondary"
              variant="body2"
            >
              {/* Don&apos;t have an account?
              {' '} */}
              <NextLink
                href="/"
              >
                <Link
                  to="/"
                  variant="subtitle2"
                  underline="hover"
                  sx={{
                    cursor: 'pointer'
                  }}
                >
                  Sign In  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </Link>
              </NextLink>
              <NextLink
                href="/reset"
              >
                <Link
                  to="/"
                  variant="subtitle2"
                  underline="hover"
                  sx={{
                    cursor: 'pointer'
                  }}
                >
                  Reset Password
                </Link>
              </NextLink>
            </Typography>
          </form>
        </Container>
      </Box>
    </>
  );
};

export default Forgot;



