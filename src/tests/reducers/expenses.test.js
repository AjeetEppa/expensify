import expenses from "../fixtures/expenses";
import expenseReducer from "../../reducers/expenses";

test("should set default state", () => {
  const state = expenseReducer(undefined, "@@INIT");
  expect(state).toEqual([]);
});

test("should remove expense by id", () => {
  const action = {
    type: "REMOVE_EXPENSE",
    id: expenses[1].id,
  };
  const state = expenseReducer(expenses, action);
  expect(state).toEqual([expenses[0], expenses[2]]);
});

test("should not remove expense if id not found", () => {
  const action = {
    type: "REMOVE_EXPENSE",
    id: "-1",
  };
  const state = expenseReducer(expenses, action);
  expect(state).toEqual(expenses);
});

test("should add an expense", () => {
  const expense = {
    id: "1",
    description: "New expense",
    amount: 5000,
    note: "no note",
    createdAt: 0,
  };
  const action = {
    type: "ADD_EXPENSE",
    expense,
  };
  const state = expenseReducer(expenses, action);
  expect(state).toEqual([...expenses, expense]);
});

test("should edit an expense", () => {
  const action = {
    type: "EDIT_EXPENSE",
    id: expenses[0].id,
    updates: { amount: 3000 },
  };
  const state = expenseReducer(expenses, action);
  expect(state[0].amount).toBe(3000);
});

test("should not edit expense if id not found", () => {
  const action = {
    type: "EDIT_EXPENSE",
    id: "-1",
    updates: { amount: 3000 },
  };
  const state = expenseReducer(expenses, action);
  expect(state).toEqual(expenses);
});
