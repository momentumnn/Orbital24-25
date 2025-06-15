import React from "react";
import { ControlPosition, MapControl } from "@vis.gl/react-google-maps";
import { AutocompleteCustomHybrid } from "../../Components/autocomplete-custom-hybrid";

type CustomAutocompleteControlProps = {
  controlPosition: ControlPosition;
  onPlaceSelect: (place: google.maps.places.Place | null) => void;
};

const AutocompleteControl = ({
  controlPosition,
  onPlaceSelect,
}: CustomAutocompleteControlProps) => {
  return (
    <MapControl position={controlPosition}>
      <div className="autocomplete-control">
        <AutocompleteCustomHybrid onPlaceSelect={onPlaceSelect} />
      </div>
    </MapControl>
  );
};

export default React.memo(AutocompleteControl);
