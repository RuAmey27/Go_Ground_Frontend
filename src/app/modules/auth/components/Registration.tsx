import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import clsx from "clsx";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { AuthService_Ground } from "../../../../api/Service/Registrationservice_Ground.tsx";
import { AuthService_Water } from "../../../../api/Service/Registrationservice_Water";
import { AuthService_Air } from "../../../../api/Service/Registrationservice_Air";

const Registration: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [status, setStatus] = useState<string | null>(null);
  const [selectedService, setSelectedService] = useState<"ground" | "water" | "air">("ground");

  
  const registrationSchema = Yup.object().shape({
    username: Yup.string()
      .min(3, "Minimum 3 symbols")
      .max(50, "Maximum 50 symbols")
      .required("User name is required"),
    email: Yup.string()
      .email("Wrong email format")
      .min(3, "Minimum 3 symbols")
      .max(50, "Maximum 50 symbols")
      .required("Email is required"),
    password: Yup.string()
      .min(8, "Minimum 8 symbols")
      .max(50, "Maximum 50 symbols")
      .required("Password is required"),
  });

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
    },
    validationSchema: registrationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      setLoading(true);
      try {
        let selectedApiService;

        // Determine which service to call based on the selected button
        if (selectedService === "ground") {
          selectedApiService = AuthService_Ground;
        } else if (selectedService === "water") {
          selectedApiService = AuthService_Water;
        } else if (selectedService === "air") {
          selectedApiService = AuthService_Air;
        }

        // Call the selected service
        if (selectedApiService) {
          await selectedApiService.register(values);
          setStatus("Registration successful!");
          ///// use navigate to  after registration user have to login 
          navigate("/auth/login");

        }
      } catch (error) {
        console.error("Error during registration:", error);
        setStatus("Registration failed. Please try again.");
      } finally {
        setSubmitting(false);
        setLoading(false);
      }
    },
  });

  useEffect(() => {
    console.log("Component initialized.");
  }, []);

  return (
    <form className="form w-100" noValidate id="registration_form" onSubmit={formik.handleSubmit}>
      <h1 className="text-center mb-4">Sign Up</h1>

      {status && <div className="alert alert-info">{status}</div>}

      {/* UserName */}
      <div className="mb-3">
        <label className="form-label">UserName</label>
        <input
          type="text"
          placeholder="UserName"
          {...formik.getFieldProps("username")}
          className={clsx("form-control", {
            "is-invalid": formik.touched.username && formik.errors.username,
            "is-valid": formik.touched.username && !formik.errors.username,
          })}
        />
        {formik.touched.username && formik.errors.username && (
          <div className="invalid-feedback">{formik.errors.username}</div>
        )}
      </div>

      {/* Email */}
      <div className="mb-3">
        <label className="form-label">Email</label>
        <input
          type="email"
          placeholder="Email"
          {...formik.getFieldProps("email")}
          className={clsx("form-control", {
            "is-invalid": formik.touched.email && formik.errors.email,
            "is-valid": formik.touched.email && !formik.errors.email,
          })}
        />
        {formik.touched.email && formik.errors.email && (
          <div className="invalid-feedback">{formik.errors.email}</div>
        )}
      </div>

      {/* Password */}
      <div className="mb-3">
        <label className="form-label">Password</label>
        <input
          type="password"
          placeholder="Password"
          {...formik.getFieldProps("password")}
          className={clsx("form-control", {
            "is-invalid": formik.touched.password && formik.errors.password,
            "is-valid": formik.touched.password && !formik.errors.password,
          })}
        />
        {formik.touched.password && formik.errors.password && (
          <div className="invalid-feedback">{formik.errors.password}</div>
        )}
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", gap: "10px", marginBottom: "20px"  }}>
        <button
          type="button"
          onClick={() => setSelectedService("ground")}
          className="btn btn-retro"
          style={{ backgroundColor: "#8B4513", color: "#fff" }}
        >
          Ground
        </button>
        <button
          type="button"
          onClick={() => setSelectedService("water")}
          className="btn btn-retro"
          style={{ backgroundColor: "#1E90FF", color: "#fff" }}
        >
          Water
        </button>
        <button
          type="button"
          onClick={() => setSelectedService("air")}
          className="btn btn-retro"
          style={{ backgroundColor: "#228B22", color: "#fff" }}
        >
          Air
        </button>
      </div>

      {/* Submit Button */}
      <div className="d-grid"style={{ marginBottom: "20px" }}>
        <button
          type="submit"
          className="btn btn-primary"
          style={{ backgroundColor: "#007bff", color: "#fff" }}
          disabled={loading || !formik.isValid}
        >
          {loading ? "Submitting..." : "Sign Up"}
        </button>
      </div>

      <div style={{ marginBottom: "20px" }}>
      <Link to="/auth/login">
          <button
            type="button"
            id="kt_login_signup_form_cancel_button"
            className="btn btn-lg btn-light-primary w-100 mb-5"
          >
            Cancel
          </button>
        </Link>
      </div>

    </form>
  );
};

export default Registration;
