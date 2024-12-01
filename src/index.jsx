import React , {StrictMode, useState} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Navbar from './Components/navbar';
import App from './App';
import reportWebVitals from './reportWebVitals';
// Theme
import { AgGridReact } from "ag-grid-react";
// React Grid Logic
import "ag-grid-community/styles/ag-grid.css";
// Core CSS
import "ag-grid-community/styles/ag-theme-quartz.css";

// import core from "https://js.api.here.com/v3/3.1/mapsjs-core.js"
// import service from "https://js.api.here.com/v3/3.1/mapsjs-service.js"

const Schedule = () => {
  // Row Data: The data to be displayed.
  const [rowData, setRowData] = useState([
    { make: "Tesla", model: "Model Y", price: 64950, electric: true },
    { make: "Ford", model: "F-Series", price: 33850, electric: false },
    { make: "Toyota", model: "Corolla", price: 29600, electric: false },
  ]);
  
  // Column Definitions: Defines the columns to be displayed.
  const [colDefs, setColDefs] = useState([
    { field: "make" },
    { field: "model" },
    { field: "price" },
    { field: "electric" }
  ]);

  const defaultColDef = {
    flex: 1,
  };
 
  return (
    <div
        className={
            "ag-theme-quartz-dark"
        }
        style={{ width: '100%', height: 500 }}
    >
        <AgGridReact 
        rowData={rowData} 
        columnDefs={colDefs} 
        defaultColDef={defaultColDef} 
        />
    </div>
  );
};  

// var platform = new H.service.Platform({
//   'apikey': '{YOUR_API_KEY}'
// });


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <head>
    <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </head>
    <Navbar/>
    <div class="tableBox">
      <h2>Games</h2>
      <form>
        <h4>Filters:</h4>
        <label for="date">Date: </label>
        <input type="text" name="date" id="date"></input>
        <label for="team">Team: </label>
        <input type="text" name="team" id="team"></input>
        <input type="submit" value="Submit"></input>
      </form>
      <Schedule/>
    </div>
    <div class="tableBox">
    <h2>Airports</h2>
      <form>
        <h4>Filters:</h4>
        <label for="dist">Max distance from stadium: </label>
        <input type="text" name="dist" id="dist"></input>
        <input type="submit" value="Submit"></input>
      </form>
      <Schedule/>
    </div>
    <div style={{width: "50%", height: "480px", background: "white", color: "black", paddingLeft: "50%", flex:1}} id="mapContainer">
      <h1>MAP</h1>
    </div>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();