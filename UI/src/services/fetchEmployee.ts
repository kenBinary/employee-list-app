import type { Employee } from "../types/employee";

export async function fetchEmployees(id: number | null): Promise<Employee[]> {
  if (id) {
    const response = await fetch(`http://localhost:5068/api/Employee/${id}`);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return [data];
  } else {
    const response = await fetch("http://localhost:5068/api/Employee");

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return data;
  }
}
