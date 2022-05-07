import React from "react";
import "./App.css";
import Table from "./components/Table";
const App=()=>{
    return(
    <div>
<div className="container">
<form class="d-flex">
        <input className="form-control my-5 mx-4 center" type="search" placeholder="Search" aria-label="Search" />
        <button className="btn btn-outline-success my-5 center" type="submit">Search</button>
      </form>
   <button type="button" class="btn btn-primary mx-4">Add</button>

</div>
<div className="container">
<Table/>
</div>
    </div>
    
    );
}
export default App;
