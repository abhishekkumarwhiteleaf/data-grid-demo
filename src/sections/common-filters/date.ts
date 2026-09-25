import type { DateOperator } from "../../types/filter-types";
import { matchesDateFilter } from "./matching/date-matching";

export const DATE_OPERATORS: DateOperator[] = ["before", "after", "on", "between"];
export const DATE_OPERATOR_LABELS: Record<DateOperator, string> = {
  before: "Before", after: "After", on: "On", between: "Between",
};
export { matchesDateFilter };
