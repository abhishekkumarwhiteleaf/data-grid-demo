import type { ColumnFilterState } from "../../types/filter-types";

export type MongoFilterQuery = Record<string, unknown>;

function escapeRegex(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export function createMongoFilter(filter: ColumnFilterState): unknown {
  if (filter.type === "number") {
    const value = Number(filter.value);
    if (!Number.isFinite(value)) return {};

    const operators = { "=": "$eq", ">": "$gt", "<": "$lt", ">=": "$gte", "<=": "$lte" } as const;
    return { [operators[filter.operator]]: value };
  }

  if (filter.type === "date") {
    if (filter.operator === "on") return filter.value;
    if (filter.operator === "before") return { $lt: filter.value };
    if (filter.operator === "after") return { $gt: filter.value };
    return { $gte: filter.value, $lte: filter.secondValue ?? filter.value };
  }

  const value = escapeRegex(filter.value.trim());
  if (filter.operator === "blank") return "";
  if (filter.operator === "notBlank") return { $ne: "" };
  if (filter.operator === "equals") return { $regex: `^${value}$`, $options: "i" };
  if (filter.operator === "notEquals") return { $not: { $regex: `^${value}$`, $options: "i" } };
  if (filter.operator === "startsWith") return { $regex: `^${value}`, $options: "i" };
  if (filter.operator === "endsWith") return { $regex: `${value}$`, $options: "i" };
  if (filter.operator === "notContains") return { $not: { $regex: value, $options: "i" } };
  return { $regex: value, $options: "i" };
}

export function createMongoFilterQuery(
  filters: Record<string, ColumnFilterState | null | undefined>,
  fields: readonly string[],
): MongoFilterQuery {
  return Object.fromEntries(
    fields.flatMap((field) => {
      const filter = filters[field];
      return filter ? [[field, createMongoFilter(filter)]] : [];
    }),
  );
}
