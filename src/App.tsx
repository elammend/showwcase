import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Home from "./Home";
import Main from "./Main";
function App() {
  return (
    <div>
      <BrowserRouter>
        <Route path="/" exact component={Home}></Route>
        <Route path="/main" component={Main}></Route>
      </BrowserRouter>
    </div>
  );
}

export default App;
