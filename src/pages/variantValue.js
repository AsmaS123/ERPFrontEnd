import Head from 'next/head';
import { Box, Container, Grid, Pagination } from '@mui/material';
import { products } from '../__mocks__/products';
import { VariantValueListToolbar } from '../components/varinatvalue/varianvalue-list-toolbar';
import {VariantValueListResult} from '../components/varinatvalue/varianvalue-list-result';
import { ProductCard } from '../components/product/product-card';
import { DashboardLayout } from '../components/dashboard-layout';
import { useState , useRef,useEffect} from 'react';
import Axios from 'axios';
import apiUrl from '../config/endpoint';

const VariantValue = () => {

  const childRef = useRef(null);
  const [flag , setflag] = useState(false);
  const [varianValuetList, setVariantValueList] = useState([])

    useEffect(()=>{
      fetchData()
    },[])
    
    
    const fetchData = () => {
      Axios({
        method: "GET",
        url:apiUrl+"/variantvalue"
      })
      .then((response) => {
        debugger
        // if(response.data){
          // selectedProduct = selectedProduct.concat(response.data.category)
          setVariantValueList(response.data.variantvalue);
          setflag(true)
      });
    }
    return (
  <>
    <Head>
      <title>
        Variant | Material Kit
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
      <VariantValueListToolbar ref={childRef} func={fetchData}/>
        <Box sx={{ mt: 3 }}>
        { (flag == true)? <VariantValueListResult func={fetchData} variantList={varianValuetList} /> : "display none" }
        </Box>
      </Container>
    </Box>
  </>
    )
};

VariantValue.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default VariantValue;
