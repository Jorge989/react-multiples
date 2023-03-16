import React from "react";

import { BrowserRouter, Switch, Route } from "react-router-dom";
import Signup from "../pages/Signup/Signup";
import Contact from "../pages/Contact";
import Home from "../pages/Home";
import { ToastContainer, toast } from "react-toastify";
const Routes = () => (
  <BrowserRouter basename="react-multiples">
    <Switch>
      <Route exact path="/" component={Home}></Route>
      <Route exact path="/signup" component={Signup}></Route>
      <Route exact path="/contact" component={Contact}></Route>
    </Switch>
    <ToastContainer position="top-center" />
  </BrowserRouter>
);
export default Routes;
