import type { AddEmployee } from "../types/addEmployee";
import type { Employee } from "../types/employee";

export async function updateEmployee(
  id: number,
  employee: AddEmployee
): Promise<Employee> {
  const response = await fetch(`http://localhost:5068/api/Employee/${id}`, {
    method: "PUT",
    headers: {
      Accept: "*/*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(employee),
  });

  if (!response.ok) {
    throw new Error("Failed to add employee");
  }

  return response.json();
}
