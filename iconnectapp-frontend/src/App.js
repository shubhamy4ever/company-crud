import React, { useState, useRef } from "react";
import "./App.css";
import Table from "./components/Table";
import { GrSearch } from "react-icons/gr";
const host = "http://localhost:5000";

const App = () => {
  let refClose = useRef();
  const [formdata, setformdata] = useState({
    key: "test data",
  });

  function onChangehandler(e) {
    setformdata({ ...formdata, [e.target.name]: e.target.value });
  }

  function submitHandler() {
    addcomp(
      formdata.name,
      formdata.description,
      formdata.number,
      formdata.mail,
      formdata.state,
      formdata.city
    );
  }

  async function addcomp(name, description, number, mail, state, city) {
    const response = await fetch(`${host}/addcompany`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, description, number, mail, state, city }),
    });
    refClose.current.click();
  }

  return (
    <div>
      <div className="container">
        <form className="d-flex">
          <input
            className="form-control my-5 mx-4 center"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
          <button className="btn btn-outline-success my-5 center" type="submit">
            <GrSearch />
          </button>
        </form>

        {/* for adding in db */}

        <button
          type="button"
          className="btn btn-primary mx-4"
          data-bs-toggle="modal"
          data-bs-target="#addmodal"
        >
          Add
        </button>

        {/* mainmodal for adding a company*/}
        <div
          className="modal fade"
          id="addmodal"
          tabIndex="-1"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Add A Company
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
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
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Company Description</label>
                    <textarea
                      rows="3"
                      className="form-control"
                      onChange={onChangehandler}
                      name="description"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Contact Number</label>
                    <input
                      type="number"
                      className="form-control"
                      onChange={onChangehandler}
                      name="number"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Contact Email</label>
                    <input
                      type="email"
                      className="form-control"
                      name="mail"
                      onChange={onChangehandler}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">State</label>
                    <input
                      type="text"
                      className="form-control"
                      name="state"
                      onChange={onChangehandler}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">City</label>
                    <input
                      type="text"
                      className="form-control"
                      name="city"
                      onChange={onChangehandler}
                    />
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                  ref={refClose}
                >
                  Close
                </button>
                <input
                  type="submit"
                  value={"Add The Company"}
                  disabled={
                    formdata.name &&
                    formdata.description &&
                    formdata.number &&
                    formdata.mail &&
                    formdata.state &&
                    formdata.city
                      ? false
                      : true
                  }
                  onClick={submitHandler}
                  className="btn btn-primary"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <Table />
      </div>
    </div>
  );
};

export default App;
