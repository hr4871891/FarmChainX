import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid"; // for unique ID
import "./AddCrop.css";
import logo from "../assets/logo.png";

const AddCrop = ({ onAddCrop }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    type: "",
    soilType: "",
    pesticides: "",
    plantedDate: "",
    harvestDate: "",
    location: "",
    imageFile: null,
  });

  // Handle text inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle image upload
  const handleImageChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      imageFile: e.target.files[0],
    }));
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.imageFile) {
      alert("Please upload an image.");
      return;
    }

    // Create a temporary URL for uploaded image
    const imageUrl = URL.createObjectURL(formData.imageFile);

    // Generate unique ID and barcode
    const newCrop = {
      id: uuidv4(), // unique ID
      ...formData,
      status: "Planned",
      imageUrl: imageUrl,
      barcode: uuidv4(), // unique barcode
    };

    // Send to parent (ProductPage or Dashboard)
    onAddCrop(newCrop);

    alert("New crop added successfully!");

    // Reset form after submission
    setFormData({
      name: "",
      type: "",
      soilType: "",
      pesticides: "",
      plantedDate: "",
      harvestDate: "",
      location: "",
      imageFile: null,
    });

    // Redirect to dashboard/home
    navigate("/");
  };

  return (
    <div className="add-crop-page-container">
      <div className="add-crop-box">
        <div className="logo-container">
          <img src={logo} alt="FarmChainX Logo" className="logo" />
        </div>
        <form className="add-crop-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Crop Name</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter crop name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="type">Crop Type</label>
            <input
              type="text"
              id="type"
              name="type"
              placeholder="e.g., Vegetables, Fruits"
              value={formData.type}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="soilType">Soil Type</label>
            <input
              type="text"
              id="soilType"
              name="soilType"
              placeholder="e.g., Clayey, Sandy"
              value={formData.soilType}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="pesticides">Pesticides</label>
            <input
              type="text"
              id="pesticides"
              name="pesticides"
              placeholder="e.g., Insecticide B"
              value={formData.pesticides}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="plantedDate">Planted Date</label>
            <input
              type="date"
              id="plantedDate"
              name="plantedDate"
              value={formData.plantedDate}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="harvestDate">Harvest Date</label>
            <input
              type="date"
              id="harvestDate"
              name="harvestDate"
              value={formData.harvestDate}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="location">Location</label>
            <input
              type="text"
              id="location"
              name="location"
              placeholder="e.g., 22.5726° N, 88.3639° E"
              value={formData.location}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="imageFile">Upload Image</label>
            <input
              type="file"
              id="imageFile"
              name="imageFile"
              accept="image/*"
              onChange={handleImageChange}
              required
            />
          </div>

          <button type="submit" className="add-crop-button">
            Add Crop
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCrop;
