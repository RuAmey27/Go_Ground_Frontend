import React, { useState, useEffect } from "react";
import axios from "axios";
import EditCredentials from "./EditCredentials";
const API_URL = import.meta.env.VITE_APP_API_URL;
interface User {
  username: string;
  email: string;
}

export const EditCredentialsPage: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [showEditModal, setShowEditModal] = useState<boolean>(false);

  // Fetch user details
  const fetchUserDetails = async () => {
    try {
      const response = await axios.get<User>(`${API_URL}/user/get_user`, {
        withCredentials: true,
      });
      setUser(response.data);
    } catch (error) {
      console.error("Error fetching user details:", error);
      setUser(null); // Graceful error handling
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  // Handle credential update
  const handleUpdate = async (username: string, password?: string) => {
    try {
      await axios.put(
        `${API_URL}/user/update`,
        { username, password },
        { withCredentials: true }
      );

      // Update local state to reflect the changes
      setUser((prevUser) => (prevUser ? { ...prevUser, username } : null));
    } catch (error) {
      console.error("Error updating credentials:", error);
    }
  };

  return (
    <div className="card">
      <div className="card-header border-0 pt-5">
        <h3 className="card-title align-items-start flex-column">
          <span className="card-label fw-bold fs-3 mb-1">My Credentials</span>
          <span className="text-muted mt-1 fw-semibold fs-7">
            Manage your credentials
          </span>
        </h3>
      </div>
      <div className="card-body py-3">
        {user ? (
          <div>
            <p><strong>Username:</strong> {user.username}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <button
              className="btn btn-light-primary btn-sm"
              onClick={() => setShowEditModal(true)}
            >
              Edit Credentials
            </button>
          </div>
        ) : (
          <p className="text-muted">Unable to fetch user details. Please try again later.</p>
        )}
      </div>

      {showEditModal && user && (
        <EditCredentials
          onClose={() => setShowEditModal(false)}
          onUpdate={handleUpdate}
          user={user}
        />
      )}
    </div>
  );
};

export default EditCredentialsPage;
