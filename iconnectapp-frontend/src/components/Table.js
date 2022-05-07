import React from "react";
import { useState,useEffect } from "react";
import TableContent from "./TableContent";
const host="http://localhost:5000"

const Table = () => {
  const [companydata, setcompanydata] = useState({"":""});
  async function fetchdata(){
    const response = await fetch(`${host}/fetchall`, {
      method: 'GET', 
      mode: 'cors', 
      headers: {
        'Content-Type': 'application/json'
      },
    });
    const json = await response.json();
    setcompanydata(json);
    console.log(companydata);
  }
  useEffect(() => {
  fetchdata();
// eslint-disable-next-line  
},[]);

  return (
    <div>
      <table className="table my-2 mx-4">
        <thead>
          <tr>
            <th scope="col">Company Name</th>
            <th scope="col">Company Description</th>
            <th scope="col">Contact Number</th>
            <th scope="col">Contact Email</th>
            <th scope="col">State</th>
            <th scope="col">City</th>
          </tr>
        </thead>
        <tbody>
          {companydata.map((comp)=>{
            return(
              <TableContent 
              key={comp.id}
              name={comp.companyName}
              description={comp.companyDescription}
              number={comp.companyNumber}
              mail={comp.companyEmail}
              state={comp.companyState}
              city={comp.companyCity}
              />
            );
          })}
       
        </tbody>
      </table>
    </div>
  );
};

export default Table;
