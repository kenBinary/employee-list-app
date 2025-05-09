import type { Employee } from "../types/employee";
import { EditButton } from "./EditButton";
import { DeleteButton } from "./DeleteButton";
import { ViewButton } from "./ViewButton";

interface EmployeeTableProps {
  employees: Employee[];
  refetchNewData: () => void;
}
export function EmployeeTable({
  employees,
  refetchNewData,
}: EmployeeTableProps) {
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
                  <ViewButton employee={employee}></ViewButton>
                  <EditButton
                    employee={employee}
                    refetchNewData={refetchNewData}
                  />
                  <DeleteButton
                    employeeId={employee.id}
                    employeeName={employee.fullName}
                    refetchNewData={refetchNewData}
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
