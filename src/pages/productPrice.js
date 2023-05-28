import Head from 'next/head';
import { Box, Container, Grid, Pagination } from '@mui/material';
import { products } from '../__mocks__/products';
import { ProductPriceListToolbar } from '../components/productprice/productprice-list-toolbar'
import { ProductPriceListResult } from '../components/productprice/productprice-list-result';
import { ProductCard } from '../components/product/product-card';
import { DashboardLayout } from '../components/dashboard-layout';
import { useState , useRef,useEffect} from 'react';
import Axios from 'axios';
import apiUrl from '../config/endpoint';

const ProductPrice = () => {
  const [productPriceList, setProductPriceList] = useState([]);
  const childRef = useRef(null);
  const [flag , setflag] = useState(false);
  
  useEffect(() => {
    fetchData();
    },[]);

    const fetchData = () => {
      Axios({
        method: "GET",
        url:apiUrl+"/productprice"
      })
      .then((response) => {
        setProductPriceList(response.data.productprice);
          setflag(true)
      });
    }
    
    const triggrtEdit = (obj) =>{
      childRef.current.childFunction(obj);
    }

  return(
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
      <ProductPriceListToolbar ref={childRef} func={fetchData} />
        <Box sx={{ mt: 3 }}>
        { (flag == true)? <ProductPriceListResult func={fetchData} productList={productPriceList} edit={(obj)=>{ triggrtEdit(obj)}}/> : "display none" }
        </Box>
      </Container>
    </Box>
  </>
)};

ProductPrice.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default ProductPrice;
