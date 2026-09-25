
import type { NumericOperator } from "../../types/filter-types";

import {
  invalidResult,
  validResult,
  type FilterValidationResult,
} from "./validation-result";

function isValidNumber(value: string): boolean {
  if (value.trim() === "") {
    return false;
  }

  return Number.isFinite(Number(value));
}

export function validateNumberFilter(
  _operator: NumericOperator,
  value: string,
): FilterValidationResult {
  const trimmedValue = value.trim();

  if (trimmedValue === "") {
    return invalidResult("Please enter a number.");
  }

  if (!isValidNumber(trimmedValue)) {
    return invalidResult("Please enter a valid number.");
  }

  return validResult();
}
