import Head from 'next/head';
import {
    Box,
    Button,
    Card,
    TextField,
    Grid,
    Container,
    InputAdornment,
    Typography,
    CardContent,
    CardHeader,
    Divider,
    SvgIcon,Modal,FormControlLabel, Checkbox,File
  } from '@mui/material';
import * as React from 'react';
import { useState,useEffect,forwardRef,useRef,useImperativeHandle  } from 'react';


export const PlanModal = ({plans}) => {
// const [selectePlan, setSelectedPlan] = useState([]);
const [open, setOpen] = React.useState(false);

const handleClose = (event, reason) => {
  debugger
  if (reason !== 'backdropClick') {
    setOpen(false);    
  }
}
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
  };

  useEffect(() => {
    debugger
    setOpen(true)
  },[]);

    return (
        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        >
        <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
            Plans
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>

            <Grid
            container
            spacing={4}
            >
              {plans.map((plan) => (
              <Grid
                item
                md={3}
                xs={12}
              >
                 <Typography id="modal-modal-title"  component="h2">
                <b>   {plan.name}</b><br></br>
                  <h2>   {plan.price} $</h2>
                </Typography>
                {plan.feature.map((el,index) => (
                  <ul
                    color="textSecondary"
                    gutterBottom
                    variant="overline"
                  >
                    <li>{el}</li>
                    
                  </ul>
                  ))
                  }
                  <br/><br/>
                  {plan.name == "Gold" ?
                  <Button
                 type='submit'
                  color="primary"
                  variant="contained"
                  onClick={handleClose}
                >
                  Buy
                </Button> : ""
                }
              </Grid>
                ))
                }
            
            </Grid>
            </Typography>
        </Box>
        </Modal>
    )
}