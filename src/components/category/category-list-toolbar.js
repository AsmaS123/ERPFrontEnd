import {
    Box,
    Button,
    Card,
    CardContent,
    TextField,
    InputAdornment,
    SvgIcon, Typography,Modal,FormControlLabel, Checkbox
  } from '@mui/material';
import * as React from 'react';
import { Search as SearchIcon } from '../../icons/search';
import { Upload as UploadIcon } from '../../icons/upload';
import { Download as DownloadIcon } from '../../icons/download';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {   Container, Grid, Link } from '@mui/material';
import Radio from '@mui/material/Radio';
import Axios from 'axios';
// import { SubCategoryModal } from '../../components/customer/subcategory.modal';
import { fetchData } from '../../pages/category';
import { useState,useEffect,forwardRef, useImperativeHandle } from 'react';
import { any } from 'prop-types';

const apiUrl = "http://127.0.0.1:5000/";

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

 export const CategoryrListToolbar  = forwardRef((props,ref) => {
  const [open, setOpen] = React.useState(false);
  const [isedit, setIsedit] = React.useState(false);

  const handleOpen = () => {
    setIsedit(false)
    setOpen(true)
  };

  const handleClose = () => {
    formik.resetForm()
    setOpen(false);
  }

  // const { func } = props;

  const submitForm = () => {
    debugger
    // alert(JSON.stringify(formik.values))
    Axios.post(`${apiUrl}/category`, formik.values).then(res => {  
      debugger
      props.func();
      handleClose();
    })  
  .catch(err => {  
    alert(err)
    // toast.error('Something went wrong.');  
  });  
  }

  const updateForm = () => {
    debugger
      const obj = formik.values;
      const id = obj.id;

      Axios.put(`${apiUrl}/category`+'/'+id, formik.values).then(res => {  
        debugger
        props.func();
        handleClose();
      })  
    .catch(err => {  
      alert(err)
      // toast.error('Something went wrong.');  
    });  
  }

  useImperativeHandle(ref, () => ({
    childFunction : (val) => {
        // alert(JSON.stringify(val));
        if(val.id){
          formik.setValues(val);
          setOpen(true);
          setIsedit(true)
        }
      }
  }))

  useEffect(() => {
    // if(id){
      debugger
      // alert(props)
      // }
    },[]);

  const formik = useFormik({
    initialValues: {
      id:'',
      name: '',
      active: true
    },
    validationSchema: Yup.object({
      name: Yup
      .string()
      .required(
        'Name is required')
    }),
  });

  // const editCategory = () =>{
    
  // }

  // const formikSubCategory = useFormik({
  //   initialValues: {
  //     id:'',
  //     name: '',
  //     active: true
  //   },
  //   validationSchema: Yup.object({
  //     name: Yup
  //     .string()
  //     .required(
  //       'Name is required')
  //   }),
  // });
  
  const categoryList = [

  ];
  

  return (
    <Box >
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
          Category
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
            Add Category
          </Button>
        </Box>
      </Box>
      <Box sx={{ mt: 3 }}>
        <Card >
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
                placeholder="Search customer"
                variant="outlined"
              />
            </Box>
          </CardContent>
        </Card>
      </Box>
      
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
          { isedit ? "Update Category" : "Add Category" }
            {/* <SubCategoryModal/> */}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          <form >
            <TextField
              error={Boolean(formik.touched.name && formik.errors.name)}
              fullWidth
              helperText={formik.touched.name && formik.errors.name}
              label="Name"
              margin="normal"
              name="name"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="text"
              value={formik.values.name}
              variant="outlined"
            />
             <FormControlLabel
              control={(
                <Checkbox
                  color="primary"
                  checked={formik.values.active}
                  name="active"
                  value={formik.values.active}
                  onChange={formik.handleChange}
                />
              )}
              label="Status"
            />
            <br></br>
             { isedit ? <Button onClick={updateForm}>Update </Button> : <Button onClick={submitForm}>Submit </Button> }
             <Button onClick={handleClose}>Close </Button>
            </form>
          </Typography>
        </Box>
      </Modal>
    </Box>
  )});
  
  // export default CategoryrListToolbar;
  // formik.handleSubmit