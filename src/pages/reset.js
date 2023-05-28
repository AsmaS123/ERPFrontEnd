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

const Reset = () => {
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      password: '',
      confirmPassword:''
    },
    validationSchema: Yup.object({
      password: Yup
        .string()
        .max(255)
        .required(
          'Password is required'),
          confirmPassword: Yup
        .string()
        .max(255)
        .required(
        'Confirm Password is required'),    
    }),
    onSubmit: values  => {
      alert(JSON.stringify(values, null, 2));
         Axios.post(`${apiUrl}/login`, values).then(res => {  
          debugger
        
        if(res.status == '201'){
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
                Reset
              </Typography>

            </Box>
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
             <TextField
              error={Boolean(formik.touched.confirmPassword && formik.errors.confirmPassword)}
              fullWidth
              helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
              label="Confirm Password"
              margin="normal"
              name="confirmPassword"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="password"
              value={formik.values.confirmPassword}
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
                Reset
              </Button>
            </Box>
          </form>
        </Container>
      </Box>
    </>
  );
};

export default Reset;
