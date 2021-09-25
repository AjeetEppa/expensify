import { createStore, combineReducers } from "redux";
import { v4 as uuid } from "uuid";

// Expense Actions Generators

const addExpense = ({
  description = "",
  note = "",
  amount = 0,
  createdAt = 0,
} = {}) => ({
  type: "ADD_EXPENSE",
  expense: {
    id: uuid(),
    description,
    note,
    amount,
    createdAt,
  },
});

const removeExpense = ({ id = "" } = {}) => ({
  type: "REMOVE_EXPENSE",
  id,
});

const editExpense = (id, updates) => ({
  type: "EDIT_EXPENSE",
  id,
  updates,
});

// Expense Reducer

const expenseReducerDefault = [];

const expenseReducer = (state = expenseReducerDefault, action) => {
  switch (action.type) {
    case "ADD_EXPENSE":
      return [...state, action.expense];
    case "REMOVE_EXPENSE":
      return state.filter(({ id }) => id !== action.id);
    case "EDIT_EXPENSE":
      return state.map((expense) =>
        expense.id === action.id
          ? {
              ...expense,
              ...action.updates,
            }
          : expense
      );
    default:
      return state;
  }
};

//Filter Actions Generator

const setTextFilter = (text = "") => ({
  type: "SET_TEXT_FILTER",
  text,
});

const sortByAmount = () => ({
  type: "SORT_BY_AMOUNT",
});

const sortByDate = () => ({
  type: "SORT_BY_DATE",
});

const setStartDate = (date) => ({
  type: "SET_START_DATE",
  startDate: date,
});

const setEndDate = (date) => ({
  type: "SET_END_DATE",
  endDate: date,
});

// Filter Reducer

const filterReducerDefault = {
  text: "",
  sortBy: "date",
  startDate: undefined,
  endDate: undefined,
};

const filterReducer = (state = filterReducerDefault, action) => {
  switch (action.type) {
    case "SET_TEXT_FILTER":
      return {
        ...state,
        text: action.text,
      };
    case "SORT_BY_AMOUNT":
      return {
        ...state,
        sortBy: "amount",
      };
    case "SORT_BY_DATE":
      return {
        ...state,
        sortBy: "date",
      };
    case "SET_START_DATE":
      return {
        ...state,
        startDate: action.startDate,
      };
    case "SET_END_DATE":
      return {
        ...state,
        endDate: action.endDate,
      };
    default:
      return state;
  }
};

// Get visible expenses

const getVisibleExpenses = (expenses, { text, sortBy, startDate, endDate }) => {
  return expenses
    .filter((expense) => {
      const startDateMatch =
        typeof startDate !== "number" || startDate <= expense.createdAt;
      const endDateMatch =
        typeof endDate !== "number" || endDate >= expense.createdAt;
      const textMatch = expense.description
        ?.toLowerCase()
        .includes(text?.toLowerCase());

      return startDateMatch && endDateMatch && textMatch;
    })
    .sort((a, b) => {
      if (sortBy === "date") {
        return a.createdAt < b.createdAt ? 1 : -1;
      }
      if (sortBy === "amount") {
        return a.amount < b.amount ? 1 : -1;
      }
    });
};

// Store Creation

const store = createStore(
  combineReducers({
    expenses: expenseReducer,
    filters: filterReducer,
  })
);

// Loggings
store.subscribe(() => {
  const visibleExpenses = getVisibleExpenses(
    store.getState().expenses,
    store.getState().filters
  );
});

// Action dispatch

const expenseOne = store.dispatch(
  addExpense({ description: "Rent", amount: "100", createdAt: -11000 })
);
const expenseTwo = store.dispatch(
  addExpense({ description: "Coffe", amount: "200", createdAt: -1000 })
);

store.dispatch(removeExpense({ id: expenseOne.expense.id }));
store.dispatch(editExpense(expenseTwo.expense.id, { amount: "50" }));

store.dispatch(setTextFilter("rent"));
store.dispatch(setTextFilter());

store.dispatch(sortByAmount());
store.dispatch(sortByDate());

store.dispatch(setStartDate(0));
store.dispatch(setStartDate());
store.dispatch(setEndDate(2000));

const demoState = {
  expense: [
    {
      id: "sdadad",
      description: "January",
      note: "This was the final payment",
      amount: 54500,
      createdAt: 0,
    },
  ],
  filters: {
    text: "rent",
    sortBy: "amount", // amount or date
    startDate: undefined,
    endDate: undefined,
  },
};
