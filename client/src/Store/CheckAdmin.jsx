/*eslint-disable */
import axiosInstance from "../Services/axiosInstance";

const CheckAdmin = async () => {
  const token = localStorage.getItem("token");

  try {
    const response = await axiosInstance.get("/check-admin");

    return response.data.isAdmin;
  } catch (error) {
    // console.error("Error checking admin status:", error);
    return [false];
  }
};

export default CheckAdmin;
