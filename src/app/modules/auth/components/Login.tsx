// // import React, { useState } from "react";
// // import { useNavigate } from "react-router-dom";
// // import { useAuth } from "../../auth/core/Auth";
// // import axios from "axios";
// //
// // interface LoginBasicInfo {
// //   email: string;
// //   password: string;
// // }
// //
// // const Login: React.FC = () => {
// //   const [email, setEmail] = useState("");
// //   const [password, setPassword] = useState("");
// //   const [type, setType] = useState("water");
// //   const [error, setError] = useState<string | null>(null);
// //   const { saveAuth } = useAuth();
// //   const navigate = useNavigate();
// //
// //   // Form Validation
// //   const isFormValid = () => {
// //     if (!email || !password || !type) {
// //       setError("Please fill in all fields.");
// //       return false;
// //     }
// //     return true;
// //   };
// //
// //   const handleLogin = async (e: React.FormEvent) => {
// //     e.preventDefault();
// //     setError(null);
// //
// //     // Validate form inputs
// //     if (!isFormValid()) return;
// //
// //     const loginData: LoginBasicInfo = { email, password };
// //
// //     try {
// //       // Send login request to the server
// //       const response = await axios.post("http://localhost:8080/login", loginData, {
// //         withCredentials: true, // Include cookies in the request
// //       });
// //
// //       // Assuming server response indicates successful login
// //       if (response.status === 200) {
// //         saveAuth({ withCredentials: true }); // Update auth state
// //
// //         // Navigate based on the service type
// //         navigateToHomePage(type);
// //       } else {
// //         setError("Login failed. Please try again.");
// //       }
// //     } catch (err) {
// //       console.error("Login failed:", err);
// //       setError("Invalid credentials or login error.");
// //     }
// //   };
// //
// //   // Navigate user based on selected service type
// //   const navigateToHomePage = (serviceType: string) => {
// //     switch (serviceType) {
// //       case "water":
// //         navigate("/home");
// //         break;
// //       case "air":
// //         navigate("/air/homepage");
// //         break;
// //       case "ground":
// //         navigate("/Ground/homepage");
// //         break;
// //       default:
// //         navigate("/");
// //     }
// //   };
// //
// //   return (
// //     <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg">
// //       <h2 className="text-3xl text-center font-semibold text-gray-800 mb-6">Login</h2>
// //       <form onSubmit={handleLogin} className="space-y-4">
// //         <div>
// //           <label className="block text-gray-700">Email</label>
// //           <input
// //           id="email"
// //             type="email"
// //             value={email}
// //             onChange={(e) => setEmail(e.target.value)}
// //             placeholder="abc@gmail.com"
// //             required
// //             className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
// //           />
// //         </div>
// //         <div>
// //           <label className="block text-gray-700">Password</label>
// //           <input
// //           id="password"
// //             type="password"
// //             value={password}
// //             onChange={(e) => setPassword(e.target.value)}
// //             placeholder="********"
// //             required
// //             className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
// //           />
// //         </div>
// //         <div>
// //           <label className="block text-gray-700">Service Type</label>
// //           <select
// //           id="type"
// //             value={type}
// //             onChange={(e) => setType(e.target.value)}
// //             className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
// //           >
// //             <option value="water">Water</option>
// //             <option value="air">Air</option>
// //             <option value="ground">Ground</option>
// //           </select>
// //         </div>
// //         {error && <p className="text-red-500 text-sm">{error}</p>}
// //         <button
// //           type="submit"
// //           className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 focus:outline-none"
// //         >
// //           Login
// //         </button>
// //       </form>
// //       <div className="text-center mt-4">
// //         <button
// //           type="button"
// //           onClick={() => navigate("/auth/registration")}
// //           className="text-blue-500 hover:underline"
// //         >
// //           Don't have an account? Sign up here
// //         </button>
// //       </div>
// //     </div>
// //   );
// // };
// //
// // export default Login;


import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../core/Auth.tsx";
import axios from "../../../axiosConfig.ts";
import clsx from "clsx";
const API_URL = import.meta.env.VITE_APP_API_URL

interface LoginBasicInfo {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [type, setType] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { saveAuth } = useAuth();
  const navigate = useNavigate();

  // Form Validation
  const isFormValid = () => {
    if (!email || !password || !type) {
      setError("Please fill in all fields.");
      return false;
    }
    return true;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!isFormValid()) return;

    const loginData: LoginBasicInfo = { email, password };

    try {
      const response = await axios.post(`${API_URL}/login`, loginData, {
        withCredentials: true,
      });

      if (response.status === 200) {
        saveAuth({ withCredentials: true });

        const sessionResponse = await axios.get(`${API_URL}/api/session`, {
          withCredentials: true,
        });

        if (sessionResponse.status === 200 && sessionResponse.data.roles) {
          const roles = sessionResponse.data.roles;
          console.log(type);
          console.log(roles[0]);
          localStorage.setItem("type", type!); // Store the selected service type
          localStorage.setItem("role", roles[0]); // Store the user role

          redirectToHomePage(type!, roles[0]); // Ensure type is non-null
        } else {
          setError("Unable to fetch session data.");
        }
      } else {
        setError("Login failed. Please try again.");
      }
    } catch (err) {
      console.error("Error during login:", err);
      setError("Invalid credentials or login error.");
    }
  };

  const redirectToHomePage = (serviceType: string, role: string) => {
    const userRoutes: Record<string, string> = {
      water: "/water/user",
      air: "/air/user",
      ground: "/UserDashBoardGround",
    };

    const adminRoutes: Record<string, string> = {
      water: "/water/admin",
      air: "/air/admin",
      ground: "/Ground/AdminDashboard",
    };

    const routes = role === "ROLE_USER" ? userRoutes : adminRoutes;

    if (routes[serviceType]) {
      navigate(routes[serviceType]);
    } else {
      setError("Invalid role or service type.");
    }
  };

  return (
    <form className="form w-100 p-4" noValidate id="login_form" onSubmit={handleLogin}>
      <h1 className="text-center mb-4">Login</h1>

      {error && <div className="alert alert-danger">{error}</div>}

      <div className="mb-3">
        <label className="form-label">Email</label>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={clsx("form-control", {
            "is-invalid": error && !email,
            "is-valid": email && !error,
          })}
        />
        {error && !email && <div className="invalid-feedback">Email is required</div>}
      </div>

      <div className="mb-3">
        <label className="form-label">Password</label>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={clsx("form-control", {
            "is-invalid": error && !password,
            "is-valid": password && !error,
          })}
        />
        {error && !password && <div className="invalid-feedback">Password is required</div>}
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", gap: "10px", marginBottom: "20px" }}>
        {["ground", "water", "air"].map((service) => (
          <button
            key={service}
            type="button"
            onClick={() => setType(service)}
            className="btn"
            style={{
              backgroundColor: service === "ground" ? "#8B4513" : service === "water" ? "#1E90FF" : "#228B22",
              color: "#fff",
            }}
          >
            {service.charAt(0).toUpperCase() + service.slice(1)}
          </button>
        ))}
      </div>

      <div className="d-grid mb-3">
        <button type="submit" className="btn btn-primary" style={{ backgroundColor: "#007bff", color: "#fff" }}>
          Submit
        </button>
      </div>

      <div>
        <button
          type="button"
          onClick={() => navigate("/auth/register")}
          className="btn btn-light-primary w-100"
        >
          Cancel
        </button>
      </div>

      <div className="text-center mt-4">
        <button
          type="button"
          onClick={() => navigate("/auth/registration")}
          className="text-blue-500 hover:underline"
        >
          Don't have an account? Sign up here
        </button>
      </div>
    </form>
  );
};

export default Login;
