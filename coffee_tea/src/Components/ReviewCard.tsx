import React from "react";

interface ReviewCardProps {
  reviewText: string;
  reviewerName: string;
  reviewerDescription: string;
}

const ReviewCard: React.FC<ReviewCardProps> = ({
  reviewText,
  reviewerName,
  reviewerDescription,
}) => {
  return (
    <div className="review-card">
      <div className="review-card-text">"{reviewText}"</div>
      <div className="review-card-reviewer">
        <div className="review-card-avatar"></div>
        <div className="review-card-info">
          <div className="review-card-name">{reviewerName}</div>
          <div className="review-card-description">{reviewerDescription}</div>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
