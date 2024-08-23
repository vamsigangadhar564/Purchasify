import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import allRoutes, { RouteInterface } from "./routes/allRoutes";
import { createTheme, CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/styles";
import CustomAlert from "./components/alert/Alert";
// import CustomAlert from "./Components/CustomAlerts";
// import RouterComponent from "./RouterComponent";

function App() {
  const theme = createTheme({
    // your theme setup
  });

  return (
    <div className='App'>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <CustomAlert />
          <Routes>
            {allRoutes.map((route: RouteInterface) => {
              return (
                <Route {...route} element={route.component} key={route.path} />
              );
            })}
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}

export default App;
