import { useQuery } from "@tanstack/react-query";
import { removeEmployee } from "../services/removeEmployee";

interface DeleteButtonProps {
  employeeId: number;
  employeeName: string;
}
export function DeleteButton({ employeeId, employeeName }: DeleteButtonProps) {
  const { refetch } = useQuery({
    queryKey: ["delete_employee"],
    queryFn: () => removeEmployee(employeeId),
    enabled: false,
    refetchOnWindowFocus: false,
  });

  const modalId = `delete_employee_${employeeId}`;

  const handleDeleteEmployee = () => {
    (document.getElementById(modalId) as HTMLDialogElement)?.close();
    refetch();
  };

  return (
    <>
      <button
        className="btn btn-xs btn-error"
        onClick={() =>
          (document.getElementById(modalId) as HTMLDialogElement)?.showModal()
        }
      >
        Delete
      </button>
      <dialog id={modalId} className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg">
            Delete <span className="text-red-500">{employeeName}</span> ?
          </h3>
          <div className="flex gap-4 mt-4">
            <button
              className="btn btn-outline btn-success grow"
              onClick={handleDeleteEmployee}
            >
              Confirm
            </button>
            <button
              className="btn btn-outline btn-error grow"
              onClick={() =>
                (document.getElementById(modalId) as HTMLDialogElement)?.close()
              }
            >
              Cancel
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
}
