import React from "react";
import { ControlPosition, MapControl } from "@vis.gl/react-google-maps";
import { AutocompleteCustomHybrid } from "../../Components/autocomplete-custom-hybrid";
import { AutocompleteMode } from "../../types";

type CustomAutocompleteControlProps = {
  controlPosition: ControlPosition;
  selectedImplementation: AutocompleteMode;
  onPlaceSelect: (place: google.maps.places.Place | null) => void;
};

const AutocompleteControl = ({
  controlPosition,
  selectedImplementation,
  onPlaceSelect,
}: CustomAutocompleteControlProps) => {
  const { id } = selectedImplementation;

  return (
    <MapControl position={controlPosition}>
      <div className="autocomplete-control">
        {id === "custom-hybrid" && (
          <AutocompleteCustomHybrid onPlaceSelect={onPlaceSelect} />
        )}
      </div>
    </MapControl>
  );
};

export default React.memo(AutocompleteControl);
