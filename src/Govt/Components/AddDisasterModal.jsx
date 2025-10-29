import React, { useState } from "react";

const AddDisasterModal = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    date: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("New Disaster Added:", formData);
    alert("✅ Disaster added successfully!");
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/70 z-50 p-4 animate-fadeIn">
      {/* Modal Container */}
      <div className="bg-gradient-to-br from-blue-50 to-blue-100 shadow-2xl rounded-2xl w-full max-w-md p-6 relative border border-blue-300 transform transition-all scale-100 hover:scale-[1.02]">
        {/* Header */}
        <h2 className="text-2xl font-bold text-blue-700 mb-4 text-center">
          🆕 Add New Disaster
        </h2>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-5 text-gray-600 hover:text-red-600 text-2xl transition-colors"
        >
          ×
        </button>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-5 transition-all duration-200"
        >
          {/* Disaster Name */}
          <div className="group">
            <label className="block text-gray-800 font-medium mb-1">
              Disaster Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. Earthquake, Flood"
              className="w-full border-2 border-blue-300 rounded-lg p-3 focus:border-blue-600 focus:ring-2 focus:ring-blue-300 outline-none transition duration-200 bg-white"
              required
            />
          </div>

          {/* Location */}
          <div className="group">
            <label className="block text-gray-800 font-medium mb-1">
              Location
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Enter location"
              className="w-full border-2 border-blue-300 rounded-lg p-3 focus:border-blue-600 focus:ring-2 focus:ring-blue-300 outline-none transition duration-200 bg-white"
              required
            />
          </div>

          {/* Date */}
          <div className="group">
            <label className="block text-gray-800 font-medium mb-1">
              Date
            </label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full border-2 border-blue-300 rounded-lg p-3 focus:border-blue-600 focus:ring-2 focus:ring-blue-300 outline-none transition duration-200 bg-white"
              required
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border-2 border-gray-400 text-gray-700 rounded-md hover:bg-gray-100 hover:shadow transition-all duration-200"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-5 py-2 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 hover:shadow-lg transition-all duration-200"
            >
               Add Disaster
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddDisasterModal;
