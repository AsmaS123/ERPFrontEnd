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

  
  export const PlanListToolbar = (({onUpdate,planDetails,childFunc}) => {
    const [open, setOpen] = React.useState(false);
    const [planList , setplanList] = React.useState([]);
    const [tempList, SetTempList ] = React.useState([]);
    const [isedit , setIsEdit] = useState(false)
    const [isadd , setIsadd] = useState(true)
    const date = new Date();

  const formik = useFormik({
    initialValues: {
      name: '',
      price :'',
      feature : '',
      dateTime : date,
      featureList : [],
    },
    validationSchema: Yup.object({
      name: Yup
      .string()
      .required(
        'Name is required'),
        price: Yup
      .string()
      .required(
        'Price is required'),
        dateTime : Yup.string()
    }),

    onSubmit: (values)=>{
      debugger
      console.log(tempList);

      
      // formik.setFieldValue("dateTime","2-2-2022")
            alert(JSON.stringify(formik.values))
            if(isadd){
      Axios.post(`${apiUrl}/plan`, formik.values).then(res => {     
        debugger
        onUpdate();
        handleClose();
        
      })  
    .catch(err => {  
      alert(err)
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

  useEffect(() => {
    childFunc.current = editModal


  }, []) 

 const handleOpen = () => {
    debugger
    setOpen(true)
    };

const editModal = (obj) => {
  setIsEdit(true)
  setIsadd(false)
  formik.setFieldValue('id', obj.id);
  formik.setFieldValue('name', obj.name);
  formik.setFieldValue('price', obj.price);
  formik.setFieldValue('dateTime', obj.dateTime);
  formik.setFieldValue('featureList', obj.feature);
  SetTempList(obj.feature)
  setOpen(true)
  }

  const handleClose = (event, reason) => {
    debugger
    if (reason !== 'backdropClick') {
      setOpen(false);
      setIsadd(true);
      setIsEdit(false);
      formik.resetForm();
    }
  }

  const handleAdd = () =>{
    const val = formik.getFieldProps("feature").value
    // alert(val)
    if(val){
      // let items = tempList.filter(temp => temp == elm);
      // if(items.length == 0){
        SetTempList(tempList => [...tempList, val]);
        formik.setFieldValue("featureList",tempList)
        formik.setFieldValue("feature","")
      // }
    }
  }

  const handleDelete = (elm) => () => {
    debugger
    alert(elm)
    let items = tempList.filter(temp => temp != elm);
    SetTempList(items);
    formik.setFieldValue("featureList",items)
  }
  return (
  <Box>
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
          Plans
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
          variant="contained" onClick={handleOpen}
        >
          Add Plan
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
                      fontSize="small"
                      color="action"
                    >
                      <SearchIcon />
                    </SvgIcon>
                  </InputAdornment>
                )
              }}
              placeholder="Search product"
              variant="outlined"
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
            { (isedit && !isadd)? "Edit Plan" : "Add Plan" }
            {/* <button onClick={handleClose} >Close</button> */}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          </Typography>
          <form onSubmit={formik.handleSubmit}>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
              error={Boolean(formik.touched.name && formik.errors.name)}
              fullWidth
              helperText={formik.touched.name && formik.errors.name}
              label="name"
              margin="normal"
              name="name"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="text"
              value={formik.values.name}
              variant="outlined"
            />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
            <TextField
              error={Boolean(formik.touched.price && formik.errors.price)}
              fullWidth
              helperText={formik.touched.price && formik.errors.price}
              label="price"
              margin="normal"
              name="price"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="text"
              value={formik.values.price}
              variant="outlined"
            />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
            <TextField
              error={Boolean(formik.touched.feature && formik.errors.feature)}
              fullWidth
              helperText={formik.touched.feature && formik.errors.feature}
              label="feature"
              margin="normal"
              name="feature"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="text"
              value={formik.values.feature}
              variant="outlined"
            />
           
            </Grid>
            <Grid
              item
              md={3}
              xs={12}
            ><br></br>
               <Button onClick={handleAdd}>Add Feature</Button>
            </Grid>
            <Grid
              item
              md={12}
              xs={12}
            >
              <ul>{ (formik.getFieldProps("featureList").value).map((elm,index) =>(
                <li key={index}>{elm} <Button onClick={ handleDelete(elm) }>delete </Button></li>
              ))
              }
              </ul>
            </Grid>
          
            </Grid>
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
            <Button onClick={handleClose}>Close </Button>
          </form>
        </Box>
      </Modal>
  </Box>
  )
})