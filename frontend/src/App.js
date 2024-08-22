import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
// import Home from './components/Home';
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./components/pages/Dashboard";
import { AppBar, Container, Toolbar, Typography } from "@mui/material";

function App() {
  return (
    // <Router>
    //   <Navbar />
    //   <div>
    //     <Routes>
    //       {/* <Route exact path="/" component={Home} /> */}
    //       <Route path="/login" element={<Login />} />
    //       <Route path="/register" element={<Register />} />
    //       <Route path="/register" element={<Register />} />
    //       <Route
    //         path="/dashboard"
    //         element={<ProtectedRoute>
    //           <Dashboard />
    //         </ProtectedRoute>}
    //       />
    //     </Routes>
    //   </div>
    // </Router>

    <Fragment>
      <AppBar position="static">
        <Toolbar>
          <Typography>MyApp</Typography>
        </Toolbar>
      </AppBar>
      <Container>
        <Typography variant="h4" component="h1" gutterBottom>
          Welcome Jayditch Pogi!
        </Typography>
      </Container>
    </Fragment>
  );
}
export default App;
