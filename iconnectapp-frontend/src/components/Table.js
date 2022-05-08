import React from "react";
import { useState,useRef } from "react";
import TableContent from "./TableContent";
const host = "http://localhost:5000";

const Table = (props) => {


  const refClose = useRef(null);





  //for editing details
  const [compdetails, setcompdetails] = useState(
    {name: "",
    description: "",
    number: "",
    mail: "",
    state: "",
    city: ""
    }
  );

  
  function editdetails(currentdetails) {
    setcompdetails({
      id:currentdetails._id,
      name: currentdetails.companyName,
      description: currentdetails.companyDescription,
      number: currentdetails.contactNumber,
      mail: currentdetails.contactEmail,
      state: currentdetails.state,
      city: currentdetails.city,
    });
  }

  
  function onChangehandler(e) {
    e.preventDefault();
    setcompdetails({ ...compdetails, [e.target.name]: e.target.value });
  }

  function submitHandler(e) {
    e.preventDefault();
    updatecomp(
      compdetails.id,
      compdetails.name,
      compdetails.description,
      compdetails.number,
      compdetails.mail,
      compdetails.state,
      compdetails.city
    );
  }

  async function updatecomp(id,name, description, number, mail, state, city) {
    // eslint-disable-next-line
    const response = await fetch(`${host}/editdata/${id}`, {
      method: "PUT",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, description, number, mail, state, city }),
    });
    refClose.current.click();

      props.fetchdata();

  }

  return (
    <div>
      {/* mainmodal for editing a company data*/}
      <div
        className="modal fade"
        id="editmodal"
        tabIndex="-1"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit A Company Data
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                ref={refClose}
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label className="form-label">Company Name</label>
                  <input
                    type="text"
                    className="form-control"
                    onChange={onChangehandler}
                    name="name"
                    value={compdetails.name}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Company Description</label>
                  <textarea
                    rows="3"
                    className="form-control"
                    onChange={onChangehandler}
                    name="description"
                    value={compdetails.description}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Contact Number</label>
                  <input
                    type="number"
                    className="form-control"
                    onChange={onChangehandler}
                    name="number"
                    value={compdetails.number}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Contact Email</label>
                  <input
                    type="email"
                    className="form-control"
                    name="mail"
                    onChange={onChangehandler}
                    value={compdetails.mail}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">State</label>
                  <input
                    type="text"
                    className="form-control"
                    name="state"
                    onChange={onChangehandler}
                    value={compdetails.state}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">City</label>
                  <input
                    type="text"
                    className="form-control"
                    name="city"
                    onChange={onChangehandler}
                    value={compdetails.city}
                  />
                </div>
                <input
                  type="submit"
                  value={"Done"}
                  disabled={
                    compdetails.name ||
                    compdetails.description ||
                    compdetails.number ||
                    compdetails.mail ||
                    compdetails.state ||
                    compdetails.city
                      ? false
                      : true
                  }
                  onClick={submitHandler}
                  className="btn btn-primary center"
                />
              </form>
            </div>
          </div>
        </div>
      </div>

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
          {props.companydata.map((comp) => {
            return (
              <TableContent
                key={comp._id}
                name={comp.companyName}
                description={comp.companyDescription}
                number={comp.contactNumber}
                mail={comp.contactEmail}
                state={comp.state}
                city={comp.city}
                whole={comp}
                editdetails={editdetails}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
