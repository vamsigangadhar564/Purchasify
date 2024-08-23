import React from "react";
import Snackbar, { SnackbarCloseReason } from "@mui/material/Snackbar";
import { Alert, AlertTitle, Box, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { closeAlert } from "../../reducers";
import "./Alert.css";

interface AlertState {
  open: boolean;
  severity?: "error" | "info" | "success" | "warning";
  title?: string;
  msg?: string;
}

const CustomAlert: React.FC = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const alert = useSelector((state: any) => state["alertReducer"]);

  const handleClose = (event: any, reason?: any) => {
    if (reason === "clickaway") {
      return;
    }
    dispatch(closeAlert());
  };

  return (
    <Snackbar
      className='alert-container'
      open={alert.open}
      autoHideDuration={5000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}>
      <Alert
        onClose={handleClose}
        severity={alert.severity || "info"}
        variant='outlined'
        className='alert'
        sx={{
          backgroundColor: theme.palette.background.paper,
        }}>
        {alert.title && (
          <AlertTitle className='alert-title'>
            <strong>{alert.title}</strong>
          </AlertTitle>
        )}
        {typeof alert.msg === "string" && (
          <Box component='div' className='alert-message'>
            {alert.msg}
          </Box>
        )}
      </Alert>
    </Snackbar>
  );
};

export default CustomAlert;
