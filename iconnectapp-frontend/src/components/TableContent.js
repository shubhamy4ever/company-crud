import React from "react";
import { GrEdit } from "react-icons/gr";

const TableContent = (props) => {
  return (
    <>
      <tr>
        <td>{props.name}</td>
        <td>{props.description}</td>
        <td>{props.number}</td>
        <td>{props.mail}</td>
        <td>{props.state}</td>
        <td>{props.city}</td>
        <td>
          <GrEdit
            className="mousepoint"
            data-bs-toggle="modal"
            data-bs-target="#editmodal"
            onClick={() => {
              props.editdetails(props.whole);
            }}
          />{" "}
          {/*send whole data about the component whose edit button is clicked with id back to table component */}
        </td>
      </tr>
    </>
  );
};

export default TableContent;
