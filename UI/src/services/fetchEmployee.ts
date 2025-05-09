import type { Employee } from "../types/employee";

export async function fetchEmployees(): Promise<Employee[]> {
  const response = await fetch("http://localhost:5068/api/Employee");
  const data = await response.json();
  return data;
}
