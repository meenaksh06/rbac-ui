import React, { useState } from "react";
import { useAppContext } from "../context/AppContext";

const Dashboard = () => {
  const { posts, setPosts, setCurrentView } = useAppContext();

  const [isPostModalOpen, setIsPostModalOpen] = useState(false);

  const [postForm, setPostForm] = useState({ title: "", description: "", index: null });

  const handleLogout = () => setCurrentView("login");

  const handleSavePost = () => {
    if (postForm.title.trim() && postForm.description.trim()) {
      if (postForm.index !== null) {

        const updatedPosts = posts.map((post, index) =>
          index === postForm.index ? { title: postForm.title, description: postForm.description } : post
        );
        setPosts(updatedPosts);
      } else {
        setPosts([...posts, { title: postForm.title, description: postForm.description }]);
        alert("Post added successfully!");
      }
      setPostForm({ title: "", description: "", index: null });
      setIsPostModalOpen(false);
    }
  };

  const openEditModal = (index) => {
    setPostForm({ ...posts[index], index });
    setIsPostModalOpen(true);
  };

  const handleDeletePost = (index) => {
    const updatedPosts = posts.filter((_, postIndex) => postIndex !== index);
    setPosts(updatedPosts);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-600 text-white py-4 px-6 flex flex-col md:flex-row justify-between items-center shadow-md">
        <h1 className="text-2xl font-bold mb-2 md:mb-0">Admin Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-white text-blue-600 px-4 py-2 rounded-md shadow hover:bg-gray-100"
        >
          Logout
        </button>
      </header>

      <main className="p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-700 mb-4 sm:mb-0">Your Posts</h2>
          <button
            onClick={() => setIsPostModalOpen(true)}
            className="bg-blue-600 text-white px-6 py-2 rounded-md shadow hover:bg-blue-700"
          >
            Add New Post
          </button>
        </div>
        {posts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {posts.map((post, index) => (
              <div
                key={index}
                className="bg-blue-50 border border-blue-200 p-4 rounded-lg shadow hover:shadow-md transition"
              >
                <h3 className="text-lg font-bold text-blue-600">{post.title}</h3>
                <p className="text-gray-800 mt-2">{post.description}</p>
                <div className="mt-4 flex gap-2">
                  <button
                    onClick={() => openEditModal(index)}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeletePost(index)}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg shadow hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center">No posts available. Add one now!</p>
        )}
      </main>

      {isPostModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 transition">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md mx-4">
            <h2 className="text-2xl font-bold text-blue-600 mb-4">
              {postForm.index !== null ? "Edit Post" : "Add Post"}
            </h2>
            <input
              type="text"
              placeholder="Title"
              className="w-full px-4 py-2 border mb-4 rounded-lg focus:outline-blue-500"
              value={postForm.title}
              onChange={(e) => setPostForm({ ...postForm, title: e.target.value })}
            />
            <textarea
              placeholder="Description"
              className="w-full px-4 py-2 border mb-4 rounded-lg focus:outline-blue-500"
              value={postForm.description}
              onChange={(e) => setPostForm({ ...postForm, description: e.target.value })}
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={handleSavePost}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700"
              >
                {postForm.index !== null ? "Update Post" : "Add Post"}
              </button>
              <button
                onClick={() => setIsPostModalOpen(false)}
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg shadow hover:bg-gray-400"
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

export default Dashboard;




