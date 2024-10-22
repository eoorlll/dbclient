import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInStart, signInSuccess, signInFailure } from '../redux/user/userSlice.js';
import { useDispatch, useSelector } from 'react-redux';
import "../assets/scss/components/form-block.scss";

const SignInForm = () => {
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch();
  const { loading, error: errorMessage } = useSelector((state) => state.user);
  
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      return dispatch(signInFailure("All fields are required"));
    }

    try {
      dispatch(signInStart());
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success === false) {
        dispatch(signInFailure(data.message));
      }

      if (res.ok) {
        dispatch(signInSuccess(data));
        navigate("/");
      }
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };

  return (
    <form className="form-block" onSubmit={handleSubmit}>
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
          {loading ? "Loading..." : "Sign in"}
        </button>
      </div>
      {errorMessage && (
        <div className="form-block__row">
          <p className="form-block__error">{errorMessage}</p>
        </div>
      )}
    </form>
  );
};

export default SignInForm;
