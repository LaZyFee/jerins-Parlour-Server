import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { useEffect, useState } from "react";
import axios from "axios";
import noImageFound from "/assets/images/user.jpg";
import { apiUrl } from "../../../utils/config";

function Reviews() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    axios
      .get(`/getAllReviews`)
      .then((response) => {
        setReviews(response.data);
      })
      .catch((error) => {
        console.error("Error fetching reviews:", error);
      });
  }, []);

  return (
    <div className="mx-auto p-4 shadow-md py-10 bg-white">
      <h2 className="text-center text-3xl font-bold mb-8">Reviews</h2>

      <Swiper
        spaceBetween={50}
        slidesPerView={1}
        pagination={{ clickable: true }}
        className="w-full"
        breakpoints={{
          1024: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
          640: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
        }}
      >
        {reviews.length === 0 ? (
          <p>No reviews available yet.</p>
        ) : (
          Array.isArray(reviews) &&
          reviews.map((review) => (
            <SwiperSlide key={review._id}>
              {" "}
              {/* Use review._id for unique keys */}
              <div className="card shadow-xl bg-slate-200 p-8 max-w-lg">
                <div className="flex items-center mb-4">
                  <img
                    src={
                      review.profilepic?.startsWith("https")
                        ? review.profilepic
                        : review.profilepic
                        ? `${apiUrl}/${review.profilepic}`
                        : noImageFound
                    }
                    alt={review.username || "User profile"}
                    className="rounded-full w-16 h-16 mr-4"
                  />
                  ;
                  <div>
                    <h3 className="font-bold">{review.username}</h3>
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2">{review.service}</h3>
                <p className="mb-4">{review.comment}</p>
                <div className="flex">
                  {Array.from({ length: review.rating }, (_, index) => (
                    <svg
                      key={index}
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-6 h-6 text-yellow-400"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M11.998 2.25c-.265 0-.53.11-.725.327l-2.964 3.03-3.506.707c-.399.08-.6.56-.425.913l2.513 4.925-.627 3.697c-.084.497.216.948.696 1.086.267.078.544.078.812 0l3.191-1.537 3.19 1.537c.268.078.545.078.813 0 .48-.138.78-.589.696-1.086l-.627-3.697 2.514-4.925c.175-.353-.026-.833-.425-.913l-3.506-.707-2.964-3.03c-.195-.217-.46-.327-.725-.327z"
                      />
                    </svg>
                  ))}
                </div>
              </div>
            </SwiperSlide>
          ))
        )}
      </Swiper>
    </div>
  );
}

export default Reviews;
