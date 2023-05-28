import Head from 'next/head';
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon, Typography,
  Modal,FormControlLabel, Checkbox,File,Grid,Link,Container
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
import {PlanListResult} from '../components/plan/plan-list-result';
import { PlanListToolbar } from '../components/plan/plan-list-toolbar';
import { useState ,useEffect, useRef} from 'react';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import { Formik, Field, Form, ErrorMessage, useField ,setFieldValue} from "formik";
import * as React from 'react';
import * as Yup from 'yup';
import Axios from 'axios';
import apiUrl from '../config/endpoint';
// const apiUrl = "http://127.0.0.1:5000/";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const Plan = () => {
  const [selectedPlan, setSelectedPlan] = useState([]);
  const [flag , setflag] = React.useState(false);
  const childFunc = React.useRef(null)
  const [open, setOpen] = useState(false);
  const [planid, setPlanId] = useState(false);

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
        setSelectedPlan([response.data.plan])
        // setSelectedPlan(oldArray => [...oldArray, response.data.plan]); 
          setflag(true)
      });
    }

    function handleDelete(id) {
      setOpen(true);
      setPlanId(id)
    }

    function handleEdit(obj){
      childFunc.current(obj);
    }

    function handleChange(newValue) {
      getPlans();
    }

     
    function handleDeleteRecord(){
      debugger
      // if(userid){
      //  let tempArray = selectedUser[0];
      //   tempArray.forEach((elm,index)=>{
      //     if(elm.id == userid){
      //       const id  = elm.id ;
      //       setOpen(false);
      //       Axios({
      //         method: "DELETE",
      //         url:apiUrl+"/user/"+ id
      //       })
      //       .then((response) => {
      //           fetchData();
      //           setflag(true);
      //           setOpen(false);
      //       });
      //     }
      //   })
      // }
    }

    const handleClose = (event, reason) => {
      if (reason !== 'backdropClick') {
        setOpen(false);
      }
    }

    return (
    <>
    <Head>
      <title>
        Products | Material Kit
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
        <PlanListToolbar onUpdate={handleChange}  childFunc={childFunc}/>
        <br></br>
            { (flag == true)? <PlanListResult plans={selectedPlan}  onDelete={handleDelete} onEdit={handleEdit} /> : "display none" }
      </Container>
      <Modal
          open={open}
          onClose={handleClose  }
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" component="h2">
            Are you sure want to delete this record?
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <Button
            color="primary"
            variant="contained" onClick={handleDeleteRecord} >
            Yes
          </Button>&nbsp;
            <Button sx={{ mr: 1 }} onClick={handleClose} >Cancel</Button>
            </Typography>
            </Box>
          </Modal>
    </Box>
    </>
    )
}

Plan.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Plan;