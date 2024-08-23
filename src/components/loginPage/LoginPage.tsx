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
import LoadingButton from "@mui/lab/LoadingButton";

interface LoginData {
  username: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [userName, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loader, setLoader] = useState<boolean>(false);

  // Assuming the state shape
  const isLoginSuccess = useSelector(
    (state: RootState) => state.loginReducer.isLoginSuccess
  );

  const loaderReducer = useSelector((state: any) => state.loaderReducer);

  useEffect(() => {
    if (isLoginSuccess) {
      navigate("/home");
    }
  }, [isLoginSuccess, navigate]);

  useEffect(() => {
    setLoader(loaderReducer.loaderStatus);
  }, [loaderReducer]);

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
          <LoadingButton
            color='primary'
            disabled={!userName.length || !password.length}
            onClick={handleSave}
            loading={loader}
            loadingPosition='end'
            variant='contained'>
            <span> sign in</span>
          </LoadingButton>
        </Stack>
      </Box>
    </Box>
  );
};

export default LoginPage;
