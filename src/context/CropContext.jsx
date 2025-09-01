// src/context/CropContext.jsx

import React, { createContext, useState, useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';
import cropsData from "../data/crops.json"; // Make sure this path is correct

// 1. Create the context
const CropContext = createContext();

// 2. Create a custom hook for easy access to the context
export const useCrops = () => useContext(CropContext);

// 3. Create the Provider component
export const CropProvider = ({ children }) => {
  // --- All the logic from App.jsx is now here ---

  const [crops, setCrops] = useState(
    (cropsData || []).map((c) => ({
      ...c,
      barcode: c.barcode || uuidv4(),
    }))
  );

  const handleAddCrop = (newCrop) => {
    setCrops((prev) => [
      ...prev,
      {
        id: Date.now(),
        barcode: newCrop.barcode || uuidv4(),
        ...newCrop,
      },
    ]);
  };

  const handleDeleteCrop = (cropId) => {
    setCrops((prev) => prev.filter((crop) => crop.id !== cropId));
  };

  const handleUpdateCrop = (updatedCrop) => {
    setCrops((prev) =>
      prev.map((c) => (c.id === updatedCrop.id ? { ...c, ...updatedCrop } : c))
    );
  };

  // --- End of logic from App.jsx ---

  // Bundle the state and functions into a single value object
  const value = {
    crops,
    addCrop: handleAddCrop,
    deleteCrop: handleDeleteCrop,
    updateCrop: handleUpdateCrop,
  };

  return <CropContext.Provider value={value}>{children}</CropContext.Provider>;
};