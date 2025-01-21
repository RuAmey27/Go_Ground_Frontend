import React, { useState } from "react";

// Interface for Driver
interface Route {
  routeId?: number;
  source: string;
  destination: string;
  distance: number;
}

interface DriverModalProps {
  route: Route | null;
  onClose: () => void;
  onSave: (updatedRoute: Route) => void;
  isEditMode: boolean;
}

const ViewEditRouteModal: React.FC<DriverModalProps> = ({
  route,
  onClose,
  onSave,
  isEditMode,
}) => {
  const [source, setSource] = useState(route?.source || "");
  const [destination, setDestination] = useState(route?.destination || "");
  const [distance, setDistance] = useState(route?.distance || 0);

  const handleSave = () => {
    if (route) {
      const updatedRoute = {
        ...route,
        source,
        destination,
        distance,
      };
      onSave(updatedRoute);
    }
  };

  if (!route) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1050,
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          padding: "20px",
          borderRadius: "8px",
          width: "400px",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            borderBottom: "1px solid #ddd",
            paddingBottom: "10px",
          }}
        >
          <h5>{isEditMode ? "Edit Driver Details" : "Driver Details"}</h5>
          <button
            style={{
              background: "none",
              border: "none",
              fontSize: "1.5rem",
              cursor: "pointer",
            }}
            onClick={onClose}
          >
            &times;
          </button>
        </div>

        <div style={{ marginTop: "10px" }}>
          <div style={{ marginBottom: "10px" }}>
            <label>Source:</label>
            <input
              type="text"
              className="form-control"
              value={source}
              onChange={(e) => setSource(e.target.value)}
              disabled={!isEditMode} // Disable input in View mode
            />
          </div>
          <div style={{ marginBottom: "10px" }}>
            <label>Destination:</label>
            <input
              type="text"
              className="form-control"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              disabled={!isEditMode} // Disable input in View mode
            />
          </div>
          <div style={{ marginBottom: "10px" }}>
            <label>Distance:</label>
            <input
              type="number"
              className="form-control"
              value={distance}
              onChange={(e) => setDistance(parseFloat(e.target.value) || 0)}
              disabled={!isEditMode} // Disable input in View mode
            />
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "20px" }}>
          {isEditMode ? (
            <button
              style={{
                padding: "10px",
                backgroundColor: "#007bff",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
              onClick={handleSave}
            >
              Save Changes
            </button>
          ) : (
            <button
              style={{
                padding: "10px",
                backgroundColor: "#6c757d",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
              onClick={onClose}
            >
              Close
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewEditRouteModal;
