/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { createClient } from "@supabase/supabase-js";
import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import emailjs from "@emailjs/browser";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

type Contact = {
  name: string;
  message: string;
  service: string;
  email: string;
  phone_number?: number;
  telegram_id?: string;
  due: string;
};

type Service = {
  id: number;
  name: string;
};

export default function ContactForm() {
  const [formData, setFormData] = useState<Contact>({
    name: "",
    message: "",
    service: "",
    email: "",
    phone_number: undefined,
    telegram_id: "",
    due: "",
  });

  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dueDate, setDueDate] = useState<Date | null>(null);

  // Fetch services list from Supabase
  useEffect(() => {
    const fetchServices = async () => {
      const { data, error } = await supabase
        .from("services")
        .select("id, name");
      if (error) {
        console.error("Error fetching services:", error.message);
      } else {
        setServices(data || []);
      }
    };
    fetchServices();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "phone_number" ? (value ? Number(value) : undefined) : value,
    }));
  };

  const handleDateChange = (date: Date | null) => {
    setDueDate(date);
    setFormData((prev) => ({
      ...prev,
      due: date ? date.toLocaleDateString("en-GB") : "",
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Save to Supabase
      const { error: supabaseError } = await supabase
        .from("contacts")
        .insert([formData]);
      if (supabaseError) throw supabaseError;

      // Send email via EmailJS
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        {
          name: formData.name,
          email: formData.email,
          service: formData.service,
          phone_number: formData.phone_number ?? "N/A",
          telegram_id: formData.telegram_id ?? "N/A",
          due: formData.due || "N/A",
          message: formData.message,
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      );

      setSubmitted(true);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-3 sm:px-4 md:px-6 mt-4 sm:mt-6 mb-8 sm:mb-14"
      style={{ backgroundColor: "rgb(25, 26, 28)", color: "#dfe4ed" }}
    >
      <div
        className="w-full max-w-sm sm:max-w-md md:max-w-lg rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 shadow-2xl"
        style={{ background: "linear-gradient(145deg, #000b1f, #00050f)" }}
      >
        <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-8 tracking-wide">
          Quote Your Desire
        </h1>

        {submitted ? (
          <div className="text-center py-8">
            <div className="text-4xl mb-4">✅</div>
            <p className="text-green-400 font-medium text-sm sm:text-base">
              Thank you! Your request has been submitted.
            </p>
            <p className="text-gray-400 text-xs sm:text-sm mt-2">
              We will get back to you soon.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
            {/* Name */}
            <div>
              <label className="block text-xs sm:text-sm mb-1 sm:mb-2">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="e.g., John Doe"
                className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg border border-gray-700 outline-none focus:ring-2 focus:ring-blue-500 transition text-sm sm:text-base"
                style={{ backgroundColor: "#00050f", color: "#dfe4ed" }}
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs sm:text-sm mb-1 sm:mb-2">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="e.g., john.doe@example.com"
                className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg border border-gray-700 outline-none focus:ring-2 focus:ring-blue-500 transition text-sm sm:text-base"
                style={{ backgroundColor: "#00050f", color: "#dfe4ed" }}
              />
            </div>

            {/* Service */}
            <div>
              <label className="block text-xs sm:text-sm mb-1 sm:mb-2">
                Requested Service
              </label>
              <select
                name="service"
                value={formData.service}
                onChange={handleChange}
                required
                className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg border border-gray-700 outline-none focus:ring-2 focus:ring-blue-500 transition text-sm sm:text-base"
                style={{ backgroundColor: "#00050f", color: "#dfe4ed" }}
              >
                <option value="">-- Select a service --</option>
                {services.map((service) => (
                  <option key={service.id} value={service.name}>
                    {service.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Phone + Telegram */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div>
                <label className="block text-xs sm:text-sm mb-1 sm:mb-2">
                  Phone Number (Optional)
                </label>
                <input
                  type="number"
                  name="phone_number"
                  value={formData.phone_number ?? ""}
                  onChange={handleChange}
                  placeholder="e.g., 0123456789"
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg border border-gray-700 outline-none focus:ring-2 focus:ring-blue-500 transition text-sm sm:text-base"
                  style={{ backgroundColor: "#00050f", color: "#dfe4ed" }}
                />
              </div>

              <div>
                <label className="block text-xs sm:text-sm mb-1 sm:mb-2">
                  Telegram ID (Optional)
                </label>
                <input
                  type="text"
                  name="telegram_id"
                  value={formData.telegram_id}
                  onChange={handleChange}
                  placeholder="e.g., @johndoe"
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg border border-gray-700 outline-none focus:ring-2 focus:ring-blue-500 transition text-sm sm:text-base"
                  style={{ backgroundColor: "#00050f", color: "#dfe4ed" }}
                />
              </div>
            </div>

            {/* Due Date */}
            <div>
              <label className="block text-xs sm:text-sm mb-1 sm:mb-2">
                Due Date
              </label>
              <DatePicker
                selected={dueDate}
                onChange={handleDateChange}
                dateFormat="dd-MM-yyyy"
                placeholderText="e.g., 15-09-2025"
                className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg border border-gray-700 bg-[#00050f] text-[#dfe4ed] outline-none focus:ring-2 focus:ring-blue-500 transition text-sm sm:text-base"
              />
            </div>

            {/* Message */}
            <div>
              <label className="block text-xs sm:text-sm mb-1 sm:mb-2">
                Message
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                placeholder="e.g., I need a modern portfolio website with booking features."
                rows={3}
                className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg border border-gray-700 outline-none resize-none focus:ring-2 focus:ring-blue-500 transition text-sm sm:text-base"
                style={{ backgroundColor: "#00050f", color: "#dfe4ed" }}
              />
            </div>

            {/* Error */}
            {error && (
              <div className="bg-red-900/20 border border-red-700/50 rounded-lg p-3">
                <p className="text-red-400 text-xs sm:text-sm">{error}</p>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 sm:py-3 rounded-lg font-semibold transition transform hover:scale-[1.02] active:scale-95 shadow-lg text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                background: "linear-gradient(90deg, #1d1f2f, #2b2f4c)",
                color: "#dfe4ed",
              }}
            >
              {loading ? "Submitting..." : "Submit Request"}
            </button>

            {/* Footer */}
            <p className="text-xs text-center mt-4 sm:mt-6 text-gray-400 leading-relaxed px-2">
              Kindly allow a few business days for us to review your request.
              We will reach out to you at the earliest opportunity.
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
