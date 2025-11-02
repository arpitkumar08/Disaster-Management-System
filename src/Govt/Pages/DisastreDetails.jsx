import React, { useState } from "react";
import { useParams } from "react-router-dom";
import DisasterDetailsSidebar from "../Components/DisasterDetailsSidebar";
import NewsSection from "../Components/NewsSection";
import AddMissingPersonModal from "../Components/AddMissingPersonModal";
import { Menu } from "lucide-react";

const DisasterDetails = () => {
  const { id } = useParams();
  const [activeSection, setActiveSection] = useState("overview");
  const [isModalOpen, setIsModalOpen] = useState(false); // For adding
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // 1. New state to track which person is being edited
  const [editingPerson, setEditingPerson] = useState(null);

  const [missingPersons, setMissingPersons] = useState([
    { id: 1, name: "Ravi Kumar", age: 35, lastSeen: "Guwahati, Assam", status: "Missing", contact: "9876543210" },
    { id: 2, name: "Anita Sharma", age: 28, lastSeen: "Tezpur, Assam", status: "Missing", contact: "9876543209" },
    { id: 3, name: "Manoj Das", age: 40, lastSeen: "Nagaon, Assam", status: "Found Safe", contact: "9823456789" },
  ]);

  const disasterName =
    id === "1"
      ? "Flood in Assam (2025)"
      : id === "2"
      ? "Earthquake in Gujarat (2025)"
      : id === "3"
      ? "Cyclone in Odisha (2025)"
      : "Disaster Details";

  const handleAddPerson = (newPerson) => {
    // Ensure new person has a unique ID (simple example)
    const personWithId = { ...newPerson, id: missingPersons.length + 1 };
    setMissingPersons([...missingPersons, personWithId]);
  };

  // 2. New function to handle the update
  const handleUpdatePerson = (updatedPerson) => {
    setMissingPersons(
      missingPersons.map((person) =>
        person.id === updatedPerson.id ? updatedPerson : person
      )
    );
    setEditingPerson(null); // Close the modal after update
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-100 to-blue-200">
      <button
        className="md:hidden fixed top-6 left-6 z-30 p-2 text-blue-600 bg-white rounded-full shadow-lg"
        onClick={() => setIsSidebarOpen(true)}
      >
        <Menu size={24} />
      </button>

      <DisasterDetailsSidebar
        active={activeSection}
        setActive={setActiveSection}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      <main className="flex-1 p-10">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-10 pt-12 md:pt-0">
          <div>
            <h1 className="text-3xl font-bold text-blue-800">{disasterName}</h1>
            <p className="text-gray-600 mt-2">
              Managing ongoing rescue operations and tracking missing individuals.
            </p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)} // This opens the ADD modal
            className="mt-4 sm:mt-0 bg-blue-700 text-white px-6 py-3 rounded-md font-semibold shadow-md hover:bg-blue-800 hover:shadow-lg transition-all"
          >
            + Add Missing Person
          </button>
        </div>

        {activeSection === "overview" && (
          <>
            <h2 className="text-2xl font-semibold text-blue-800 mb-6">
              Missing Persons
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {missingPersons.map((person) => (
                <div
                  key={person.id}
                  // 3. Added onClick and cursor-pointer to open the edit modal
                  onClick={() => setEditingPerson(person)}
                  className="bg-white border border-blue-300 rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-bold text-blue-700">
                      {person.name}
                    </h3>
                    <span
                      className={`text-xs font-semibold px-3 py-1 rounded-full ${
                        person.status === "Missing"
                          ? "bg-red-100 text-red-600"
                          : "bg-green-100 text-green-600"
                      }`}
                    >
                      {person.status}
                    </span>
                  </div>
                  <p className="text-gray-700 text-sm mb-1">Age: {person.age}</p>
                  <p className="text-gray-700 text-sm mb-1">
                    Last Seen: {person.lastSeen}
                  </p>
                  <p className="text-gray-700 text-sm">
                    Contact: {person.contact}
                  </p>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Other sections... */}
        {activeSection === "news" && <NewsSection />}
        {activeSection === "donations" && (
          <div className="text-gray-700 text-lg">💰 Donation details coming soon.</div>
        )}
        {activeSection === "relief-camps" && (
          <div className="text-gray-700 text-lg">🏕️ Relief camp info will be added.</div>
        )}
        {activeSection === "volunteers" && (
          <div className="text-gray-700 text-lg">🙋 Volunteer management section.</div>
        )}
      </main>

      {/* Modal for ADDING a new person */}
      {isModalOpen && (
        <AddMissingPersonModal
          onClose={() => setIsModalOpen(false)}
          onAdd={(newPerson) => {
            handleAddPerson(newPerson);
            setIsModalOpen(false); // Close modal on submit
          }}
        />
      )}

      {/* 4. Modal for EDITING an existing person */}
      {editingPerson && (
        <AddMissingPersonModal
          onClose={() => setEditingPerson(null)}
          onAdd={handleUpdatePerson} // Pass the update function
          initialData={editingPerson} // Pass the person's data to pre-fill
        />
      )}
    </div>
  );
};

export default DisasterDetails;