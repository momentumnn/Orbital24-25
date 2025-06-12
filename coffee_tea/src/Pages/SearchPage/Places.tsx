import { Combobox } from "react-widgets/cjs";
import usePlacesAutocomplete from "use-places-autocomplete";

type placesProps = {
  setPlace: (position: google.maps.LatLngLiteral) => void;
};

export default function Places({ setPlace }: placesProps) {
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete();

  console.log({ data });
  return (
    <Combobox
      hideCaret
      hideEmptyPopup
      value={value}
      onChange={(nextValue: string) => {
        setValue(nextValue);
      }}
    ></Combobox>
  );
}
