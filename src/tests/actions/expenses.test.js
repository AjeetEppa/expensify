import { addExpense, editExpense, removeExpense } from "../../actions/expenses";

test("should setup remove expense action object", () => {
  const action = removeExpense({ id: "a" });
  expect(action).toEqual({
    type: "REMOVE_EXPENSE",
    id: "a",
  });
});

test("should setup edit expense action object", () => {
  const action = editExpense("1", { note: "test note" });
  expect(action).toEqual({
    type: "EDIT_EXPENSE",
    id: "1",
    updates: { note: "test note" },
  });
});

test("should setup add expense action object with provided values", () => {
  const expense = {
    description: "Rent",
    amount: 750000,
    createdAt: 1000,
    note: "This is my new house rent",
  };
  const action = addExpense(expense);
  expect(action).toEqual({
    type: "ADD_EXPENSE",
    expense: { ...expense, id: expect.any(String) },
  });
});

test("should setup add expense action object with default values", () => {
  const action = addExpense();
  expect(action).toEqual({
    type: "ADD_EXPENSE",
    expense: {
      description: "",
      amount: 0,
      createdAt: 0,
      note: "",
      id: expect.any(String),
    },
  });
});
