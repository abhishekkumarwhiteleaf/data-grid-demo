import type { NumericOperator } from "../../../types/filter-types";

export function matchesNumberFilter(
  value: unknown,
  operator: NumericOperator,
  query: string,
): boolean {
  if (query.trim() === "") return true;

  const actual = Number(value);
  const expected = Number(query);

  if (Number.isNaN(actual) || Number.isNaN(expected)) {
    return false;
  }

  switch (operator) {
    case "=":
      return actual === expected;

    case ">":
      return actual > expected;

    case "<":
      return actual < expected;

    case ">=":
      return actual >= expected;

    case "<=":
      return actual <= expected;
  }
}
