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
import { fetchData } from '../../pages/category';
import { useState,useEffect,forwardRef, useImperativeHandle } from 'react';
import { any } from 'prop-types';
import apiUrl from '../../config/endpoint';

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

  const CartListToolbar = forwardRef((props,ref) => {

  const [open, setOpen] = React.useState(false);
  const [isedit, setIsedit] = React.useState(false);
  const [productList , setProductList] = React.useState([]);
  const [public_id, SetPublic_id] = React.useState('');
  const [searchInput, setSearchInput] = useState('');
  const source = Axios.CancelToken.source();

  const handleOpen = () => {
    setIsedit(false)
    setOpen(true)
    const users_public_id =  sessionStorage.getItem('public_id')
    formik.setFieldValue('users_public_id', users_public_id)
  };

  const handleClose = () => {
    formik.resetForm()
    setOpen(false);
  }

  const formik = useFormik({
    initialValues: {
      id:'',
      grossAmount: '',
      taxAmount: '',
      shippingCharge : '',
      netAmount : '',
      amountPayable : '',
      isActive : true,
      product_id  : '',
      users_public_id : '',
    },
    validationSchema: Yup.object({
      grossAmount: Yup
      .string()
      .required(
        'GrossAmount is required')
    }),
  });

  useEffect(() => {
    fetchProducts();
    if(source)
    debugger
    return function(){
      source.cancel("Landing Component got unmounted");
    }
  },[]);

  const fetchProducts = () => {
    const config = {cancelToken: source.token}
    Axios({
      method: "GET",
      url:apiUrl+"/products"
    }, config)
    .then((response) => {
        setProductList(response.data.products);
    });
  }
  
  const submitForm = () => {
    alert(JSON.stringify(formik.values));
    Axios.post(`${apiUrl}/cart`, formik.values).then(res => {  
      // debugger
      props.func();
      handleClose();
    })  
  .catch(err => {  
    alert(err)
  });  
  }

  const updateForm  = () =>{

  }
  
  useImperativeHandle(ref, () => ({
    childFunction : (val) => {
        if(val.id){
          formik.setValues(val);
          setOpen(true);
          setIsedit(true)
        }
      }
  }))

  const searchItems = (searchValue) => {
    props.search(searchValue)
  }

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
          Cart
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
            Add Cart
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
                placeholder="Search Cart"
                variant="outlined"
                onChange={(e) => searchItems(e.target.value)}
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
          { isedit ? "Update Cart" : "Add Cart" }
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
              error={Boolean(formik.touched.grossAmount && formik.errors.grossAmount)}
              fullWidth
              helperText={formik.touched.grossAmount && formik.errors.grossAmount}
              label="Gross Amount"
              margin="normal"
              name="grossAmount"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="text"
              value={formik.values.grossAmount}
              variant="outlined"
            />
              </Grid>
          </Grid>
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
              error={Boolean(formik.touched.taxAmount && formik.errors.taxAmount)}
              fullWidth
              helperText={formik.touched.taxAmount && formik.errors.taxAmount}
              label="Tax Amount"
              margin="normal"
              name="taxAmount"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="text"
              value={formik.values.taxAmount}
              variant="outlined"
            />
            </Grid>
            <Grid
                item
                md={6}
                xs={12}
              >
              <TextField
              error={Boolean(formik.touched.shippingCharge && formik.errors.shippingCharge)}
              fullWidth
              helperText={formik.touched.shippingCharge && formik.errors.shippingCharge}
              label="Shipping Charge"
              margin="normal"
              name="shippingCharge"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="text"
              value={formik.values.shippingCharge}
              variant="outlined"
            />
            </Grid>
            </Grid>
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
              error={Boolean(formik.touched.netAmount && formik.errors.netAmount)}
              fullWidth
              helperText={formik.touched.netAmount && formik.errors.netAmount}
              label="Net Amount"
              margin="normal"
              name="netAmount"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="text"
              value={formik.values.netAmount}
              variant="outlined"
            />
              </Grid>
              </Grid>
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
                error={Boolean(formik.touched.amountPayable && formik.errors.amountPayable)}
                fullWidth
                helperText={formik.touched.amountPayable && formik.errors.amountPayable}
                label="Amount Payable"
                margin="normal"
                name="amountPayable"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                type="text"
                value={formik.values.amountPayable}
                variant="outlined"
              />
              </Grid>
              <Grid
                item
                md={6}
                xs={12}
              >
                <FormControlLabel
                control={(
                  <Checkbox
                    color="primary"
                    checked={formik.values.isActive}
                    name="isActive"
                    value={formik.values.isActive}
                    onChange={formik.handleChange}
                  />
                )}
                label="Status"
              />
              </Grid>
            </Grid>
            <br></br>
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

  export default React.memo(CartListToolbar);