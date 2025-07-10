import { Restaurant } from "../../types";
import "./CafeCard.css";

interface CafeProps {
  cafe: Restaurant;
}

function CafeCard({ cafe }: CafeProps) {
  return (
    <div className="cafe-card">
      <div className="cafe-picture">
        <img src={cafe.image_url} alt={cafe.displayName} />
      </div>
      <div>
        <div className="cafe-name">{cafe.displayName}</div>
        {cafe.formattedAddress && (
          <div className="cafe-address">Address: {cafe.formattedAddress}</div>
        )}
        <div className="cafe-tags">
          <div className="cafe-tag">Cafe</div>
          <div className="cafe-tag">Cafe</div>
          <div className="cafe-tag">Cafe</div>
        </div>
      </div>
    </div>
  );
}

export default CafeCard;
