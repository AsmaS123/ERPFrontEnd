import { useState } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
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
  Typography,
  Button,
  Modal
} from '@mui/material';
import { getInitials } from '../../utils/get-initials';
import { useEffect } from 'react';
import Axios from 'axios';
import * as React from 'react';
  
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


export const ProductListResults = ({ products,func,edit, ...rest }) => {
  const [open, setOpen] = React.useState(false);
  const [product, setProduct] = useState(null);
//   const [productId, setProductId] = useState(null);

  useEffect(() => {
    },[]);

    const deleteProduct = () => {
        debugger
        // console.log(id)
        const Id = product.id
        Axios({
        method: "DELETE",
        url:apiUrl+"/products/"+Id
        })
        .then((response) => {
        func()
        handleClose()
        // if(response.data){
        
        // }
        });
    }

    const editProduct = (product) => {
        edit(product)
    };
      
    const openDeleteDialogue = (prd) =>{
        setProduct(prd)
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
      }

      
    return (
        <Card>
        <PerfectScrollbar>
        <Box sx={{ minWidth: 1050 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  Name
                </TableCell>
                <TableCell>
                Description
                </TableCell>
                {/* <TableCell>
                Sku No
                </TableCell> */}
                <TableCell>
                Created Date
                </TableCell>
                <TableCell>
                Updated Date
                </TableCell>
                <TableCell>
                Image
                </TableCell>
                <TableCell>
                Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((product) => (
                //  prd.map((product) => (
                <TableRow
                  hover
                  key={product.id}
                >
                  <TableCell>
                    <Box
                      sx={{
                        alignItems: 'center',
                        display: 'flex'
                      }}
                    >
                      <Avatar
                        src={product.avatarUrl}
                        sx={{ mr: 2 }}
                      >
                        {getInitials(product.name)}
                      </Avatar>
                      <Typography
                        color="textPrimary"
                        variant="body1"
                      >
                        {product.name}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Typography
                        color="textPrimary"
                        variant="body1"
                      >
                        {product.description}
                      </Typography>
                  </TableCell>
                  {/* <TableCell>
                    <Typography
                        color="textPrimary"
                        variant="body1"
                      >
                        {product.skuNo}
                      </Typography>
                  </TableCell> */}
                  <TableCell>
                    <Typography
                        color="textPrimary"
                        variant="body1"
                      >
                        {product.createdDate}
                      </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                        color="textPrimary"
                        variant="body1"
                      >
                        {product.updatedDate}
                      </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                        color="textPrimary"
                        variant="body1"
                      >
                        {product.image}
                        {/* <image src="{{url_for('static',filename = 'images/download.jpg')}}" > */}
                        <img src={product.full_filename} />
                      </Typography>
                  </TableCell>
                  <TableCell>
                    <a  onClick={() => editProduct(product)}>Edit</a> &nbsp; <a onClick={() => openDeleteDialogue(product)}>Delete</a>
                  </TableCell>
                </TableRow>
                // ))
              ))}
            </TableBody>
          </Table>
        </Box>
        </PerfectScrollbar>
            {/* <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={selectedProduct.length}
            rowsPerPage={limit}
            page={page}
            onPageChange={handlePageChange}
            onRowsPerPageChange={handleLimitChange}
            /> */}
       
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            >
            <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Delete Product
              {/* <SubCategoryModal/> */}
            </Typography>
            <p>Are you sure want to delete Product <b>{product ?  product.name : ""}</b> ?</p>
            <Button onClick={deleteProduct}>Delete </Button>
            <Button onClick={handleClose}>Close </Button>
            </Box>
          </Modal>
        </Card>
      );
}