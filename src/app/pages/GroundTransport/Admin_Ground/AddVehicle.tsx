
import React, { useEffect, useState } from "react";
import axios from "axios";
const API_URL = import.meta.env.VITE_APP_API_URL;
interface Route {
  id: number;
  source: string;
  destination: string;
  distance: string;
}

interface Driver {
  id: number;
  name: string;
  contactNo: string;
  status: string;
}

interface VehicleWithDriver {
  name: string;
  type: string;
  status: string;
  pricePerKm: number;
  driver: Driver;
  route: Route;
}

interface VehicleWithoutDriver {
  name: string;
  type: string;
  status: string;
  pricePerKm: number;
  driverId: string;
  routeId: string;
}

interface AddVehicleProps {
  onClose: () => void;
  onAdd: (vehicle: VehicleWithDriver | VehicleWithoutDriver) => void;
}

const AddVehicle: React.FC<AddVehicleProps> = ({ onClose, onAdd }) => {
  const [vehicle, setVehicle] = useState<VehicleWithoutDriver>({
    name: "",
    type: "",
    status: "",
    pricePerKm: 0,
    driverId: "",
    routeId: "",
  });
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [routes, setRoutes] = useState<Route[]>([]);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [hasDriver, setHasDriver] = useState<boolean>(true);

  useEffect(() => {
    const fetchDriversAndRoutes = async () => {
      try {
        const [driversRes, routesRes] = await Promise.all([
          axios.get<Driver[]>(`${API_URL}/admin/driver/all`, {
            withCredentials: true,
          }),
          axios.get<Route[]>(`${API_URL}/admin/routes/get`, {
            withCredentials: true,
          }),
        ]);
        setDrivers(driversRes.data);
        setRoutes(routesRes.data);
      } catch (error) {
        console.error("Error fetching drivers or routes:", error);
      }
    };
    fetchDriversAndRoutes();
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    const updatedVehicle = {
      ...vehicle,
      [name]: name === "pricePerKm" ? +value : value,
    };
    setVehicle(updatedVehicle);
    setErrors({ ...errors, [name]: "" });
  };

  const handleAddVehicle = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: { [key: string]: string } = {};
    if (!vehicle.name.trim()) newErrors.name = "Vehicle name is required.";
    if (!vehicle.type.trim()) newErrors.type = "Vehicle type is required.";
    if (!vehicle.status.trim()) newErrors.status = "Vehicle status is required.";
    if (vehicle.pricePerKm <= 0)
      newErrors.pricePerKm = "Price per km must be greater than zero.";
    if (!vehicle.routeId) newErrors.routeId = "Please select a route.";

    if (!vehicle.driverId) {
      newErrors.driverId = "Please select a driver.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {


        const driverRes = await axios.get(
          `${API_URL}/admin/driver/get_id?name=${vehicle.driverId}`,
          { withCredentials: true }
        );
        const driverId = driverRes.data;
        console.log(driverId);


      const [source, destination] = vehicle.routeId.split(" → ");
      if (!source || !destination) {
        newErrors.routeId = "Both source and destination are required.";
        setErrors(newErrors);
        return;
      }

      const routeRes = await axios.get(
        `${API_URL}/admin/routes/get_id?source=${source}&destination=${destination}`,
        { withCredentials: true }
      );
      const routeId = routeRes.data;
      console.log(routeId);


      const routeobj = await axios.get(
        `${API_URL}/admin/routes/find/${routeId}`,
        { withCredentials: true }
      );
      console.log(routeobj.data);
      const driverobj = await axios.get(
        `${API_URL}/admin/driver/get/${driverId}`,
        { withCredentials: true }
      );
      console.log(driverobj.data);


      const updatedVehicle = {
        ...vehicle,
        driver: driverobj.data, // Ensuring driverId is string
        route: routeobj.data,
      };

      console.log(updatedVehicle);
      // Now fetch the vehicle ID from the backend after the vehicle is added
      const res = await axios.post(
        `${API_URL}/admin/vehicle/add`,
        updatedVehicle,
        { withCredentials: true }
      );

      const newVehicle = { ...updatedVehicle, id: res.data.id }; // Get ID from the response
      onAdd(newVehicle);
      onClose();
    } catch (error) {
      console.error("Error adding vehicle:", error);
    }
  };

  return (
    <div
      className="modal fade show"
      style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }}
      aria-labelledby="addVehicleModal"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="addVehicleModal">
              Add New Vehicle
            </h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleAddVehicle}>
              {/* Vehicle Name */}
              <div className="mb-3">
                <label htmlFor="vehicleName" className="form-label">
                  Vehicle Name
                </label>
                <input
                  type="text"
                  className={`form-control ${errors.name ? "is-invalid" : ""}`}
                  id="vehicleName"
                  name="name"
                  value={vehicle.name}
                  onChange={handleInputChange}
                />
                {errors.name && (
                  <div className="invalid-feedback">{errors.name}</div>
                )}
              </div>

              {/* Vehicle Type */}
              <div className="mb-3">
                <label htmlFor="vehicleType" className="form-label">
                  Vehicle Type
                </label>
                <input
                  type="text"
                  className={`form-control ${errors.type ? "is-invalid" : ""}`}
                  id="vehicleType"
                  name="type"
                  value={vehicle.type}
                  onChange={handleInputChange}
                />
                {errors.type && (
                  <div className="invalid-feedback">{errors.type}</div>
                )}
              </div>

              {/* Vehicle Status */}
              <div className="mb-3">
                <label htmlFor="vehicleStatus" className="form-label">
                  Vehicle Status
                </label>
                <input
                  type="text"
                  className={`form-control ${errors.status ? "is-invalid" : ""}`}
                  id="vehicleStatus"
                  name="status"
                  value={vehicle.status}
                  onChange={handleInputChange}
                />
                {errors.status && (
                  <div className="invalid-feedback">{errors.status}</div>
                )}
              </div>

              {/* Price per Km */}
              <div className="mb-3">
                <label htmlFor="pricePerKm" className="form-label">
                  Price per Km
                </label>
                <input
                  type="number"
                  className={`form-control ${errors.pricePerKm ? "is-invalid" : ""}`}
                  id="pricePerKm"
                  name="pricePerKm"
                  value={vehicle.pricePerKm}
                  onChange={handleInputChange}
                />
                {errors.pricePerKm && (
                  <div className="invalid-feedback">{errors.pricePerKm}</div>
                )}
              </div>

              {/* Select Driver */}
              <div className="mb-3">
                <label htmlFor="driverId" className="form-label">
                  Assign Driver
                </label>
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="hasDriver"
                  onChange={() => setHasDriver(!hasDriver)}
                  checked={hasDriver}
                />
                {hasDriver && (
                  <select
                    className={`form-select ${errors.driverId ? "is-invalid" : ""}`}
                    id="driverId"
                    name="driverId"
                    value={vehicle.driverId || ""}
                    onChange={handleInputChange}
                  >
                    <option value="">Select a Driver</option>
                    {drivers.map((driver) => (
                      <option key={driver.id} value={driver.name}>
                        {driver.name}
                      </option>
                    ))}
                  </select>
                )}
                {errors.driverId && (
                  <div className="invalid-feedback">{errors.driverId}</div>
                )}
              </div>

              {/* Select Route */}
              <div className="mb-3">
                <label htmlFor="routeId" className="form-label">
                  Select Route
                </label>
                <select
                  className={`form-select ${errors.routeId ? "is-invalid" : ""}`}
                  id="routeId"
                  name="routeId"
                  value={vehicle.routeId}
                  onChange={handleInputChange}
                >
                  <option value="">Select a Route</option>
                  {routes.map((route) => (
                    <option key={route.id} value={`${route.source} → ${route.destination}`}>
                      {route.source} → {route.destination}
                    </option>
                  ))}
                </select>
                {errors.routeId && (
                  <div className="invalid-feedback">{errors.routeId}</div>
                )}
              </div>

              <button type="submit" className="btn btn-primary">
                Add Vehicle
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddVehicle;
=======
import React, { useEffect, useState } from "react";
import axios from "axios";

interface Route {
  id: number;
  source: string;
  destination: string;
  distance: string;
}

interface Driver {
  id: number;
  name: string;
  contactNo: string;
  status: string;
}

interface VehicleWithDriver {
  name: string;
  type: string;
  status: string;
  pricePerKm: number;
  driver: Driver;
  route: Route;
}

interface VehicleWithoutDriver {
  name: string;
  type: string;
  status: string;
  pricePerKm: number;
  driverId: string;
  routeId: string;
}

interface AddVehicleProps {
  onClose: () => void;
  onAdd: (vehicle: VehicleWithDriver | VehicleWithoutDriver) => void;
}

const AddVehicle: React.FC<AddVehicleProps> = ({ onClose, onAdd }) => {
  const [vehicle, setVehicle] = useState<VehicleWithoutDriver>({
    name: "",
    type: "",
    status: "",
    pricePerKm: 0,
    driverId: "",
    routeId: "",
  });
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [routes, setRoutes] = useState<Route[]>([]);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [hasDriver, setHasDriver] = useState<boolean>(true);

  useEffect(() => {
    const fetchDriversAndRoutes = async () => {
      try {
        const [driversRes, routesRes] = await Promise.all([
          axios.get<Driver[]>("http://localhost:8080/admin/driver/all", {
            withCredentials: true,
          }),
          axios.get<Route[]>("http://localhost:8080/admin/routes/get", {
            withCredentials: true,
          }),
        ]);
        setDrivers(driversRes.data);
        setRoutes(routesRes.data);
      } catch (error) {
        console.error("Error fetching drivers or routes:", error);
      }
    };
    fetchDriversAndRoutes();
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    const updatedVehicle = {
      ...vehicle,
      [name]: name === "pricePerKm" ? +value : value,
    };
    setVehicle(updatedVehicle);
    setErrors({ ...errors, [name]: "" });
  };

  const handleAddVehicle = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: { [key: string]: string } = {};
    if (!vehicle.name.trim()) newErrors.name = "Vehicle name is required.";
    if (!vehicle.type.trim()) newErrors.type = "Vehicle type is required.";
    if (!vehicle.status.trim()) newErrors.status = "Vehicle status is required.";
    if (vehicle.pricePerKm <= 0)
      newErrors.pricePerKm = "Price per km must be greater than zero.";
    if (!vehicle.routeId) newErrors.routeId = "Please select a route.";

    if (hasDriver && !vehicle.driverId) {
      newErrors.driverId = "Please select a driver.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      let driverId: number;
      if (hasDriver) {
        const driverRes = await axios.get(
          `http://localhost:8080/admin/driver/get_id?name=${vehicle.driverId}`,
          { withCredentials: true }
        );

        driverId = driverRes.data;
        console.log(driverId);
      }

      const driver_obj = await axios.get(
          `http://localhost:8080/admin/driver/get/${vehicle.driverId}`,
          { withCredentials: true }
        );

      const [source, destination] = vehicle.routeId.split(" → ");
      if (!source || !destination) {
        newErrors.routeId = "Both source and destination are required.";
        setErrors(newErrors);
        return;
      }

      const routeRes = await axios.get(
        `http://localhost:8080/admin/routes/get_id?source=${source}&destination=${destination}`,
        { withCredentials: true }
      );
      const routeId = routeRes.data;
      console.log(routeId);
      const route_obj = await axios.get(
        `http://localhost:8080/admin/routes/find/${routeId}`,
        { withCredentials: true }
      );

      console.log(route_obj);
      console.log(driver_obj);

      const updatedVehicle = {
        ...vehicle,
        driver: driver_obj, // Ensuring driverId is string
        route: route_obj,
      };

      console.log(updatedVehicle);
      // Now fetch the vehicle ID from the backend after the vehicle is added
      const res = await axios.post(
        "http://localhost:8080/admin/vehicle/add",
        updatedVehicle,
        { withCredentials: true }
      );

      const newVehicle = { ...updatedVehicle, id: res.data.id }; // Get ID from the response
      onAdd(newVehicle);
      onClose();
    } catch (error) {
      console.error("Error adding vehicle:", error);
    }
  };

  return (
    <div
      className="modal fade show"
      style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }}
      aria-labelledby="addVehicleModal"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="addVehicleModal">
              Add New Vehicle
            </h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleAddVehicle}>
              {/* Vehicle Name */}
              <div className="mb-3">
                <label htmlFor="vehicleName" className="form-label">
                  Vehicle Name
                </label>
                <input
                  type="text"
                  className={`form-control ${errors.name ? "is-invalid" : ""}`}
                  id="vehicleName"
                  name="name"
                  value={vehicle.name}
                  onChange={handleInputChange}
                />
                {errors.name && (
                  <div className="invalid-feedback">{errors.name}</div>
                )}
              </div>

              {/* Vehicle Type */}
              <div className="mb-3">
                <label htmlFor="vehicleType" className="form-label">
                  Vehicle Type
                </label>
                <input
                  type="text"
                  className={`form-control ${errors.type ? "is-invalid" : ""}`}
                  id="vehicleType"
                  name="type"
                  value={vehicle.type}
                  onChange={handleInputChange}
                />
                {errors.type && (
                  <div className="invalid-feedback">{errors.type}</div>
                )}
              </div>

              {/* Vehicle Status */}
              <div className="mb-3">
                <label htmlFor="vehicleStatus" className="form-label">
                  Vehicle Status
                </label>
                <input
                  type="text"
                  className={`form-control ${errors.status ? "is-invalid" : ""}`}
                  id="vehicleStatus"
                  name="status"
                  value={vehicle.status}
                  onChange={handleInputChange}
                />
                {errors.status && (
                  <div className="invalid-feedback">{errors.status}</div>
                )}
              </div>

              {/* Price per Km */}
              <div className="mb-3">
                <label htmlFor="pricePerKm" className="form-label">
                  Price per Km
                </label>
                <input
                  type="number"
                  className={`form-control ${errors.pricePerKm ? "is-invalid" : ""}`}
                  id="pricePerKm"
                  name="pricePerKm"
                  value={vehicle.pricePerKm}
                  onChange={handleInputChange}
                />
                {errors.pricePerKm && (
                  <div className="invalid-feedback">{errors.pricePerKm}</div>
                )}
              </div>

              {/* Select Driver */}
              <div className="mb-3">
                <label htmlFor="driverId" className="form-label">
                  Assign Driver
                </label>
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="hasDriver"
                  onChange={() => setHasDriver(!hasDriver)}
                  checked={hasDriver}
                />
                {hasDriver && (
                  <select
                    className={`form-select ${errors.driverId ? "is-invalid" : ""}`}
                    id="driverId"
                    name="driverId"
                    value={vehicle.driverId || ""}
                    onChange={handleInputChange}
                  >
                    <option value="">Select a Driver</option>
                    {drivers.map((driver) => (
                      <option key={driver.id} value={driver.name}>
                        {driver.name}
                      </option>
                    ))}
                  </select>
                )}
                {errors.driverId && (
                  <div className="invalid-feedback">{errors.driverId}</div>
                )}
              </div>

              {/* Select Route */}
              <div className="mb-3">
                <label htmlFor="routeId" className="form-label">
                  Select Route
                </label>
                <select
                  className={`form-select ${errors.routeId ? "is-invalid" : ""}`}
                  id="routeId"
                  name="routeId"
                  value={vehicle.routeId}
                  onChange={handleInputChange}
                >
                  <option value="">Select a Route</option>
                  {routes.map((route) => (
                    <option key={route.id} value={`${route.source} → ${route.destination}`}>
                      {route.source} → {route.destination}
                    </option>
                  ))}
                </select>
                {errors.routeId && (
                  <div className="invalid-feedback">{errors.routeId}</div>
                )}
              </div>

              <button type="submit" className="btn btn-primary">
                Add Vehicle
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddVehicle;

