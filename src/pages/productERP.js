import Head from 'next/head';
import {  Container } from '@mui/material';
import { ProductListToolbar } from '../components/product/product-list-toolbar';
import { DashboardLayout } from '../components/dashboard-layout';
import { useState , useRef} from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Avatar,
  Box,
  Card,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography
} from '@mui/material';
import { getInitials } from '../utils/get-initials';
import { useEffect } from 'react';
import Axios from 'axios';
import * as React from 'react';
import { ProductListResults } from '../components/product/product-list-result';
import apiUrl from '../config/endpoint';
// const apiUrl = "http://127.0.0.1:5000/";
export const ProductERP = () => {

  const [productList, setProductList] = useState([]);
  const childRef = useRef(null);
  const [flag , setflag] = React.useState(false);
  
  useEffect(() => {
    fetchData();
    },[]);

    const fetchData = () => {
  
      Axios({
        method: "GET",
        url:apiUrl+"/products"
      })
      .then((response) => {
        debugger
        // if(response.data){
          // selectedProduct = selectedProduct.concat(response.data.category)
          setProductList(response.data.products);
          setflag(true)
      });
    }
    
    const triggrtEdit = (obj) =>{
      childRef.current.childFunction(obj);
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
        <ProductListToolbar ref={childRef} func={fetchData} />
        <Box sx={{ mt: 3 }}>
        {/* <ProductListResults func={fetchData} products={productList} edit={(obj)=>{ triggrtEdit(obj)}}/> */}
          { (flag == true)? <ProductListResults func={fetchData} products={productList} edit={(obj)=>{ triggrtEdit(obj)}}/> : "display none" }
        </Box>
      </Container>
    </Box>
  </>)
};

ProductERP.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default ProductERP;
