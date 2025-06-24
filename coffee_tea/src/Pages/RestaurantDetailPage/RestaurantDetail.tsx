import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import supabase from "../../SupabaseAuthentication/SupabaseClient";
import { Review } from "../../Types/Review";
import { Restaurant } from "../../Types/Restaurant";
import "./RestaurantDetail.css";

function RestaurantDetailPage() {

  const { id } = useParams<{ id: string }>();
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [newReview, setNewReview] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  //get restarurant details
  useEffect(() => {
    const fetchRestaurant = async () => {
      const { data, error } = await supabase
        .from("restaurants")
        //just select all coloumns
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.error("Error fetching restaurant:", error);
      } else {
        setRestaurant(data);
      }

      //this part onwards we are checking if the restaurant is saved by the user anot
      //so need the userdata
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (userError || !user) {
        alert("You must be logged in")
        return;
      }
      setUserId(user.id);
      // check if the restaurant is saved
      const { data: saveEntry, error: saveError } = await supabase
        .from("user_saves")
        .select("id")
        .eq("user_id", user.id)
        .eq("restaurant_id", id)
        .maybeSingle();

      if (!saveError && saveEntry) setIsSaved(true);
    };

    if (id) fetchRestaurant();
  }, [id]);

  //get user reviews of this restaurant
  useEffect(() => {
    const fetchReviews = async () => {
      const { data, error } = await supabase
        .from("Reviews")
        .select("id, username, review, created_at")
        .eq("restaurant_id", id)
        .order("created_at", { ascending: false });
      if (error) {
        console.error("Error fetching reviews:", error.message);
      } else {
        setReviews(data);
      }
    };

    if (id) fetchReviews();
  }, [id]);


  // submitting reviews to db
  const handleReviewSubmit = async () => {
    if (!newReview.trim()) return;

    setLoading(true);

    // need get the user id first from the auth table
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) {
      alert("You must be logged in to submit a review.");
      setLoading(false);
      return;
    }

    //get the username from the public profile
    const { data: profile, error: profileError } = await supabase
      .from("Public_Profile")
      .select("username")
      .eq("user_id", user.id)
      .single();
    if (!profile || profileError) {
      alert("Could not find your profile.");
      setLoading(false);
      return;
    }


    //inserting into databsae
    const { data, error } = await supabase
      .from("Reviews")
      .insert([
        {
          restaurant_id: id,
          user_id: user.id,
          username: profile.username,
          review: newReview,
        },
      ])
      .select("*");
    if (error) {
      console.error("Error inserting review:", error.message);
      alert("Failed to submit review.");
    } else if (data) {
      setReviews((prev) => [data[0], ...prev]);
      setNewReview("");
    }

    setLoading(false);
  };


  //this is the toggle button for saving and unsaving the restaurant
  const handleToggleSave = async () => {
    if (!userId || !restaurant) return;

    // unsave 
    if (isSaved) {
      const { error } = await supabase
        .from("user_saves")
        .delete()
        .eq("user_id", userId)
        .eq("restaurant_id", restaurant.id);

      if (!error) setIsSaved(false);
      else alert("Failed to unsave.");
    }
    //save
    else {
      const { error } = await supabase
        .from("user_saves")
        .insert([
          {
            user_id: userId,
            restaurant_id: restaurant.id,
          },
        ]);

      if (!error) setIsSaved(true);
      else alert("Failed to save.");
    }
  };

  if (!restaurant) return <div className="loading">Loading...</div>;

  return (
    <div className="restaurant-detail-page">
      <div className="restaurant-detail-top">
        <div className="restaurant-detail-left">
          {restaurant.image_url ? (
            <img
              src={restaurant.image_url}
              alt={restaurant.displayName}
              className="restaurant-detail-image"
            />
          ) : (
            <div className="restaurant-detail-placeholder">
              Oops, this image is not provided to us.
            </div>
          )}
        </div>
        <div className="restaurant-detail-right">
          <h2 className="restaurant-detail-name">{restaurant.displayName}</h2>
          <p className="restaurant-detail-address">
            {restaurant.formattedAddress || "Oops, this address is not provided to us."}
          </p>

          {restaurant.latlng?.lat && restaurant.latlng?.lng ? (
            <iframe
              title="Map"
              className="restaurant-detail-map"
              src={`https://www.google.com/maps?q=${restaurant.latlng.lat},${restaurant.latlng.lng}&z=15&output=embed`}
              loading="lazy"
            />
          ) : (
            <div className="restaurant-detail-placeholder">
              Oops, no map data is available.
            </div>
          )}

          <button onClick={handleToggleSave} className="save-button">
            {isSaved ? "Unsave" : "Save"}
          </button>
        </div>
      </div>

      <div className="review-section">
        <h3>Leave a Review</h3>
        <textarea
          placeholder="Write your review..."
          rows={2}
          value={newReview}
          onChange={(e) => setNewReview(e.target.value)}
        ></textarea>
        <button onClick={handleReviewSubmit} disabled={loading}>
          {loading ? "Submitting..." : "Submit"}
        </button>
      </div>

      <div className="user-reviews">
        <h3>User Reviews</h3>
        <ul>
          {reviews.map((review) => (
            <li key={review.id}>
              <p>
                <strong>{review.username}</strong>{" "}
                <span style={{ color: "#666", fontSize: "0.9rem" }}>
                  ({new Date(review.created_at).toLocaleDateString()})
                </span><br />
                <em>"{review.review}"</em>
              </p>
            </li>
          ))}
        </ul>

      </div>
    </div>
  );
};

export default RestaurantDetailPage;
