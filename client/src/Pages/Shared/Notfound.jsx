import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-primary">404</h1>
        <p className="text-2xl font-semibold mt-4 text-gray-800">
          Oops! The Requested Page not found.
        </p>
        <p className="text-md mt-2 text-gray-500">
          The page you’re looking for doesn’t exist.
        </p>
        <button
          onClick={handleGoBack}
          className="btn bg-[#F63E7B] px-8 py-2 text-white"
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default NotFound;
