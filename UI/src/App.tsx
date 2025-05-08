import { useState } from "react";
import { employees_7 } from "./__mocks__/employees";
import "./App.css";
import clsx from "clsx";

interface Pagination {
  currentPage: number;
  totalPages: number;
}

function App() {
  let employees = employees_7;

  const [pagination, setPagination] = useState<Pagination>({
    currentPage: 1,
    totalPages: Math.ceil(employees.length / 5),
  });

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > pagination.totalPages) {
      return;
    }
    setPagination((prev) => ({
      ...prev,
      currentPage: newPage,
    }));
  };

  employees = employees.slice(
    (pagination.currentPage - 1) * 5,
    pagination.currentPage * 5
  );

  return (
    <main className="flex flex-col justify-center items-center h-dvh">
      <div className="flex  justify-between w-1/2 p-5 border-b border-slate-400">
        <p className="text-3xl font-bold"> Employee Management</p>
        <button
          className="btn btn-info"
          onClick={() =>
            (
              document.getElementById("my_modal_3") as HTMLDialogElement
            )?.showModal()
          }
        >
          Add Employee
        </button>
        <dialog id="my_modal_3" className="modal">
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
                placeholder="Enter First Name"
                className="input w-full"
              />
              <input
                type="text"
                placeholder="Enter Last Name"
                className="input w-full"
              />
              <input
                type="email"
                placeholder="Ente Email"
                className="input w-full"
              />
              <input
                type="text"
                placeholder="Enter Position"
                className="input w-full"
              />
            </div>

            <button className="btn btn-info btn-sm mt-4">Add Employee</button>
          </div>
        </dialog>
      </div>

      <div className="w-1/2 p-5 flex">
        <div className="join w-full">
          <div className="w-full">
            <label className="input validator join-item w-full">
              <svg
                className="h-[1em] opacity-50"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <g
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2.5"
                  fill="none"
                  stroke="currentColor"
                >
                  <circle cx="11" cy="11" r="8"></circle>
                  <path d="m21 21-4.3-4.3"></path>
                </g>
              </svg>
              <input
                type="search"
                placeholder="Search for an Employee by ther ID"
                required
              />
            </label>
            <div className="validator-hint hidden">Enter a valid ID</div>
          </div>
          <button className="btn btn-info join-item">Search</button>
        </div>
      </div>

      <div className="w-1/2 flex flex-col gap-4 justify-center">
        <div className="overflow-x-auto w-full">
          <table className="table overflow-y-auto">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Position</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee) => (
                <tr key={employee.id}>
                  <th>{employee.id}</th>
                  <td>{employee.name}</td>
                  <td>{employee.email}</td>
                  <td>{employee.phone}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="join justify-center">
          <button
            className="join-item btn"
            onClick={() => {
              handlePageChange(pagination.currentPage - 1);
            }}
          >
            «
          </button>
          {new Array(pagination.totalPages).fill(0).map((_, index) => (
            <button
              key={index}
              className={clsx("join-item btn", {
                "btn-active": pagination.currentPage === index + 1,
              })}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </button>
          ))}
          <button
            className="join-item btn"
            onClick={() => {
              handlePageChange(pagination.currentPage + 1);
            }}
          >
            »
          </button>
        </div>
      </div>
    </main>
  );
}

export default App;
