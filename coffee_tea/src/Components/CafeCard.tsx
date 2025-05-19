type CafeProps = {
  name: string;
  url: string;
  address?: string;
};

function CafeCard(props: CafeProps) {
  return (
    <div className="cafe-card">
      <div>
        <div className="cafe-name">{props.name}</div>
        {props.address && (
          <div className="cafe-address">Address: {props.address}</div>
        )}
        <div className="cafe-tags">
          <div className="cafe-tag">Cafe</div>
          <div className="cafe-tag">Cafe</div>
          <div className="cafe-tag">Cafe</div>
        </div>
      </div>
      <div className="cafe-picture">
        <img src={props.url} alt={props.name} />
      </div>
    </div>
  );
}

export default CafeCard;
