import React, { useState, useEffect } from "react";
import "./EditCrop.css"; // 👈 You can style the popup here

const EditCrop = ({ crop, onSave, onClose }) => {
  const [formData, setFormData] = useState({ ...crop });

  // 👇 Update form if the selected crop changes
  useEffect(() => {
    setFormData({ ...crop });
  }, [crop]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      imageFile: e.target.files[0],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // If new image uploaded, update URL
    const imageUrl = formData.imageFile
      ? URL.createObjectURL(formData.imageFile)
      : formData.imageUrl;

    onSave({
      ...formData,
      imageUrl,
    });

    onClose(); // close popup
  };

  return (
    <div className="edit-crop-overlay">
      <div className="edit-crop-modal">
        <h2>Edit Crop</h2>
        <form onSubmit={handleSubmit} className="edit-crop-form">
          <div className="form-group">
            <label>Crop Name</label>
            <input
              type="text"
              name="name"
              value={formData.name || ""}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Crop Type</label>
            <input
              type="text"
              name="type"
              value={formData.type || ""}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Soil Type</label>
            <input
              type="text"
              name="soilType"
              value={formData.soilType || ""}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Pesticides</label>
            <input
              type="text"
              name="pesticides"
              value={formData.pesticides || ""}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Planted Date</label>
            <input
              type="date"
              name="plantedDate"
              value={formData.plantedDate || ""}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Harvest Date</label>
            <input
              type="date"
              name="harvestDate"
              value={formData.harvestDate || ""}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Location</label>
            <input
              type="text"
              name="location"
              value={formData.location || ""}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Upload Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
          </div>
          <div className="button-group">
            <button type="submit" className="save-btn">Save Changes</button>
            <button type="button" className="cancel-btn" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCrop;
