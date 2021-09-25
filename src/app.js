import React from "react";
import ReactDom from "react-dom";
import AppRouter from "./routers/AppRouter";
import "normalize.css/normalize.css";
import "./styles/style.scss";
import configureStore from "./store/configureStore";
import { addExpense } from "./actions/expenses";
import { Provider } from "react-redux";
import "react-dates/lib/css/_datepicker.css";

const store = configureStore();

store.dispatch(addExpense({ description: "Water bill", amount: 500 }));
store.dispatch(
  addExpense({ description: "Gas bill", amount: 1000, createdAt: 212 })
);
store.dispatch(addExpense({ description: "Rent bill", amount: 10000 }));

const jsx = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);

ReactDom.render(jsx, document.getElementById("root"));
