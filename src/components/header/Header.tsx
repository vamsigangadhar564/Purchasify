import React, { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Badge } from "@mui/material";
import ProfileMenu from "./ProfileMenu";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../redux/store";
import "./Header.css"; // Import the CSS file

function Header() {
  const [cartTotal, setCartTotal] = useState<number>(0);
  const navigate = useNavigate();

  // Use useSelector with type RootState
  const cartReducer = useSelector((state: RootState) => state.cartReducer);

  useEffect(() => {
    setCartTotal(cartReducer.totalItems);
  }, [cartReducer]);

  return (
    <AppBar className='appBar' position='static'>
      <Container maxWidth='xl'>
        <Toolbar disableGutters>
          <Box className='headerContainer'>
            <Box className='leftSection'>
              <Box className='logoIcon'>
                <LocalMallIcon fontSize='large' />
              </Box>
              <Typography
                variant='h6'
                noWrap
                component='a'
                onClick={() => {
                  navigate("/home");
                }}
                className='title'>
                Purchasify
              </Typography>
            </Box>

            <Box className='rightSection'>
              <Badge
                badgeContent={cartTotal}
                className='badge'
                color='secondary'>
                <IconButton
                  onClick={() => {
                    navigate("/cart");
                  }}
                  className='iconButton'>
                  <ShoppingCartIcon fontSize='large' className='icon' />
                </IconButton>
              </Badge>
              <ProfileMenu />
            </Box>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Header;
