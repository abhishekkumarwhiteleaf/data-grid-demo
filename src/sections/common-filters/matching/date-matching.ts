import type { DateOperator } from "../../../types/filter-types";

export function matchesDateFilter(
  value: unknown,
  operator: DateOperator,
  query: string,
  secondQuery?: string,
): boolean {
  const actualDate = String(value ?? "");

  if (!query) return true;

  switch (operator) {
    case "before":
      return actualDate < query;

    case "after":
      return actualDate > query;

    case "on":
      return actualDate === query;

    case "between":
      return (
        !secondQuery ||
        (actualDate >= query && actualDate <= secondQuery)
      );
  }
}
