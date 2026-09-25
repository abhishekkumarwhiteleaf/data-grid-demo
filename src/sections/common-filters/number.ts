import type { NumericOperator } from "../../types/filter-types";
import { matchesNumberFilter } from "./matching/number-matching";

export const NUMERIC_OPERATORS: NumericOperator[] = ["=", ">", "<", ">=", "<="];
export const NUMERIC_OPERATOR_LABELS: Record<NumericOperator, string> = {
  "=": "Equals", ">": "Greater than", "<": "Less than", ">=": "At least", "<=": "At most",
};
export { matchesNumberFilter };
