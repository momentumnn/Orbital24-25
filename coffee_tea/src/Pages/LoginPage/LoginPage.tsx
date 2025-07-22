import React, { useState } from "react";
import supabase from "../../SupabaseAuthentication/SupabaseClient";
import { Link, useNavigate } from "react-router-dom";
import "./LoginPage.css";

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  /* this handles the login when the submit button is clicked
        Supabase has auto messages if user enter wrong credentials and other error messages
        and also created profile on first login by checking to see if there is a row already created for the user
    */

  const getUsernameFromEmail = (email: string) => {
    return email.split("@")[0];
  };


  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage("");

    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
    if (error) {
      setMessage(error.message);
      setEmail("");
      setPassword("");
      return;
    }

    //data.user contains the auth.user data like uuid and email
    const user = data.user;

    //this will find the matching user.id with the user_id and check that only 1 row exist 
    const { error: profileGetError } = await supabase
      .from("Public_Profile")
      .select("user_id")
      .eq("user_id", user.id)
      .single(); // expects only 1 row 

    // PGRST116 is postgres code for no row 
    if (profileGetError && profileGetError.code === "PGRST116") {

      const generatedUsername = getUsernameFromEmail(email);
      const { error: profileInsertError } = await supabase
        .from("Public_Profile")
        .insert([
          {
            user_id: user.id,
            username: generatedUsername,
            Profile_pic: null,
          },
        ]);

      if (profileInsertError) {
        //trouble inseting a row
        setMessage("Profile creation error: " + profileInsertError.message);
        return;
      }

    } else if (profileGetError) {
      //more than 1 row exist which should not happen
      setMessage("Error checking profile: " + profileGetError.message);
      return;
    }

    navigate("/Home");
  };

  return (
    <div className="page">
      <form onSubmit={handleSubmit} className="box">
        <h1 className="title">Login Now!</h1>

        {/* this is the error message using shortcircuiting */}
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
            Login!
          </button>
        </div>
        <p className="redirect">
          Don't have an account?<Link to="/Register">Register</Link>
        </p>
      </form>
    </div>
  );
}

export default LoginPage;
