import moment from "moment";
import numeral from "numeral";
import React from "react";
import { Link } from "react-router-dom";

const ExpenseListItem = (props) => {
  return (
    <>
      <Link to={`/edit/${props.id}`}>
        <h2>{props.description}</h2>
      </Link>
      <p>
        Amount: {numeral(props.amount / 100).format("$0,0.00")} | Create at:{" "}
        {moment(props.createdAt).format("MMM Do YYYY")}
      </p>
    </>
  );
};

export default ExpenseListItem;
