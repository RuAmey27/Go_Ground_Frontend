import React, { useEffect, useState } from "react";
import Pagination from "../../Pagination";
import axios from "axios";
import AddDriver from "./AddDriver";
import DeleteModal from "./DeleteModal";
import DriverDetailsModal from "./DriverDetailsModal";

const API_URL = import.meta.env.VITE_APP_API_URL;

// Interface for Driver
interface Driver {
  driverId?: number;
  name: string;
  contactNo: string;
  status: string;
}

const getAllDrivers = async (setEmployees: React.Dispatch<React.SetStateAction<Driver[]>>) => {
  try {
    const response = await axios.get<Driver[]>(`${API_URL}/admin/driver/all`, {
      withCredentials: true,
    });
    setEmployees(response.data);
  } catch (error) {
    console.error("Error fetching drivers:", error);
    if (axios.isAxiosError(error)) {
      console.error("Axios Error:", error.message);
    }
  }
};

export const BusEmployeePage: React.FC = () => {
  const [employees, setEmployees] = useState<Driver[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(5);
  const [search, setSearch] = useState("");
  const [showAddEmployeeModal, setShowAddEmployeeModal] = useState(false);
  const [status, setStatus] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedDriverId, setSelectedDriverId] = useState<number | null>(null);
  const [selectedDriver, setSelectedDriver] = useState<Driver | null>(null);
  const [isEditMode, setIsEditMode] = useState(false); // Determines the modal mode

  // Filter employees based on search and status
  const filteredEmployees = employees.filter((employee) => {
    const matchesSearch = employee.name.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = status ? employee.status === status : true;
    return matchesSearch && matchesStatus;
  });

  // Handle pagination
  const handlePageChange = (page: number) => setCurrentPage(page);

  const handleEntriesPerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = parseInt(event.target.value, 10);
    setEntriesPerPage(value);
    setCurrentPage(1); // Reset to first page when entries per page change
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setCurrentPage(1); // Reset to first page when search changes
  };

  const handleAddEmployee = async (newDriver: Driver) => {
    try {
      await axios.post(`${API_URL}/admin/driver/add`, newDriver, {
        withCredentials: true,
      });
      await getAllDrivers(setEmployees); // Refresh the employee list
    } catch (error) {
      console.error("Error adding driver:", error);
    }
  };

  const handleDeleteDriver = async () => {
    if (selectedDriverId === null) return;

    try {
      await axios.delete(`${API_URL}/admin/driver/remove/${selectedDriverId}`, {
        withCredentials: true,
      });
      await getAllDrivers(setEmployees); // Refresh the employee list after deletion
      setShowDeleteModal(false); // Close the modal
      setSelectedDriverId(null); // Reset selected driver
    } catch (error) {
      console.error("Error deleting driver:", error);
    }
  };

  const handleViewClick = (employee: Driver) => {
    setSelectedDriver(employee);
    setIsEditMode(false); // Set the modal to View mode
  };
  
  const handleEditClick = (employee: Driver) => {
    setSelectedDriver(employee);
    setIsEditMode(true); // Set the modal to Edit mode
  };
  
  const updateDriver = async (updatedDriver: Driver) => {
    try {
      await axios.put(
        `${API_URL}/admin/driver/update/${updatedDriver.driverId}`,
        updatedDriver,
        { withCredentials: true,

        }
      );
      console.log("Driver updated successfully");
    } catch (error) {
      console.error("Error updating driver:", error);
      throw error; // Propagate the error so it can be handled at the calling place
    }
  };
  const handleSaveDriver = async (updatedDriver: Driver) => {
    try {
      // Call the update driver function
      await updateDriver(updatedDriver);
  
      // Refresh the list after updating
      await getAllDrivers(setEmployees);
  
      // Close the modal
      setSelectedDriver(null);
    } catch (error) {
      console.error("Error updating driver:", error);
    }
  };
    

  useEffect(() => {
    getAllDrivers(setEmployees);
  }, []);

  return (
    <div className="card">
      {/* Header */}
      <div className="card-header border-0 pt-5">
        <h3 className="card-title align-items-start flex-column">
          <span className="card-label fw-bold fs-3 mb-1">Bus Employees</span>
          <span className="text-muted mt-1 fw-semibold fs-7">
            Total Employees: {filteredEmployees.length}
          </span>
        </h3>
        <div className="card-toolbar d-flex flex-end">
          <input
            type="text"
            className="form-control border-1 border-primary border-opacity-25 mx-2 text-gray-800"
            style={{ width: "12rem" }}
            placeholder="Search Bus Employees"
            value={search}
            onChange={handleSearchChange}
          />

          <div className="d-flex align-items-center">
            <span className="fs-7 fw-bolder text-gray-700 pe-4 text-nowrap d-none d-xxl-block">
              Filter By Role:
            </span>
            <select
              className="form-select form-select-sm form-select-solid w-100px w-xxl-125px"
              defaultValue={status}
              onChange={(e) => {
                setStatus(e.target.value);
                setCurrentPage(1); // Reset to first page when status filter changes
              }}
            >
              <option value="">All</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          <button
            type="button"
            className="btn btn-light-primary border-0 rounded mx-2"
            onClick={() => setShowAddEmployeeModal(true)}
          >
            <i className="fs-2 bi bi-plus" />
            Add Driver
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
                <th>Contact No</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredEmployees
                .slice((currentPage - 1) * entriesPerPage, currentPage * entriesPerPage)
                .map((employee) => (
                  <tr key={employee.driverId}>
                    <td>{employee.name}</td>
                    <td>{employee.contactNo}</td>
                    <td>{employee.status}</td>
                    <td className="text-center">
                      <div className="d-flex flex-row align-items-center">
                      <button
                      className="btn btn-icon btn-bg-light btn-sm me-1"
                      onClick={() => handleViewClick(employee)}
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
                        onClick={() => handleEditClick(employee)}
                      >
                        <i className="ki-duotone ki-pencil fs-3 text-primary">
                          <span className="path1"></span>
                          <span className="path2"></span>
                        </i>
                      </button>
                        <button
                        type="button"
                        className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"
                        onClick={() => {
                          setSelectedDriverId(employee.driverId || null);
                          setShowDeleteModal(true);
                        }}
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

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <DeleteModal
          show={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
          onDelete={handleDeleteDriver}
          itemName="this driver"
        />
      )}
      {selectedDriver && (
    <DriverDetailsModal
    driver={selectedDriver}
    isEditMode={isEditMode}
    onClose={() => setSelectedDriver(null)}
    onSave={handleSaveDriver} // Reuse the handleSaveDriver function here
  />
    )}


      {/* Add Employee Modal */}
      {showAddEmployeeModal && (
        <AddDriver
          onClose={() => setShowAddEmployeeModal(false)}
          onAdd={handleAddEmployee}
        />
      )}
    </div>
  );
};
