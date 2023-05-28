import Head from 'next/head';
import { Box, Container, Grid, Pagination } from '@mui/material';
import { products } from '../__mocks__/products';
import { VariantListToolbar } from '../components/variants/variants-list-toolbar';
import {VariantListResult} from '../components/variants/variants-list-result';
import { ProductCard } from '../components/product/product-card';
import { DashboardLayout } from '../components/dashboard-layout';
import { useState , useRef,useEffect} from 'react';
import Axios from 'axios';
import apiUrl from '../config/endpoint';

const Variant = () => {

  const childRef = useRef(null);
  const [flag , setflag] = useState(false);
  const [variantList, setVariantList] = useState([])

    useEffect(()=>{
      fetchData()
    },[])
    
    
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
          setflag(true)
      });
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
      <VariantListToolbar ref={childRef} func={fetchData}/>
        <Box sx={{ mt: 3 }}>
        { (flag == true)? <VariantListResult func={fetchData} variant={variantList} /> : "display none" }
        </Box>
      </Container>
    </Box>
  </>
    )
};

Variant.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Variant;
