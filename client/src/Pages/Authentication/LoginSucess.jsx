import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Store/AuthStore";
import { toast } from "react-hot-toast";

function LoginSuccess() {
  const navigate = useNavigate();
  const { setToken, setUser } = useAuth();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");
    const user = JSON.parse(decodeURIComponent(urlParams.get("user") || "{}"));
    console.log("Token:", token, "User:", user);

    if (token && user) {
      setToken(token); // Save token to auth store
      setUser(user); // Save user info to auth store
      toast.success("Login successful");

      // Add a slight delay to ensure the state updates before redirecting
      setTimeout(() => {
        navigate("/"); // Redirect to homepage
      }, 200); // Adjust delay as needed
    } else {
      toast.error("Error logging in with Google");
      navigate("/login"); // Redirect back to login if no token/user info
    }
  }, [navigate, setToken, setUser]);

  return <div>Redirecting...</div>;
}

export default LoginSuccess;
