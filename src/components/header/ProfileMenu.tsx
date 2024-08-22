import React, { useState } from "react";
import {
  Menu,
  MenuItem,
  IconButton,
  Avatar,
  Typography,
  Box,
  Divider,
  Button,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "./ProfileMenu.css"; // Import the CSS file

// Mock geolocation data
const geolocation = {
  lat: "-37.3159",
  long: "81.1496",
};

// Mock function to get country information based on geolocation
const getCountryInfo = (lat: string, long: string) => {
  // In a real app, you'd use a geocoding API here

  if (lat === "-37.3159" && long === "81.1496") {
    return {
      country: "Australia",
      countryCode: "AU",
    };
  }
  // Default response
  return {
    country: "Unknown",
    countryCode: "",
  };
};

const ProfileMenu: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  const { userDetails } = useSelector((state: any) => state["loginReducer"]);

  const loginReducer = useSelector((state: any) => state["loginReducer"]);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    // Add your logout logic here
    navigate("/login");
    localStorage.removeItem("app_token");
    handleClose();
  };

  const { country, countryCode } = getCountryInfo(
    userDetails?.address?.geolocation?.lat || "",
    userDetails?.address?.geolocation?.long || ""
  );

  console.log(loginReducer, "sdgdfsgdf");

  return (
    <Box className='profileMenuContainer'>
      <IconButton onClick={handleClick} className='avatarButton'>
        <Avatar className='avatar'>
          {userDetails?.name?.firstname?.charAt(0)}
        </Avatar>
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          elevation: 3,
          className: "menuPaper",
          sx: {
            "& .MuiAvatar-root": {
              className: "avatarMenuItem",
            },
            "&:before": {
              className: "menuBefore",
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}>
        <Box className='profileInfo'>
          <Typography variant='body1' className='profileName'>
            {userDetails?.name?.firstname} {userDetails?.name?.lastname}
          </Typography>
          <Typography variant='body2' className='profileEmail'>
            {userDetails?.email}
          </Typography>
          {/* <Box className='countryFlagContainer'>
            <CountryFlag
              countryCode={countryCode}
              svg
              className='countryFlag'
            />
            <Typography variant='body2' color='textSecondary'>
              {country}
            </Typography>
          </Box> */}
        </Box>
        <Box className='logoutButtonContainer'>
          <Button
            onClick={handleLogout}
            variant='contained'
            className='logoutButton'>
            Logout
          </Button>
        </Box>
      </Menu>
    </Box>
  );
};

export default ProfileMenu;
