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
import NextLink from 'next/link';
import { useRouter } from 'next/router';

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


  
export const VariantValueListToolbar = forwardRef((props,ref) => {
    const [open, setOpen] = React.useState(false);
    const [isedit, setIsedit] = React.useState(false);
    const [variantList, setVariantList] = useState([]);

    const formik = useFormik({
        initialValues: {
          value: '',
          variants_id:''
        },
        validationSchema: Yup.object({
          value: Yup
          .string()
          .required(
            'Value is required'),
            variants_id: Yup
            .string()
            .required(
            'Variant is required'), 
          })
        });

    const fetchData = () => {
        Axios({
            method: "GET",
            url:apiUrl+"/variants"
        })
        .then((response) => {
            debugger
            // if(response.data){
            // selectedProduct = selectedProduct.concat(response.data.category)
            setVariantList(response.data.variant);
            // setflag(true)
        });
    }
        
    const handleOpen = () => {
        fetchData();
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
        // const config = {
        //   headers: {
        //       'content-type': 'multipart/form-data'
        //   }
        // };
        Axios.post(`${apiUrl}/variantvalue`, formik.values).then(res => {  
          debugger
          props.func();
          handleClose();
        })  
      .catch(err => {  
        alert(err)
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
      Variant
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
        sx={{ mr: 1 }}
      >
    <NextLink
          href="/variant"
        >
          <Link
            to="/variant"
            variant="subtitle2"
            underline="hover"
            sx={{
              cursor: 'pointer'
            }}
          >
            Variant
          </Link>
        </NextLink>
      </Button>
   
      <Button
        color="primary"
        variant="contained"  onClick={handleOpen}
      >
        Add Variant Value
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
          { isedit ? "Update Variant Value" : "Add Variant Value" }
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
                md={6}
                xs={12}
              >
              <TextField
                  error={Boolean(formik.touched.variants_id && formik.errors.variants_id)}
                  fullWidth
                  helperText={formik.touched.variants_id && formik.errors.variants_id}
                  label="Select Variant"
                  margin="normal"
                  name="variants_id"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  select
                  SelectProps={{ native: true }}
                  value={formik.values.variants_id}
                  variant="outlined"
                >
                  <option>Select Variant</option>
                  {variantList.map((item) => (
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
                <TextField
                error={Boolean(formik.touched.value && formik.errors.value)}
                fullWidth
                helperText={formik.touched.value && formik.errors.value}
                label="Value"
                margin="normal"
                name="value"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                type="text"
                value={formik.values.value}
                variant="outlined"
              />
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
  