/* eslint-disable no-unused-vars */
import { useAuth } from "../../Store/AuthStore";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
function Booking() {
  const location = useLocation();
  const { service } = location.state || {};

  const { handleSubmit } = useForm();
  const { user } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async () => {
    try {
      const bookingData = {
        userId: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        service: service.name,
        total: service.price,
      };

      const response = await axios.post(`/addBooking`, bookingData);

      toast.success("Booking successful");
      navigate("booking-list");
    } catch (error) {
      toast.error("No service found");
      error.response && toast.error(error.response.data.message);
      console.error("Error while booking:", error.message);
    }
  };

  return (
    <>
      <h1 className="text-3xl font-bold text-center my-5">
        Confirm Your Booking
      </h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-screen lg:w-1/2 mx-auto"
      >
        <div className="form-control w-full">
          <input
            className={`input input-bordered w-full my-2 bg-white text-black`}
            defaultValue={user?.name}
            readOnly
          />

          {/* Email Input */}
          <input
            className={`input input-bordered w-full my-2 bg-white text-black`}
            defaultValue={user?.email}
            readOnly
          />

          {/* Phone Input */}
          <input
            className={`input input-bordered w-full my-2 bg-white text-black`}
            defaultValue={user?.phone}
            readOnly
          />
          {/* Service Input */}
          <input
            type="text"
            readOnly
            className="input input-bordered w-full my-2 bg-white text-black"
            defaultValue={
              service?.name || "Please Visit Avaialble Service page "
            }
          />
        </div>

        {/* Submit Button */}
        <div className="flex space-x-2 mt-4 justify-between items-center">
          <p>
            Your service charge will be{" "}
            <span className="font-bold">${service?.price}</span>
          </p>

          <button
            type="submit"
            className="btn bg-[#F63E7B] px-8 py-2 text-white"
          >
            Book
          </button>
        </div>
      </form>
    </>
  );
}

export default Booking;
