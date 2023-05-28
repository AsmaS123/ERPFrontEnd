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


export const CategoryListResults = ({ categories,edit,func, ...rest }) => {
  const [open, setOpen] = React.useState(false);
  const [category, setCategory] = useState(null);

  useEffect(() => {
    },[]);

    const openDeleteDialogue = (obj) => {
      setCategory(obj);
      setOpen(true);
    }

    const deleteCategory = () => {
      debugger
      // console.log(id)
      const Id = category.id
      Axios({
        method: "DELETE",
        url:apiUrl+"/category/"+Id
      })
      .then((response) => {
        debugger
        func()
        handleClose()
        // if(response.data){
        
        // }
      }).catch((error)=>{
        
      });
    }

  const editCategory = (cust) =>{
    edit(cust)
  }

  const handleClose = () => {
    setOpen(false);
  }

  return (
    <Card {...rest}>
      <PerfectScrollbar>
        <Box sx={{ minWidth: 1050 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  Name
                </TableCell>
                <TableCell>
                Status
                </TableCell>
                <TableCell>
                Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {categories.map((customer) => (
                 customer.map((cust) => (
                <TableRow
                  hover
                  key={cust}
                  // selected={selectedCustomerIds.indexOf(cust.id) !== -1}
                >
                  <TableCell>
                    <Box
                      sx={{
                        alignItems: 'center',
                        display: 'flex'
                      }}
                    >
                      <Avatar
                        src={cust.avatarUrl}
                        sx={{ mr: 2 }}
                      >
                        {getInitials(cust.name)}
                      </Avatar>
                      <Typography
                        color="textPrimary"
                        variant="body1"
                      >
                        {cust.name}
                      </Typography>
                      
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box
                      sx={{
                        alignItems: 'center',
                        display: 'flex'
                      }}
                    >
                      <Checkbox
                      checked={cust.active}
                      // value="true"
                    />
                    </Box>
                  </TableCell>
                  <TableCell>
                    <a onClick={() => editCategory(cust)}>Edit</a> &nbsp; <a onClick={() => openDeleteDialogue (cust)}>Delete</a>
                  </TableCell>
                </TableRow>
                ))
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        >
        <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Delete Category
          {/* <SubCategoryModal/> */}
        </Typography>
        <p>Are you sure want to delete Category <b>{category ?  category.name : ""}</b> ?</p>
        <Button onClick={deleteCategory}>Delete </Button>
        <Button onClick={handleClose}>Close </Button>
        </Box>
      </Modal>
    </Card>
  );
};

// CategoryListResults.propTypes = {
//   categories: PropTypes.array.isRequired
// };
