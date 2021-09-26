import React from "react";
import { shallow } from "enzyme";
import { ExpenseListFilter } from "../../components/ExpenseListFilter";
import { filter, altFilter } from "../fixtures/filters";
import { DateRangePicker } from "react-dates";

let setStartDate, setEndDate, setTextFilter, sortByAmount, sortByDate, wrapper;

beforeEach(() => {
  setStartDate = jest.fn();
  setEndDate = jest.fn();
  setTextFilter = jest.fn();
  sortByAmount = jest.fn();
  sortByDate = jest.fn();
  wrapper = shallow(
    <ExpenseListFilter
      setStartDate={setStartDate}
      setEndDate={setEndDate}
      setTextFilter={setTextFilter}
      sortByAmount={sortByAmount}
      sortByDate={sortByDate}
      filters={filter}
    />
  );
});

test("should render ExpenseFilterList correctly", () => {
  expect(wrapper).toMatchSnapshot();
});

test("should render ExpenseFilterList with alt data correctly", () => {
  wrapper.setProps({
    filters: altFilter,
  });
  expect(wrapper).toMatchSnapshot();
});

test("should handle text change", () => {
  wrapper.find("input").simulate("change", { target: { value: "test" } });
  expect(setTextFilter).toHaveBeenLastCalledWith("test");
});

test("should sort by date", () => {
  wrapper.find("select").simulate("change", { target: { value: "date" } });
  expect(sortByDate).toHaveBeenCalled();
});

test("should sort by amount", () => {
  wrapper.find("select").simulate("change", { target: { value: "amount" } });
  expect(sortByAmount).toHaveBeenCalled();
});

test("should handle date changes", () => {
  wrapper.find(DateRangePicker).prop("onDatesChange")({
    startDate: altFilter.startDate,
    endDate: altFilter.endDate,
  });
  expect(setStartDate).toHaveBeenLastCalledWith(altFilter.startDate);
  expect(setEndDate).toHaveBeenLastCalledWith(altFilter.endDate);
});

test("should handle date focus changes", () => {
  wrapper.find(DateRangePicker).prop("onFocusChange")("startDate");
  expect(wrapper.state("calendarFocused")).toBe("startDate");
});
