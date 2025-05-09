import clsx from "clsx";
import type { Pagination } from "../types/pagination";

interface PaginationActionsProps {
  pagination: Pagination;
  handlePageChange: (newPage: number) => void;
}

export function PaginationActions({
  pagination,
  handlePageChange,
}: PaginationActionsProps) {
  return (
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
  );
}
