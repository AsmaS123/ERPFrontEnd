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
import { getToken, setToken } from '../service/useToken';

// const apiUrl = "http://127.0.0.1:5000/"; 

const Login = () => {
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: Yup.object({
      email: Yup
        .string()
        .email(
          'Must be a valid email')
        .max(255)
        .required(
          'Email is required'),
      password: Yup
        .string()
        .max(255)
        .required(
          'Password is required')
    }),
    onSubmit: values  => {
      debugger
      // alert(JSON.stringify(values, null, 2));
         Axios.post(`${apiUrl}/login`, values).then(res => {  
          debugger
        
        if(res.status == '201'){
          debugger
          setToken(res.data.token);
          sessionStorage.setItem('sponcer_id', res.data.sponcer_id);
          sessionStorage.setItem('public_id', res.data.public_id);
          // sessionStorage.setItem('token', JSON.stringify(res.data.token));
          router.push('/dashboard');
        }
        // else{
        //   alert('login failed');
        // }
            // toast.success(res.data)  
            // this.bindUserData();  
            // resetForm({})  
        })  
      .catch(err => {  
        alert(err)
        // toast.error('Something went wrong.');  
      });  
      
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
                Sign in
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
            <TextField
              error={Boolean(formik.touched.password && formik.errors.password)}
              fullWidth
              helperText={formik.touched.password && formik.errors.password}
              label="Password"
              margin="normal"
              name="password"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="password"
              value={formik.values.password}
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
                Sign In Now
              </Button>
            </Box>
            <Typography
              color="textSecondary"
              variant="body2"
            >
              Don&apos;t have an account?
              {' '}
              <NextLink
                href="/register"
              >
                <Link
                  to="/register"
                  variant="subtitle2"
                  underline="hover"
                  sx={{
                    cursor: 'pointer'
                  }}
                >
                  Sign Up &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </Link>
              </NextLink>
              <NextLink
                href="/forgot"
              >
                <Link
                  to="/forgot"
                  variant="subtitle2"
                  underline="hover"
                  sx={{
                    cursor: 'pointer'
                  }}
                >
                  Forgot Password
                </Link>
              </NextLink>
            </Typography>
          </form>
        </Container>
      </Box>
    </>
  );
};

export default Login;


