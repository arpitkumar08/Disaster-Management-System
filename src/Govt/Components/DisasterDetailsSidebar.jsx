import React from "react";
import { Home, Newspaper, Heart, Tent, Users, X } from "lucide-react"; // 1. Imported X icon

// 2. Added isOpen and onClose props
const DisasterDetailsSidebar = ({ active, setActive, isOpen, onClose }) => {
  const menuItems = [
    { id: "overview", label: "Overview", icon: <Home size={18} /> },
    { id: "news", label: "News", icon: <Newspaper size={18} /> },
    { id: "donations", label: "Donations", icon: <Heart size={18} /> },
    { id: "relief-camps", label: "Relief Camps", icon: <Tent size={18} /> },
    { id: "volunteers", label: "Volunteers", icon: <Users size={18} /> },
  ];

  return (
    <>
      {/* 3. Added overlay for mobile view. Closes sidebar on click. */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 md:hidden"
          onClick={onClose}
        ></div>
      )}

      {/* 4. Added responsive classes to the aside element */}
      <aside
        className={`w-64 min-h-screen bg-gradient-to-b from-blue-500 to-blue-700 text-white flex flex-col p-6 shadow-xl 
                    fixed top-0 left-0 h-screen z-50 
                    transition-transform duration-300 ease-in-out
                    ${isOpen ? "translate-x-0" : "-translate-x-full"}
                    md:relative md:translate-x-0 md:h-screen md:min-h-screen md:z-auto`}
      >
        {/* 5. Added a header with a close button (visible on mobile only) */}
        <div className="flex items-center justify-between mb-8 pb-3 border-b border-blue-400">
          <h2 className="text-2xl font-bold tracking-wide">Disaster Panel</h2>
          <button
            className="md:hidden p-1 rounded-full text-blue-200 hover:bg-blue-800/70"
            onClick={onClose}
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex flex-col space-y-3">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActive(item.id);
                onClose(); // 6. Close sidebar on item click (good mobile UX)
              }}
              className={`flex items-center gap-3 px-4 py-3 rounded-md font-medium transition-all duration-300 ${
                active === item.id
                  ? "bg-blue-900 shadow-lg scale-[1.02]"
                  : "hover:bg-blue-800/70"
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="mt-auto text-sm text-center text-blue-200 pt-6 border-t border-blue-400">
          © 2025 Disaster Management
        </div>
      </aside>
    </>
  );
};

export default DisasterDetailsSidebar;