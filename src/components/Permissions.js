import React, { useState } from "react";
import { useAppContext } from "../context/AppContext";

const Permissions = () => {
  const [newPermission, setNewPermission] = useState({
    name: "",
    description: "",
    role: "",
    permissionType: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const { permissions, setPermissions } = useAppContext();

  const handleSavePermission = () => {
    if (!newPermission.name || !newPermission.description || !newPermission.role || !newPermission.permissionType) {
      alert("Please fill in all fields!");
      return;
    }

    if (isEditing) {
      const updatedPermissions = permissions.map((permission, index) =>
        index === editIndex ? newPermission : permission
      );
      setPermissions(updatedPermissions);
    } else {
      setPermissions([...permissions, newPermission]);
    }

    setNewPermission({ name: "", description: "", role: "", permissionType: "" });
    setIsModalOpen(false);
    setIsEditing(false);
    setEditIndex(null);
  };

  const handleDeletePermission = (index) => {
    setPermissions(permissions.filter((_, i) => i !== index));
  };

  const handleEditClick = (permission, index) => {
    setNewPermission(permission);
    setIsModalOpen(true);
    setIsEditing(true);
    setEditIndex(index);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6">
      <header className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Permission Management</h1>
        <p className="text-gray-600">Assign permissions to different roles easily.</p>
      </header>

      <div className="bg-white shadow rounded-lg p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-700">Permissions List</h2>
          <button
            onClick={() => {
              setNewPermission({ name: "", description: "", role: "", permissionType: "" });
              setIsModalOpen(true);
              setIsEditing(false);
            }}
            className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition w-full sm:w-auto"
          >
            Add Permission
          </button>
        </div>

        {permissions.length > 0 ? (
          <div className="space-y-4">
            {permissions.map((permission, index) => (
              <div
                key={index}
                className="p-4 bg-gray-50 rounded-lg border hover:bg-gray-100 transition"
              >
                <div>
                  <p className="font-bold text-gray-800">Permission Name:</p>
                  <p className="text-gray-600">{permission.name}</p>
                </div>
                <div className="mt-2">
                  <p className="font-bold text-gray-800">Description:</p>
                  <p className="text-gray-600">{permission.description}</p>
                </div>
                <div className="mt-2">
                  <p className="font-bold text-gray-800">Role:</p>
                  <p className="text-gray-600">{permission.role}</p>
                </div>
                <div className="mt-2">
                  <p className="font-bold text-gray-800">Permission Type:</p>
                  <p className="text-gray-600">{permission.permissionType}</p>
                </div>
                <div className="flex justify-end gap-2 mt-4">
                  <button
                    onClick={() => handleEditClick(permission, index)}
                    className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeletePermission(index)}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">
            No permissions found. Add a new permission to get started.
          </p>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4">
          <div className="bg-white w-full max-w-lg p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">
              {isEditing ? "Edit Permission" : "Add Permission"}
            </h2>
            <form className="space-y-4">
              <div>
                <label className="block text-gray-700">Permission Name</label>
                <input
                  type="text"
                  value={newPermission.name}
                  onChange={(e) =>
                    setNewPermission({ ...newPermission, name: e.target.value })
                  }
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter permission name"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700">Role</label>
                <select
                  value={newPermission.role}
                  onChange={(e) =>
                    setNewPermission({ ...newPermission, role: e.target.value })
                  }
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Select Role</option>
                  <option value="Admin">Admin</option>
                  <option value="User">User</option>
                  <option value="Editor">Editor</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-700">Permission Type</label>
                <select
                  value={newPermission.permissionType}
                  onChange={(e) =>
                    setNewPermission({ ...newPermission, permissionType: e.target.value })
                  }
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Select Permission</option>
                  <option value="Read">Read</option>
                  <option value="Write">Write</option>
                  <option value="Update">Update</option>
                  <option value="Delete">Delete</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-700">Description</label>
                <textarea
                  value={newPermission.description}
                  onChange={(e) =>
                    setNewPermission({ ...newPermission, description: e.target.value })
                  }
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter permission description"
                  rows={3}
                  required
                ></textarea>
              </div>
            </form>
            <div className="flex flex-wrap justify-end mt-6 gap-4">
              <button
                onClick={handleSavePermission}
                className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition w-full sm:w-auto"
              >
                {isEditing ? "Save Changes" : "Add Permission"}
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

export default Permissions;
