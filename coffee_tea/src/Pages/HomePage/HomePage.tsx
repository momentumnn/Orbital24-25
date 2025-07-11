import React, { useEffect, useState } from "react";
import CafeCardLarge from "../../Components/CafeCardLargeforHome/CafeCardLarge";
import { RestaurantHome } from "../../types";
import { useNavigate } from "react-router";
import supabase from "../../SupabaseAuthentication/SupabaseClient";
import "./HomePage.css";


function HomePage() {

  const [restaurants, setRestaurants] = useState<RestaurantHome[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUnvisitedRestaurants = async () => {
      const { data: { user }, error: userError } = await supabase.auth.getUser();

      if (userError || !user) {
        console.error("User fetch error", userError);
        return;
      }

      // find the restaurant ids that is saved by the user
      const { data: savedData, error: savedError } = await supabase
        .from("user_saves")
        .select("restaurant_id")
        .eq("user_id", user.id);

      if (savedError) {
        console.error("Error fetching saved restaurant IDs", savedError);
        return;
      }

      const savedRestaurantIds = savedData.map(entry => entry.restaurant_id);

      // find the restaurants that is not saved by the user aka other people saves
      const { data: allRestaurants, error: restaurantError } = await supabase
        .from("restaurants")
        .select("id, displayName, formattedAddress, image_url")
        .not("id", "in", `(${savedRestaurantIds.join(",")})`);

      if (restaurantError) {
        console.error("Error fetching restaurants", restaurantError);
        return;
      }

      setRestaurants(allRestaurants);
    };

    fetchUnvisitedRestaurants();
  }, []);


  return (
    <div className="landing-container">
      <div className="landing-hero">
        <div className="landing-hero-title">Cafe Finder</div>
      </div>
      <div className="landing-cafes-section">
        <h2 className="landing-section-title">See what else to save</h2>
        <div className="landing-cafes-container">
          {restaurants.map((restaurant) => (
            <div className="landing-cafe"
              key={restaurant.id}
              onClick={() => navigate(`/Home/${restaurant.id}`)}
            >
              <CafeCardLarge
                cafe={restaurant}
                onRemove={(id) => {
                  setRestaurants((prev) =>
                    prev.filter((r) => r.id !== id)
                  );
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );


}

export default HomePage;