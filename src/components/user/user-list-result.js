import { useState ,memo} from 'react';
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
  Modal,FormControlLabel,File,Grid,Link
} from '@mui/material';
import { getInitials } from '../../utils/get-initials';
import { useEffect } from 'react';
import Axios from 'axios';
import * as React from 'react';
  
const apiUrl = "http://127.0.0.1:5000/";

export const UserListResults = ({ users,onDelete,onEdit, ...rest }) => {
  const [selectedUserIds, setSelectedUserIds] = useState([]);
  const [selectedUser, setSelectedUser] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);


  useEffect(() => {
      selectedUser.concat(users[0])
    },[]);

    function deleteUser(id){
      onDelete(id)
    }

    function editUser(obj){
      onEdit(obj)
    }

    return (
        <Card {...rest}>
          <PerfectScrollbar>
        <Box sx={{ minWidth: 1050 }}>
          <Table>
            <TableHead>
              <TableRow>
              <TableCell>
                S.No
                </TableCell>
                <TableCell>
                sponcer_id
                </TableCell>
                <TableCell>
                First Name
                </TableCell>
                <TableCell>
                Last Name
                </TableCell>
                <TableCell>
                Email
                </TableCell>
                <TableCell>
                Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                 user.map((elem,index) => (
                <TableRow
                  hover
                >
                  <TableCell>{index+1}</TableCell>
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
                        {elem.sponcer_id}
                      </Typography>
                 
                    </Box>
                  </TableCell>
                  <TableCell>
                  <Typography
                        color="textPrimary"
                        variant="body1"
                      >
                        {elem.firstName}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                        color="textPrimary"
                        variant="body1"
                      >
                        {elem.lastName}
                      </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                        color="textPrimary"
                        variant="body1"
                      >
                        {elem.email}
                      </Typography>
                  </TableCell>
                  <TableCell>
                  <a onClick={() => editUser(elem)}>Edit</a> 
                  &nbsp; <a onClick={() => deleteUser(elem.id)}>Delete</a>
                  </TableCell>
                  </TableRow>
                  ))
                  ))}
                  </TableBody>
                  </Table>
                  </Box>
          </PerfectScrollbar>
        </Card>
    )
}

