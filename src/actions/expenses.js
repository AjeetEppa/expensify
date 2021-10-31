import { v4 as uuid } from "uuid";
import * as database from "firebase/database";

// Expense Actions Generators

export const addExpense = (expense) => ({
  type: "ADD_EXPENSE",
  expense,
});

export const startAddExpense = (expenseData = {}) => {
  const {
    description = "",
    note = "",
    amount = 0,
    createdAt = 0,
  } = expenseData;
  const expense = { description, note, amount, createdAt };
  return (dispatch) => {
    const db = database.getDatabase();
    return database.push(database.ref(db, "expenses"), expense).then((ref) => {
      dispatch(addExpense({ id: ref.key, ...expense }));
    });
  };
};

export const removeExpense = ({ id = "" } = {}) => ({
  type: "REMOVE_EXPENSE",
  id,
});

export const editExpense = (id, updates) => ({
  type: "EDIT_EXPENSE",
  id,
  updates,
});
