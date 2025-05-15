"use client";

import React, { useState } from "react";
import { Mail, Phone, PhoneCall, MapPin } from "lucide-react";

export default function ContactUs() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const result = await res.json();
    if (result.success) {
      setStatus("Message sent!");
      setFormData({ name: "", email: "", message: "" });
    } else {
      setStatus("Something went wrong.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <div className="flex flex-col md:flex-row bg-white rounded-md shadow-xl overflow-hidden w-full max-w-4xl">
       
        <div className="bg-green-500 text-white p-8 md:w-1/2">
          <h2 className="text-2xl font-semibold mb-6">Contact Us</h2>
          <div className="space-y-4 text-sm">
            <div className="flex items-start space-x-3">
              <MapPin size={18} className="mt-1" />
              <p className="text-lg">
                32, Avenue ve Newyork<br />321994 Newyork
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <Mail size={18} />
              <p className="text-lg">hello@loremipsum.com</p>
            </div>
            <div className="flex items-center space-x-3">
              <Phone size={18} />
              <p className="text-lg">+91321617879</p>
            </div>

          </div>
        </div>

       
        <div className="p-8 md:w-1/2">
          <p className="text-gray-400 text-sm mb-6">Feel free to drop us a line below!</p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
              className="w-full px-4 py-2 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-green-300"
              required
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your Email"
              className="w-full px-4 py-2 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-green-300"
              required
            />
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="4"
              placeholder="Typing your message here..."
              className="w-full px-4 py-2 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-green-300"
              required
            />
            <button
              type="submit"
              className="bg-green-500 cursor-pointer text-white px-8 py-2 rounded-full hover:bg-green-600 transition"
            >
              SEND
            </button>
            {status && <p className="text-sm mt-2 text-gray-600">{status}</p>}
          </form>
        </div>
      </div>
    </div>
  );
}
