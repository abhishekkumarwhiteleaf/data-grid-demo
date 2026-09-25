// validation/date-validation.ts

import type { DateOperator } from "../../types/filter-types";

import {
  invalidResult,
  validResult,
  type FilterValidationResult,
} from "./validation-result";

const DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/;

function isValidDate(value: string): boolean {
  if (!DATE_REGEX.test(value)) {
    return false;
  }

  const [year, month, day] = value.split("-").map(Number);

  const date = new Date(year, month - 1, day);

  return (
    date.getFullYear() === year &&
    date.getMonth() === month - 1 &&
    date.getDate() === day
  );
}

export function validateDateFilter(
  operator: DateOperator,
  value: string,
  secondValue?: string,
): FilterValidationResult {
  const firstDate = value.trim();
  const endDate = secondValue?.trim() ?? "";

  if (!firstDate) {
    return invalidResult("Please select a date.");
  }

  if (!isValidDate(firstDate)) {
    return invalidResult("Please select a valid date.");
  }

  if (operator !== "between") {
    return validResult();
  }

  if (!endDate) {
    return invalidResult("Please select an end date.");
  }

  if (!isValidDate(endDate)) {
    return invalidResult("Please select a valid end date.");
  }

  if (firstDate > endDate) {
    return invalidResult(
      "The start date cannot be after the end date.",
    );
  }

  return validResult();
}
