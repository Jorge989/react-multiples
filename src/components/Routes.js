import React from "react";
import ProtectedRoute from "../pages/ProtectedRoute/ProtectedRoute";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Signup from "../pages/Signup/Signup";
import Contact from "../pages/Contact";
import Home from "../pages/Home";
import { Provider } from "react-redux";
import { store } from "../store"; // your Redux store
import { ToastContainer, toast } from "react-toastify";
const Routes = () => (
  <Provider store={store}>
    <BrowserRouter basename="react-multiples">
      <Switch>
        <Route exact path="/" component={Home}></Route>
        <Route exact path="/signup" component={Signup}></Route>
        <Route exact path="/contact" component={Contact}></Route>
      </Switch>
      <ToastContainer position="top-center" />
    </BrowserRouter>
  </Provider>
);
export default Routes;
