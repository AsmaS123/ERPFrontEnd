import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography
} from '@mui/material';
import { useState } from 'react';
import { increment, decrement } from '../../state/action/counterAction';
import { useSelector, useDispatch } from 'react-redux';
import SettingsNotifications from '../settings/settings-notifications'
const user = {
  avatar: '/static/images/avatars/avatar_6.png',
  city: 'Los Angeles',
  country: 'USA',
  jobTitle: 'Senior Developer',
  name: 'Katarina Smith',
  timezone: 'GTM-7'
};

 const AccountProfile = () => {
  // const [counter, SetCounter] = useState(0);

  const counter = useSelector((state) => state.counterReducer);
    const dispatch = useDispatch();
    const [file, setFile] = useState();

  const onFileChange = (e) =>{
    if(e.target.files[0]){
      setFile(URL.createObjectURL(e.target.files[0]));
    }
  }

  return (
  <Card >
    <CardContent>
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <Avatar
          src={file}
          sx={{
            height: 64,
            mb: 2,
            width: 64
          }}
        />
        <Typography
          color="textPrimary"
          gutterBottom
          variant="h5"
        >
          {user.name}
        </Typography>
        <Typography
          color="textSecondary"
          variant="body2"
        >
          {`${user.city} ${user.country}`}
        </Typography>
        <Typography
          color="textSecondary"
          variant="body2"
        >
          {user.timezone}
        </Typography>
      </Box>
    </CardContent>
    <Divider />
    <CardActions>
      <Button
        color="primary"
        fullWidth
        variant="text"
      >
         <input type="file" id="myFile" name="filename" onChange={(e) => onFileChange(e)}/>
         Upload picture
      </Button>
    </CardActions>
    <Divider />
    <CardActions>
      <Button
        color="primary"
        fullWidth
        variant="text"
      >
        Save picture
      </Button>
    </CardActions>
  </Card>
)
};

export default AccountProfile;