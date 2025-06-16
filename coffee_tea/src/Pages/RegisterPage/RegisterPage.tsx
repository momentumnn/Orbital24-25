import React, { useState } from "react";
import supabase from "../../SupabaseAuthentication/SupabaseClient";
import { Link, useNavigate } from "react-router";
import "./RegisterPage.css";

function RegisterPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage("");

    //signs the user up and create a row in auth table
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) {
      setMessage(error.message);
    } else {
      setMessage("User account created!");
      navigate("/Login");
    }

    setEmail("");
    setPassword("");
  };

  return (
    <div className="page">
      <form onSubmit={handleSubmit} className="box">
        <h1 className="title">Register Now!</h1>

        {message && <span className="alert">{message}</span>}

        <div className="email-input">
          <label className="email-text"> Email: </label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className="email"
            type="email"
            placeholder="Email here..."
            required
          />
        </div>
        <div className="password-input">
          <label className="password-text"> Password: </label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            className="password"
            type="password"
            placeholder="Password here..."
            required
          />
        </div>

        <div className="center">
          <button className="button" type="submit">
            Register!
          </button>
        </div>

        <p className="redirect">
          Already have an account?<Link to="/Login">Login</Link>
        </p>
      </form>
    </div>
  );
}

export default RegisterPage;
