import React, { useEffect, useState } from "react";
import Pagination from "../../Pagination";
import axios from "axios";
import AddRoute from "./AddRouteModal";
import DeleteModal from "./DeleteModal";
import ViewEditRouteModal from "./ViewEditRouteModal";
const API_URL = import.meta.env.VITE_APP_API_URL

// Interface for Driver
interface RouteInterface {
  routeId?: number;
  source: string;
  destination: string;
  distance: number;
}

const getAllRoutes = async (setEmployees: React.Dispatch<React.SetStateAction<RouteInterface[]>>) => {
  try {
    const response = await axios.get<RouteInterface[]>(`${API_URL}/admin/routes/get`, {
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

export const RouteDetail: React.FC = () => {
  const [routes, setRoutes] = useState<RouteInterface[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(5);
  const [search, setSearch] = useState("");
  const [showAddERouteModal, setShowAddRouteModal] = useState(false);
  const [status, setStatus] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedRouteId, setSelectedRouteId] = useState<number | null>(null);
  const [selectedRoute, setSelectedRoute] = useState<RouteInterface | null>(null);
  const [isEditMode, setIsEditMode] = useState(false); // Determines the modal mode

  // Filter employees based on search and status
  const filteredRoutes = routes.filter((route) => {
    const matchesSearch = route.source.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = status ? route.source === status : true;
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

  const handleAddRoute = async (newRoute: RouteInterface) => {
    try {
      await axios.post(
        
        `${API_URL}/admin/routes/add`,
        newRoute,
        {
          withCredentials: true,
        }
        
      );
      
      await getAllRoutes(setRoutes); // Refresh the routes list
    } catch (error) {
      console.error("Error adding route:", error);
    }
  };
  

  const handleDeleteRoute = async () => {
    if (selectedRouteId === null) {
      console.error("No route selected for deletion");
      return;
    }
  
    try {
      await axios.delete(`${API_URL}/admin/routes/delete/${selectedRouteId}`, {
        withCredentials: true,
      });
      await getAllRoutes(setRoutes); // Refresh the route list after deletion
      setShowDeleteModal(false); // Close the modal
      setSelectedRouteId(null); // Reset selected route
    } catch (error) {
      console.error("Error deleting route:", error);
      if (axios.isAxiosError(error)) {
        console.error("Axios Error:", error.response?.data || error.message);
      }
    }
  };
  

  const handleViewClick = (route: RouteInterface) => {
    setSelectedRoute(route);
    setIsEditMode(false); // Set the modal to View mode
  };
  
  const handleEditClick = (route: RouteInterface) => {
    setSelectedRoute(route);
    setIsEditMode(true); // Set the modal to Edit mode
  };
  
  const updateRoute = async (updatedRoute: RouteInterface) => {
    try {
      await axios.put(
        `${API_URL}/admin/routes/update/${updatedRoute.routeId}`,
        updatedRoute,
        { withCredentials: true }
      );
      console.log("Driver updated successfully");
    } catch (error) {
      console.error("Error updating route:", error);
      throw error; // Propagate the error so it can be handled at the calling place
    }
  };
  const handleSaveRoute = async (updatedRoute: RouteInterface) => {
    try {
      // Call the update driver function
      await updateRoute(updatedRoute);
  
      // Refresh the list after updating
      await getAllRoutes(setRoutes);
  
      // Close the modal
      setSelectedRoute(null);
    } catch (error) {
      console.error("Error updating driver:", error);
    }
  };
    

  useEffect(() => {
    getAllRoutes(setRoutes);
  }, []);

  return (
    <div className="card">
      {/* Header */}
      <div className="card-header border-0 pt-5">
        <h3 className="card-title align-items-start flex-column">
          <span className="card-label fw-bold fs-3 mb-1">Routes</span>
          <span className="text-muted mt-1 fw-semibold fs-7">
            Total Routes: {filteredRoutes.length}
          </span>
        </h3>
        <div className="card-toolbar d-flex flex-end">
          <input
            type="text"
            className="form-control border-1 border-primary border-opacity-25 mx-2 text-gray-800"
            style={{ width: "12rem" }}
            placeholder="Search Routes"
            value={search}
            onChange={handleSearchChange}
          />
  

          <button
            type="button"
            className="btn btn-light-primary border-0 rounded mx-2"
            onClick={() => setShowAddRouteModal(true)}
          >
            <i className="fs-2 bi bi-plus" />
            Add New Route
          </button>
        </div>
      </div>

      {/* Body */}
      <div className="card-body py-3">
        <div className="table-responsive">
          <table className="table table-hover table-rounded table-striped border gy-7 gs-7">
            <thead>
              <tr className="fw-bold fs-6 text-gray-800 border-bottom border-gray-200">
                <th>ID</th>
                <th>Source</th>
                <th>Destination</th>
                <th>Distance</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredRoutes
                .slice((currentPage - 1) * entriesPerPage, currentPage * entriesPerPage)
                .map((route) => (
                  <tr key={route.routeId}>
                    <td>{route.routeId}</td>
                    <td>{route.source}</td>
                    <td>{route.destination}</td>
                    <td>{route.distance}</td>
                    <td className="text-center">
                      <div className="d-flex flex-row align-items-center">
                      <button
                      className="btn btn-icon btn-bg-light btn-sm me-1"
                      onClick={() => handleViewClick(route)}
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
                        onClick={() => handleEditClick(route)}
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
                          setSelectedRouteId(route.routeId || null);
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
          totalPages={Math.ceil(filteredRoutes.length / entriesPerPage)}
          onPageChange={handlePageChange}
          entriesPerPage={entriesPerPage}
          onEntriesPerPageChange={handleEntriesPerPageChange}
        />
      </div>
      {showDeleteModal && (
        <DeleteModal
          show={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
          onDelete={handleDeleteRoute}
          itemName="this route"
        />
      )}

      
      {selectedRoute && (
    <ViewEditRouteModal
    route={selectedRoute}
    isEditMode={isEditMode}
    onClose={() => setSelectedRoute(null)}
    onSave={handleSaveRoute} // Reuse the handleSaveDriver function here
  />
      )}

      {showAddERouteModal && (
        <AddRoute
          onClose={() => setShowAddRouteModal(false)}
          onAdd={handleAddRoute}
        />
      )}

    </div>
  );
};
