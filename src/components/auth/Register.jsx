import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { API_BASE } from "../../utils/auth";
import "../../styles/Register.css";

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    dob: "",
    location: "",
    role: "",
    profile_image: null, // 👈 added
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    // Handle file upload
    if (name === "profile_image") {
      setForm({ ...form, profile_image: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Use FormData instead of JSON
      const formData = new FormData();
      Object.keys(form).forEach((key) => {
        if (form[key]) {
          formData.append(key, form[key]);
        }
      });

      console.log(form.profile_image);
      

      const res = await fetch(`${API_BASE}/register`, {
        method: "POST",
        body: formData, // 👈 no Content-Type needed
      });

      const data = await res.json();
      if (!res.ok) throw data;

      alert("Registration successful!");
      navigate("/login");
    } catch (err) {
      alert(err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container2">
      <div className="auth-container22">
        <img src="/assets/login/lap.png" className="lap" alt="" />

        <div className="auth-box2">
          <h2>TodayJobs - Create Account</h2>

          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <input name="name" placeholder="Full Name" required onChange={handleChange} />
            <input type="email" name="email" placeholder="Email" required onChange={handleChange} />
            <input name="mobile" placeholder="Phone Number" required onChange={handleChange} />
            <input type="date" name="dob" required onChange={handleChange} />
            <input name="location" placeholder="Location" required onChange={handleChange} />

            <select name="role" required onChange={handleChange}>
              <option value="">Select Role</option>
              <option value="admin">Admin</option>
              <option value="candidate">Candidate</option>
              <option value="hr">HR</option>
            </select>

            {/* ✅ Optional Profile Image Upload */}
            <input
              type="file"
              name="profile_image"
              accept="image/*"
              onChange={handleChange}
            />

            <input type="password" name="password" placeholder="Password" required onChange={handleChange} />

            <button disabled={loading}>
              {loading ? "Registering..." : "Register"}
            </button>
          </form>

          <div className="auth-links2">
            <Link to="/login">Already have an account?</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
