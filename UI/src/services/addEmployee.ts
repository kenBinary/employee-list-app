import type { AddEmployee } from "../types/addEmployee";

export async function addEmployee(employee: AddEmployee): Promise<AddEmployee> {
  const response = await fetch("http://localhost:5068/api/Employee", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(employee),
  });

  if (!response.ok) {
    throw new Error("Failed to add employee");
  }

  return response.json();
}
