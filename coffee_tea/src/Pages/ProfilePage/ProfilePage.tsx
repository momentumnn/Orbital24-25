import React, { useState, useEffect} from 'react';
import { useNavigate } from "react-router-dom";
import supabase from "../../SupabaseAuthentication/SupabaseClient";
import './ProfilePage.css'

function ProfilePage() {
  const [profilePic, setProfilePic] = useState<string>('');
  const [uploadMessage, setUploadMessage] = useState<string | null>(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [displayname, setDisplayname] = useState<string>("");


  //change username
  const handleUsernameSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setUploadMessage(null);

    const { data: userData, error: userError } = await supabase.auth.getUser();
    const user = userData?.user;

    if (!user || userError) {
      setUploadMessage("Unable to fetch user.");
      return;
    }

    const { error: updateError } = await supabase
      .from("Public_Profile")
      .update({ username })
      .eq("user_id", user.id);

    if (updateError) {
      setUploadMessage(updateError.message);
    } else {
      setUploadMessage("Username updated successfully!");
      setDisplayname(username);
    }
    setUsername("");
  };


  // change password
  const handlePasswordSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setUploadMessage(null);

    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
      setUploadMessage(error.message);
    } else {
      setUploadMessage("Password updated successfully!");
      //force sign out
      signOut();
    }
    setPassword("");
  };


  //upload profile pic to backend
  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    
    // no file
    if (!event.target.files || event.target.files.length === 0) return;

    //get the first file
    const file = event.target.files[0];
    //make a unique file name and keeping the extension
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}.${fileExt}`;

    //get userdata
    const { data: userData, error: userError } = await supabase.auth.getUser();
    const user = userData?.user;

    if (userError || !user) {
      setUploadMessage("Unable to fetch user.");
      return;
    }

    const filePath = `${user.id}/${fileName}`;

    // upload to supabse first
    const { error: uploadError } = await supabase.storage
      .from('profilepictures')
      .upload(filePath, file);

    if (uploadError) {
      setUploadMessage(uploadError.message);
      return;
    }

    // then now get the public url from supabsae
    const { data: publicUrlData } = supabase.storage
      .from('profilepictures')
      .getPublicUrl(filePath);

    const publicUrl = publicUrlData.publicUrl;

    // update profile table
    const { error: updateError } = await supabase
      .from('Public_Profile')
      .update({ Profile_pic: publicUrl })
      .eq('user_id', user.id);

    if (updateError) {
      setUploadMessage(updateError.message)
      return;
    }

    setProfilePic(publicUrl); 
  };

  //sign out function
  const navigate = useNavigate();
  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    navigate("/Login");
  };


  //fetch username
  useEffect(() => {
    const fetchUsername = async () => {
      const { data: userData, error: userError } = await supabase.auth.getUser();
      const user = userData?.user;

      if (!user || userError) {
        console.error("User not found");
        return;
      }

      const { data, error } = await supabase
        .from("Public_Profile")
        .select("username")
        .eq("user_id", user.id)
        .single();

      if (error) {
        console.error("Error fetching username:", error.message);
      } else {
        setDisplayname(data.username);
      }
    };

    fetchUsername();
  }, []);


  return (

    <div>
      <h1 className="profile-heading">Welcome, {displayname}!</h1>
      <div className="profile-container">
        <div className="profile-pic-section">
          <label htmlFor="upload-input">
            <img
              src={profilePic || "https://placehold.co/150x150"}
              alt="Profile"
              className="profile-pic"
            />
          </label>
          <input
            id="upload-input"
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={handleImageUpload}
          />
          <div className="upload-text">Click above to upload Profile Pic</div>
        </div>

        <div className="details-section">
          <h2>Change details</h2>
          <form className="input-row" onSubmit={handleUsernameSubmit}>
            <label htmlFor="username">Username:</label>
            <input
              id="username"
              type="text"
              placeholder="Input here..."
              onChange={(e) => setUsername(e.target.value)}
              required />
            <button type="submit" className="submit-button">Submit</button>
          </form>
          <form className="input-row" onSubmit={handlePasswordSubmit}>
            <label htmlFor="password">Password:</label>
            <input
              id="password"
              type="password"
              placeholder="Input here..."
              onChange={(e) => setPassword(e.target.value)}
              required />
            <button type="submit" className="submit-button">Submit</button>
          </form>
          {uploadMessage && (
            <div className="upload-status-message">
              {uploadMessage}
            </div>
          )}
          <button onClick={signOut} className="signout-button">Sign Out</button>
        </div>
      </div>
    </div>
  );

}
export default ProfilePage;