import React, { useState } from "react";

// Route Interface
interface Route {
  source: string;
  destination: string;
  distance: number;
}

// Props for AddRoute Component
interface AddRouteProps {
  onClose: () => void;
  onAdd: (route: Route) => void;
}

const AddRoute: React.FC<AddRouteProps> = ({ onClose, onAdd }) => {
  const [newRoute, setNewRoute] = useState<Route>({
    source: "",
    destination: "",
    distance: 0,
  });

  const [errors, setErrors] = useState<{ source?: string; destination?: string; distance?: string }>({});

  // Input Change Handler
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setNewRoute({ ...newRoute, [name]: value });
    setErrors({ ...errors, [name]: "" }); // Clear errors on change
  };

  // Form Submission Handler
  const handleAddRoute = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate inputs
    const newErrors: { source?: string; destination?: string; distance?: string } = {};
    if (!newRoute.source.trim()) newErrors.source = "Source is required.";
    if (!newRoute.destination.trim()) newErrors.destination = "Destination is required.";
    if (newRoute.distance <= 0 || newRoute.distance > 5000) newErrors.distance = "Distance must be a positive value and less than or equal to 5000.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Pass the new route to the parent component
    onAdd(newRoute);
    onClose(); // Close the modal
  };

  return (
    <div
      className="modal fade show"
      style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }}
      aria-labelledby="addRouteModal"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="addRouteModal">Add New Route</h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleAddRoute}>
              {/* Source Field */}
              <div className="mb-3">
                <label htmlFor="source" className="form-label">
                  Source
                </label>
                <input
                  type="text"
                  className={`form-control ${errors.source ? "is-invalid" : ""}`}
                  id="source"
                  name="source"
                  value={newRoute.source}
                  onChange={handleInputChange}
                  required
                />
                {errors.source && (
                  <div className="invalid-feedback">{errors.source}</div>
                )}
              </div>

              {/* Destination Field */}
              <div className="mb-3">
                <label htmlFor="destination" className="form-label">
                  Destination
                </label>
                <input
                  type="text"
                  className={`form-control ${errors.destination ? "is-invalid" : ""}`}
                  id="destination"
                  name="destination"
                  value={newRoute.destination}
                  onChange={handleInputChange}
                  required
                />
                {errors.destination && (
                  <div className="invalid-feedback">{errors.destination}</div>
                )}
              </div>

              {/* Distance Field */}
              <div className="mb-3">
                <label htmlFor="distance" className="form-label">
                  Distance
                </label>
                <input
                  type="number"
                  className={`form-control ${errors.distance ? "is-invalid" : ""}`}
                  id="distance"
                  name="distance"
                  value={newRoute.distance}
                  onChange={handleInputChange}
                  required
                />
                {errors.distance && (
                  <div className="invalid-feedback">{errors.distance}</div>
                )}
              </div>

              {/* Submit Button */}
              <button type="submit" className="btn btn-primary">
                Add Route
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddRoute;
