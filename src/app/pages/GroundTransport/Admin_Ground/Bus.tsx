import React, { useEffect, useState } from "react";
import Pagination from "../../Pagination";

// import AddBus from "../Admin_Ground/AddBus";
import axios from "axios";
import AddVehicle from "./AddVehicle.tsx";
const API_URL = import.meta.env.VITE_APP_API_URL;





// Interfaces for API response types
interface Driver {
  id: number;
  name: string;
  contact: string;
  status: string;
}

interface Route {
  id: number;
  source: string;
  destination: string;
  distance: string;
}

interface Vehicle {
  vehicleId: number;
  name: string;
  type: string;
  status: string;
  pricePerKm: number;
  driver: Driver;
  route: Route;
}

// Define Props and State
const fetchAllVehicles = async (): Promise<Vehicle[]> => {
  try {
    const response = await axios.get<Vehicle[]>(
      `${API_URL}/admin/vehicle/all`,
      {
        withCredentials: true,
      }
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching API:", error);
    return [];
  }
};

export const BusesPage: React.FC = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [entriesPerPage, setEntriesPerPage] = useState<number>(5);
  const [search, setSearch] = useState<string>("");
  const [showAddBusModal, setShowAddBusModal] = useState<boolean>(false);

  const filteredVehicles = vehicles.filter((vehicle) =>
    vehicle.name.toLowerCase().includes(search.toLowerCase())
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

  useEffect(() => {
    const loadVehicles = async () => {
      const vehiclesData = await fetchAllVehicles();
      setVehicles(vehiclesData);
    };

    loadVehicles();
  }, []);

  return (
    <div className="card">
      {/* Header */}
      <div className="card-header border-0 pt-5">
        <h3 className="card-title align-items-start flex-column">
          <span className="card-label fw-bold fs-3 mb-1">Vehicles</span>
          <span className="text-muted mt-1 fw-semibold fs-7">
            Total Vehicles: {filteredVehicles.length}
          </span>
        </h3>
        <div className="card-toolbar d-flex flex-end">
          <input
            type="text"
            className="form-control border-1 border-primary border-opacity-25 mx-2 text-gray-800"
            style={{ width: "12rem" }}
            placeholder="Search Vehicles"
            value={search}
            onChange={handleSearchChange}
          />

          <button
            type="button"
            className="btn btn-light-primary border-0 rounded mx-2"
            onClick={() => setShowAddBusModal(true)}
          >
            <i className="fs-2 bi bi-plus" />
            Add New Vehicle
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
                <th>Type</th>
                <th>Status</th>
                <th>Price per Km</th>
                <th>Driver Name</th>
                <th>Driver Contact</th>
                <th>Route</th>
                <th>Distance</th>
              </tr>
            </thead>
            <tbody>
              {filteredVehicles
                .slice((currentPage - 1) * entriesPerPage, currentPage * entriesPerPage)
                .map((vehicle) => (
                  <tr key={vehicle.vehicleId}>
                    <td>{vehicle.name}</td>
                    <td>{vehicle.type}</td>
                    <td>{vehicle.status}</td>
                    <td>{vehicle.pricePerKm}</td>
                    <td>{vehicle.driver.name}</td>
                    <td>{vehicle.driver.contact}</td>
                    <td>
                      {vehicle.route.source} → {vehicle.route.destination}
                    </td>
                    <td>{vehicle.route.distance} km</td>
                    <td>
                    <div className="d-flex flex-row align-items-center">
                      <button
                      className="btn btn-icon btn-bg-light btn-sm me-1"
                      //onClick={() => handleViewClick(employee)}
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
                        //onClick={() => handleEditClick(employee)}
                      >
                        <i className="ki-duotone ki-pencil fs-3 text-primary">
                          <span className="path1"></span>
                          <span className="path2"></span>
                        </i>
                      </button>
                        <button
                        type="button"
                        className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"
                        // onClick={() => {
                        //   setSelectedDriverId(employee.driverId || null);
                        //   setShowDeleteModal(true);
                        // }}
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
          totalPages={Math.ceil(filteredVehicles.length / entriesPerPage)}
          onPageChange={handlePageChange}
          entriesPerPage={entriesPerPage}
          onEntriesPerPageChange={handleEntriesPerPageChange}
        />
      </div>

      {/* Add Bus Modal */}
      {showAddBusModal && (
        <AddVehicle
          onClose={() => setShowAddBusModal(false)}
          // Pass appropriate onAdd logic
          onAdd={(newBus) => console.log("Add new bus", newBus)}
        />
      )}
    </div>
  );
};
