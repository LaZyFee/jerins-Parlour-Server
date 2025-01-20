/* eslint-disable no-unused-vars */
import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { IoCloudUploadOutline, IoTrashOutline } from "react-icons/io5";
import { useLocation, useNavigate } from "react-router-dom";

const placeholderImage = "https://via.placeholder.com/300x200?text=No+Image";

function UpdateService() {
  const location = useLocation();
  const { service } = location.state || {};
  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm();
  const [selectedImage, setSelectedImage] = useState(null);
  const [removeImage, setRemoveImage] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  const serviceId = service._id;

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("price", data.price);
    formData.append("description", data.description);

    // If a new image is selected and not marked for removal
    if (selectedImage && !removeImage) {
      formData.append("image", selectedImage);
    }

    // Flag indicating whether to remove the image
    formData.append("removeImage", removeImage);

    axios
      .put(`/updateService/${serviceId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(() => {
        toast.success("Service updated successfully");
        reset();
        setImagePreview(null);
        navigate("/admin/dashboard/manage-services");
      })
      .catch((err) => {
        toast.error("Failed to update service");
        console.error(err);
      });
  };

  // Handle file selection and preview generation
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      setImagePreview(URL.createObjectURL(file)); // Create preview for the selected file
    }
  };

  // Handle toggling image removal
  const handleRemoveImage = () => {
    setImagePreview(null); // Clear the image preview if removing the image
    setSelectedImage(null); // Clear selected image if removing the image
  };

  return (
    <div className="min-h-screen">
      <h1 className="text-3xl font-bold text-center my-4">Update Service</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col lg:flex-row gap-5 bg-white p-5 lg:p-10 rounded-lg min-h-72 lg:mx-10">
          {/* Left Column */}
          <div className="w-full lg:w-1/2 flex flex-col gap-4">
            <label className="text-gray-700 font-semibold">Current Image</label>
            <img
              src={
                service.image && !removeImage
                  ? `/${service.image}`
                  : placeholderImage
              }
              className="w-40 h-32 object-cover object-center"
              alt="Service"
            />

            <label htmlFor="name" className="text-gray-700 font-semibold">
              Service Name
            </label>
            <input
              id="name"
              type="text"
              className="input input-bordered w-full bg-white text-black"
              defaultValue={service.name}
              {...register("name", { required: true })}
            />

            <label htmlFor="price" className="text-gray-700 font-semibold">
              Service Price
            </label>
            <input
              id="price"
              type="number"
              className="input input-bordered w-full bg-white text-black"
              defaultValue={service.price}
              {...register("price", { required: true })}
            />

            <label
              htmlFor="description"
              className="text-gray-700 font-semibold"
            >
              Service Description
            </label>
            <textarea
              id="description"
              className="textarea textarea-bordered w-full min-h-[100px] max-h-[200px] resize-none bg-white"
              defaultValue={service.description}
              {...register("description", { required: true })}
            ></textarea>
          </div>

          {/* Right Column */}
          <div className="w-full lg:w-1/2 flex flex-col gap-4">
            <label className="text-gray-700 font-semibold">Update Image</label>
            {/* Custom file upload button */}
            <label
              htmlFor="image"
              className="btn bg-[#F63E7B] text-white lg:w-1/2 flex items-center justify-center gap-2 cursor-pointer"
            >
              <IoCloudUploadOutline /> Upload Image
            </label>

            {/* Hidden file input */}
            <input
              type="file"
              id="image"
              className="hidden"
              onChange={handleFileChange}
              disabled={removeImage} // Disable if image is set to be removed
            />

            {/* Image preview */}
            {imagePreview && (
              <div className="relative mt-4">
                <img
                  src={imagePreview}
                  alt="Selected"
                  className="w-40 h-36 object-cover rounded-lg"
                />
                <button
                  type="button"
                  className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600"
                  onClick={handleRemoveImage}
                >
                  <IoTrashOutline className="text-xl" />
                </button>
              </div>
            )}

            {/* Remove image option */}
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={removeImage}
                onChange={handleRemoveImage}
              />
              <span className="text-gray-700 font-semibold">Remove Image</span>
            </label>

            <div>
              <button
                type="submit"
                className="btn bg-[#F63E7B] px-8 py-2 text-white"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default UpdateService;
