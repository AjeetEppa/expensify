import {
  addExpense,
  editExpense,
  removeExpense,
  startAddExpense,
} from "../../actions/expenses";
import expenses from "../fixtures/expenses";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import "../../firebase/firebase";
import * as database from "firebase/database";

const createMockStore = configureStore([thunk]);

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
  const action = addExpense(expenses[1]);
  expect(action).toEqual({
    type: "ADD_EXPENSE",
    expense: expenses[1],
  });
});

test("should add expense to database and store", (done) => {
  const store = createMockStore({});

  const expenseData = {
    description: "Hand Exerciser",
    amount: 400,
    note: "Bought 2",
    createdAt: 1000,
  };

  store
    .dispatch(startAddExpense(expenseData))
    .then(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual({
        type: "ADD_EXPENSE",
        expense: { id: expect.any(String), ...expenseData },
      });

      return database.get(
        database.ref(
          database.getDatabase(),
          `expenses/${actions[0].expense.id}`
        )
      );
    })
    .then((snapshot) => {
      expect(snapshot.val()).toEqual(expenseData);
      done();
    });
});

test("should add expense with defaults to database and store", (done) => {
  const store = createMockStore({});

  const expenseDefaults = {
    description: "",
    note: "",
    amount: 0,
    createdAt: 0,
  };

  store
    .dispatch(startAddExpense())
    .then(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual({
        type: "ADD_EXPENSE",
        expense: { id: expect.any(String), ...expenseDefaults },
      });

      return database.get(
        database.ref(
          database.getDatabase(),
          `expenses/${actions[0].expense.id}`
        )
      );
    })
    .then((snapshot) => {
      expect(snapshot.val()).toEqual(expenseDefaults);
      done();
    });
});
