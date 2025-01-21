/* eslint-disable no-unused-vars */
import { Link } from "react-router-dom";
import PrimaryButton from "../../../Components/PrimaryButton";
import { useEffect, useState } from "react";
import axios from "axios";
import Skeleton from "../../../Components/Skeleton";
import { apiUrl } from "../../../utils/config";

function ServiceSection() {
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

  // Display only 3 services
  const limitedServices = services?.slice(0, 3);

  return (
    <div className="py-5 bg-white">
      <h1 className="text-3xl my-5 font-bold text-center">
        Our Awesome <span className="text-[#F63E7B]">Services</span>
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mx-auto lg:mx-10">
        {loading ? (
          <Skeleton /> // Render Skeleton when loading
        ) : services.length === 0 ? (
          <p>No services available at the moment.</p> // Render message if no services are available
        ) : (
          Array.isArray(limitedServices) &&
          limitedServices.map((service) => (
            <div
              key={service._id}
              className="rounded-lg text-center transition-transform duration-300 ease-in-out transform hover:shadow-2xl hover:scale-105"
            >
              <div className="card bg-base-100 w-auto shadow-xl text-start">
                <figure>
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
                <div className="card-body">
                  <h2 className="card-title">
                    {service.name}
                    <div className="badge badge-secondary">NEW</div>
                  </h2>
                  <p>{service.description}</p>
                  <div className="card-actions justify-between items-center my-2">
                    <div className="  text-xl font-bold">${service.price}</div>
                    <Link
                      to="/booking"
                      state={{ service }} // Use state directly as a prop
                      className="bg-pink-600 text-white p-2 rounded-md btn"
                    >
                      Book Now
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="grid place-items-center my-4">
        <Link to="/services">
          <PrimaryButton>Explore More</PrimaryButton>
        </Link>
      </div>
    </div>
  );
}

export default ServiceSection;
