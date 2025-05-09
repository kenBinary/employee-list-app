export async function removeEmployee(employeeId: number) {
  const response = await fetch(
    `http://localhost:5068/api/Employee/${employeeId}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to delete employee");
  }

  return response.json();
}
