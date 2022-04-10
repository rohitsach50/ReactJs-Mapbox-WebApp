import React from "react";
import Map from "./components/Map";
import NavBar from "./components/NavBar";
import Empty from "./Empty";

import { Provider } from "react-redux";
import store from "./store";

const App = () => {


  
  //  console.log("render App");
  return (
    <React.StrictMode>
      <Provider store={store}>
        <div className="wrapper">
          <Empty/>
          <NavBar />
          <Map />
        </div>
      </Provider>
    </React.StrictMode>
  );
};

export default App;
