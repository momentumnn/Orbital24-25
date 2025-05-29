import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import supabase from "../../SupabaseAuthentication/SupabaseClient";
import './ProfilePage.css'

function ProfilePage(){

    const [profilePic, setProfilePic] = useState<string>('');

    //tempo profile image that does not upload to backend
    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const imageUrl = URL.createObjectURL(event.target.files[0]);
            setProfilePic(imageUrl);
        }
    };

    {/*sign out function*/}
    const navigate = useNavigate();
    const signOut = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) throw error;
        navigate("/Login");
    };

    return (
    <div className="profile-container">
      <div className="profile-pic-section">
        <label htmlFor="upload-input">
          <img
            src={profilePic || 'https://placehold.co/600x400'}
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
        <form className="input-row" onSubmit={(e) => e.preventDefault()}> {/* right now submit button does nothing*/}
          <label htmlFor="username">Username:</label>
          <input id="username" type="text" placeholder="Input here..." required />
          <button type="submit" className="submit-button">Submit</button>
        </form>
        <form className="input-row" onSubmit={(e) => e.preventDefault()}>
          <label htmlFor="password">Password:</label>
          <input id="password" type="password" placeholder="Input here..." required />
          <button type="submit" className="submit-button">Submit</button>
        </form>
        <button onClick= {signOut} className="signout-button">Sign Out</button>
      </div>
    </div>
  );

}
export default ProfilePage;