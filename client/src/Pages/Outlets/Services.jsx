import { Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import Skeleton from "../../Components/Skeleton";
import { apiUrl } from "../../utils/config";

function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  // Placeholder image for services with no image
  const placeholderImage = "https://via.placeholder.com/300x200?text=No+Image";

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

  if (loading) {
    return <Skeleton />;
  }

  return (
    <div className="min-h-screen py-5 bg-white">
      <h1 className="text-3xl font-bold text-center">All Services</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mx-auto lg:p-12">
        {services.map((service) => (
          <div
            key={service._id}
            className="text-center transition-transform duration-300 ease-in-out transform hover:shadow-2xl hover:scale-105"
          >
            <div className="card bg-base-100 w-auto shadow-xl">
              <figure className="px-5 pt-5">
                <img
                  src={
                    service.image
                      ? `${apiUrl}/${service.image}`
                      : placeholderImage
                  }
                  alt={service.name}
                  className="w-full"
                />
              </figure>
              <div className="card-body text-start">
                <h2 className="card-title">{service.name}</h2>
                <p>{service.description}</p>
                <div className="card-actions justify-between items-center my-2">
                  <div className="text-xl font-bold text-[#F63E7B]">
                    ${service.price}
                  </div>
                  <Link
                    to="/booking"
                    state={{ service }} // Pass service data to the booking page
                    className="bg-pink-600 text-white p-2 rounded-md btn"
                  >
                    Book Now
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Services;
