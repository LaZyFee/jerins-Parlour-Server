import { useEffect, useState } from "react";
import { useAuth } from "../../Store/AuthStore";
import noImageFound from "/assets/images/user.jpg";
import axios from "axios";

function Profile() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    if (user && user.email) {
      setLoading(true);
      axios
        .get(`/getReviews?email=${user.email}`)
        .then((response) => {
          setReviews(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching reviews:", error);
          setLoading(false);
        });
    }
  }, [user]);

  return (
    <div className="min-h-screen">
      <div className="flex flex-col lg:flex-row gap-4 lg:mx-10">
        <div className="card mt-5 w-full max-w-md mx-auto shadow-xl text-start">
          <figure className="px-5 pt-5">
            <img
              src={
                user.profilePic?.startsWith("https")
                  ? user.profilePic
                  : user.profilePic
                  ? `${apiUrl}/${user.profilePic}`
                  : noImageFound
              }
              className="rounded-xl"
              alt={user.name || "user profile"}
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">Name: {user.name}</h2>
            <p>Username: {user.username}</p>
            <p>Email: {user.email}</p>
          </div>
        </div>

        <div>
          <h1 className="text-3xl font-bold my-5 text-center">Your Reviews</h1>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 my-5 mx-auto">
            {loading ? (
              <p>Loading reviews...</p>
            ) : reviews.length > 0 ? (
              reviews.map((review) => (
                <div
                  key={review._id}
                  className="card w-full max-w-md mx-auto shadow-xl"
                >
                  <div className="card-body">
                    <h2 className="card-title text-blue-700">
                      Service:{" "}
                      <span className="font-bold text-[#F63E7B]">
                        {review.service}
                      </span>
                    </h2>
                    <h2 className="text-lg font-semibold text-blue-700">
                      Comments:{" "}
                      <span className="font-normal text-black">
                        {review.comment}
                      </span>
                    </h2>
                    <p>Rating: {review.rating} Out of 5</p>
                    <p>
                      Date:{" "}
                      {review.date &&
                        new Date(review.date).toLocaleString("en-US", {
                          timeZone: "Asia/Dhaka",
                        })}
                    </p>
                    <p>{review.description}</p>
                  </div>
                </div>
              ))
            ) : (
              <p>No reviews available.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
