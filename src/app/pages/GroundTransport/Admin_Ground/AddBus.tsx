import React, { useState } from "react";

interface AddBusProps {
  onClose: () => void;
  onAdd: (bus: Bus) => void;
}

interface Bus {
  id: number;
  name: string;
  type: string;
  capacity: number;
  status: string;
  available: boolean;
}

const AddBus: React.FC<AddBusProps> = ({ onClose, onAdd }) => {
  const [newBus, setNewBus] = useState<Bus>({
    id: 0,
    name: "",
    type: "",
    capacity: 0,
    status: "Active", // Default to Active
    available: true,
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setNewBus({ ...newBus, [name]: value });
  };

  const handleAddBus = async (e: React.FormEvent) => {
    e.preventDefault();
    // Add the new bus to the buses list
    onAdd(newBus);
    onClose(); // Close the modal
  };

  return (
    <div className="modal fade show" style={{ display: "block" }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Add New Bus</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleAddBus}>
              <div className="mb-3">
                <label className="form-label">Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={newBus.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Type</label>
                <input
                  type="text"
                  className="form-control"
                  name="type"
                  value={newBus.type}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Capacity</label>
                <input
                  type="number"
                  className="form-control"
                  name="capacity"
                  value={newBus.capacity}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Status</label>
                <select
                  className="form-select"
                  name="status"
                  value={newBus.status}
                  onChange={handleInputChange}
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
              <div className="mb-3">
                <label className="form-label">Available</label>
                <input
                  type="checkbox"
                  className="form-check-input"
                  name="available"
                  checked={newBus.available}
                  onChange={(e) =>
                    setNewBus({ ...newBus, available: e.target.checked })
                  }
                />
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

export default AddBus;
