import React, { useState } from "react";
import { motion } from "framer-motion";

const items = [
  {
    id: 1,
    title: "MacBook Pro 2021",
    price: "₹1200/day",
    img: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800",
    desc: "High-performance M1 Pro MacBook, ideal for editing and coding.",
  },
  {
    id: 2,
    title: "Canon DSLR Camera",
    price: "₹800/day",
    img: "https://images.unsplash.com/photo-1519183071298-a2962be90b8e?w=800",
    desc: "Perfect for capturing your campus moments and projects.",
  },
  {
    id: 3,
    title: "iPad Air 5th Gen",
    price: "₹600/day",
    img: "https://images.unsplash.com/photo-1616415059554-66b5f2a793c8?w=800",
    desc: "Powerful tablet for note-taking and design work.",
  },
  {
    id: 4,
    title: "Bluetooth Speaker",
    price: "₹200/day",
    img: "https://images.unsplash.com/photo-1577985051167-489b21959a7d?w=800",
    desc: "Portable JBL speaker for parties and events.",
  },
];

export default function RentHub() {
  const [selected, setSelected] = useState(null);

  return (
    <div className="bg-gradient-to-br from-purple-900 via-black to-purple-950 text-white min-h-screen p-4">
      <h1 className="text-3xl font-bold text-center mb-6">🎒 Campus Rent Hub</h1>

      {selected ? (
        <motion.div
          className="max-w-md mx-auto bg-purple-800 rounded-2xl p-5 shadow-lg text-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <img
            src={selected.img}
            alt={selected.title}
            className="w-full h-56 object-cover rounded-lg mb-3"
          />
          <h2 className="text-2xl font-semibold mb-2">{selected.title}</h2>
          <p className="text-gray-300 mb-2">{selected.desc}</p>
          <p className="text-lg font-bold mb-4">{selected.price}</p>
          <div className="flex justify-center gap-3">
            <button
              onClick={() => alert("Item Rented Successfully ✅")}
              className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg"
            >
              Rent Now
            </button>
            <button
              onClick={() => alert("Item Purchased Successfully 💳")}
              className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg"
            >
              Buy Now
            </button>
          </div>
          <button
            onClick={() => setSelected(null)}
            className="mt-4 text-sm text-gray-300 hover:text-white underline"
          >
            ← Back to listings
          </button>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((item) => (
            <motion.div
              key={item.id}
              onClick={() => setSelected(item)}
              whileHover={{ scale: 1.05 }}
              className="bg-purple-800 rounded-2xl shadow-lg cursor-pointer overflow-hidden hover:shadow-purple-500/30 transition"
            >
              <img
                src={item.img}
                alt={item.title}
                className="w-full h-56 object-cover"
              />
              <div className="p-3">
                <h3 className="font-semibold text-lg">{item.title}</h3>
                <p className="text-gray-300 text-sm">{item.price}</p>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}