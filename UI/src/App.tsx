import { useEffect, useState } from "react";
import "./App.css";
import { useQuery } from "@tanstack/react-query";
import type { Employee } from "./types/employee";
import { fetchEmployees } from "./services/fetchEmployee";
import { Header } from "./components/Header";
import { SearchBar } from "./components/SearchBar";
import { EmployeeTable } from "./components/EmployeeTable";
import type { Pagination } from "./types/pagination";
import { PaginationActions } from "./components/PaginationActions";

function App() {
  let employees: Employee[] = [];

  const [searchId, setSearchId] = useState<number | null>(null);

  const handleSearch = (id: number | null) => {
    setSearchId(id);
  };

  const { data, isPending, isError, refetch } = useQuery({
    queryKey: ["employees", searchId],
    queryFn: () => fetchEmployees(searchId),
    refetchOnWindowFocus: false,
  });

  const handleRefetch = () => {
    refetch();
  };

  useEffect(() => {
    if (!isPending && !isError) {
      setPagination((prev) => ({
        ...prev,
        totalPages: Math.ceil(data.length / 5),
      }));
    }
  }, [data, isPending, isError]);

  employees = data || [];

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

  if (data) {
    employees = data.slice(
      (pagination.currentPage - 1) * 5,
      pagination.currentPage * 5
    );
  }

  return (
    <main className="flex flex-col justify-start items-center h-dvh relative">
      <Header refetchNewData={handleRefetch}></Header>

      <SearchBar onSearch={handleSearch}></SearchBar>

      <div className="w-1/2 flex flex-col gap-4 justify-center">
        {isPending ? (
          <div className="flex justify-center items-center">
            <span className="loading loading-xl loading-spinner text-primary"></span>
          </div>
        ) : isError ? (
          <div role="alert" className="alert alert-error">
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
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>Employee With ID {searchId} not found</span>
          </div>
        ) : (
          <EmployeeTable
            employees={employees}
            refetchNewData={handleRefetch}
          ></EmployeeTable>
        )}

        <PaginationActions
          pagination={pagination}
          handlePageChange={handlePageChange}
        ></PaginationActions>
      </div>
    </main>
  );
}

export default App;
