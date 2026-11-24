
"use client";

import { useState, type FormEvent } from "react";
import {
  submitClearanceEnquiry,
  type ClearanceEnquiry,
} from "@/lib/api";

const initialForm: ClearanceEnquiry = {
  name: "",
  email: "",
  phone: "",
  service_type: "vehicle_clearing",
  subject: "",
  message: "",
  shipment_origin: "",
  shipment_destination: "",
  cargo_description: "",
};

const fieldClass =
  "mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-[#0B1830] outline-none transition placeholder:text-slate-400 focus:border-[#D7B779] focus:ring-2 focus:ring-[#D7B779]/30";

export default function ClearanceForm() {
  const [form, setForm] = useState<ClearanceEnquiry>(initialForm);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  function updateField(
    field: keyof ClearanceEnquiry,
    value: string
  ) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setSuccess("");
    setError("");

    try {
      await submitClearanceEnquiry(form);

      setSuccess(
        "Your enquiry has been submitted successfully. Our team will contact you shortly."
      );
      setForm({ ...initialForm });
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-3xl border border-slate-200 bg-[#F8FAFC] p-6 shadow-sm sm:p-9"
    >
      <h3 className="text-2xl font-black text-[#0B1830]">
        Service Enquiry Form
      </h3>

      <p className="mt-2 text-sm leading-6 text-slate-600">
        Fill in your details and tell us about your shipment.
      </p>

      {success && (
        <div
          role="status"
          className="mt-6 rounded-xl border border-green-200 bg-green-50 p-4 text-sm leading-6 text-green-800"
        >
          {success}
        </div>
      )}

      {error && (
        <div
          role="alert"
          className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm leading-6 text-red-700"
        >
          {error}
        </div>
      )}

      <div className="mt-7 grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="text-sm font-bold text-[#0B1830]">
            Full Name *
          </label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            required
            minLength={2}
            maxLength={150}
            value={form.name}
            onChange={(e) => updateField("name", e.target.value)}
            placeholder="Enter your full name"
            className={fieldClass}
          />
        </div>

        <div>
          <label htmlFor="email" className="text-sm font-bold text-[#0B1830]">
            Email Address *
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={form.email}
            onChange={(e) => updateField("email", e.target.value)}
            placeholder="you@example.com"
            className={fieldClass}
          />
        </div>

        <div>
          <label htmlFor="phone" className="text-sm font-bold text-[#0B1830]">
            Phone Number *
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            required
            minLength={7}
            maxLength={30}
            value={form.phone}
            onChange={(e) => updateField("phone", e.target.value)}
            placeholder="+234..."
            className={fieldClass}
          />
        </div>

        <div>
          <label
            htmlFor="service_type"
            className="text-sm font-bold text-[#0B1830]"
          >
            Service Required *
          </label>
          <select
            id="service_type"
            name="service_type"
            required
            value={form.service_type}
            onChange={(e) => updateField("service_type", e.target.value)}
            className={fieldClass}
          >
            <option value="vehicle_clearing">Vehicle Clearing</option>
            <option value="vehicle_importation">Vehicle Importation</option>
            <option value="cargo_clearing">Cargo Clearing</option>
            <option value="freight_forwarding">Freight Forwarding</option>
            <option value="shipping_logistics">Shipping & Logistics</option>
            <option value="documentation">Import Documentation</option>
            <option value="other">Other Services</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="shipment_origin"
            className="text-sm font-bold text-[#0B1830]"
          >
            Shipment Origin
          </label>
          <input
            id="shipment_origin"
            name="shipment_origin"
            type="text"
            maxLength={150}
            value={form.shipment_origin}
            onChange={(e) => updateField("shipment_origin", e.target.value)}
            placeholder="e.g. USA, UK, Japan"
            className={fieldClass}
          />
        </div>

        <div>
          <label
            htmlFor="shipment_destination"
            className="text-sm font-bold text-[#0B1830]"
          >
            Shipment Destination
          </label>
          <input
            id="shipment_destination"
            name="shipment_destination"
            type="text"
            maxLength={150}
            value={form.shipment_destination}
            onChange={(e) =>
              updateField("shipment_destination", e.target.value)
            }
            placeholder="e.g. Lagos, Nigeria"
            className={fieldClass}
          />
        </div>

        <div className="sm:col-span-2">
          <label
            htmlFor="subject"
            className="text-sm font-bold text-[#0B1830]"
          >
            Subject
          </label>
          <input
            id="subject"
            name="subject"
            type="text"
            maxLength={200}
            value={form.subject}
            onChange={(e) => updateField("subject", e.target.value)}
            placeholder="Brief subject of your enquiry"
            className={fieldClass}
          />
        </div>

        <div className="sm:col-span-2">
          <label
            htmlFor="cargo_description"
            className="text-sm font-bold text-[#0B1830]"
          >
            Vehicle or Cargo Description
          </label>
          <textarea
            id="cargo_description"
            name="cargo_description"
            rows={3}
            value={form.cargo_description}
            onChange={(e) =>
              updateField("cargo_description", e.target.value)
            }
            placeholder="Describe your vehicle, cargo or shipment..."
            className={fieldClass}
          />
        </div>

        <div className="sm:col-span-2">
          <label
            htmlFor="message"
            className="text-sm font-bold text-[#0B1830]"
          >
            Tell Us More About Your Requirements *
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            required
            value={form.message}
            onChange={(e) => updateField("message", e.target.value)}
            placeholder="Please provide details about the service you need..."
            className={fieldClass}
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="mt-7 inline-flex min-h-14 w-full items-center justify-center rounded-full bg-[#0B1830] px-7 py-4 text-sm font-bold text-white transition hover:bg-[#172B4D] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? "Submitting Enquiry..." : "Submit Service Enquiry →"}
      </button>

      <p className="mt-4 text-center text-xs leading-5 text-slate-500">
        Your information will be used to respond to your service enquiry.
      </p>
    </form>
  );
}
