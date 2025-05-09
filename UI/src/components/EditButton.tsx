import { useState } from "react";
import type { Employee } from "../types/employee";
import type { AddEmployee } from "../types/addEmployee";
import { useQuery } from "@tanstack/react-query";
import { updateEmployee } from "../services/updateEmployee";

interface EditButtonProps {
  employee: Employee;
}
export function EditButton({ employee }: EditButtonProps) {
  const [updatedEmployee, setUpdatedEmployee] = useState<AddEmployee>({
    firstName: employee.fullName.split(" ")[0],
    lastName: employee.fullName.split(" ")[1],
    email: employee.email,
    position: employee.position,
  });

  const { error, isError, refetch } = useQuery({
    queryKey: ["updateEmployee"],
    queryFn: () => {
      return updateEmployee(employee.id, updatedEmployee);
    },
    enabled: false,
  });

  const modalId = `edit_employee_${employee.id}`;

  const handleUpdateEmployee = () => {
    const emptyField = Object.values(updateEmployee).some(
      (value) => value.trim() === ""
    );
    if (emptyField) {
      alert("Please fill in all fields");
      return;
    } else {
      (document.getElementById(modalId) as HTMLDialogElement)?.close();
      refetch();
    }
  };

  if (isError) {
    return (
      <div className="flex justify-center items-center h-dvh">
        <p className="text-red-500">Error: {JSON.stringify(error)}</p>
      </div>
    );
  }

  return (
    <>
      <button
        className="btn btn-xs btn-warning"
        onClick={() =>
          (document.getElementById(modalId) as HTMLDialogElement)?.showModal()
        }
      >
        Update
      </button>
      <dialog id={modalId} className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg">Add a new Employee!</h3>
          <div className="flex flex-col gap-4 mt-4">
            <input
              type="text"
              value={updatedEmployee.firstName}
              onChange={(e) =>
                setUpdatedEmployee((prev) => ({
                  ...prev,
                  firstName: e.target.value,
                }))
              }
              placeholder="Enter First Name"
              className="input w-full"
            />
            <input
              type="text"
              value={updatedEmployee.lastName}
              onChange={(e) =>
                setUpdatedEmployee((prev) => ({
                  ...prev,
                  lastName: e.target.value,
                }))
              }
              placeholder="Enter Last Name"
              className="input w-full"
            />
            <input
              type="email"
              value={updatedEmployee.email}
              onChange={(e) =>
                setUpdatedEmployee((prev) => ({
                  ...prev,
                  email: e.target.value,
                }))
              }
              placeholder="Enter Email"
              className="input w-full"
            />
            <input
              type="text"
              value={updatedEmployee.position}
              onChange={(e) =>
                setUpdatedEmployee((prev) => ({
                  ...prev,
                  position: e.target.value,
                }))
              }
              placeholder="Enter Position"
              className="input w-full"
            />
          </div>

          <button
            className="btn btn-warning btn-sm mt-4"
            onClick={() => {
              handleUpdateEmployee();
            }}
          >
            Update Employee
          </button>
        </div>
      </dialog>
    </>
  );
}
