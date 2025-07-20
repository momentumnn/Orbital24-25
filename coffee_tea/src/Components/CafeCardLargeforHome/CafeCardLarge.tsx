import React from "react";
import { RestaurantHome } from "../../types";
import "./CafeCardLarge.css";
import { useState } from "react";
import supabase from "../../SupabaseAuthentication/SupabaseClient";

interface CafeProps {
  cafe: RestaurantHome;
  onRemove: (id: string) => void;
}

function CafeCardLarge({ cafe, onRemove }: CafeProps) {
  /* <div className="cafe-tags">
 {cafe.tags.map((tag, index) => {
   return <div className="cafe-tag">{tag}</div>;
 })}
</div>*/
  const [saving, setSaving] = useState(false);

  //save the restaurant from home page
  const handleSave = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setSaving(true);
    const {
      data: { user },
      error: usererror,
    } = await supabase.auth.getUser();

    if (usererror || !user) {
      alert("You must be logged in to save restaurants.");
      return;
    }

    const { error } = await supabase.from("user_saves").insert([
      {
        user_id: user.id,
        restaurant_id: cafe.id,
      },
    ]);

    if (error) {
      console.error("Save failed:", error);
      alert("Error saving restaurant");
      setSaving(false);
    } else {
      //remove the card from hojme page
      onRemove(cafe.id);
    }
  };
  return (
    <div className="cafe-card-large">
      {cafe.image_url ? (
        <img
          src={cafe.image_url}
          alt={cafe.displayName || "Restaurant"}
          className="cafe-card-large-image"
        />
      ) : (
        <div className="cafe-card-large-placeholder">
          Oops, this image is not provided to us.
        </div>
      )}
      <div className="cafe-card-large-content">
        <div className="cafe-card-large-name">
          {" "}
          {cafe.displayName || "Oops, name is not provided to us."}
        </div>
        <div className="cafe-card-large-address">
          {cafe.formattedAddress || "Oops, address is not provided to us."}
        </div>
        <button onClick={handleSave} className="save-button">
          Save
        </button>
      </div>
    </div>
  );
}

export default CafeCardLarge;
