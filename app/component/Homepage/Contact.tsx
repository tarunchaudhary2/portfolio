"use client";
import React, { useState, useEffect } from "react";
import { Send, Mail, Phone, MapPin } from "lucide-react";
import emailjs from "@emailjs/browser";

const Contact = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  // Initialize EmailJS
  useEffect(() => {
    emailjs.init(process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "");
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const response = await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "service_r7zwf18",
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "template_9w7995h",
        {
          title: formData.subject,   // goes to {{title}}
          name: formData.fullName,   // goes to {{name}}
          email: formData.email,     // goes to {{email}}
          message: formData.message, // goes to {{message}}
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "Dlm1taV1AOWF7slKI"
      );

      console.log("Email sent successfully:", response);
      setSubmitted(true);

      setTimeout(() => {
        setFormData({
          fullName: "",
          email: "",
          subject: "",
          message: "",
        });
        setSubmitted(false);
      }, 3000);
    } catch (err) {
      console.error("Failed to send email:", err);
      setError("Failed to send message. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="bg-black min-h-screen w-full flex items-center justify-center py-16 px-4"
      id="contact"
    >
      <div className="relative w-full max-w-6xl">
        {/* Blurred circles */}
        <div className="absolute top-20 left-20 w-64 h-64 bg-purple-600 rounded-full filter blur-3xl opacity-20"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-blue-600 rounded-full filter blur-3xl opacity-20"></div>

        {/* Contact card */}
        <div className="relative backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl p-8 shadow-2xl">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-white mb-2">Get In Touch</h2>
            <div className="w-24 h-1 bg-purple-500 mx-auto"></div>
          </div>

          <div className="flex flex-col md:flex-row gap-20">
            {/* Left: Contact Details */}
            <div className="flex-1 space-y-6 text-white">
              <div>
                <h3 className="text-xl font-semibold mb-2">Contact Info</h3>
                <p className="text-gray-300">
                  Feel free to reach out using any of the methods below.
                </p>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-purple-400" />
                  <span>Naujheel, Bajna, Mathura, Uttar Pradesh - 281203</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-purple-400" />
                  <span>+91 7983906265</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-purple-400" />
                  <span>imtarunchaudhary2@gmail.com</span>
                </div>
              </div>
            </div>

            {/* Right: Form */}
            <div className="flex-1">
              {submitted ? (
                <div className="text-center py-12 px-4">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/20 mb-6">
                    <svg
                      className="w-8 h-8 text-green-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    Message Sent!
                  </h3>
                  <p className="text-gray-300">
                    Thanks for reaching out. I'll get back to you soon.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {error && (
                    <div className="p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-300 text-sm">
                      {error}
                    </div>
                  )}

                  <input
                    type="text"
                    name="fullName"
                    placeholder="Full Name"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                  />
                  <input
                    type="text"
                    name="subject"
                    placeholder="Subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                  />
                  <textarea
                    name="message"
                    placeholder="Message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition resize-none"
                  ></textarea>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-4 rounded-lg font-medium transition flex items-center justify-center ${
                      isSubmitting
                        ? "bg-purple-700/50 cursor-wait"
                        : "bg-purple-600 hover:bg-purple-700"
                    }`}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center">
                        <svg
                          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 
                               0 5.373 0 12h4zm2 
                               5.291A7.962 7.962 0 014 
                               12H0c0 3.042 1.135 5.824 
                               3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Processing...
                      </span>
                    ) : (
                      <span className="flex items-center">
                        Send Message <Send size={18} className="ml-2" />
                      </span>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Reflection effect */}
        <div className="absolute inset-x-0 -bottom-4 mx-auto w-5/6 h-1 bg-white/20 rounded-full filter blur-sm"></div>
        <div className="absolute inset-x-0 -bottom-6 mx-auto w-4/6 h-1 bg-white/10 rounded-full filter blur-sm"></div>
      </div>
    </div>
  );
};

export default Contact;
