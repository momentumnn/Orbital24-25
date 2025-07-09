import { useEffect, useState } from "react";
import "./SearchPage.css";
import CafeItem from "../../Components/CafeItemforSearch/CafeItem";
import FilterSection from "../../Components/FilterSection/FilterSection";
import MapSection from "./MapSection";
import { Restaurant, UserCoordinates } from "../../types";
import mcdonalds from "../../Assets/McDonalds.jpg";
import { UserLocationContext } from "../../Context/UserLocationContext";

const INITIAL_CAFES: Restaurant[] = [
  {
    id: "string",
  displayName: "string",
  formattedAddress: "string",
  image_url: "string",
  latlng: { lng: "string", lat: "string"}
  },
  
];
const options = {
  enableHighAccuracy: false,
  timeout: 5000,
  maximumAge: 0,
};

function SearchPage() {
  const position = { lat: 1.3521, lng: 103.8198 };

  const [cafeList, setCafeList] = useState<Restaurant[]>(INITIAL_CAFES);
  const [userLocation, setUserLocation] = useState<UserCoordinates>(position);
  const getUserLocation = () => {
    navigator.geolocation.getCurrentPosition(
      function (pos) {
        // console.log(pos);
        setUserLocation({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
      },
      function error(err) {
        console.warn(`ERROR(${err.code}): ${err.message}`);
      },
      options
    );
  };

  useEffect(() => {
    getUserLocation();
  }, []);
  return (
    <UserLocationContext.Provider value={userLocation}>
      <div className="search-container">
        <MapSection />
        <div className="search-content">
          <div className="section-title">List of your saved cafes!</div>
          <FilterSection />

          <div className="cafe-list">
            {cafeList.map((cafe, index) => {
              return <CafeItem key={index} cafe={cafe} />;
            })}
          </div>

          <button className="load-more-button">Load more cafes</button>
        </div>
      </div>
    </UserLocationContext.Provider>
  );
}

export default SearchPage;
