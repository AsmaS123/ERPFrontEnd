import { useState ,forwardRef, useImperativeHandle, useEffect} from 'react';
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
import Axios from 'axios';
import * as React from 'react';
import apiUrl from '../../config/endpoint'

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


export const CartListResults = forwardRef(({ func,carts,edit},ref) => {
  const [searchResult, setSearchSearch] = useState([]);

  const editCart = (cart) =>{
    edit(cart)
  }

  const openDeleteCart = (cart) =>{
    // setProduct(prd)
    // setOpen(true);
  }

  useImperativeHandle(ref, () => ({
    childTableFunction : (val) => {
        const searchedResult = carts.filter((item) => {
          return Object.values(item).join('').toLowerCase().includes(val.toLowerCase())
      });
      setSearchSearch(searchedResult)
      }
  }))

  useEffect(()=>{
   setSearchSearch(carts)
  },[])

    return (
        <Card>
          <PerfectScrollbar>
            <Box sx={{ minWidth: 1050 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>
                    Gross Amount
                    </TableCell>
                    <TableCell>
                    Net Amount
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
                  {searchResult.map((cart) => (
                    // customer.map((cust) => (
                    <TableRow
                      hover
                      key={cart}
                      // selected={selectedCustomerIds.indexOf(cust.id) !== -1}
                    >
                      <TableCell>
                        <Typography
                          color="textPrimary"
                          variant="body1"
                        >
                          {cart.grossAmount}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Box
                          sx={{
                            alignItems: 'center',
                            display: 'flex'
                          }}
                        >
                          <Typography
                          color="textPrimary"
                          variant="body1"
                        >
                          {cart.netAmount}
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
                          checked={cart.isActive}
                          // value="true"
                        />
                        </Box>
                      </TableCell>
                      <TableCell>
                        <a onClick={() => editCart(cart)}>Edit</a> &nbsp; <a onClick={() => openDeleteCart(cart)}>Delete</a>
                      </TableCell>
                    </TableRow>
                    // ))
                  ))}
                </TableBody>
              </Table>
            </Box>
          </PerfectScrollbar>
        </Card>
        )
    });