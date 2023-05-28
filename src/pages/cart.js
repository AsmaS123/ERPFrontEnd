import Head from 'next/head';
import { Box, Container } from '@mui/material';
import { CartListResults } from '../components/cart/cart-list-result';
import  CartListToolbar  from '../components/cart/cart-list-toolbar';
import { DashboardLayout } from '../components/dashboard-layout';
import { customers } from '../__mocks__/customers';
import { useState,useEffect ,useRef} from 'react';
import Axios from 'axios';
import * as React from 'react';
import apiUrl from '../config/endpoint';
import { FetchDataHook } from '../customHook/useFetch';

const Cart = () => {

  const [cartList , setCartList] = useState([]);
  const [flag , setflag] = useState(false);
  const childRef = useRef(null);
  const childTableRef = useRef(null);
 
  const data = FetchDataHook("cart");

  useEffect(() => {
      if(data){
        setCartList(data.cart);
        setflag(true)
      }
    },[data]);



    const fetchData = () => {
      Axios({
        method: "GET",
        url:apiUrl+"/cart"
      })
      .then((response) => {
        debugger
          setCartList(response.data.cart);
          setflag(true)
        // }
      });
    }

    const triggrtEdit = (obj) =>{
      // debugger
      childRef.current.childFunction(obj);
    }

    const searchItem  = (val) =>{
      childTableRef.current.childTableFunction(val);
    } 

      return (
        <>
          <Head>
            <title>
              Customers | Material Kit
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
              <CartListToolbar  func={fetchData}  search={(obj)=>searchItem(obj)} ref={childRef}/>
              <Box sx={{ mt: 3 }}>
                { (flag == true)? <CartListResults func={fetchData} carts={cartList} edit={(obj)=>{ triggrtEdit(obj)}} ref={childTableRef} /> : "display none" }
              </Box>
            </Container>
          </Box>  
          
        </>
      );
}

Cart.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Cart;
         
