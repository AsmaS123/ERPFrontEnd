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
// import img from '../../../public/static/images/person.pg';

const apiUrl = "http://127.0.0.1:5000/";
const  imgpath = '/static/images/person.pg';

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
  height:'140px',
  border: '2px solid black'
}

export const ProductListToolbar = forwardRef((props,ref) => {

  const [open, setOpen] = React.useState(false);
  const [isedit, setIsedit] = React.useState(false);
  const [categoryList , setCategoryList] = React.useState([]);
  const imagePath = "/static/images/avatars/person.png";

  const formik = useFormik({
    initialValues: {
      name: '',
      description :'',
      autoReduceStock : false,
      freeItem :true,
      createdDate :'',
      updatedDate :'',
      // skuNo :'',
      image :'',
      file:null,
      category_id :''
    },
    validationSchema: Yup.object({
      name: Yup
      .string()
      .required(
        'Name is required'),
      description: Yup
      .string()
      .required(
        'Description is required'), 
      createdDate: Yup
      .date()
      .required(
        'Created Date is required'), 
      updatedDate: Yup
      .date()
      .required(
        'Updated Date is required'), 
      category_id: Yup
      .string()
      .required(
        'category is required'), 
    }),

    // onSubmit: (values)=>{
    //   debugger
    //   const config = {
    //     headers: {
    //         'content-type': 'multipart/form-data'
    //     }
    //   };
    //   alert(JSON.stringify(values))
    //   console.log(values);
    //   Axios.post(`${apiUrl}/products`, formik.values,config).then(res => {     
    //     debugger
    //     props.func();
    //     handleClose();
        
    //   })  
    // .catch(err => {  
    //   alert(err)
    // });  
    // }
  });

  useEffect(() => {
    fetchData()
  },[]);

  useImperativeHandle(ref, () => ({
    childFunction : (val) => {
      debugger
        alert(JSON.stringify(val));
        if(val.id){
          alert(val)
          formik.setValues(val);
          setOpen(true);
          setIsedit(true)
        }
      }
  }))

 const handleOpen = () => {
    setIsedit(false)
    // alert(JSON.stringify(categoryList))
    setOpen(true)
  };

  const handleClose = (event, reason) => {
    debugger
    if (reason !== 'backdropClick') {
      setOpen(false);
      formik.resetForm();
    }
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

    
  const handleFileChange = (e) => {
    debugger
    alert((e.currentTarget.files[0]))
    const file  =  e.currentTarget.files[0];
    const reader = new FileReader();
    const imgTag = document.getElementById("myimage");
    imgTag.title = file.name;
    reader.onload = function(event) {
      imgTag.src = event.target.result;
    };
    reader.readAsDataURL(file);
    formik.setFieldValue('image', file.name);
    formik.setFieldValue('file', file);
    // setfileObj(file);
  }

  const fetchData = () => {
    Axios({
      method: "GET",
      url:apiUrl+"/categories"
    })
    .then((response) => {
      debugger
      setCategoryList(response.data.category);
    }).catch((error)=>{
      console.log(error)
    });
  }

  // async function fetchData() {
  //   const url = apiUrl+"/categories"
  //   const response = await fetch(url,
  //     {
  //       method: 'GET'
  //     });
  //     debugger
  //     const data = await response.json(); 
  //     console.log(data)
  //   }
  

  const updateForm = () => {
    debugger
      const obj = formik.values;
      const id = obj.id;
      alert(JSON.stringify(obj))
    //   Axios.put(`${apiUrl}/product`+'/'+id, formik.values).then(res => {  
    //     debugger
    //     props.func();
    //     handleClose();
    //   })  
    // .catch(err => {  
    //   alert(err)
    //   // toast.error('Something went wrong.');  
    // });  
  }

  const submitForm = () => {
    debugger
    alert(JSON.stringify(formik.values))
    const config = {
      headers: {
          'content-type': 'multipart/form-data'
      }
    };
    Axios.post(apiUrl+"/products/", formik.values,config).then(res => {  
      debugger
      props.func();
      handleClose();
    })  
  .catch(err => {  
    alert(err)
    // toast.error('Something went wrong.');  
  });  
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
        Products
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
          Add products
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
        style={{ overflow: 'scroll' }}
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
          { isedit ? "Update Product" : "Add Product" }
            {/* <SubCategoryModal/> */}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <form >
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
                label="Name"
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
                error={Boolean(formik.touched.description && formik.errors.description)}
                fullWidth
                helperText={formik.touched.description && formik.errors.description}
                label="Description"
                margin="normal"
                name="description"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                type="text"
                value={formik.values.description}
                variant="outlined"
              />
              </Grid>
              <Grid
                item
                md={6}
                xs={12}
              >
              <TextField
                error={Boolean(formik.touched.createdDate && formik.errors.createdDate)}
                fullWidth
                helperText={formik.touched.createdDate && formik.errors.createdDate}
                // label="Created Date"
                margin="normal"
                name="createdDate"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                type="date"
                value={formik.values.createdDate}
                variant="outlined"
              />
              </Grid>
              <Grid
                item
                md={6}
                xs={12}
              >
              <TextField
                error={Boolean(formik.touched.updatedDate && formik.errors.updatedDate)}
                fullWidth
                helperText={formik.touched.updatedDate && formik.errors.updatedDate}
                // label="Updated Date"
                margin="normal"
                name="updatedDate"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                type="date"
                value={formik.values.updatedDate}
                variant="outlined"
              />
              </Grid>
              <Grid
                item
                md={6}
                xs={12}
              >
              <TextField
                  error={Boolean(formik.touched.category_id && formik.errors.category_id)}
                  fullWidth
                  helperText={formik.touched.category_id && formik.errors.category_id}
                  label="Select Category"
                  margin="normal"
                  name="category_id"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  select
                  SelectProps={{ native: true }}
                  value={formik.values.category_id}
                  variant="outlined"
                >
                  <option>Select Category</option>
                  {categoryList.map((item) => (
                    <option
                      key={item.id}
                      value={item.id}
                    >
                      {item.name}
                    </option>
                  ))}
                </TextField>
                </Grid>
                <Grid
                item
                md={6}
                xs={12}
              >
              <FormControlLabel
                label="AutoReduceStock"
                control={(
                  <Checkbox
                    checked={formik.values.autoReduceStock}
                    color="primary"
                    name="autoReduceStock"
                    value={formik.values.autoReduceStock}
                    onChange={formik.handleChange}
                  />
                )}
              
              />
              </Grid>
              <Grid
                item
                md={6}
                xs={12}
              >
              <FormControlLabel
                label="Free Item"
                control={(
                  <Checkbox
                    color="primary"
                    name="freeItem"
                    checked={formik.values.freeItem}
                    value={formik.values.freeItem}
                    onChange={formik.handleChange}
                  />
                )}
              />
              </Grid>
              <Grid
                item
                md={6}
                xs={12}
              >
                Upload Image
                <input  id="image"
                  type={'file'} 
                  name="image"
                  accept='image/*'
                  onChange={handleFileChange }
                  />
                  <img src={imagePath} alt="" id={'myimage'} style={imagestyle} />
                  </Grid>
                  </Grid>
                  <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    p: 2
                  }}
                >
                { isedit ? <Button onClick={updateForm}>Update </Button> : <Button onClick={submitForm}>Submit </Button> }
                  <Button onClick={handleClose}>Close </Button>
                </Box>
              </form>
          </Typography>
        </Box>
      </Modal>
  </Box>
  )
})

