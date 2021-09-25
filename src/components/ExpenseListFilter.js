import React from "react";
import { Component } from "react";
import { DateRangePicker } from "react-dates";
import { connect } from "react-redux";
import {
  setEndDate,
  setStartDate,
  setTextFilter,
  sortByAmount,
  sortByDate,
} from "../actions/filters";

export class ExpenseListFilter extends Component {
  state = {
    calendarFocused: null,
  };
  onDatesChange = ({ startDate, endDate }) => {
    console.log(startDate, endDate);
    this.props.setStartDate(startDate);
    this.props.setEndDate(endDate);
  };
  onCalendarFocusChange = (focus) => {
    this.setState({ calendarFocused: focus });
  };
  onTextChange = (e) => {
    this.props.setTextFilter(e.target.value);
  };
  onSortByChange = (e) => {
    switch (e.target.value) {
      case "amount":
        this.props.sortByAmount();
        break;
      case "date":
        this.props.sortByDate();
        break;
      default:
        break;
    }
  };
  render() {
    return (
      <div>
        <input
          type="text"
          value={this.props.filters.text}
          onChange={this.onTextChange}
        />
        <select
          value={this.props.filters.sortBy}
          onChange={this.onSortByChange}
        >
          <option value="amount">Amount</option>
          <option value="date">Date</option>
        </select>
        <DateRangePicker
          startDate={this.props.filters.startDate} // momentPropTypes.momentObj or null,
          startDateId="your_unique_start_date_id" // PropTypes.string.isRequired,
          endDate={this.props.filters.endDate} // momentPropTypes.momentObj or null,
          endDateId="your_unique_end_date_id" // PropTypes.string.isRequired,
          onDatesChange={this.onDatesChange} // PropTypes.func.isRequired,
          focusedInput={this.state.calendarFocused} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
          onFocusChange={this.onCalendarFocusChange} // PropTypes.func.isRequired,
          numberOfMonths={1}
          isOutsideRange={(date) => false}
          showClearDates
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  filters: state.filters,
});

const mapDispatchToProps = (dispach) => ({
  setStartDate: (date) => dispach(setStartDate(date)),
  setEndDate: (date) => dispach(setEndDate(date)),
  setTextFilter: (text) => dispach(setTextFilter(text)),
  sortByAmount: () => dispach(sortByAmount()),
  sortByDate: () => dispach(sortByDate()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseListFilter);
