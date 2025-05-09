import { useEffect, useState } from "react";
import type { Employee } from "../types/employee";
import type { AddEmployee } from "../types/addEmployee";
import { useQuery } from "@tanstack/react-query";
import { updateEmployee } from "../services/updateEmployee";
import { isValidEmail } from "../util/isValidEmail";

interface EditButtonProps {
  employee: Employee;
  refetchNewData: () => void;
}
export function EditButton({ employee, refetchNewData }: EditButtonProps) {
  const [updatedEmployee, setUpdatedEmployee] = useState<AddEmployee>({
    firstName: employee.fullName.split(" ")[0],
    lastName: employee.fullName.split(" ")[1],
    email: employee.email,
    position: employee.position,
  });

  const { data, error, isError, refetch } = useQuery({
    queryKey: ["updateEmployee"],
    queryFn: () => {
      return updateEmployee(employee.id, updatedEmployee);
    },
    enabled: false,
  });

  useEffect(() => {
    if (data) {
      refetchNewData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const modalId = `edit_employee_${employee.id}`;

  const handleUpdateEmployee = () => {
    const emptyField = Object.values(updatedEmployee).some(
      (value) => value.trim() === ""
    );

    if (emptyField) {
      alert("Please fill all the fields");
      return;
    } else if (!isValidEmail(updatedEmployee.email)) {
      alert("Please enter a valid email");
      return;
    } else {
      (document.getElementById(modalId) as HTMLDialogElement)?.close();
      refetch();
    }
  };

  if (isError) {
    console.error("Error updating employee:", error);
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
