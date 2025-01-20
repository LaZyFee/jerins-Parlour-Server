import { Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast"; // Import toast library

// Placeholder image for services with no image
const placeholderImage = "https://via.placeholder.com/300x200?text=No+Image";

function ManageService() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedService, setSelectedService] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch services from the backend
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

  // Function to open the modal and store the service ID to be deleted
  const handleDeleteClick = (serviceId) => {
    setSelectedService(serviceId);
    setIsModalOpen(true); // Open the modal when delete is clicked
  };

  // Function to remove a service
  const removeService = () => {
    if (!selectedService) return; // Ensure there's a selected service ID
    axios
      .delete(`/removeService/${selectedService}`)
      .then((response) => {
        if (response.data.service) {
          toast.success("Service deleted successfully");
          setServices((prevServices) =>
            prevServices.filter((service) => service._id !== selectedService)
          );
        } else {
          toast.error("Failed to delete service");
        }
        setIsModalOpen(false); // Close the modal
      })
      .catch((error) => {
        console.error("Error deleting service:", error);
        toast.error("An error occurred while deleting the service");
        setIsModalOpen(false); // Close the modal even if error occurs
      });
  };

  const cancelDelete = () => {
    setIsModalOpen(false); // Close the modal without deleting
  };

  // Loading skeleton
  if (loading) {
    return (
      <div className="flex w-52 flex-col gap-4 items-center justify-center">
        <div className="flex items-center gap-4">
          <div className="skeleton h-16 w-16 shrink-0 rounded-full"></div>
          <div className="flex flex-col gap-4">
            <div className="skeleton h-4 w-20"></div>
            <div className="skeleton h-4 w-28"></div>
          </div>
        </div>
        <div className="skeleton h-32 w-full"> </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-5 bg-white">
      <h1 className="text-3xl font-bold text-center">All Services</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mx-auto lg:mx-10">
        {services.map((service) => (
          <div key={service._id}>
            <div className="card  lg:w-76 shadow-xl">
              <figure>
                <img
                  src={
                    service.image
                      ? `${import.meta.env.VITE_API_URL}/${service.image}`
                      : placeholderImage
                  }
                  alt={service.name || "Service Image"}
                  className="w-full h-56 object-cover"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{service.name}</h2>
                <p className="text-sm text-start">{service.description}</p>
                <p className="text-xl font-bold text-start">${service.price}</p>
                <div className="card-actions justify-end">
                  <button
                    onClick={() => handleDeleteClick(service._id)}
                    className="bg-pink-600 text-white p-2 rounded-md btn"
                  >
                    Remove?
                  </button>
                  <Link
                    to="/admin/dashboard/update-service"
                    state={{ service }}
                  >
                    {" "}
                    <button className="bg-pink-600 text-white p-2 rounded-md btn">
                      Update?
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Custom Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="card bg-neutral text-neutral-content w-96 p-4 rounded-lg">
            <div className="card-body items-center text-center">
              <h2 className="card-title text-white">Are You Sure?</h2>
              <p className="text-gray-300">
                Once you delete this service, it cannot be undone.
              </p>
              <div className="card-actions justify-end mt-4">
                <button onClick={removeService} className="btn btn-primary">
                  Accept
                </button>
                <button onClick={cancelDelete} className="btn btn-ghost">
                  Deny
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ManageService;
