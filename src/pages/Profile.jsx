import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Edit2, UserPlus, Image, X, Heart, MessageCircle } from "lucide-react";

export default function Profile() {
  const [user, setUser] = useState({
    name: "Sawan Yaduvanshi",
    username: "@sawanyadav",
    bio: "Engineering Student at Chandigarh University | Loves coding 💻 & coffee ☕",
    avatar: "https://i.pravatar.cc/200?img=12",
    friends: 320,
    posts: 9,
  });

  const [editMode, setEditMode] = useState(false);
  const [editedUser, setEditedUser] = useState(user);
  const [selectedPost, setSelectedPost] = useState(null);

  const handleSave = () => {
    setUser(editedUser);
    setEditMode(false);
  };

  // 🎓 Academic / Study-Themed Posts
  const fakePosts = [
    {
      id: 1,
      img: "https://images.unsplash.com/photo-1553729459-efe14ef6055d", // laptop + coffee
      caption: "Late-night coding session ☕💻 #StudentLife",
      likes: 128,
      comments: 18,
    },
    {
      id: 2,
      img: "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b", // books & notes
      caption: "Organizing my semester notes 📚✨",
      likes: 155,
      comments: 22,
    },
    {
      id: 3,
      img: "https://images.unsplash.com/photo-1513258496099-48168024aec0", // classroom / lecture
      caption: "Attending an interesting lecture on AI 🤖",
      likes: 112,
      comments: 16,
    },
    {
      id: 4,
      img: "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1f3", // laptop + code
      caption: "Building my first React project 🚀",
      likes: 174,
      comments: 30,
    },
    {
      id: 5,
      img: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b", // study desk
      caption: "Study goals for the week ✅",
      likes: 139,
      comments: 11,
    },
    {
      id: 6,
      img: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f", // friends studying
      caption: "Group study session 📖👩‍💻",
      likes: 189,
      comments: 24,
    },
    {
      id: 7,
      img: "https://images.unsplash.com/photo-1596495577886-d920f1fb7238", // library
      caption: "Peaceful evening in the CU library 📚💜",
      likes: 210,
      comments: 26,
    },
    {
      id: 8,
      img: "https://images.unsplash.com/photo-1584697964192-3c351ba6c4e5", // coding setup
      caption: "Working on my final year project 👨‍💻",
      likes: 165,
      comments: 19,
    },
    {
      id: 9,
      img: "https://images.unsplash.com/photo-1522202222206-0ec76d39e6b8", // teamwork
      caption: "Teamwork makes the dream work 🙌",
      likes: 233,
      comments: 37,
    },
  ];

  return (
    <motion.div
      className="min-h-[85vh] bg-gradient-to-br from-purple-900 via-black to-purple-950 text-white flex flex-col items-center p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* Profile Header */}
      <div className="flex flex-col items-center mb-6">
        <motion.img
          src={user.avatar}
          alt="Profile"
          className="w-28 h-28 rounded-full border-4 border-purple-500 shadow-lg mb-4"
          whileHover={{ scale: 1.1 }}
        />
        <h2 className="text-2xl font-semibold">{user.name}</h2>
        <p className="text-purple-300">{user.username}</p>
        <p className="text-sm text-gray-400 text-center max-w-md mt-2">
          {user.bio}
        </p>

        <div className="flex justify-center gap-8 mt-4">
          <div className="text-center">
            <p className="text-xl font-bold">{user.posts}</p>
            <p className="text-sm text-gray-400">Posts</p>
          </div>
          <div className="text-center">
            <p className="text-xl font-bold">{user.friends}</p>
            <p className="text-sm text-gray-400">Friends</p>
          </div>
        </div>

        <div className="flex gap-3 mt-5">
          <button
            onClick={() => setEditMode(true)}
            className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-xl text-sm transition-all"
          >
            <Edit2 size={16} /> Edit Profile
          </button>
          <button className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-xl text-sm transition-all">
            <UserPlus size={16} /> Add Friend
          </button>
        </div>
      </div>

      {/* Posts Grid */}
      <div className="w-full max-w-3xl grid grid-cols-3 gap-3">
        {fakePosts.map((post) => (
          <motion.div
            key={post.id}
            whileHover={{ scale: 1.05 }}
            className="relative overflow-hidden rounded-xl cursor-pointer"
            onClick={() => setSelectedPost(post)}
          >
            <img
              src={post.img}
              alt="Post"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 flex items-center justify-center transition-all">
              <Image className="text-white" size={24} />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Post Detail Modal */}
      <AnimatePresence>
        {selectedPost && (
          <motion.div
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-gray-900 p-6 rounded-2xl shadow-lg w-[90%] max-w-lg border border-purple-700 relative"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
            >
              <button
                className="absolute top-3 right-3 text-gray-400 hover:text-white"
                onClick={() => setSelectedPost(null)}
              >
                <X size={22} />
              </button>

              <img
                src={selectedPost.img}
                alt="Post detail"
                className="rounded-xl mb-3"
              />
              <p className="text-sm text-purple-300 italic">
                {selectedPost.caption}
              </p>
              <div className="flex items-center gap-5 mt-3 text-gray-300">
                <div className="flex items-center gap-2">
                  <Heart className="text-red-500" /> {selectedPost.likes}
                </div>
                <div className="flex items-center gap-2">
                  <MessageCircle /> {selectedPost.comments}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Edit Profile Modal */}
      {editMode && (
        <motion.div
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div
            className="bg-gray-900 p-6 rounded-2xl shadow-lg w-[90%] max-w-md border border-purple-800"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Edit Profile</h3>
              <button
                onClick={() => setEditMode(false)}
                className="text-gray-400 hover:text-white"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex flex-col gap-3">
              <input
                type="text"
                placeholder="Name"
                value={editedUser.name}
                onChange={(e) =>
                  setEditedUser({ ...editedUser, name: e.target.value })
                }
                className="bg-gray-800 border border-purple-700 rounded-lg px-3 py-2 text-white"
              />
              <input
                type="text"
                placeholder="Username"
                value={editedUser.username}
                onChange={(e) =>
                  setEditedUser({ ...editedUser, username: e.target.value })
                }
                className="bg-gray-800 border border-purple-700 rounded-lg px-3 py-2 text-white"
              />
              <textarea
                placeholder="Bio"
                value={editedUser.bio}
                onChange={(e) =>
                  setEditedUser({ ...editedUser, bio: e.target.value })
                }
                className="bg-gray-800 border border-purple-700 rounded-lg px-3 py-2 text-white resize-none"
                rows={3}
              ></textarea>

              <button
                onClick={handleSave}
                className="mt-3 bg-purple-600 hover:bg-purple-700 py-2 rounded-lg"
              >
                Save Changes
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
}