import React from "react";
import { Link } from "react-router-dom";

const ExpenseListItem = (props) => {
  return (
    <>
      <Link to={`/edit/${props.id}`}>
        <h2>{props.description}</h2>
      </Link>
      <p>
        Amount: {props.amount} | Create at: {props.createdAt}
      </p>
    </>
  );
};

export default ExpenseListItem;
