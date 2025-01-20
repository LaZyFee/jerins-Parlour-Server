/* eslint-disable no-unused-vars */
import { useForm } from "react-hook-form";
import { useAuth } from "../../Store/AuthStore";
import axios from "axios";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";

function CustomerReviews() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [rating, setRating] = useState(0);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm();
  const { user } = useAuth();

  const handleStarClick = (value) => {
    setRating(value);
    setValue("rating", value);
  };

  const onSubmit = async (data) => {
    try {
      const currentDate = new Date().toISOString();
      const reviewData = {
        profilepic: user?.profilePic,
        name: user?.name,
        username: user?.username,
        email: user?.email,
        comment: data.description,
        service: data.service,
        rating: data.rating,
        date: currentDate,
      };
      await axios.post(`/addReview`, reviewData);
      toast.success("Review submitted successfully!");
      reset();
      setRating(0);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to submit the review");
    }
  };

  useEffect(() => {
    axios
      .get(`/getAllServices`)
      .then((response) => {
        setServices(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching services:", error);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <h1 className="text-3xl font-bold text-center">Drop a Review for Us</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-screen lg:w-1/2 mx-auto flex flex-col gap-2 my-4"
      >
        <input
          type="text"
          className="input input-bordered bg-white text-black"
          defaultValue={user?.name}
          readOnly
          {...register("name")}
        />
        <input
          type="email"
          className="input input-bordered bg-white text-black"
          defaultValue={user?.email}
          readOnly
          {...register("email")}
        />

        <select
          className="select select-bordered bg-white text-black"
          {...register("service", { required: "Service is required" })}
        >
          {services.map((service) => (
            <option key={service._id} value={service.name}>
              {service.name}
            </option>
          ))}
        </select>

        <div className="flex items-center">
          <label className="label">
            <span className="label-text">Rating</span>
          </label>
          <div className="flex ml-2">
            {[1, 2, 3, 4, 5].map((value) => (
              <FaStar
                key={value}
                className={`cursor-pointer ${
                  value <= rating ? "text-yellow-500" : "text-gray-400"
                }`}
                onClick={() => handleStarClick(value)}
                size={24}
              />
            ))}
          </div>
        </div>

        <textarea
          placeholder="Enter your review"
          className="textarea textarea-bordered bg-white text-black"
          {...register("description", { required: "Description is required" })}
        />
        {errors.description && (
          <p className="text-red-500">{errors.description.message}</p>
        )}

        <div>
          <button
            type="submit"
            className="btn bg-[#F63E7B] px-8 py-2 text-white"
          >
            Submit
          </button>
        </div>
      </form>
    </>
  );
}

export default CustomerReviews;
