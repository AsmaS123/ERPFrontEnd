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



export const VariantListResult = ({ variant,func }) => (
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
          Variant Value
          </TableCell>
          <TableCell>
          Action
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {variant.map((variants) => (
          //  prd.map((product) => (
          <TableRow
            hover
            key={variants.id}
          >
            <TableCell>
              <Box
                sx={{
                  alignItems: 'center',
                  display: 'flex'
                }}
              >
                <Avatar
                  src={variants.avatarUrl}
                  sx={{ mr: 2 }}
                >
                  {getInitials(variants.name)}
                </Avatar>
                <Typography
                  color="textPrimary"
                  variant="body1"
                >
                  {variants.name}
                </Typography>
              </Box>
            </TableCell>
            <TableCell>
                <Typography
                    color="textPrimary"
                    variant="body1"
                  >
                    {(variants.varinatValue).map((val) => 
                    
                     <span>{val} , </span> 
                    
                    )}
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
  </Card>
);



