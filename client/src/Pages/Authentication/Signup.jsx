import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import PrimaryButton from "../../Components/PrimaryButton";
import { useAuth } from "../../Store/AuthStore";
import PasswordStrengthMeter from "./PasswordStrentghMeter";
import { IoCloudUploadOutline } from "react-icons/io5";

function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [signUpError, setSignUPError] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { signup, isLoading } = useAuth();

  const handleSignUp = async (data) => {
    const { name, username, email, phone, password, profilePic } = data;

    const formData = new FormData();
    formData.append("name", name);
    formData.append("username", username);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("password", password);
    formData.append("profilePic", profilePic[0]);

    try {
      await signup(formData);
      toast.success("Sign up successfully");
      navigate("/");
    } catch (error) {
      setSignUPError("Error signing up", error);
      toast.error("Error signing up", signUpError);
    }
  };

  return (
    <>
      <img
        src="public/assets/logo.png"
        alt="signup"
        className="w-1/3 text-center mx-auto"
      />
      <div className="flex w-full flex-col">
        <div className="hero my-10">
          <div className="flex-col border border-black p-4 lg:w-1/3">
            <h1 className="text-3xl font-bold">Create an account</h1>
            <div className="card w-full">
              <form className="card-body" onSubmit={handleSubmit(handleSignUp)}>
                <div className="form-control">
                  <input
                    type="text"
                    {...register("name", { required: "Name is required" })} // "name"
                    placeholder="Your Name"
                    className="w-full border-b border-gray-400 bg-transparent p-2 placeholder-gray-600"
                  />
                  {errors.name && (
                    <p className="text-red-500">{errors.name.message}</p>
                  )}
                </div>

                <div className="form-control">
                  <input
                    type="text"
                    {...register("username", {
                      required: "Username is required",
                    })} // "username"
                    placeholder="Username"
                    className="w-full border-b border-gray-400 bg-transparent p-2 placeholder-gray-600"
                  />
                  {errors.username && (
                    <p className="text-red-500">{errors.username.message}</p>
                  )}
                </div>

                <div className="form-control">
                  <input
                    type="email"
                    {...register("email", { required: "Email is required" })} // "email"
                    placeholder="Email"
                    className="w-full border-b border-gray-400 bg-transparent p-2 placeholder-gray-600"
                  />
                  {errors.email && (
                    <p className="text-red-500">{errors.email.message}</p>
                  )}
                </div>

                <div className="form-control">
                  <input
                    type="text"
                    {...register("phone", {
                      required: "Phone number is required",
                      pattern: {
                        value: /^[0-9]{11}$/,
                        message: "Phone number must be 11 digits",
                      },
                    })} // "phone"
                    placeholder="Phone Number"
                    className="w-full border-b border-gray-400 bg-transparent p-2 placeholder-gray-600"
                  />
                  {errors.phone && (
                    <p className="text-red-500">{errors.phone.message}</p>
                  )}
                </div>

                <div className="form-control">
                  <input
                    type="password"
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message: "Password must be 6 characters long",
                      },
                      pattern: {
                        value: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])/,
                        message:
                          "Password must have uppercase, number, and special characters",
                      },
                    })} // "password"
                    placeholder="Password"
                    className="w-full border-b border-gray-400 bg-transparent p-2 placeholder-gray-600"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} // Capture the password input
                  />
                  {errors.password && (
                    <p className="text-red-500">{errors.password.message}</p>
                  )}
                </div>

                {/* Render PasswordStrengthMeter only if password exists */}
                {password && <PasswordStrengthMeter password={password} />}

                <div>
                  {/* Custom file upload button */}
                  <label
                    htmlFor="profilePic"
                    className="btn bg-[#F63E7B] text-white w-full lg:w-1/2 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <IoCloudUploadOutline /> Upload Image
                  </label>

                  {/* Hidden file input */}
                  <input
                    type="file"
                    id="profilePic"
                    className="hidden"
                    {...register("profilePic", {
                      required: "Profile picture is required",
                    })}
                  />
                  {errors.profilePic && (
                    <p className="text-red-500">{errors.profilePic.message}</p>
                  )}
                </div>

                <div className="form-control mt-6 items-center">
                  <PrimaryButton type="submit" disabled={isLoading}>
                    {isLoading ? "Signing up..." : "Create an account"}
                  </PrimaryButton>
                </div>
              </form>

              <p className="text-center">
                Already have an account?{" "}
                <Link className="text-[#F63E7B]" to="/login">
                  Please Login
                </Link>
              </p>
            </div>
          </div>
        </div>
        <div className="divider w-1/2 mx-auto">OR</div>
        <div className="flex flex-col gap-5 place-items-center py-5">
          <div className="btn btn-outline btn-info rounded-xl text-xl  w-full lg:w-1/3 flex items-center justify-center">
            <img
              src="public/assets/icons/Group 573.png"
              alt="google icon"
              className="w-5 mr-2"
            />
            <span className="flex-1 text-center">Continue with Google</span>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signup;
