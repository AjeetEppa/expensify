import moment from "moment";

export default [
  {
    id: "1",
    description: "Hathway",
    amount: 2500,
    note: "Intenet connection",
    createdAt: 0,
  },
  {
    id: "2",
    description: "Electricity",
    amount: 1000,
    note: "Light bill",
    createdAt: moment(0).add(4, "days").valueOf(),
  },
  {
    id: "3",
    description: "Rent",
    amount: 7500,
    note: "House Rent",
    createdAt: moment(0).subtract(4, "days").valueOf(),
  },
];
