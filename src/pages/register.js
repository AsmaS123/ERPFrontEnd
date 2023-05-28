import Head from 'next/head';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useState ,useEffect} from 'react';
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormHelperText,
  Link,
  TextField,
  Typography,
  Grid
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Axios from 'axios';
import apiUrl from '../config/endpoint';
// const apiUrl = "http://127.0.0.1:5000/"; 



const Register = () => {
  const router = useRouter();
  const utcStr = new Date();
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);

  useEffect(() => {

  }, []) 

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      contactNo :'',
      country:'',
      state:'',
      address:'',
      city:'',
      pinCode:'',
      nominee:'',
      dateTime:utcStr,
      policy: false
    },
    validationSchema: Yup.object({
      email: Yup
        .string()
        .email(
          'Must be a valid email')
        .max(255)
        .required(
          'Email is required'),
      firstName: Yup
        .string()
        .max(255)
        .required(
          'First name is required'),
      lastName: Yup
        .string()
        .max(255)
        .required(
          'Last name is required'),
      password: Yup
        .string()
        .max(255)
        .required(
          'Password is required'),
      contactNo: Yup
      .string()
      .max(10)
      .required(
        'contactNo is required'),
        country: Yup
      .string()
      .required(
        'Country is required'),
      state: Yup
      .string()
      .required(
        'State is required'),
        address: Yup
      .string()
      .required(
        'address is required'),
      city: Yup
      .string()
      .required(
        'City is required'),
      pinCode: Yup
      .string()
      .required(
        'Pin Code is required'),
      nominee: Yup
      .string()
      .required(
        'Nominee is required'),
      policy: Yup
        .boolean()
        .oneOf(
          [true],
          'This field must be checked'
        )
    }),

    onSubmit: values  => {
      alert(JSON.stringify(values, null, 2));
         Axios.post(`${apiUrl}/signup`, values).then(res => {  
          debugger
        alert(res.data);
        router.push('/');
            // toast.success(res.data)  
            // this.bindUserData();  
            // resetForm({})  
        })  
      .catch(err => {  
        alert(err)
        // toast.error('Something went wrong.');  
      });  
      // router.push('/');
    }
  });

  const handleChangeCountry = (event) =>{
    if(event.target.value == "IN"){
      setStates(stateList)
    }
    else{
      setStates([])
    }
    formik.setFieldValue('country', event.target.value);
    formik.setFieldValue('state', '');
  }


  const handleChangeState = (event) =>{
    formik.setFieldValue('state', event.target.value);
  }


const stateList = [
{"label": "AN","value": "Andaman and Nicobar Islands"},
{"label": "AP","value": "Andhra Pradesh"},
{"label": "AR","value": "Arunachal Pradesh"},
{"label": "AS","value": "Assam"},
{"label": "BR","value": "Bihar"},
{"label": "CG","value": "Chandigarh"},
{"label": "CH","value": "Chhattisgarh"},
{"label": "DH","value": "Dadra and Nagar Haveli"},
{"label": "DD","value": "Daman and Diu"},
{"label": "DL","value": "Delhi"},
{"label": "GA","value": "Goa"},
{"label": "GJ","value": "Gujarat"},
{"label": "HR","value": "Haryana"},
{"label": "HP","value": "Himachal Pradesh"},
{"label": "JK","value": "Jammu and Kashmir"},
{"label": "JH","value": "Jharkhand"},
{"label": "KA","value": "Karnataka"},
{"label": "KL","value": "Kerala"},
{"label": "LD","value": "Lakshadweep"},
{"label": "MP","value": "Madhya Pradesh"},
{"label": "MH","value": "Maharashtra"},
{"label": "MN","value": "Manipur"},
{"label": "ML","value": "Meghalaya"},
{"label": "MZ","value": "Mizoram"},
{"label": "NL","value": "Nagaland"},
{"label": "OR","value": "Odisha"},
{"label": "PY","value": "Puducherry"},
{"label": "PB","value": "Punjab"},
{"label": "RJ","value": "Rajasthan"},
{"label": "SK","value": "Sikkim"},
{"label": "TN","value": "Tamil Nadu"},
{"label": "TS","value": "Telangana"},
{"label": "TR","value": "Tripura"},
{"label": "UK","value": "Uttarakhand"},
{"label": "UP","value": "Uttar Pradesh"},
{"label": "WB","value": "West Bengal"}]
  
  const conuntry = [
    {
      "id": 101,
      "name": "India",
      "iso2": "IN"
    },
  ];

  // const state = [
  // ];

  const district = [
    // {
    //   value: 'latur',
    //   label: 'Latur'
    // },
    // {
    //   value: 'solapur',
    //   label: 'Solapur'
    // },
    // {
    //   value: 'bijapur',
    //   label: 'Bijapur'
    // }
  ];

  const city = [
    {
      value: 'nilanga',
      label: 'Nilanga'
    },
    {
      value: 'umarga',
      label: 'Umarga'
    },
    {
      value: 'kolapur',
      label: 'Kolapur'
    }
  ];



  return (
    <>
      <Head>
        <title>
          ERP
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth="sm">
          {/* <NextLink
            href="/"
            passHref
          >
            <Button
              component="a"
              startIcon={<ArrowBackIcon fontSize="small" />}
            >
              Dashboard
            </Button>
          </NextLink> */}
          <Grid container spacing={3} >
          <form onSubmit={formik.handleSubmit}>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              lg={12}
              sm={12}
              xl={12}
              xs={12}
            >
              <Box sx={{ my: 3 }}>
                <Typography
                  color="textPrimary"
                  variant="h4"
                >
                  Register
                </Typography>
                {/* <Typography
                  color="textSecondary"
                  gutterBottom
                  variant="body2"
                >
                  Use your email to create a new account
                </Typography> */}
              </Box>
            </Grid>
            <Grid
            item
            xl={6}
            lg={6}
            sm={6}
            xs={12}
          >
            <TextField
              error={Boolean(formik.touched.firstName && formik.errors.firstName)}
              fullWidth
              helperText={formik.touched.firstName && formik.errors.firstName}
              label="First Name"
              margin="normal"
              name="firstName"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.firstName}
              variant="outlined"
            />
            </Grid>
            <Grid
              item
              xl={6}
              lg={6}
              sm={6}
              xs={12}  >
              <TextField
                error={Boolean(formik.touched.lastName && formik.errors.lastName)}
                fullWidth
                helperText={formik.touched.lastName && formik.errors.lastName}
                label="Last Name"
                margin="normal"
                name="lastName"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.lastName}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              xl={6}
              lg={6}
              sm={6}
              xs={12}  >
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
            </Grid>
            <Grid
              item
              xl={6}
              lg={6}
              sm={6}
              xs={12}  >
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
            </Grid>
              <Grid
                item
                xl={6}
                lg={6}
                sm={6}
                xs={12}  >
              <TextField
                error={Boolean(formik.touched.contactNo && formik.errors.contactNo)}
                fullWidth
                helperText={formik.touched.contactNo && formik.errors.contactNo}
                label="Contact No"
                margin="normal"
                name="contactNo"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                type="text"
                value={formik.values.contactNo}
                variant="outlined"
              />
              </Grid>
              <Grid
            item
            xl={6}
            lg={6}
            sm={6}
            xs={12}
          >
            <TextField
              error={Boolean(formik.touched.nominee && formik.errors.nominee)}
              fullWidth
              helperText={formik.touched.nominee && formik.errors.nominee}
              label="Nominee"
              margin="normal"
              name="nominee"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.nominee}
              variant="outlined"
            />
            </Grid>
              <Grid
                item
                xl={6}
                lg={6}
                sm={6}
                xs={12}  >
              <TextField
                error={Boolean(formik.touched.country && formik.errors.country)}
                fullWidth
                helperText={formik.touched.country && formik.errors.country}
                label="Select Country"
                name="country"
                onBlur={formik.handleBlur}
                onChange={handleChangeCountry}
                select
                SelectProps={{ native: true }}
                value={formik.values.country}
                variant="outlined"
              >
                <option>Select Conuntry</option>
                {conuntry.map((option) => (
                  <option
                    key={option.name}
                    value={option.iso2}
                    onChange={handleChangeCountry}>
                    {option.name}
                  </option>
                ))}
              </TextField>
              </Grid>
              <Grid
                item
                xl={6}
                lg={6}
                sm={6}
                xs={12}  >
              <TextField
                error={Boolean(formik.touched.state && formik.errors.state)}
                fullWidth
                helperText={formik.touched.state && formik.errors.state}
                label="Select State"
                name="state"
                onBlur={formik.handleBlur}
                onChange={handleChangeState}
                select
                SelectProps={{ native: true }}
                value={formik.values.state}
                variant="outlined"
              >
                <option>Select State</option>
                {states.map((option) => (
                  <option
                    key={option.value}
                    value={option.label}
                  >
                  {option.value} 
                  </option>
                ))}
              </TextField>
              </Grid>
              <Grid
                item
                xl={4}
                lg={4}
                sm={4}
                xs={12}  >
              <TextField
                error={Boolean(formik.touched.address && formik.errors.address)}
                fullWidth
                helperText={formik.touched.address && formik.errors.address}
                label="Select address"
                name="address"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.address}
                variant="outlined"
              >
              </TextField>
              </Grid>
              <Grid
                item
                xl={4}
                lg={4}
                sm={4}
                xs={12} >
              <TextField
                error={Boolean(formik.touched.city && formik.errors.city)}
                fullWidth
                helperText={formik.touched.city && formik.errors.city}
                label="City"
                name="city"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.city}
                variant="outlined">
              </TextField>
              </Grid>
              <Grid
              item
              xl={4}
              lg={4}
              sm={4}
              xs={12}
            >
              <TextField
                error={Boolean(formik.touched.pinCode && formik.errors.pinCode)}
                fullWidth
                helperText={formik.touched.pinCode && formik.errors.pinCode}
                label="Pin Code"
                name="pinCode"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.pinCode}
                variant="outlined"
              />
              </Grid>
            </Grid>
            <Box
              sx={{
                alignItems: 'center',
                display: 'flex',
                ml: -1
              }}
            >
              <Checkbox
                checked={formik.values.policy}
                name="policy"
                onChange={formik.handleChange}
              />
              <Typography
                color="textSecondary"
                variant="body2"
              >
                I have read the
                {' '}
                <NextLink
                  href="#"
                  passHref
                >
                  <Link
                    color="primary"
                    underline="always"
                    variant="subtitle2"
                  >
                    Terms and Conditions
                  </Link>
                </NextLink>
              </Typography>
            </Box>
            {Boolean(formik.touched.policy && formik.errors.policy) && (
              <FormHelperText error>
                {formik.errors.policy}
              </FormHelperText>
            )}
            <Box sx={{ py: 2 }}>
              <Button
                color="primary"
                disabled={!formik.isValid}
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                // disabled={formik.isValid}
              >
                Sign Up Now
              </Button>
            </Box>
            <Typography
              color="textSecondary"
              variant="body2"
            >
              Have an account?
              {' '}
              <NextLink
                href="/"
                passHref
              >
                <Link
                  variant="subtitle2"
                  underline="hover"
                >
                  Sign In
                </Link>
              </NextLink>
            </Typography>
          </form>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default Register;
