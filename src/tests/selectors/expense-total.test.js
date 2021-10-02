import selectExpensesTotal from "../../selectors/expenses-total";

test("should return 0 if no expenses", () => {
  expect(selectExpensesTotal([])).toBe(0);
});

test("should correctly add up a single expense", () => {
  expect(selectExpensesTotal([{ amount: 147 }])).toBe(147);
});

test("should correctly add up a multiple expense", () => {
  expect(selectExpensesTotal([{ amount: 147 }, { amount: 3 }])).toBe(150);
});
