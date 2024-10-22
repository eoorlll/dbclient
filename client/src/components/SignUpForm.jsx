import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "../assets/scss/components/form-block.scss";

const SignUpForm = () => {
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.userName || !formData.email || !formData.password) {
      return setErrorMessage("All fields are required");
    }

    try {
      setLoading(true);
      setErrorMessage(null);
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success === false) {
        setLoading(false);
        return setErrorMessage(data.message);
      }

      setLoading(false);

      if (res.ok) {
        navigate("/sign-in");
      }
    } catch (error) {
      setErrorMessage(error.message);
      setLoading(false);
    }
  };

  return (
    <form className="form-block" onSubmit={handleSubmit}>
      <div className="form-block__row">
        <label htmlFor="userName">Your username</label>
        <input
          type="text"
          placeholder="Enter your username"
          id="userName"
          onChange={handleChange}
        />
      </div>
      <div className="form-block__row">
        <label htmlFor="email">Your email</label>
        <input
          type="email"
          placeholder="Enter your email"
          id="email"
          onChange={handleChange}
        />
      </div>
      <div className="form-block__row">
        <label htmlFor="password">Your password</label>
        <input
          type="password"
          placeholder="Enter your password"
          id="password"
          onChange={handleChange}
        />
      </div>
      <div className="form-block__row">
        <button type="submit" className="form-block__submit" disabled={loading}>
          {loading ? "Loading..." : "Sign up"}
        </button>
      </div>
      {errorMessage && (
        <div className="form-block__row">
          <p className="form-block__error">{errorMessage}</p>
        </div>
      )}
      <div className="form-block__row">
        <p>
          Already have an account? <Link to="/sign-in">Sign in</Link>
        </p>
      </div>
    </form>
  );
};

export default SignUpForm;
