import React, { useState } from "react";
import supabase from "../../SupabaseAuthentication/SupabaseClient";
import { Link, useNavigate } from "react-router";
import "./RegisterPage.css";

function RegisterPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [username, setUsername] = useState("");

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
      return;
    }

    //data.user contains the auth.user data like uuid and email
    //creating a new row in public profile table for the new user
    const user = data.user;
    if (user) {
      const { error: profileError } = await supabase
        .from("Public_Profile")
        .insert([
          {
            user_id: user.id,
            username: username,
            Profile_pic: null,
          },
        ]);

      if (profileError) {
        setMessage(
          "Account created, but profile error: " + profileError.message
        );
      } else {
        setMessage("User account created!");
        navigate("/Login");
      }
    }

    setEmail("");
    setPassword("");
    setUsername("");
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

        <div className="username-input">
          <label className="username-text"> Username: </label>
          <input
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            className="username"
            type="text"
            placeholder="Username here..."
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
