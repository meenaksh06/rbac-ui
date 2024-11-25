import React, { useState } from "react";
import { useAppContext } from "../context/AppContext";

const Roles = () => {
  const [newRole, setNewRole] = useState({
    name: "",
    description: "",
    permissions: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const { roles, setRoles } = useAppContext();

  const handleSaveRole = () => {
    if (!newRole.name || !newRole.description || !newRole.permissions) {
      alert("Please fill in all fields!");
      return;
    }

    if (isEditing) {
      const updatedRoles = roles.map((role, index) =>
        index === editIndex ? newRole : role
      );
      setRoles(updatedRoles);
    } else {
      setRoles([...roles, newRole]);
    }

    setNewRole({ name: "", description: "", permissions: "" });
    setIsModalOpen(false);
    setIsEditing(false);
    setEditIndex(null);
  };

  const handleDeleteRole = (index) => {
    setRoles(roles.filter((_, i) => i !== index));
  };

  const handleEditClick = (role, index) => {
    setNewRole(role);
    setIsModalOpen(true);
    setIsEditing(true);
    setEditIndex(index);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6">
      <header className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Role Management</h1>
        <p className="text-gray-600">Assign roles to different users easily.</p>
      </header>

      <div className="bg-white shadow rounded-lg p-4 sm:p-6">
        {/* Add Role Button */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-700">Roles List</h2>
          <button
            onClick={() => {
              setNewRole({ name: "", description: "", permissions: "" });
              setIsModalOpen(true);
              setIsEditing(false);
            }}
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition w-full sm:w-auto"
          >
            Add Role
          </button>
        </div>

        {/* Roles Table */}
        {roles.length > 0 ? (
          <div className="overflow-x-auto">
            <div className="space-y-4">
              {roles.map((role, index) => (
                <div
                  key={index}
                  className="p-4 bg-gray-50 rounded-lg border hover:bg-gray-100 transition"
                >
                  <div>
                    <p className="font-bold text-gray-800">Role Name:</p>
                    <p className="text-gray-600">{role.name}</p>
                  </div>
                  <div className="mt-2">
                    <p className="font-bold text-gray-800">Description:</p>
                    <p className="text-gray-600">{role.description}</p>
                  </div>
                  <div className="mt-2">
                    <p className="font-bold text-gray-800">Permissions:</p>
                    <p className="text-gray-600">{role.permissions}</p>
                  </div>
                  <div className="flex justify-end gap-2 mt-4">
                    <button
                      onClick={() => handleEditClick(role, index)}
                      className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteRole(index)}
                      className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <p className="text-center text-gray-500">
            No roles found. Add a new role to get started.
          </p>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4">
          <div className="bg-white w-full max-w-lg p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">
              {isEditing ? "Edit Role" : "Add Role"}
            </h2>
            <form className="space-y-4">
              <div>
                <label className="block text-gray-700">Role Name</label>
                <input
                  type="text"
                  value={newRole.name}
                  onChange={(e) =>
                    setNewRole({ ...newRole, name: e.target.value })
                  }
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter role name"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700">Description</label>
                <textarea
                  value={newRole.description}
                  onChange={(e) =>
                    setNewRole({ ...newRole, description: e.target.value })
                  }
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter role description"
                  rows={3}
                  required
                ></textarea>
              </div>
              <div>
                <label className="block text-gray-700">Permissions</label>
                <select
                  value={newRole.permissions}
                  onChange={(e) =>
                    setNewRole({ ...newRole, permissions: e.target.value })
                  }
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Select Permission</option>
                  <option value="Read">Read</option>
                  <option value="Write">Write</option>
                  <option value="Delete">Delete</option>
                  <option value="Admin">Admin</option>
                </select>
              </div>
            </form>
            <div className="flex flex-wrap justify-end mt-6 gap-4">
              <button
                onClick={handleSaveRole}
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition w-full sm:w-auto"
              >
                {isEditing ? "Save Changes" : "Add Role"}
              </button>
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition w-full sm:w-auto"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Roles;

