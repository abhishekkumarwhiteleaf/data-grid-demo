import type { FilterTestRecord, ColumnFilterState } from "@/types/filter-types";

export async function fetchFilterTestData(filters: Record<string, ColumnFilterState | null> = {}) {
  const response = await fetch(`/api/table-rows?filters=${encodeURIComponent(JSON.stringify(filters))}`);
  if (!response.ok) throw new Error("Unable to load filtered rows.");
  const payload = await response.json() as { data: FilterTestRecord[] };
  return payload.data;
}

export async function updateFilterTestRow(rowId: string | number, updates: Partial<FilterTestRecord>) {
  const response = await fetch(`/api/table-rows/${encodeURIComponent(rowId)}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updates),
  });
  if (!response.ok) throw new Error("Unable to save the change.");
  const payload = await response.json() as { data: FilterTestRecord };
  return payload.data;
}
