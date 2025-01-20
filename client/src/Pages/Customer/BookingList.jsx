/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../Store/AuthStore";
import { toast } from "react-hot-toast";

function BookingList() {
  const [bookingList, setBookingList] = useState([]);
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);

  // Refetch data after successful payment or when user changes
  const fetchBookings = () => {
    if (user && user.email) {
      setLoading(true);
      axios
        .get(`/user/bookings?email=${user.email}`)
        .then((response) => {
          setBookingList(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching bookings:", error.message);
          toast.error("Error fetching bookings");
          setLoading(false);
        });
    }
  };

  useEffect(() => {
    fetchBookings(); // Initial fetch on load
  }, [user]);

  if (loading) {
    return <p>Loading bookings...</p>;
  }

  return (
    <div className="min-h-screen">
      <h1 className="text-3xl font-bold text-center my-5">Booking List</h1>
      {bookingList && bookingList.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr className="bg-base-200 shadow-xl rounded-lg">
                <th className="text-center">Customer Name</th>
                <th className="text-center">Email</th>
                <th className="text-center">Service Name</th>
                <th className="text-center">Price</th>
                <th className="text-center">Status</th>
                <th className="text-center">Payment Status</th>
              </tr>
            </thead>
            <tbody>
              {bookingList.map((booking) => (
                <tr key={booking._id}>
                  <td className="text-center">{booking.name}</td>
                  <td className="text-center">{booking.email}</td>
                  <td className="text-center">{booking.service}</td>
                  <td className="text-center">{booking.total}</td>
                  <td className="text-center">{booking.status}</td>
                  <td className="text-center">
                    {booking.total && !booking.isPaid === true ? (
                      <Link to="/booking/checkout" state={{ booking }}>
                        <button className="btn bg-[#F63E7B] px-8 text-white">
                          Pay
                        </button>
                      </Link>
                    ) : (
                      <span className="text-green-500 font-bold">Paid</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-xl">
          <p>No bookings found.</p>
          <p>
            Please check{" "}
            <Link to={"/services"} className="text-[#F63E7B] font-bold">
              Our Services
            </Link>
          </p>
        </div>
      )}
    </div>
  );
}

export default BookingList;
