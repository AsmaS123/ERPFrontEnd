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
import { useField, Form, FormikProps, Formik,useFormik } from 'formik';
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
    width: 800,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };


  
export const ProductPriceListToolbar = forwardRef((props,ref) => {
  const [open, setOpen] = React.useState(false);
  const [isedit, setIsedit] = React.useState(false);
  const [productList , setProductList] = React.useState([]);
  const [variantList , setVariantList] = React.useState([]);
  const [variantValueList , setVariantValueList] = React.useState([]);

  const formik = useFormik({
    initialValues: {
      sKUNo: '',
      taxPercent :0,
      taxonMRP : 0,
      mrp :'',
      discountPercent :0,
      shippingCharge :0,
      ourPrice :'',
      stockAvailable:true,
      stockOrdered :true,
      product_id:'',
      variants_id:'',
      variantValues_id:''
    },
    validationSchema: Yup.object({
      mrp: Yup
      .string()
      .required(
        'MRP is required'),
      ourPrice: Yup
      .string()
      .required(
        'Price is required'), 
      product_id: Yup
      .date()
      .required(
        'Product is required'), 
      updatedDate: Yup
      .date()
      .required(
        'Updated Date is required'), 
      variants_id: Yup
      .string()
      .required(
        'Variants is required'), 
    })
  });

  useEffect(() => {
    fetchVariant()
    fetchProducts()
    // debugger
   
  },[formik.values.variants_id]);

  const fetchVariant = () => {
    Axios({
      method: "GET",
      url:apiUrl+"/variants"
    })
    .then((response) => {
      // debugger
      setVariantList(response.data.variant);
    }).catch((error)=>{
      console.log(error)
    });
  }

  const fetchProducts = () => {
    Axios({
      method: "GET",
      url:apiUrl+"/products"
    })
    .then((response) => {
      // debugger
      // if(response.data){
        // selectedProduct = selectedProduct.concat(response.data.category)
        setProductList(response.data.products);
        // setflag(true)
    });
  }

  const handleChangeVariant = (e) => {
    const id = e.target.value;
    formik.setFieldValue("variants_id", id)
    if(id){
      Axios({
        method: "GET",
        url:apiUrl+"/variantvalue/"+id
      })
      .then((response) => {
        // debugger
        // if(response.data){
          // selectedProduct = selectedProduct.concat(response.data.category)
          setVariantValueList(response.data.variantValue);
          // setflag(true)
      });
    }
  }

  const handleOpen = () => {
    setIsedit(false)
    // alert(JSON.stringify(categoryList))
    setOpen(true)
  };

  const handleClose = (event, reason) => {
    // debugger
    if (reason !== 'backdropClick') {
      setOpen(false);
      formik.resetForm();
    }
  }

  const updateForm = () => {
    // debugger
      const obj = formik.values;
      const id = obj.id;
      alert(JSON.stringify(obj))
      Axios.put(`${apiUrl}/productprice`+'/'+id, formik.values).then(res => {  
        // debugger
        props.func();
        handleClose();
      })  
    .catch(err => {  
      alert(err)
      // toast.error('Something went wrong.');  
    });  
  }

  const submitForm = () => {
    // debugger
    alert(JSON.stringify(formik.values))
    Axios.post(`${apiUrl}/productprice`, formik.values).then(res => {  
      // debugger
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
      // debugger
        // alert(JSON.stringify(val));
        if(val.id){
          // alert(val)
          formik.setValues(val);

          // setProductList([val.product])
          formik.setFieldValue("product_id", val.product.id)
          // let variantkey = Object.keys(val.variant)
          // let variantval = Object.values(val.variant)
          formik.setFieldValue("variants_id", val.variant.id)
          setVariantValueList([val.variantvalue])
          formik.setFieldValue("variantValues_id", val.variantvalue.id)
          // formik.setFieldValue("product_id", val.product.id)
          setOpen(true);
          setIsedit(true)
        }
      }
  }))

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
      Product Price
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
        Add Product Price
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
          { isedit ? "Update Product Price" : "Add Product Price" }
            {/* <SubCategoryModal/> */}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <form  onSubmit={formik.handleSubmit} >
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
                error={Boolean(formik.touched.mrp && formik.errors.mrp)}
                fullWidth
                helperText={formik.touched.mrp && formik.errors.mrp}
                label="MRP"
                margin="normal"
                name="mrp"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                type="text"
                value={formik.values.mrp}
                variant="outlined"
              />
              </Grid>
              <Grid
                item
                md={6}
                xs={12}
              >
              <TextField
                error={Boolean(formik.touched.ourPrice && formik.errors.ourPrice)}
                fullWidth
                helperText={formik.touched.ourPrice && formik.errors.ourPrice}
                label="Our Price"
                margin="normal"
                name="ourPrice"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                type="text"
                value={formik.values.ourPrice}
                variant="outlined"
              />
              </Grid>
             
              <Grid
                item
                md={6}
                xs={12}
              >
              <TextField
                  error={Boolean(formik.touched.product_id && formik.errors.product_id)}
                  fullWidth
                  helperText={formik.touched.product_id && formik.errors.product_id}
                  label="Select Product"
                  margin="normal"
                  name="product_id"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  select
                  SelectProps={{ native: true }}
                  value={formik.values.product_id}
                  variant="outlined"
                  disabled={isedit == true ? true : false}
                >
                  <option>Select Product</option>
                  {productList.map((item) => (
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
                  error={Boolean(formik.touched.variants_id && formik.errors.variants_id)}
                  fullWidth
                  helperText={formik.touched.variants_id && formik.errors.variants_id}
                  label="Select Variant"
                  margin="normal"
                  name="variants_id"
                  onBlur={formik.handleBlur}
                  onChange={handleChangeVariant}
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
                  error={Boolean(formik.touched.variantValues_id && formik.errors.variantValues_id)}
                  fullWidth
                  helperText={formik.touched.variantValues_id && formik.errors.variantValues_id}
                  label="Select Variant Value"
                  margin="normal"
                  name="variantValues_id"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  select
                  SelectProps={{ native: true }}
                  value={formik.values.variantValues_id}
                  variant="outlined"
                >
                  <option>Select Variant Value</option>
                  {variantValueList.map((item) => (
                    <option
                      key={item.id}
                      value={item.id}
                    >
                      {item.value}
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
                label="Stock Available"
                control={(
                  <Checkbox
                    checked={formik.values.stockAvailable}
                    color="primary"
                    name="stockAvailable"
                    value={formik.values.stockAvailable}
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
                label="Stock Ordered"
                control={(
                  <Checkbox
                    color="primary"
                    name="stockOrdered"
                    checked={formik.values.stockOrdered}
                    value={formik.values.stockOrdered}
                    onChange={formik.handleChange}
                  />
                )}
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
  )}
)

  