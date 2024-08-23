import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import successImage from "../../assests/success_image.png"; // Example path to your success image
import Header from "../header/Header";

const SuccessPage = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/home");
  };

  return (
    <>
      <Header />
      <Box sx={{ textAlign: "center", mt: 10 }}>
        <img
          src={successImage}
          alt='Success'
          style={{ width: "100px", height: "100px", marginBottom: "20px" }}
        />
        <Typography variant='h4' gutterBottom>
          Successfully Purchased!
        </Typography>
        <Typography variant='body1' gutterBottom>
          Thank you for your purchase. Your items will be delivered soon.
        </Typography>
        <Button
          variant='contained'
          color='primary'
          onClick={handleGoHome}
          sx={{ mt: 4 }}>
          Go to Homepage
        </Button>
      </Box>
    </>
  );
};

export default SuccessPage;
