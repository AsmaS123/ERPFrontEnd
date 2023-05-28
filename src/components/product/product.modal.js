import {
    Box,Typography,Modal,
    Button,
    Card,
    CardContent,
    TextField,
    InputAdornment,
    SvgIcon, FormControlLabel, Checkbox
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

 export const ProductModal  = () => {
  return (
    <React.Fragment>
    <Button>Product</Button>
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
            Add Product
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
         
          </Typography>
        </Box>
      </Modal>
    </Box>
    </React.Fragment>
  )};