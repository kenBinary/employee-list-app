import { useQuery } from "@tanstack/react-query";
import type { AddEmployee } from "../types/addEmployee";
import { useEffect, useRef, useState } from "react";
import { addEmployee } from "../services/addEmployee";
import clsx from "clsx";

interface HeaderProps {
  refetchNewData: () => void;
}

export function Header({ refetchNewData }: HeaderProps) {
  const formRef = useRef<HTMLFormElement>(null);

  const handleReset = () => {
    if (formRef.current) {
      formRef.current.reset();
    }
  };

  const [isUserAdded, setIsUserAdded] = useState(false);

  const [newEmployee, setNewEmployee] = useState<AddEmployee>({
    firstName: "",
    lastName: "",
    email: "",
    position: "",
  });

  const { data, error, isError, refetch, isSuccess } = useQuery({
    queryKey: ["addEmployee"],
    queryFn: () => {
      return addEmployee(newEmployee);
    },
    enabled: false,
  });

  useEffect(() => {
    if (isSuccess && data) {
      setIsUserAdded(true);
      setNewEmployee({
        firstName: "",
        lastName: "",
        email: "",
        position: "",
      });

      refetchNewData();

      const timer = setTimeout(() => {
        setIsUserAdded(false);
      }, 2000);

      return () => clearTimeout(timer);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess, data]);

  const handleAddEmployee = () => {
    const emptyField = Object.values(newEmployee).some(
      (value) => value.trim() === ""
    );
    if (emptyField) {
      alert("Please fill in all fields");
      return;
    } else {
      (document.getElementById("add_employee") as HTMLDialogElement)?.close();
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
      <div className="flex  justify-between w-1/2 p-5 border-b border-slate-400">
        <p className="text-3xl font-bold"> Employee Management</p>
        <button
          className="btn btn-info"
          onClick={() =>
            (
              document.getElementById("add_employee") as HTMLDialogElement
            )?.showModal()
          }
        >
          Add Employee
        </button>
        <dialog id="add_employee" className="modal">
          <div className="modal-box">
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                ✕
              </button>
            </form>
            <h3 className="font-bold text-lg">Add a new Employee!</h3>
            <form ref={formRef} className="flex flex-col gap-4 mt-4">
              <div>
                <input
                  type="text"
                  placeholder="Enter First Name"
                  required
                  className="input w-full validator"
                  value={newEmployee.firstName}
                  onChange={(e) =>
                    setNewEmployee((prev) => ({
                      ...prev,
                      firstName: e.target.value,
                    }))
                  }
                />
                <div className="validator-hint hidden">
                  Please enter a valid first name
                </div>
              </div>

              <div>
                <input
                  type="text"
                  required
                  placeholder="Enter Last Name"
                  className="input w-full validator"
                  value={newEmployee.lastName}
                  onChange={(e) =>
                    setNewEmployee((prev) => ({
                      ...prev,
                      lastName: e.target.value,
                    }))
                  }
                />
                <div className="validator-hint hidden">
                  Please enter a valid last name
                </div>
              </div>

              <div>
                <input
                  type="email"
                  placeholder="Enter Email"
                  required
                  className="input w-full validator"
                  value={newEmployee.email}
                  onChange={(e) =>
                    setNewEmployee((prev) => ({
                      ...prev,
                      email: e.target.value,
                    }))
                  }
                />
                <div className="validator-hint hidden">
                  Please enter a valid email
                </div>
              </div>

              <div>
                <input
                  type="text"
                  placeholder="Enter Position"
                  required
                  className="input w-full validator"
                  value={newEmployee.position}
                  onChange={(e) =>
                    setNewEmployee((prev) => ({
                      ...prev,
                      position: e.target.value,
                    }))
                  }
                />
                <div className="validator-hint hidden">
                  Please enter a valid position
                </div>
              </div>
            </form>

            <button
              className="btn btn-info btn-sm mt-4"
              onClick={() => {
                handleReset();
                handleAddEmployee();
              }}
            >
              Add Employee
            </button>
          </div>
        </dialog>
      </div>
      <div
        role="alert"
        className={clsx("alert alert-success absolute bottom-0 right-0 m-4", {
          hidden: !isUserAdded,
        })}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 shrink-0 stroke-current"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span>A New User has been added</span>
      </div>
    </>
  );
}
