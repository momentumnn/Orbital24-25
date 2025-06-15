import { Grid } from "@mui/material";
import { Restaurant } from "../../types";
import CafeCard from "./CafeCard";
import "./CafeCard.css";

interface CafeProps {
  cafe: Restaurant[];
}

function CafeCardList({ cafe }: CafeProps) {
  return (
    <div className="map-overlay">
      <div className="map-overlay-title">Other cafes in your list!</div>
      <Grid container spacing={2}>
        {cafe.map((cafe, index) => {
          return <CafeCard key={index} cafe={cafe} />;
        })}
      </Grid>
    </div>
  );
}

export default CafeCardList;
