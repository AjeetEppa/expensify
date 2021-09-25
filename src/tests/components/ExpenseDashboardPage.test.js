import { expect } from "@jest/globals";
import { shallow } from "enzyme";
import React from "react";
import ExpenseDashboardPage from "../../components/ExpenseDashBoardPage";

test("should render ExpenseDashBoardPage correctly", () => {
  const wrapper = shallow(<ExpenseDashboardPage />);
  expect(wrapper).toMatchSnapshot();
});
