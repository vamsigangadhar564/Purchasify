import React, { useEffect, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import allRoutes, { RouteInterface } from "./routes/allRoutes";
import { createTheme, CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/styles";
import CustomAlert from "./components/alert/Alert";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails, setAuth, setLoginStatus } from "./reducers";
import { RootState } from "./redux/store";
import jwtDecode from "jwt-decode";
import LoginPage from "./components/loginPage/LoginPage";
// import CustomAlert from "./Components/CustomAlerts";
// import RouterComponent from "./RouterComponent";

interface UserDetails {
  iat: number;
  sub: number;
  user: string;
}

function App() {
  const theme = createTheme({
    // your theme setup
  });

  const dispatch = useDispatch();

  const loginReducer = useSelector((state: RootState) => state.loginReducer);

  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);

  useEffect(() => {
    if (localStorage.getItem("app_token")) {
      const token = localStorage.getItem("app_token");
      dispatch(setLoginStatus(false));
      if (token) {
        setUserDetails(jwtDecode(token));
        dispatch(setAuth(true));
      } else {
        setUserDetails(null);
        dispatch(setAuth(false));
      }
    }
  }, []);

  useEffect(() => {
    if (loginReducer.isLoginSuccess) {
      if (localStorage.getItem("app_token")) {
        const token = localStorage.getItem("app_token");
        dispatch(setLoginStatus(false));
        if (token) {
          dispatch(setAuth(true));
          setUserDetails(jwtDecode(token));
        } else {
          dispatch(setAuth(false));
          setUserDetails(null);
        }
      }
    }
  }, [loginReducer.isLoginSuccess]);

  useEffect(() => {
    if (userDetails?.sub) {
      dispatch(getUserDetails({ id: userDetails?.sub }));
    }
  }, [userDetails]);

  return (
    <div className='App'>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <CustomAlert />
          <Routes>
            {allRoutes.map((route: RouteInterface) => {
              return (
                <Route
                  {...route}
                  element={
                    route.isProtected ? (
                      loginReducer.auth ? (
                        route.component
                      ) : (
                        <Navigate to='/login' />
                      )
                    ) : (
                      <LoginPage />
                    )
                  }
                  key={route.path}
                />
              );
            })}
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}

export default App;
