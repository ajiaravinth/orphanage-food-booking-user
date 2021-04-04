import React from "react";
import {BrowserRouter, Switch, Route} from "react-router-dom";
import "./App.css";
import {HomePage} from "./Components/Home/Home";
import Login from "./Components/Auth/Login";
import Register from "./Components/Auth/Register";
import Routing from "./Components/Routing/Routing";



 const App = () => {
  return (  
    <BrowserRouter>
    <Switch>    
      <Route path="/" exact component={HomePage} />
       <Route path="/signin" exact component={Login} />
      <Route path="/register" exact component={Register} />
      <Routing />
    </Switch>
    </BrowserRouter>
  )
}

export default App;
