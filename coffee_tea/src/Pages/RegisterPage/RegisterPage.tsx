import React, { useState } from "react";
import supabase from "../../SupabaseAuthentication/SupabaseClient";
import { Link, useNavigate } from "react-router";
import "./RegisterPage.css";

function RegisterPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  /* this submits to supabase the new user
        Supabase also have auto messages if user has already been created and other errors messages

        and yes unfortunatetly as of now idk how to also have the user enter their username(aka display name) need more research on this XD
     */

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage("");
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });
    if (error) {
      setMessage(error.message);
      return;
    }

    if (data) {
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

        {/* // this is the error message using shortcircuiting} */}
        {message && <span>{message}</span>}
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
