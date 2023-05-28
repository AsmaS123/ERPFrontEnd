import Head from 'next/head';
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon, Typography,
  Modal,FormControlLabel, Checkbox,File,Grid,Link,Container
} from '@mui/material';
import { DashboardLayout } from '../components/dashboard-layout';
import { useState ,useEffect, useRef} from 'react';
import { UserListResults } from '../components/user/user-list-result';
import { UserListToolbar } from '../components/user/user-list-toolbar';
import { users } from '../__mocks__/customers';
import Axios from 'axios';
import * as React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import apiUrl from '../config/endpoint';

// const apiUrl = "http://127.0.0.1:5000/";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const  User = () => {
  const [selectedUser, setSelectedUser] = useState([]);
  const [flag , setflag] = React.useState(false);
  const [open, setOpen] = useState(false);
  const [userid, setUserId] = useState(false);
   //Get the whole state from characterReducer
   const person = useSelector(state => state.characters);
   const childFunc = React.useRef(null)

   //Use for all the dispatch actions
   const dispatch = useDispatch();

    useEffect(() => {
      fetchData();
        },[]);
    
        const fetchData = () => {
          Axios({
            method: "GET",
            url:apiUrl+"/user"
          })
          .then((response) => {
              selectedUser = [];
              setSelectedUser(oldArray => [response.data.users]);
              setflag(true)
          });
        }

        function handleChange(newValue) {
          fetchData();
        }

        function handleDelete(id) {
          setOpen(true);
          setUserId(id)
        }

        function handleEdit(obj){
          childFunc.current(obj);
        }
        
        function handleDeleteRecord(){
          debugger
          if(userid){
           let tempArray = selectedUser[0];
            tempArray.forEach((elm,index)=>{
              if(elm.id == userid){
                const id  = elm.id ;
                setOpen(false);
                Axios({
                  method: "DELETE",
                  url:apiUrl+"/user/"+ id
                })
                .then((response) => {
                    fetchData();
                    setflag(true);
                    setOpen(false);
                });
              }
            })
          }
        }

        const handleClose = (event, reason) => {
          if (reason !== 'backdropClick') {
            setOpen(false);
          }
        }

      return (
        <>
        <Head>
          <title>
            Users | Material Kit
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
            <UserListToolbar  onChange={handleChange} childFunc={childFunc} />
            <Box sx={{ mt: 3 }}>
            { (flag == true)? <UserListResults users={selectedUser}  onDelete={handleDelete} onEdit={handleEdit}/> : "display none" }
            </Box>
          </Container>
          <Modal
          open={open}
          onClose={handleClose  }
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" component="h2">
            Are you sure want to delete this record?
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <Button
            color="primary"
            variant="contained" onClick={handleDeleteRecord} >
            Yes
          </Button>&nbsp;
            <Button sx={{ mr: 1 }} onClick={handleClose} >Cancel</Button>
            </Typography>
            </Box>
          </Modal>
        </Box>
      </>
    );
}
User.getLayout = (page) => (
    <DashboardLayout>
      {page}
    </DashboardLayout>
  );

  export default User;