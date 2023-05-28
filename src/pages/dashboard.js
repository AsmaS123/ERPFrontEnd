import Head from 'next/head';
import {
  Box,
  Button,
  Card,
  TextField,
  Grid,
  Container,
  InputAdornment,
  Typography,
  CardContent,
  CardHeader,
  Divider,
  SvgIcon,Modal,FormControlLabel, Checkbox,File
} from '@mui/material';
import { Budget } from '../components/dashboard/budget';
import { LatestOrders } from '../components/dashboard/latest-orders';
import { LatestProducts } from '../components/dashboard/latest-products';
import { Sales } from '../components/dashboard/sales';
import { TasksProgress } from '../components/dashboard/tasks-progress';
import { TotalCustomers } from '../components/dashboard/total-customers';
import { TotalProfit } from '../components/dashboard/total-profit';
import { TrafficByDevice } from '../components/dashboard/traffic-by-device';
import { DashboardLayout } from '../components/dashboard-layout';
import {PlanModal } from '../components/dashboard/planModal';
import { useState ,useEffect, useRef} from 'react';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import { Formik, Field, Form, ErrorMessage, useField ,setFieldValue} from "formik";
import * as React from 'react';
import * as Yup from 'yup';
import Axios from 'axios';
// const apiUrl = "http://127.0.0.1:5000/"; 
import apiUrl from '../config/endpoint';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const Dashboard = () => {
  const dashboardList = ["TOTAL INCOME", "DIRECT INCOME","GENERATION INCOME","GLOBAL AUTOPOOL INCOME","ICOME WALLET","TODAY'S INCOME","AUTOPLL WALLET","UPGRADE WALLET","SHPPING WALLET","ACTIVATION WALLET","DIRECT MEMBER","MY DOWNLINW MEMBER","PURCHASED WALLET" ];
  const [show, setShow] = useState(false)
  const router = useRouter();
  const [selectedPlan, setSelectedPlan] = useState([]);
  const [flag , setflag] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  
  const formik = useFormik({
    initialValues: {
      email: '',
      referalLink : ""
    },
    validationSchema: Yup.object({
      email: Yup
      .string()
      .required(
        'Email is required')
    }),
    onSubmit: (values)=>{
      debugger
      const id = localStorage.getItem('sponcer_id');
      const referalURL = window.location.host + "/register/?id="+id;
      alert(referalURL)
      const config = {
        headers: {
            'content-type': 'multipart/form-data'
        }
      };
      alert(JSON.stringify(values))
      console.log(values);
    //   Axios.post(`${apiUrl}/products`, values,config).then(res => {     
    //     debugger
    //     onUpdate();
    //     handleClose();
        
    //   })  
    // .catch(err => {  
    //   alert(err)
    // });  
    }
  })

  const handleOpen = () => {
    debugger
    setOpen(true)
    };

    const handleClose = (event, reason) => {
      debugger
      if (reason !== 'backdropClick') {
        setOpen(false);
        formik.resetForm();
      }
    }

  useEffect(() => {    
    getPlans()
    },[]);
  
      const getPlans = () =>{
        Axios({
          method: "GET",
          url:apiUrl+"/plan"
        })
        .then((response) => {
          debugger
          setSelectedPlan(response.data.plan)
          setShow(true);
            setflag(true)
        });
      }

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
      <Container maxWidth={false}>
        <Button onClick={handleOpen}>Referal Link</Button>
        <br></br>&nbsp;
        <Grid
          container
          spacing={3}
        >
          {dashboardList.map((element, index) => ( 
            <Grid
            item
            lg={4}
            sm={6}
            xl={4}
            xs={12}
          >
            <Budget income={element}/>
          </Grid>
           ))}
        </Grid>
      </Container>
      <Modal
        open={open}
        onClose={handleClose  }
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Refer User
            {/* <SubCategoryModal/> */}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          <form  onSubmit={formik.handleSubmit} encType="multipart/form-data">
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              md={12}
              xs={12}
            >
              <TextField
              error={Boolean(formik.touched.email && formik.errors.email)}
              fullWidth
              helperText={formik.touched.email && formik.errors.email}
              label="email"
              margin="normal"
              name="email"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="text"
              value={formik.values.email}
              variant="outlined"
            />
             <TextField
              error={Boolean(formik.touched.referalLink && formik.errors.referalLink)}
              fullWidth
              helperText={formik.touched.referalLink && formik.errors.referalLink}
              label="referalLink"
              margin="normal"
              name="referalLink"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="text"
              value={formik.values.referalLink}
              variant="outlined"
              disabled
            />
            </Grid>
            </Grid>
            <div style={{float: 'right'}}>
            <Button
              type='submit'
              color="primary"
              variant="contained"
            >
              Submit
            </Button>
            <Button onClick={handleClose}>Close </Button>
            </div>
            </form>
            </Typography>
            </Box>
        </Modal>
    </Box>
    {/* if(show){
      <PlanModal plans={selectedPlan} />
    } */}
    
  </>
)};

Dashboard.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Dashboard;
