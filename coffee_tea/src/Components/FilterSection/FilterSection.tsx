import React, { useContext, useEffect, useState } from "react";
import "./FilterSection.css";
import { Filter } from "../../types";
import { UserLocationContext } from "../../Context/UserLocationContext";
import FilterInputSlider from "./FilterInputSlider";

function FilterSection() {
  const [radius, setRadius] = useState(10);
  const [price, setPrice] = useState(10);
  const userLocation: google.maps.LatLngLiteral =
    useContext(UserLocationContext);
  const req: Filter = {
    distance: radius,
    category: "food",
    latlng: {
      lat: userLocation.lat,
      lng: userLocation.lng,
    },
  };
  useEffect(() => {
    findPlaces(req);
  }, [req]);

  return (
    <div className="filter-section">
      <div className="filter-container">
        <FilterInputSlider
          onValueChange={setRadius}
          label="Distance from you"
          value="0-10km"
          output="km away from you"
          max={10}
          step={0.1}
        />
        <FilterInputSlider
          onValueChange={setPrice}
          label="Price"
          value="$0-$100"
          output=""
          max={100}
          step={10}
        />
        <div className="filter-group">
          <div className="filter-label">Category</div>
          <div className="filter-value">Choose a category</div>
          <input
            type="range"
            min={0}
            max={100}
            step={10}
            onChange={(e) => setPrice(e.target.valueAsNumber)}
            defaultValue={price}
          />
          <div className="filter-description">${price}</div>
          {/* <div className="cafe-list">
              {cafeList.map((cafe, index) => {
                return <CafeItem key={index} cafe={cafe} />;
              })}
            </div> */}
        </div>
      </div>
    </div>
  );
}

export default FilterSection;

async function findPlaces(req: Filter) {
  const { SearchNearbyRankPreference, Place } =
    (await google.maps.importLibrary("places")) as google.maps.PlacesLibrary;
  const { AdvancedMarkerElement } = (await google.maps.importLibrary(
    "marker"
  )) as google.maps.MarkerLibrary;
  const { Circle } = (await google.maps.importLibrary(
    "maps"
  )) as google.maps.MapsLibrary;
  const circ = new Circle({ center: req.latlng, radius: req.distance * 1000 });
  const restaurantTypes = [
    "acai_shop",
    "african_restaurant",
    "american_restaurant",
    "asian_restaurant",
    "bagel_shop",
    "bakery",
    "bar",
    "bar_and_grill",
    "barbecue_restaurant",
    "breakfast_restaurant",
    "brunch_restaurant",
    "buffet_restaurant",
    "cafe",
    "cafeteria",
    "cat_cafe",
    "chinese_restaurant",
    "chocolate_shop",
    "coffee_shop",
    "confectionery",
    "deli",
    "dessert_restaurant",
    "dessert_shop",
    "diner",
    "dog_cafe",
    "donut_shop",
    "fast_food_restaurant",
    "fine_dining_restaurant",
    "food_court",
    "french_restaurant",
    "hamburger_restaurant",
    "ice_cream_shop",
    "indian_restaurant",
    "indonesian_restaurant",
    "italian_restaurant",
    "japanese_restaurant",
    "korean_restaurant",
    "lebanese_restaurant",
    "meal_delivery",
    "meal_takeaway",
    "mexican_restaurant",
  ];
  const request = {
    locationRestriction: circ,
    fields: ["displayName", "location", "businessStatus"],
    includedTypes: restaurantTypes,
    language: "en-US",
    maxResultCount: 8,
    region: "sg",
    rankPreference: SearchNearbyRankPreference.POPULARITY,
  };
  //@ts-ignore
  const { places } = await Place.searchNearby(request);

  if (places.length) {
    console.log(places);

    const { LatLngBounds } = (await google.maps.importLibrary(
      "core"
    )) as google.maps.CoreLibrary;
    const bounds = new LatLngBounds();

    // Loop through and get all the results.
    places.forEach((place) => {
      const markerView = new AdvancedMarkerElement({
        position: place.location,
        title: place.displayName,
      });

      bounds.extend(place.location as google.maps.LatLng);
      console.log(place);
    });
  } else {
    console.log("No results");
  }
}
