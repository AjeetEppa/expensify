import React from "react";
import { connect } from "react-redux";
import ExpenseListItem from "./ExpenseListItem";
import selectExpenses from "../selectors/expenses";

export const ExpenseList = (props) => {
  return !props.expenses.length ? (
    <p>No Expenses</p>
  ) : (
    <div>
      {props.expenses.map((prop, i) => (
        <ExpenseListItem key={i} {...prop} />
      ))}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    expenses: selectExpenses(state.expenses, state.filters),
  };
};

export default connect(mapStateToProps)(ExpenseList);
