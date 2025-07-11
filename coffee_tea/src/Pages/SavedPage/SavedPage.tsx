import React, { useState, useEffect } from 'react';
import './SavedPage.css';
import mcdonalds from "../../Assets/McDonalds.jpg"
import supabase from '../../SupabaseAuthentication/SupabaseClient';
import { useNavigate } from 'react-router';
import { RestaurantSaved } from "../../types";

function SavedPage() {

  const navigate = useNavigate();
  const [restaurants, setRestaurants] = useState<RestaurantSaved[]>([]);
  const [activeCategories, setActiveCategories] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");


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
          image_url,
          types
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
        types: entry.restaurants.types,
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


  //our search and filter by category things
  // primary types from the google places documentaions
  const PRIMARY_TYPES = new Set([
    "acai_shop", "afghani_restaurant", "african_restaurant", "american_restaurant",
    "asian_restaurant", "bagel_shop", "bakery", "bar", "bar_and_grill", "barbecue_restaurant",
    "brazilian_restaurant", "breakfast_restaurant", "brunch_restaurant", "buffet_restaurant",
    "cafe", "cafeteria", "candy_store", "cat_cafe", "chinese_restaurant", "chocolate_factory",
    "chocolate_shop", "coffee_shop", "confectionery", "deli", "dessert_restaurant", "dessert_shop",
    "diner", "dog_cafe", "donut_shop", "fast_food_restaurant", "fine_dining_restaurant", "food_court",
    "french_restaurant", "greek_restaurant", "hamburger_restaurant", "ice_cream_shop",
    "indian_restaurant", "indonesian_restaurant", "italian_restaurant", "japanese_restaurant",
    "juice_shop", "korean_restaurant", "lebanese_restaurant", "meal_delivery", "meal_takeaway",
    "mediterranean_restaurant", "mexican_restaurant", "middle_eastern_restaurant", "pizza_restaurant",
    "pub", "ramen_restaurant", "restaurant", "sandwich_shop", "seafood_restaurant",
    "spanish_restaurant", "steak_house", "sushi_restaurant", "tea_house", "thai_restaurant",
    "turkish_restaurant", "vegan_restaurant", "vegetarian_restaurant", "vietnamese_restaurant",
    "wine_bar"
  ]);

  // this is the toggle function for the active category seleted
  const toggleCategory = (type: string) => {
    setActiveCategories((prev) =>
      prev.includes(type)
        ? prev.filter((t) => t !== type)
        : [...prev, type]
    );
  };

  // this function is because ah the types that we extract is a array of types and some types are the secondary types
  // so this function just finds the primary types only
  const getAllPrimaryTypes = (types: string[] | undefined): string[] => {
    if (!types || !Array.isArray(types)) return [];
    return types.filter((type) => PRIMARY_TYPES.has(type));
  };

  // this is the filter the restaurant by the category and search
  const filteredRestaurants = restaurants.filter((r) => {
    if (!Array.isArray(r.types)) return false;
    const matchesSearch = r.name.toLowerCase().includes(searchTerm.toLowerCase());
    const restaurantTypes = getAllPrimaryTypes(r.types);
    const matchesCategory =
      activeCategories.length === 0 ||
      restaurantTypes.some((t) => activeCategories.includes(t));

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="saved-page">
      <h1>Saved Restaurants</h1>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search saved restaurants or click below for categories you like ..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>
      <div className="category-container">
        <div className="category-buttons">
          {Array.from(PRIMARY_TYPES).sort().map((type) => (
            <button
              key={type}
              onClick={() => toggleCategory(type)}
              className={`category-button ${activeCategories.includes(type) ? 'active' : ''}`}
            >
              {type.replace(/_/g, ' ')}
            </button>
          ))}
        </div>
      </div>
      <ul className="restaurant-list">
        {filteredRestaurants.sort((a, b) => Number(a.visited) - Number(b.visited))
          .map(restaurant => (
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
