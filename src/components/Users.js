import React, { useState } from "react";
import { useAppContext } from "../context/AppContext";

const Users = () => {
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
    status: "Active", // Default status
    role: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentUserIndex, setCurrentUserIndex] = useState(null);
  const { users, setUsers } = useAppContext();

  const handleAddUser = () => {
    if (
      newUser.name.trim() &&
      newUser.email.trim() &&
      newUser.password.trim() &&
      newUser.status &&
      newUser.role
    ) {
      setUsers([...users, newUser]);
      setNewUser({
        name: "",
        email: "",
        password: "",
        status: "Active",
        role: "",
      });
      setIsModalOpen(false);
    } else {
      alert("Please fill in all fields!");
    }
  };

  const handleEditUser = () => {
    if (
      newUser.name.trim() &&
      newUser.email.trim() &&
      newUser.password.trim() &&
      newUser.status &&
      newUser.role
    ) {
      const updatedUsers = [...users];
      updatedUsers[currentUserIndex] = newUser;
      setUsers(updatedUsers);
      setNewUser({
        name: "",
        email: "",
        password: "",
        status: "Active",
        role: "",
      });
      setIsEditModalOpen(false);
    } else {
      alert("Please fill in all fields!");
    }
  };

  const handleDeleteUser = (index) => {
    const updatedUsers = users.filter((_, i) => i !== index);
    setUsers(updatedUsers);
  };

  const openEditModal = (index) => {
    setCurrentUserIndex(index);
    setNewUser(users[index]);
    setIsEditModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">User Management</h1>
        <p className="text-gray-600">Add, edit, and manage users efficiently.</p>
      </header>

      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-700">Users List</h2>
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
          >
            Add User
          </button>
        </div>

        {users.length > 0 ? (
          <div className="space-y-4">
            {users.map((user, index) => (
              <div
                key={index}
                className="border rounded-lg p-4 bg-gray-50 hover:bg-gray-100 transition"
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">{user.name}</h3>
                  <div className="space-x-2">
                    <button
                      onClick={() => openEditModal(index)}
                      className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition text-xs sm:text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteUser(index)}
                      className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition text-xs sm:text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
                <div className="mt-2">
                  <p className="text-sm text-gray-600">
                    <span className="font-medium text-gray-800">Email:</span>{" "}
                    {user.email}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium text-gray-800">Role:</span>{" "}
                    {user.role}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium text-gray-800">Status:</span>{" "}
                    <span
                      className={`px-2 py-1 text-xs sm:text-sm rounded-full ${
                        user.status === "Active"
                          ? "bg-green-100 text-green-600"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {user.status}
                    </span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">
            No users found. Add a new user to get started.
          </p>
        )}
      </div>

      {(isModalOpen || isEditModalOpen) && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4">
          <div className="bg-white w-full max-w-lg p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">
              {isEditModalOpen ? "Edit User" : "Add User"}
            </h2>
            <form className="space-y-4">
              <div>
                <label className="block text-gray-700">Name</label>
                <input
                  type="text"
                  value={newUser.name}
                  onChange={(e) =>
                    setNewUser({ ...newUser, name: e.target.value })
                  }
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter user name"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700">Email</label>
                <input
                  type="email"
                  value={newUser.email}
                  onChange={(e) =>
                    setNewUser({ ...newUser, email: e.target.value })
                  }
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter email address"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700">Password</label>
                <input
                  type="password"
                  value={newUser.password}
                  onChange={(e) =>
                    setNewUser({ ...newUser, password: e.target.value })
                  }
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter password"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700">Role</label>
                <select
                  value={newUser.role}
                  onChange={(e) =>
                    setNewUser({ ...newUser, role: e.target.value })
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
                <label className="block text-gray-700">Status</label>
                <select
                  value={newUser.status}
                  onChange={(e) =>
                    setNewUser({ ...newUser, status: e.target.value })
                  }
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
            </form>
            <div className="flex flex-wrap justify-end mt-6 gap-4">
              <button
                onClick={isEditModalOpen ? handleEditUser : handleAddUser}
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
              >
                {isEditModalOpen ? "Save Changes" : "Add User"}
              </button>
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  setIsEditModalOpen(false);
                }}
                className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition"
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

export default Users;

