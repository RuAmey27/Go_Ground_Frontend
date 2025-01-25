import React, { useState, useEffect } from "react";

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
  const [suggestions, setSuggestions] = useState<{ source: any[]; destination: any[] }>({ source: [], destination: [] });
  const [coordinates, setCoordinates] = useState<{ source?: [number, number]; destination?: [number, number] }>({});
  const [currentField, setCurrentField] = useState<"source" | "destination">("source");

  const accessToken = import.meta.env.VITE_MAPBOX_API_KEY;

  // Input Change Handler
  const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target as { name: "source" | "destination"; value: string };
    setNewRoute((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
    setCurrentField(name);

    if (value.length > 2) {
      const encodedValue = encodeURIComponent(value);
      const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodedValue}.json?access_token=${accessToken}`;
      try {
        const response = await fetch(url);
        const data = await response.json();
        const fetchedSuggestions = data.features || [];
        setSuggestions((prev) => ({ ...prev, [name]: fetchedSuggestions }));
      } catch (error) {
        console.error("Error fetching suggestions:", error);
      }
    } else {
      setSuggestions((prev) => ({ ...prev, [name]: [] }));
    }
  };

  // Select Suggestion Handler
  const handleSuggestionClick = (suggestion: any) => {
    const { place_name, geometry } = suggestion;
    if (place_name && geometry?.coordinates) {
      setNewRoute((prev) => ({ ...prev, [currentField]: place_name }));
      setCoordinates((prev) => ({ ...prev, [currentField]: geometry.coordinates }));
      setSuggestions((prev) => ({ ...prev, [currentField]: [] }));
    }
  };

  // Calculate Distance using Mapbox Directions API
  const calculateDistance = async () => {
    const { source, destination } = coordinates;
    if (source && destination) {
      const [sourceLng, sourceLat] = source;
      const [destinationLng, destinationLat] = destination;

      const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${sourceLng},${sourceLat};${destinationLng},${destinationLat}?access_token=${accessToken}&geometries=geojson`;

      try {
        const response = await fetch(url);
        const data = await response.json();
        const distance = data.routes[0]?.distance || 0; // Distance in meters
        setNewRoute((prevRoute) => ({ ...prevRoute, distance: distance / 1000 })); // Convert to kilometers
      } catch (error) {
        console.error("Error fetching distance:", error);
      }
    }
  };

  useEffect(() => {
    if (coordinates.source && coordinates.destination) {
      calculateDistance();
    }
  }, [coordinates]);

  // Form Submission Handler
  const handleAddRoute = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: { source?: string; destination?: string; distance?: string } = {};
    if (!newRoute.source.trim()) newErrors.source = "Source is required.";
    if (!newRoute.destination.trim()) newErrors.destination = "Destination is required.";
    if (newRoute.distance <= 0 || newRoute.distance > 5000) newErrors.distance = "Distance must be a positive value and less than or equal to 5000.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onAdd(newRoute);
    onClose();
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
              <div className="mb-3">
                <label htmlFor="source" className="form-label">Source</label>
                <input
                  type="text"
                  className={`form-control ${errors.source ? "is-invalid" : ""}`}
                  id="source"
                  name="source"
                  value={newRoute.source}
                  onChange={handleInputChange}
                  required
                />
                {errors.source && <div className="invalid-feedback">{errors.source}</div>}
              </div>

              <div className="mb-3">
                <label htmlFor="destination" className="form-label">Destination</label>
                <input
                  type="text"
                  className={`form-control ${errors.destination ? "is-invalid" : ""}`}
                  id="destination"
                  name="destination"
                  value={newRoute.destination}
                  onChange={handleInputChange}
                  required
                />
                {errors.destination && <div className="invalid-feedback">{errors.destination}</div>}
              </div>

              {suggestions[currentField]?.length > 0 && (
                <ul className="list-group">
                  {suggestions[currentField].map((suggestion, index) => (
                    <li
                      key={index}
                      className="list-group-item"
                      onClick={() => handleSuggestionClick(suggestion)}
                    >
                      {suggestion.place_name}
                    </li>
                  ))}
                </ul>
              )}

              <div className="mb-3">
                <label htmlFor="distance" className="form-label">Distance (in km)</label>
                <input
                  type="number"
                  className={`form-control ${errors.distance ? "is-invalid" : ""}`}
                  id="distance"
                  name="distance"
                  value={newRoute.distance}
                  readOnly
                />
                {errors.distance && <div className="invalid-feedback">{errors.distance}</div>}
              </div>

              <button type="submit" className="btn btn-primary">Add Route</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddRoute;


// import React, { useState } from "react";
//
// // Route Interface
// interface Route {
//   source: string;
//   destination: string;
//   distance: number;
// }
//
// // Props for AddRoute Component
// interface AddRouteProps {
//   onClose: () => void;
//   onAdd: (route: Route) => void;
// }
//
// const AddRoute: React.FC<AddRouteProps> = ({ onClose, onAdd }) => {
//   const [newRoute, setNewRoute] = useState<Route>({
//     source: "",
//     destination: "",
//     distance: 0,
//   });
//
//   const [errors, setErrors] = useState<{ source?: string; destination?: string; distance?: string }>({});
//   const [suggestions, setSuggestions] = useState<string[]>([]);
//   const [currentField, setCurrentField] = useState<"source" | "destination" | null>(null);
//
//   const accessToken = import.meta.env.VITE_MAPBOX_API_KEY;
//
//   // Input Change Handler
//   const handleInputChange = async (
//     e: React.ChangeEvent<HTMLInputElement>
//   ) => {
//     const { name, value } = e.target;
//     setNewRoute({ ...newRoute, [name]: value });
//     setErrors({ ...errors, [name]: "" });
//
//     if (name === "source" || name === "destination") {
//       setCurrentField(name);
//
//       if (value.length > 2) {
//         const encodedValue = encodeURIComponent(value);
//         const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodedValue}.json?access_token=${accessToken}`;
//         try {
//           const response = await fetch(url);
//           const data = await response.json();
//           const suggestions = data.features?.map((feature: any) => feature.place_name) || [];
//           console.log(suggestions);
//           setSuggestions(suggestions);
//         } catch (error) {
//           console.error("Error fetching suggestions:", error);
//         }
//       } else {
//         setSuggestions([]);
//       }
//     }
//   };
//
//   // Select Suggestion Handler
//   const handleSuggestionClick = (suggestion: string) => {
//     if (currentField) {
//       setNewRoute({ ...newRoute, [currentField]: suggestion });
//       setSuggestions([]);
//     }
//   };
//
//   // Form Submission Handler
//   const handleAddRoute = (e: React.FormEvent) => {
//     e.preventDefault();
//
//     const newErrors: { source?: string; destination?: string; distance?: string } = {};
//     if (!newRoute.source.trim()) newErrors.source = "Source is required.";
//     if (!newRoute.destination.trim()) newErrors.destination = "Destination is required.";
//     if (newRoute.distance <= 0 || newRoute.distance > 5000) newErrors.distance = "Distance must be a positive value and less than or equal to 5000.";
//
//     if (Object.keys(newErrors).length > 0) {
//       setErrors(newErrors);
//       return;
//     }
//
//     onAdd(newRoute);
//     onClose();
//   };
//
//   return (
//     <div
//       className="modal fade show"
//       style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }}
//       aria-labelledby="addRouteModal"
//       aria-hidden="true"
//     >
//       <div className="modal-dialog">
//         <div className="modal-content">
//           <div className="modal-header">
//             <h5 className="modal-title" id="addRouteModal">Add New Route</h5>
//             <button
//               type="button"
//               className="btn-close"
//               onClick={onClose}
//               aria-label="Close"
//             ></button>
//           </div>
//           <div className="modal-body">
//             <form onSubmit={handleAddRoute}>
//               {/* Source Field */}
//               <div className="mb-3">
//                 <label htmlFor="source" className="form-label">
//                   Source
//                 </label>
//                 <input
//                   type="text"
//                   className={`form-control ${errors.source ? "is-invalid" : ""}`}
//                   id="source"
//                   name="source"
//                   value={newRoute.source}
//                   onChange={handleInputChange}
//                   required
//                 />
//                 {errors.source && <div className="invalid-feedback">{errors.source}</div>}
//               </div>
//
//               {/* Destination Field */}
//               <div className="mb-3">
//                 <label htmlFor="destination" className="form-label">
//                   Destination
//                 </label>
//                 <input
//                   type="text"
//                   className={`form-control ${errors.destination ? "is-invalid" : ""}`}
//                   id="destination"
//                   name="destination"
//                   value={newRoute.destination}
//                   onChange={handleInputChange}
//                   required
//                 />
//                 {errors.destination && <div className="invalid-feedback">{errors.destination}</div>}
//               </div>
//
//               {/* Suggestions List */}
//               {suggestions.length > 0 && (
//                 <ul className="list-group">
//                   {suggestions.map((suggestion, index) => (
//                     <li
//                       key={index}
//                       className="list-group-item"
//                       onClick={() => handleSuggestionClick(suggestion)}
//                     >
//                       {suggestion}
//                     </li>
//                   ))}
//                 </ul>
//               )}
//
//               {/* Distance Field */}
//               <div className="mb-3">
//                 <label htmlFor="distance" className="form-label">
//                   Distance
//                 </label>
//                 <input
//                   type="number"
//                   className={`form-control ${errors.distance ? "is-invalid" : ""}`}
//                   id="distance"
//                   name="distance"
//                   value={newRoute.distance}
//                   onChange={(e) =>
//                     setNewRoute({ ...newRoute, distance: parseInt(e.target.value) })
//                   }
//                   required
//                 />
//                 {errors.distance && <div className="invalid-feedback">{errors.distance}</div>}
//               </div>
//
//               <button type="submit" className="btn btn-primary">
//                 Add Route
//               </button>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
//
// export default AddRoute;