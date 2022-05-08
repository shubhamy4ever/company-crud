import React, { useState, useEffect } from "react";
import "./App.css";
import Table from "./components/Table";
import { GrSearch } from "react-icons/gr";
import Alert from "./components/Alert";
const host = "http://localhost:5000";

//for city and state json data which have state and its object as array which have object name of thath state and its cities
const data = {
  states: [
    {
      name: "maharashtra",
      cities: ["thane", "navimumbai", "kalyan"],
    },
    { name: "kerala", cities: ["a", "b", "c"] },

    { name: "Uttar pradesh", cities: ["d", "e", "f"] },
  ],
};

const App = () => {
  const [formdata, setformdata] = useState({
    key: "test data",
  });

  //state and city logic

  const availableCities = data.states?.find((s) => s.name === formdata.state);

  //for fetching all on reload and startup : fetch all route used here

  const [companydata, setcompanydata] = useState([{ key: "null", "": "" }]); //array only for map
  const fetchdata = async () => {
    const response = await fetch(`${host}/fetchall`, {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();
    setcompanydata(json);
  };
  useEffect(() => {
    fetchdata();
  }, []);

  // for adding a company in table : Add route used

  function onChangehandler(e) {
    setformdata({ ...formdata, [e.target.name]: e.target.value });
  }

  function submitHandler(e) {
    e.preventDefault();
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
    // eslint-disable-next-line
    const response = await fetch(`${host}/addcompany`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, description, number, mail, state, city }),
    });
    const json = await response.json();
    if (json.success === true) {
      showAlert("added sucessfully", "success");
      setformdata(""); //no auto close:set form data to empty so user can add another if they want to and dissmiss if they want to
      fetchdata(); //fetch data again after adding so it rerenders without reload because it fetches the state again and state rerenders in react without reload
    } else {
      showAlert(json.error, "danger");
    }
  }

  //logic for search box

  const [searchC, setSearchC] = useState({ name: "" });

  const fetchdata2 = async (name) => {
    const response = await fetch(`${host}/fetchdata`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(name),
    });

    const json = await response.json();
    setcompanydata(json);
  };

  function handleSubmit(e) {
    e.preventDefault();
    fetchdata2(searchC);
  }

  function handleChange(e) {
    e.preventDefault();
    setSearchC({ [e.target.name]: e.target.value });
  }

  // for alert auto dismissable
  const [alert, setAlert] = useState(null);
  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 3600);
  };

  return (
    <div>
      <Alert alert={alert} />
      <div className="container">
        <form className="d-flex">
          <input
            className="form-control my-5 mx-4 center"
            type="search"
            placeholder="Search is Case Sensitive"
            aria-label="Search"
            name="name"
            onChange={handleChange}
          />
          <button
            className="btn btn-outline-success my-5 center"
            onClick={searchC.name.length > 0 ? handleSubmit : fetchdata}
            type="submit"
          >
            <GrSearch />
          </button>
        </form>

        {/* for adding in db */}

        <button
          type="button"
          className="btn btn-primary mx-4 my-3"
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
                    <select
                      placeholder="State"
                      name="state"
                      value={formdata.state}
                      onChange={onChangehandler}
                    >
                      <option>--Choose State--</option>
                      {data.states.map((e, key) => {
                        return (
                          <option value={e.name} key={key}>
                            {e.name}
                          </option>
                        );
                      })}
                    </select>
                  </div>

                  <div className="mb-3">
                    <label className="form-label">City</label>
                    <select
                      placeholder="City"
                      name="city"
                      value={formdata.city}
                      onChange={onChangehandler}
                    >
                      <option>--Choose City--</option>
                      {availableCities?.cities.map((e, key) => {
                        return (
                          <option value={e.name} key={key}>
                            {e}
                          </option>
                        );
                      })}
                    </select>
                  </div>

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
                    className="btn btn-primary center"
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container aoverflow">
        <Table
          formdata={formdata}
          showAlert={showAlert}
          fetchdata={fetchdata}
          companydata={companydata}
        />
      </div>
    </div>
  );
};

export default App;
