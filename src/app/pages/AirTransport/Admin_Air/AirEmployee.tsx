import React, { useState } from "react";
import Pagination from "../../Pagination";
// import AddAirEmployee from "./AddAirEmployee";

// Example static data for air employees
const mockAirEmployees = [
  { id: 1, name: "Emily Davis", age: 35, role: "Pilot", salary: 80000, active: true },
  { id: 2, name: "Michael Brown", age: 28, role: "Flight Attendant", salary: 40000, active: true },
  { id: 3, name: "Sarah Wilson", age: 32, role: "Ground Crew", salary: 35000, active: false },
  { id: 4, name: "David Lee", age: 45, role: "Pilot", salary: 90000, active: true },
];

export const AirEmployeePage: React.FC = () => {
  const [employees, setEmployees] = useState(mockAirEmployees);
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(5);
  const [search, setSearch] = useState("");
  const [showAddEmployeeModal, setShowAddEmployeeModal] = useState(false);
  const [roleFilter, setRoleFilter] = useState("");

  const filteredEmployees = employees.filter((employee) =>
    employee.name.toLowerCase().includes(search.toLowerCase()) &&
    (roleFilter ? employee.role === roleFilter : true)
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

  const handleRoleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setRoleFilter(e.target.value);

  const toggleActiveStatus = (id: number) => {
    setEmployees(
      employees.map((employee) =>
        employee.id === id ? { ...employee, active: !employee.active } : employee
      )
    );
  };

  const handleAddEmployee = (newEmployee: { name: string; age: number; role: string; salary: number; active: boolean }) => {
    const newEmployeeWithId = { ...newEmployee, id: employees.length + 1 };
    setEmployees([...employees, newEmployeeWithId]);
  };

  return (
    <div className="card">
      {/* Header */}
      <div className="card-header border-0 pt-5">
        <h3 className="card-title align-items-start flex-column">
          <span className="card-label fw-bold fs-3 mb-1">Air Employees</span>
          <span className="text-muted mt-1 fw-semibold fs-7">
            Total Employees: {filteredEmployees.length}
          </span>
        </h3>
        <div className="card-toolbar d-flex flex-end">
          <input
            type="text"
            className="form-control border-1 border-primary border-opacity-25 mx-2 text-gray-800"
            style={{ width: "12rem" }}
            placeholder="Search Air Employees"
            value={search}
            onChange={handleSearchChange}
          />

          <div className="d-flex align-items-center">
            <span className="fs-7 fw-bolder text-gray-700 pe-4 text-nowrap d-none d-xxl-block">
              Filter By Role:
            </span>
            <select
              className="form-select form-select-sm form-select-solid w-100px w-xxl-125px"
              data-control="select2"
              data-placeholder="All"
              data-hide-search="true"
              value={roleFilter}
              onChange={handleRoleFilterChange}
            >
              <option value="">All</option>
              <option value="Pilot">Pilot</option>
              <option value="Flight Attendant">Flight Attendant</option>
              <option value="Ground Crew">Ground Crew</option>
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
                <th>Role</th>
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
                    <td>{employee.role}</td>
                    <td>{employee.salary}</td>

                    <td className="text-center">
                      <div className="d-flex flex-row align-items-center">
                        <button
                          className="btn btn-icon btn-bg-light btn-sm me-1"
                          // View button functionality
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
        <AddAirEmployee
          onClose={() => setShowAddEmployeeModal(false)}
          onAdd={handleAddEmployee}
        />
      )} */}
    </div>
  );
};
