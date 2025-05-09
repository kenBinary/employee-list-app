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

  const { data, isPending, error, isError } = useQuery({
    queryKey: ["employees"],
    queryFn: fetchEmployees,
    refetchOnWindowFocus: false,
  });

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

  if (isPending) {
    return (
      <div className="flex justify-center items-center h-dvh">Loading...</div>
    );
  }
  if (isError) {
    return (
      <div className="flex justify-center items-center h-dvh">
        <p className="text-red-500">Error: {JSON.stringify(error)}</p>
      </div>
    );
  }

  if (data) {
    employees = data.slice(
      (pagination.currentPage - 1) * 5,
      pagination.currentPage * 5
    );
  }

  return (
    <main className="flex flex-col justify-center items-center h-dvh relative">
      <Header></Header>

      <SearchBar></SearchBar>

      <div className="w-1/2 flex flex-col gap-4 justify-center">
        <EmployeeTable employees={employees}></EmployeeTable>

        <PaginationActions
          pagination={pagination}
          handlePageChange={handlePageChange}
        ></PaginationActions>
      </div>
    </main>
  );
}

export default App;
