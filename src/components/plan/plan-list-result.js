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
    SvgIcon,Modal,FormControlLabel, Checkbox,File,
    
  } from '@mui/material';
  import { Download as DownloadIcon } from '../../icons/download';
  import { Search as SearchIcon } from '../../icons/search';
  import { Upload as UploadIcon } from '../../icons/upload';
  import Axios from 'axios';
  import * as React from 'react';
  import { useFormik } from 'formik';
  import * as Yup from 'yup';
  import { useState,useEffect,forwardRef,useRef,useImperativeHandle  } from 'react';
  import { Formik, Field, Form, ErrorMessage, useField ,setFieldValue} from "formik";
  
  const apiUrl = "http://127.0.0.1:5000/";
    
  export const PlanListResult = (({ plans, onDelete,onEdit,...rest }) => {

    const [selectedplans, setSelectedPlans] = useState([]);
    
    useEffect(() => {
      debugger
      selectedplans.concat(plans[0])
      },[]);

      function deleteUser(id){
        onDelete(id)
      }
  
      function editUser(obj){
        onEdit(obj)
      }

    return(
        <Card
        sx={{ height: '100%' }}
       
      >
    <CardContent>
   
    <Grid
        container
        spacing={3}
        sx={{ justifyContent: 'space-between' }}
      >
         {plans.map((plan) => (
                 plan.map((elem,index) => (
                  <Grid
                  item
                  lg={4}
                  sm={6}
                  xl={4}
                  xs={12}
                >
                  
             <Grid item>
          <Typography
            color="textSecondary"
            gutterBottom
            variant="overline"
          >
            {elem.name}
          </Typography>
          <Typography
            color="textPrimary"
            variant="h4"
          >
            {elem.price} $
          </Typography>
          <br></br>
          {elem.feature.map((el,index) => (
          <ul
            color="textSecondary"
            gutterBottom
            variant="overline"
          >
            <li>{el}</li>
            
          </ul>
          ))
          }
              <Button onClick={() => editUser(elem)} >Edit </Button><Button onClick={() => deleteUser(elem.id)}>Delete </Button>
        </Grid>
        </Grid>
                  ))
          ))
          
           }
        
       </Grid>
        </CardContent>
        </Card>
    )
  })