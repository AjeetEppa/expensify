import React from "react";
import { shallow } from "enzyme";
import { EditExpensePage } from "../../components/EditExpensePage";
import ExpenseForm from "../../components/ExpenseForm";
import expenses from "../fixtures/expenses";

let expense, editExpense, removeExpense, history, wrapper;

beforeEach(() => {
  editExpense = jest.fn();
  removeExpense = jest.fn();
  history = { push: jest.fn() };
  expense = expenses[0];
  wrapper = shallow(
    <EditExpensePage
      expense={expense}
      editExpense={editExpense}
      removeExpense={removeExpense}
      history={history}
    />
  );
});

test("should render EditExpensePage correctly", () => {
  expect(wrapper).toMatchSnapshot();
});

test("should handle editExpense", () => {
  wrapper.find(ExpenseForm).prop("onSubmit")(expense);
  expect(history.push).toHaveBeenCalledWith("/");
  expect(editExpense).toHaveBeenCalledWith(expense.id, expense);
});

test("should render removeExpense", () => {
  wrapper.find("button").simulate("click");
  expect(history.push).toHaveBeenCalledWith("/");
  expect(removeExpense).toHaveBeenCalledWith({ id: expense.id });
});
