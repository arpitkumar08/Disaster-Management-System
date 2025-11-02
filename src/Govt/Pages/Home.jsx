import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ Import navigation hook
import Header from "../Components/Header";
import DisasterCard from "../Components/DisasterCard";
import AddDisasterModal from "../Components/AddDisasterModal";

const Home = () => {
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate(); // ✅ Initialize navigate

    // Function to handle disaster card click
    const handleDisasterClick = (id) => {
        navigate(`/disaster/${id}`); // Redirect to details page
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-300">
            {/* Header */}
            <Header />

            {/* Dashboard Section */}
            <div className="max-w-7xl mx-auto mt-10 px-6 animate-fadeInUp">
                <div className="flex flex-col sm:flex-row items-center justify-between bg-white shadow-lg rounded-xl p-5 sm:p-6 border border-blue-200 transition-transform hover:scale-[1.01]">
                    {/* Left Content */}
                    <div className="text-center sm:text-left">
                        <h2 className="font-bold text-3xl text-blue-700 tracking-wide">
                            Government Dashboard
                        </h2>
                        <p className="text-gray-600 text-sm sm:text-base mt-2">
                            Monitor and manage disaster events across the country efficiently
                        </p>
                    </div>

                    {/* Add Button */}
                    <button
                        onClick={() => setShowModal(true)}
                        className="mt-4 sm:mt-0 bg-blue-600 text-white px-6 py-3 rounded-md font-semibold shadow-md hover:bg-blue-700 hover:shadow-lg transition-all duration-200"
                    >
                        + Add Disaster
                    </button>
                </div>

                {/* Disaster List */}
                <div className="mt-10 bg-white rounded-xl shadow-lg border border-blue-200 p-6 transition hover:shadow-xl">
                    <div className="flex ml-6 items-center gap-3">
                        <img src="/india.png" alt="indian-flag" className="h-8" />
                        <h3 className="text-xl font-bold text-blue-700 mb-1">
                            Active Disasters
                        </h3>
                    </div>

                    {/* Pass click handler to DisasterCard */}
                    <DisasterCard onClick={handleDisasterClick} />
                </div>
            </div>

            {/* Modal */}
            {showModal && <AddDisasterModal onClose={() => setShowModal(false)} />}
        </div>
    );
};

export default Home;
