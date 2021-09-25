import moment from "moment";

export const filter = {
  startDate: undefined,
  endDate: undefined,
  sortBy: "date",
  text: "",
};

export const altFilter = {
  startDate: moment(0),
  endDate: moment(0).add(3, "days"),
  sortBy: "date",
  text: "bills",
};
