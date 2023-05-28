import Head from 'next/head';
import { Box, Container } from '@mui/material';
import { CategoryListResults } from '../components/category/category-list-results';
import { CategoryrListToolbar } from '../components/category/category-list-toolbar';
import { DashboardLayout } from '../components/dashboard-layout';
import { customers } from '../__mocks__/customers';
import { useState,useEffect ,useRef} from 'react';
import Axios from 'axios';
import * as React from 'react';
import apiUrl from '../config/endpoint';
// const apiUrl = "http://127.0.0.1:5000/";

const Category = () => {

  const [categoryList , setcategoryList] = React.useState([]);
  const [flag , setflag] = React.useState(false);
  const childRef = useRef(null);

  // const callChildFunction = (val) => {
  //     childRef.current.childFunction(val);
  // }

  useEffect(() => {
    // if(id){
      fetchData();
      // }
    },[]);

 const fetchData = () => {
      Axios({
        method: "GET",
        url:apiUrl+"/categories"
      })
      .then((response) => {
        debugger
          setcategoryList([response.data.category]);
          setflag(true)
        // }
      });
    }

    const triggrtEdit = (obj) =>{
      debugger
      // alert(JSON.stringify(obj))
      childRef.current.childFunction(obj);
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
              <CategoryrListToolbar func={fetchData}  ref={childRef} />
              <Box sx={{ mt: 3 }}>
                { (flag == true)? <CategoryListResults func={fetchData} categories={categoryList}  edit={(obj)=>{ triggrtEdit(obj)}}/> : "display none" }
              </Box>
            </Container>
          </Box>  
          
        </>
      );
    
    
}

Category.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

      {/* <CustomerListResults customers={customers} /> */}

export default Category;
         