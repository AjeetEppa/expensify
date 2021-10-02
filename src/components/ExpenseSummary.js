import numeral from "numeral";
import React from "react";
import { connect } from "react-redux";
import selectExpensesTotal from "../selectors/expenses-total";
import selectExpenses from "../selectors/expenses";

export const ExpenseSummary = (props) => {
  const { expenseCount, expenseTotal } = props;
  return (
    <h3>
      Viewing {expenseCount || "0"} expense{expenseCount == 1 ? "" : "s"}{" "}
      totalling {numeral(expenseTotal / 100).format("$0,0.00")}
    </h3>
  );
};

const mapStateToProps = (state) => {
  const visibleExpenses = selectExpenses(state.expenses, state.filters);
  console.log(state);
  return {
    expenseCount: visibleExpenses.length,
    expenseTotal: selectExpensesTotal(visibleExpenses),
  };
};

export default connect(mapStateToProps)(ExpenseSummary);
