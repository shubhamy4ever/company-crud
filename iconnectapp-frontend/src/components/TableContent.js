import React from "react";
import { GrEdit } from "react-icons/gr";

const TableContent = (props) => {
  return (
    <>
      <tr>
        <td>{props.name}</td>
        <td>{props.description}</td>
        <td>1800301000123</td>
        <td>sspy@gmail.comaujbssd</td>
        <td>maajpajksijaisjs</td>
        <td>sajsnasjmoasj</td>
        <td>
          <GrEdit />
        </td>
      </tr>
    </>
  );
};

export default TableContent;
