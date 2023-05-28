import {
    Box,
    Button,
    Card,
    CardContent,
    TextField,
    InputAdornment,
    SvgIcon, Typography,Modal,FormControlLabel, Checkbox
  } from '@mui/material';
import { useState,useEffect } from 'react';
import * as React from 'react';
import { Search as SearchIcon } from '../../icons/search';
import { Upload as UploadIcon } from '../../icons/upload';
import { Download as DownloadIcon } from '../../icons/download';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {   Container, Grid, Link } from '@mui/material';
import Radio from '@mui/material/Radio';
import Axios from 'axios';
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

 export const SubCategoryModal  = () => {
  const [openSubCategory, setOpenSubCategory] = React.useState(false);
  const handleOpenSubCategory = () => setOpenSubCategory(true);
  const handleCloseSubCategory = () => setOpenSubCategory(false);
  const [categoryList , setcategoryList] = React.useState([]);

  // React.useEffect(() => {
  //     Axios.get(`${apiUrl}/category`).then(res => {  
  //       setcategoryList(res.data.category)
  //     })  
  //   .catch(err => {  
  //     alert(err)
  //   });  
  // });

  useEffect(() => {
    // if(id){
      fetchData();
      // }
    },[]);

    const fetchData = () => {
      Axios({
        method: "GET",
        url:apiUrl+"/category"
      })
      .then((response) => {
        // debugger
        // if(response.data){
          setcategoryList(response.data.category)
        // }
      });
    }
  
  const submitForm = () => {
    debugger
    alert(JSON.stringify(formikSubCategory.values))
    Axios.post(`${apiUrl}/subcategory`, formikSubCategory.values).then(res => {  
        debugger
        alert(res.data);
        handleCloseSubCategory();
      })  
    .catch(err => {  
      alert(err)
    });  
  }

  const formikSubCategory = useFormik({
    initialValues: {
      category_id:'',
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
  
 

  return (
    <React.Fragment>
    <Button onClick={handleOpenSubCategory}>SubCategory</Button>
    <Box >
        <Modal
        hideBackdrop
        open={openSubCategory}
        onClose={handleCloseSubCategory}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add SubCategory
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          <form >
              <TextField
                error={Boolean(formikSubCategory.touched.category_id && formikSubCategory.errors.category_id)}
                fullWidth
                helperText={formikSubCategory.touched.category_id && formikSubCategory.errors.category_id}
                label="Select Category"
                name="category_id"
                onBlur={formikSubCategory.handleBlur}
                onChange={formikSubCategory.handleChange}
                select
                SelectProps={{ native: true }}
                value={formikSubCategory.values.category_id}
                variant="outlined"
              >
                <option>Select Category</option>
                {categoryList.map((option) => (
                  <option
                    key={option.id}
                    value={option.id}
                  >
                    {option.name}
                  </option>
                ))}
              </TextField>
              <TextField
                error={Boolean(formikSubCategory.touched.name && formikSubCategory.errors.name)}
                fullWidth
                helperText={formikSubCategory.touched.name && formikSubCategory.errors.name}
                label="Name"
                margin="normal"
                name="name"
                onBlur={formikSubCategory.handleBlur}
                onChange={formikSubCategory.handleChange}
                type="text"
                value={formikSubCategory.values.name}
                variant="outlined"
              />
             <FormControlLabel
              control={(
                <Checkbox
                  color="primary"
                  defaultChecked
                  name="active"
                  value={formikSubCategory.values.name}
                  onChange={formikSubCategory.handleChange}
                />
              )}
              label="Status"
            /><br></br>
             <Button onClick={submitForm}>Submit </Button><Button onClick={handleCloseSubCategory}>Close </Button>
            </form>
          </Typography>
        </Box>
      </Modal>
    </Box>
    </React.Fragment>
  )};