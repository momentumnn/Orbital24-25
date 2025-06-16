import React, { useState,useEffect } from 'react';
import './SavedPage.css';
import mcdonalds from "../../Assets/McDonalds.jpg"
import supabase from '../../SupabaseAuthentication/SupabaseClient';
import { useNavigate } from 'react-router';


interface Restaurant {
  id: string;
  name: string;
  address: string;
  image_url: string;
  visited: boolean;
  save_id: number;
}


function SavedPage() {

  const navigate = useNavigate();
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);

  useEffect(() => {

    // async function to get supabase data
    const fetchSavedRestaurants = async () => {
      // getting user data only need the uuid
      const {
        data: { user },
      } = await supabase.auth.getUser();

      //no user so i stop
      if (!user) return;

      //getting the data from the user_saves table in supabase
      //it is also getting from the restaurants table via the foreign key setup in supabase
      const { data, error } = await supabase
        .from('user_saves')
        .select(`
        id,
        visited,
        restaurants (
          id,
          displayName,
          formattedAddress,
          image_url
        )
      `)
        // user.id is from the auth table 
        // user_id in user_saves table is equal to the uuid of the current logged in user.
        .eq('user_id', user.id);

      if (error) {
        console.error('Error fetching saved restaurants:', error.message);
        return;
      }


      // this converts the supabase data to react 
      // those with "restaurants" are from the restaurants table in supabase
      const formatted = data.map((entry: any) => ({
        id: entry.restaurants.id,
        name: entry.restaurants.displayName, 
        address: entry.restaurants.formattedAddress, 
        image_url: entry.restaurants.image_url,
        visited: entry.visited,
        save_id: entry.id,
      }));

      setRestaurants(formatted);
    };

    fetchSavedRestaurants();
  }, []);


  const toggleVisited = async (saveId: number, currentVisited: boolean) => {
    const { error } = await supabase
      .from('user_saves')
      .update({ visited: !currentVisited })
      .eq('id', saveId);

    if (!error) {
      setRestaurants(prev =>
        prev.map(r =>
          r.save_id === saveId ? { ...r, visited: !currentVisited } : r
        )
      );
    }
  };

  const handleVisitedClick = (e: React.MouseEvent<HTMLButtonElement>,
    saveId: number,
    currentVisited: boolean
  ) => {
    e.stopPropagation();
    toggleVisited(saveId, currentVisited);
  };

  const handleRestaurantClick = (restaurantId: string) => {
    navigate(`/Saved/${restaurantId}`);
  };


  return (
    <div className="saved-page">
      <h1>Saved Restaurants</h1>
      <ul className="restaurant-list">
        {restaurants.map(restaurant => (
          <li key={restaurant.save_id} className={`restaurant-item ${restaurant.visited ? 'visited' : 'not-visited'}`}
            onClick={() => handleRestaurantClick(restaurant.id)} 
          >
            <div className="restaurant-left">
              <img
                src={restaurant.image_url}
                alt={restaurant.name}
                className="restaurant-image"
              />
            </div>
            <div className="restaurant-info">
              <h2>{restaurant.name}</h2>
              <p>{restaurant.address}</p>
            </div>
            <button
              className={`visited-button ${restaurant.visited ? 'visited' : 'not-visited'}`}
              onClick={(e) => handleVisitedClick(e, restaurant.save_id, restaurant.visited)}
            >
              {restaurant.visited ? 'Visited' : 'Not visited'}
            </button>
          </li>
        ))}

      </ul>
    </div>
  );
};

export default SavedPage;
