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

const Employee = () => { 

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
         
        </Container>
      </Box>
    </>
  );
};

export default Employee;