export interface TableRow {
  id: string;
  name: string;
  email: string;
  age: number;
  salary: number;
  department: string;
  city: string;
  status: "Active" | "On Leave" | "Inactive" | "Pending";
  joinDate: string;
}
