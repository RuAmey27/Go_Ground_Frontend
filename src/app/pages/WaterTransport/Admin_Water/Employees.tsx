import React, { useState } from "react";
import Pagination from "../../Pagination";
import AddEmployee from "./AddEmployee";

// Example static data for employees
const mockEmployees = [
  { id: 1, name: "John Doe", age: 30, rank: "Manager", salary: 50000, active: true },
  { id: 2, name: "Jane Smith", age: 25, rank: "Assistant", salary: 30000, active: false },
  { id: 3, name: "Alice Johnson", age: 28, rank: "Supervisor", salary: 40000, active: true },
];

export const EmployeePage: React.FC = () => {
  const [employees, setEmployees] = useState(mockEmployees);
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(5);
  const [search, setSearch] = useState("");
  const [showAddEmployeeModal, setShowAddEmployeeModal] = useState(false);
  const [status, setStatus] = useState("");

  const filteredEmployees = employees.filter((employee) =>
    employee.name.toLowerCase().includes(search.toLowerCase())
  );

  const handlePageChange = (page: number) => setCurrentPage(page);

  const handleEntriesPerPageChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const value = parseInt(event.target.value, 10);
    setEntriesPerPage(value);
    setCurrentPage(1);
  };

  
  

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setSearch(e.target.value);

  const toggleActiveStatus = (id: number) => {
    setEmployees(
      employees.map((employee) =>
        employee.id === id ? { ...employee, active: !employee.active } : employee
      )
    );
  };

  const handleAddEmployee = (newEmployee: { name: string; age: number; rank: string; salary: number; active: boolean }) => {
    const newEmployeeWithId = { ...newEmployee, id: employees.length + 1 };
    setEmployees([...employees, newEmployeeWithId]);
  };

  return (
    <div className="card">
      {/* Header */}
      <div className="card-header border-0 pt-5">
        <h3 className="card-title align-items-start flex-column">
          <span className="card-label fw-bold fs-3 mb-1">Employees</span>
          <span className="text-muted mt-1 fw-semibold fs-7">
            Total Employees: {filteredEmployees.length}
          </span>
        </h3>
        <div className="card-toolbar d-flex flex-end">
          <input
            type="text"
            className="form-control border-1 border-primary border-opacity-25 mx-2 text-gray-800"
            style={{ width: "12rem" }}
            placeholder="Search Employees"
            value={search}
            onChange={handleSearchChange}
          />

          <div className="d-flex align-items-center">
            <span className="fs-7 fw-bolder text-gray-700 pe-4 text-nowrap d-none d-xxl-block">
              Sort By:
            </span>
            <select
              className="form-select form-select-sm form-select-solid w-100px w-xxl-125px"
              data-control="select2"
              data-placeholder="All"
              data-hide-search="true"
              defaultValue={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value=""></option>
              <option value="1">All</option>
              <option value="2">Captin</option>
              <option value="3">Seaman</option>
              <option value="4">Officer</option>
              <option value="5">Supervisor</option>
              <option value="5">Technician</option>
              <option value="5">Deckhand</option>
            </select>
          </div>

          <button
            type="button"
            className="btn btn-light-primary border-0 rounded mx-2"
            onClick={() => setShowAddEmployeeModal(true)}
          >
            <i className="fs-2 bi bi-plus" />
            Add New Employee
          </button>
        </div>
      </div>

      {/* Body */}
      <div className="card-body py-3">
        <div className="table-responsive">
          <table className="table table-hover table-rounded table-striped border gy-7 gs-7">
            <thead>
              <tr className="fw-bold fs-6 text-gray-800 border-bottom border-gray-200">
                <th>Name</th>
                <th>Age</th>
                <th>Rank</th>
                <th>Salary</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredEmployees
                .slice((currentPage - 1) * entriesPerPage, currentPage * entriesPerPage)
                .map((employee) => (
                  <tr key={employee.id}>
                    <td>{employee.name}</td>
                    <td>{employee.age}</td>
                    <td>{employee.rank}</td>
                    <td>{employee.salary}</td>
                    
                    <td className="text-center">
                    <div className="d-flex flex-row align-items-center">
                         <button
                      className="btn btn-icon btn-bg-light btn-sm me-1"
                      //Viewbutton functionality
                    >
                      <i className="ki-duotone ki-eye fs-3 text-primary">
                        <span className="path1"></span>
                        <span className="path2"></span>
                        <span className="path3"></span>
                      </i>
                    </button>


                        <button
                        type="button"
                        className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"
                        // Edit button functionality
                      >
                        <i className="ki-duotone ki-pencil fs-3 text-primary">
                          <span className="path1"></span>
                          <span className="path2"></span>
                        </i>
                      </button>

                        <button
                        type="button"
                        className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"
                         // Delete button functionality
                      >
                        <i className="ki-duotone ki-trash fs-3 text-danger">
                          <span className="path1"></span>
                          <span className="path2"></span>
                          <span className="path3"></span>
                          <span className="path4"></span>
                          <span className="path5"></span>
                        </i>
                      </button>
                      </div>
                      
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="card-footer">
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(filteredEmployees.length / entriesPerPage)}
          onPageChange={handlePageChange}
          entriesPerPage={entriesPerPage}
          onEntriesPerPageChange={handleEntriesPerPageChange}
        />
      </div>

      {/* Add Employee Modal */}
      {/* {showAddEmployeeModal && (
        <AddEmployee
          onClose={() => setShowAddEmployeeModal(false)}
          onAdd={handleAddEmployee}
        />
      )} */}
    </div>
  );
};
