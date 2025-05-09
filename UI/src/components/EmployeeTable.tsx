import type { Employee } from "../types/employee";
import { EditButton } from "./EditButton";
import { DeleteButton } from "./DeleteButton";

interface EmployeeTableProps {
  employees: Employee[];
}
export function EmployeeTable({ employees }: EmployeeTableProps) {
  return (
    <div className="overflow-x-auto w-full">
      <table className="table overflow-y-auto h-full">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Position</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => {
            return (
              <tr key={employee.id}>
                <th>{employee.id}</th>
                <td>{employee.fullName}</td>
                <td>{employee.email}</td>
                <td>{employee.position}</td>
                <td className="flex flex-col gap-1">
                  <EditButton employee={employee} />
                  <DeleteButton
                    employeeId={employee.id}
                    employeeName={employee.fullName}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
