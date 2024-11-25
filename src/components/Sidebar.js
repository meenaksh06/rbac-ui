import React, { useState } from "react";
import { useAppContext } from "../context/AppContext";

const Sidebar = () => {
  const { setCurrentView, currentView } = useAppContext();
  const [isOpen, setIsOpen] = useState(true);

  const menuItems = [
    { name: "Main Dashboard", view: "dashboard" },
    { name: "Users", view: "users" },
    { name: "Roles", view: "roles" },
    { name: "Permissions", view: "permissions" },
  ];

  return (
    <div className="relative">
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-4 right-4 z-20 p-2 bg-blue-700 text-white rounded-md shadow-lg"
      >
        {isOpen ? "Close" : "Menu"}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-screen bg-blue-700 text-white p-4 z-10 transition-transform transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:w-64 w-64`}
      >
        <h2 className="text-2xl font-bold mb-8 text-center">
          Role Based Control System
        </h2>
        <ul className="space-y-4">
          {menuItems.map((item) => (
            <li
              key={item.view}
              className={`p-3 rounded-lg cursor-pointer ${
                currentView === item.view
                  ? "bg-white text-blue-700 font-bold shadow-md"
                  : "hover:bg-blue-600"
              }`}
              onClick={() => {
                setCurrentView(item.view);
                if (!isOpen) setIsOpen(false); // Close menu on small screens
              }}
            >
              {item.name}
            </li>
          ))}
        </ul>
      </aside>

      {/* Overlay for mobile view */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black bg-opacity-50 z-5 md:hidden"
        />
      )}
    </div>
  );
};

export default Sidebar;
