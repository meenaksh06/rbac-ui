import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';

const DynamicModal = ({ context, onClose }) => {
  const [inputValue, setInputValue] = useState('');
  const {
    posts,
    setPosts,
    users,
    setUsers,
    roles,
    setRoles,
    permissions,
    setPermissions,
  } = useAppContext();

  const handleSave = () => {
    if (inputValue.trim()) {
      switch (context) {
        case 'dashboard':
          setPosts([...posts, inputValue]);
          break;
        case 'users':
          setUsers([...users, inputValue]);
          break;
        case 'roles':
          setRoles([...roles, inputValue]);
          break;
        case 'permissions':
          setPermissions([...permissions, inputValue]);
          break;
        default:
          break;
      }
      onClose();
    } else {
      alert('Please enter a value!');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-md w-96">
        <h2 className="text-xl font-bold mb-4">
          Add {context.slice(0, -1)}
        </h2>
        <input
          type="text"
          placeholder={`Enter ${context.slice(0, -1)}`}
          className="w-full p-2 mb-4 border rounded"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 mr-2"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default DynamicModal;
