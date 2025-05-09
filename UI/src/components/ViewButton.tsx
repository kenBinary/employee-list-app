import type { Employee } from "../types/employee";

interface ViewButtonProps {
  employee: Employee;
}
export function ViewButton({ employee }: ViewButtonProps) {
  const modalId = `view_employee_${employee.id}`;

  return (
    <>
      <button
        className="btn btn-xs btn-info"
        onClick={() =>
          (document.getElementById(modalId) as HTMLDialogElement)?.showModal()
        }
      >
        View
      </button>
      <dialog id={modalId} className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-xl">Employee Information!</h3>
          <div className="flex flex-col gap-4 mt-4">
            <p className="text-lg">
              <span className="font-bold">Name: </span>
              {employee.fullName}
            </p>
            <p className="text-lg">
              <span className="font-bold">Email: </span>
              {employee.email}
            </p>
            <p className="text-lg">
              <span className="font-bold">Position: </span>
              {employee.position}
            </p>
          </div>
        </div>
      </dialog>
    </>
  );
}
