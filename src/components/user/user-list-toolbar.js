import {
    Box,
    Button,
    Card,
    CardContent,
    TextField,
    InputAdornment,
    SvgIcon, Typography,
    Modal,FormControlLabel, Checkbox,File,Grid,Link
  } from '@mui/material';
import { Search as SearchIcon } from '../../icons/search';
import { Upload as UploadIcon } from '../../icons/upload';
import { Download as DownloadIcon } from '../../icons/download';
import { useState ,useEffect, useRef} from 'react';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import NextLink from 'next/link';
import Axios from 'axios';

  const apiUrl = "http://127.0.0.1:5000/";

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  const imagestyle ={
    // width:'40px',
    height:'140px'
  }

  

  export const UserListToolbar = (props) => {

    const [search, setSearch] = useState("");
    const [open, setOpen] = useState(false);
    const router = useRouter();
  const utcStr = new Date();
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [isedit , setIsEdit] = useState(false)
  const [isadd , setIsadd] = useState(true)
  useEffect(() => {
    props.childFunc.current = editModal
  }, []) 

  const formik = useFormik({
    initialValues: {
      id:'',
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      contactNo :'',
      country:'',
      state:'',
      district:'',
      city:'',
      pinCode:'',
      nominee:'',
      dateTime:utcStr,
      policy: false
    },
    validationSchema: Yup.object({
      id :Yup.number(),
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
      .max(100)
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
      district: Yup
      .string()
      .required(
        'District is required'),
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
      // policy: Yup
      //   .boolean()
      //   .oneOf(
      //     [true],
      //     'This field must be checked'
      //   )
    }),

    onSubmit: values  => {
      debugger
      // alert(JSON.stringify(values, null, 2));
      if(isadd){
         Axios.post(`${apiUrl}/signup`, values).then(res => {  
        setOpen(false);
        props.onChange(false);
        // toast.success('user registered successfully');  
        })  
      .catch(err => {  
        alert(err)
        // toast.error('Something went wrong.');  
      });  
    }

  else if(isedit){
    debugger
    Axios.put(`${apiUrl}/user/`+values.id, values).then(res => {  
      setOpen(false);
      props.onChange(false);
      // toast.success('user registered successfully');  
      })  
    .catch(err => {  
      alert(err)
      // toast.error('Something went wrong.');  
    });
  }

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

  const district = [
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


    const handleClose = (event, reason) => {
      debugger
      if (reason !== 'backdropClick') {
        setOpen(false);
        setIsadd(true);
        setIsEdit(false);
        formik.resetForm();
      }
    }

    const handleOpen = () => {
      setOpen(true)
      };
    
      const editModal = (obj) => {
      setIsEdit(true)
      setIsadd(false)
      formik.setFieldValue('id', obj.id);
      formik.setFieldValue('firstName', obj.firstName);
      formik.setFieldValue('lastName', obj.lastName);
      formik.setFieldValue('email', obj.email);
      formik.setFieldValue('password', obj.password);
      formik.setFieldValue('contactNo', obj.contactNo);
      formik.setFieldValue('nominee', obj.nominee);
      formik.setFieldValue('country', obj.country);
      formik.setFieldValue('state', obj.state);
      formik.setFieldValue('district', obj.district);
      formik.setFieldValue('state', obj.state);
      formik.setFieldValue('city', obj.city);
      formik.setFieldValue('pinCode', obj.pinCode);
      formik.setFieldValue('policy', obj.policy);
      setOpen(true)
      }

    return (
    <Box {...props}>
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          m: -1
        }}
      >
        <Typography
          sx={{ m: 1 }}
          variant="h4"
        >
          Users
        </Typography>
        <Box sx={{ m: 1 }}>
          <Button
            startIcon={(<UploadIcon fontSize="small" />)}
            sx={{ mr: 1 }}
          >
            Import
          </Button>
          <Button
            startIcon={(<DownloadIcon fontSize="small" />)}
            sx={{ mr: 1 }}
          >
            Export
          </Button>
          <Button
            color="primary"
            variant="contained"
            onClick={handleOpen}
          >
            Add Users
          </Button>
        </Box>
      </Box>
      <Box sx={{ mt: 3 }}>
        <Card>
          <CardContent>
            <Box sx={{ maxWidth: 500 }}>
              <TextField
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SvgIcon
                        color="action"
                        fontSize="small"
                      >
                        <SearchIcon />
                      </SvgIcon>
                    </InputAdornment>
                  )
                }}
                placeholder="Search user"
                variant="outlined"
              onChange={(e) => setSearch(e.target.value)}
              />
            </Box>
          </CardContent>
        </Card>
      </Box>
      <Modal
        // open={open}
        open={open}
        onClose={handleClose  }
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>

          <Typography id="modal-modal-title" variant="h6" component="h2">
            { (isedit && !isadd)? "Edit User" : "Add User" }
            {/* <button onClick={handleClose} >Close</button> */}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          <form onSubmit={formik.handleSubmit}>
              <Grid
                container
                spacing={3}
              >
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
                  disabled={isedit}
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
                  disabled={isedit}
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
                    error={Boolean(formik.touched.district && formik.errors.district)}
                    fullWidth
                    helperText={formik.touched.district && formik.errors.district}
                    label="Select District"
                    name="district"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.district}
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
                { (isadd  && !isedit) ?
                  <Button
                    color="primary"
                    disabled={!formik.isValid}
                    halfWidth
                    size="large"
                    type="submit"
                    variant="contained"
                    // disabled={formik.isValid}
                  >
                    Add
                  </Button>
                  : ""
                  }
                  &nbsp;
                  { (isedit && !isadd)?
                  <Button
                  color="primary"
                  disabled={!formik.isValid}
                  halfWidth
                  size="large"
                  type="submit"
                  variant="contained">
                  Update
                  </Button>
                    : "" }
                  <Button sx={{ mr: 1 }} onClick={handleClose} >Cancel</Button>
                </Box>
              </form>
            </Typography>
            </Box>
            </Modal>
    </Box>
  )
};
  