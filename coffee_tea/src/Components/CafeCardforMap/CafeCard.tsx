import { Restaurant } from "../../types";
import "./CafeCard.css";

interface CafeProps {
  cafe: Restaurant;
}

function CafeCard({ cafe }: CafeProps) {
  return (
    <div className="cafe-card">
      <div>
        <div className="cafe-name">{cafe.name}</div>
        {cafe.address && (
          <div className="cafe-address">Address: {cafe.address}</div>
        )}
        <div className="cafe-tags">
          <div className="cafe-tag">Cafe</div>
          <div className="cafe-tag">Cafe</div>
          <div className="cafe-tag">Cafe</div>
        </div>
      </div>
      <div className="cafe-picture">
        <img src={cafe.image_url} alt={cafe.name} />
      </div>
    </div>
  );
}

export default CafeCard;
