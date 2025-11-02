import React, { useState, useEffect } from "react";

// 1. Accept 'initialData' prop to handle both "Add" and "Edit"
const AddMissingPersonModal = ({ onClose, onAdd, initialData = null }) => {
  // 2. Determine if we are in "edit mode"
  const isEditMode = initialData !== null;

  const [formData, setFormData] = useState({
    name: "",
    age: "",
    lastSeen: "",
    description: "",
    contact: "",
    image: null,
    status: "Missing", // 3. Added 'status' to the form state
  });

  const [preview, setPreview] = useState(null);

  // 4. Pre-fill the form if 'initialData' is provided
  useEffect(() => {
    if (isEditMode) {
      // Set all form data from the person object
      setFormData({
        name: initialData.name || "",
        age: initialData.age || "",
        lastSeen: initialData.lastSeen || "",
        description: initialData.description || "",
        contact: initialData.contact || "",
        image: initialData.image || null,
        status: initialData.status || "Missing",
      });

      // Handle the image preview
      if (initialData.image) {
        if (initialData.image instanceof File) {
          setPreview(URL.createObjectURL(initialData.image));
        } else if (typeof initialData.image === 'string') {
          // If the image is a URL string (from a database)
          setPreview(initialData.image);
        }
      }
    }
  }, [initialData, isEditMode]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file });
      if (preview) {
        URL.revokeObjectURL(preview); // Clean up old preview
      }
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.contact) return;

    // 5. Differentiate between adding a new person and updating one
    if (isEditMode) {
      // Pass back the full object, including the original ID
      onAdd({ ...initialData, ...formData });
    } else {
      // Create a new person with a new ID
      onAdd({ ...formData, id: Date.now() });
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      {/* 6. Increased max-height and added overflow-y-auto for long forms */}
      <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl p-8 relative max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-5 text-gray-500 hover:text-gray-700 text-xl"
        >
          ✕
        </button>

        {/* Header */}
        {/* 7. Dynamic title based on mode */}
        <h2 className="text-2xl font-semibold text-gray-900">
          {isEditMode ? "Update Person Status" : "Add Missing Person Details"}
        </h2>
        <p className="text-gray-500 mt-1 mb-6">
          {isEditMode
            ? "Update the status of this individual."
            : "Fill in the details to help with identification and search efforts."}
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name & Age */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                placeholder="Enter full name"
                value={formData.name}
                onChange={handleChange}
                // 8. Make fields read-only in edit mode
                readOnly={isEditMode}
                className={`w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  isEditMode ? "bg-gray-100" : ""
                }`}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Age <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="age"
                placeholder="Enter age"
                value={formData.age}
                onChange={handleChange}
                readOnly={isEditMode}
                className={`w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  isEditMode ? "bg-gray-100" : ""
                }`}
                required
              />
            </div>
          </div>

          {/* Last Seen Location */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Last Seen Location <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="lastSeen"
              placeholder="Enter last known location"
              value={formData.lastSeen}
              onChange={handleChange}
              readOnly={isEditMode}
              className={`w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                isEditMode ? "bg-gray-100" : ""
              }`}
              required
            />
          </div>

          {/* Physical Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Physical Description <span className="text-red-500">*</span>
            </label>
            <textarea
              name="description"
              placeholder="Describe clothing, physical features, etc."
              value={formData.description}
              onChange={handleChange}
              rows="3"
              readOnly={isEditMode}
              className={`w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none ${
                isEditMode ? "bg-gray-100" : ""
              }`}
              required
            ></textarea>
          </div>

          {/* Contact */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Contact Information <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="contact"
              placeholder="Enter contact number"
              value={formData.contact}
              onChange={handleChange}
              readOnly={isEditMode}
              className={`w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                isEditMode ? "bg-gray-100" : ""
              }`}
              required
            />
          </div>

          {/* 9. Status Dropdown - ONLY shows in Edit Mode */}
          {isEditMode && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Update Status <span className="text-red-500">*</span>
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              >
                <option value="Missing">Missing</option>
                <option value="Found Safe">Found Safe</option>
                <option value="Deceased">Deceased</option>
              </select>
            </div>
          )}

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Upload Photo
            </label>
            <div className="flex items-center gap-4">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                disabled={isEditMode} // Disable new uploads in edit mode
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {preview && (
                <img
                  src={preview}
                  alt="Preview"
                  className="w-16 h-16 rounded-md object-cover border border-gray-300"
                />
              )}
            </div>
            {isEditMode && (
              <p className="text-xs text-gray-500 mt-1">
                Photo cannot be changed in edit mode.
              </p>
            )}
          </div>

          {/* Buttons */}
          <div className="flex justify-end space-x-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-blue-700 text-white font-semibold rounded-md hover:bg-blue-800 transition-all"
            >
              {/* 10. Dynamic button text */}
              {isEditMode ? "Update Status" : "Submit Report"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddMissingPersonModal;   