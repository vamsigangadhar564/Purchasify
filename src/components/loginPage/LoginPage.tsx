import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import {
  Button,
  Checkbox,
  FormControlLabel,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../../reducers";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css"; // Import the CSS file
import { RootState } from "../../redux/store"; // Import RootState type if you have it

interface LoginData {
  username: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [userName, setUserName] = useState<string>("mor_2314");
  const [password, setPassword] = useState<string>("83r5^_");

  // Assuming the state shape
  const isLoginSuccess = useSelector(
    (state: RootState) => state.loginReducer.isLoginSuccess
  );

  useEffect(() => {
    if (isLoginSuccess) {
      navigate("/home");
    }
  }, [isLoginSuccess, navigate]);

  const handleSave = () => {
    const data: any = {
      username: userName,
      password: password,
    };
    dispatch(userLogin(data));
  };

  return (
    <Box className='rootContainer'>
      <Box className='imageContainer'>
        <img
          width='160%'
          height='95%'
          src={require("../../assests/shoppingCart.gif")}
          alt='description of the gif'
        />
      </Box>
      <Box className='loginContainer'>
        <Box className='titleContainer'>
          <Typography
            variant='h3'
            color='#003366'
            component='h3'
            mb={2}
            fontWeight='600'>
            Purchasify
          </Typography>
          <Typography variant='h5' component='h5'>
            Welcome Back
          </Typography>
        </Box>
        <Stack spacing={2} mb={1}>
          <TextField
            id='outlined-basic'
            label='User Name'
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setUserName(e.target.value);
            }}
            variant='outlined'
          />
          <TextField
            id='outlined-password-input'
            label='Password'
            type='password'
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setPassword(e.target.value);
            }}
          />
          <Box className='checkBoxContainer'>
            <FormControlLabel
              control={<Checkbox defaultChecked />}
              label='Remember me'
            />
            <Button sx={{ color: "black" }}>Reset Password</Button>
          </Box>
          <Button onClick={handleSave} color='primary' variant='contained'>
            sign in
          </Button>
        </Stack>
        <Box className='signUp'>
          <Typography
            sx={{ display: "flex", alignItems: "center" }}
            variant='body1'>
            Don't have an account?
          </Typography>
          <Button variant='text'>sign up</Button>
        </Box>
      </Box>
    </Box>
  );
};

export default LoginPage;
