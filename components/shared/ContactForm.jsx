"use client";

// Enquiry form — composes a mailto with the enquiry details until a
// form backend (Resend / Formspree) is wired up.

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { siteConfig } from "@/data/site";

const topics = ["Partnership", "Speaking", "Mentorship", "Press", "Other"];

const fieldClasses =
  "w-full border border-smoke bg-charcoal px-5 py-3.5 text-sm text-porcelain placeholder:text-fog/60 focus:border-gold focus:outline-none";

export default function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    topic: topics[0],
    message: "",
  });

  const update = (key) => (e) => setForm({ ...form, [key]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(`${form.topic} enquiry, ${form.name}`);
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\nTopic: ${form.topic}\n\n${form.message}`
    );
    window.location.href = `mailto:${siteConfig.email}?subject=${subject}&body=${body}`;
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className="sr-only">
            Name
          </label>
          <input
            id="contact-name"
            required
            value={form.name}
            onChange={update("name")}
            placeholder="Your name"
            className={fieldClasses}
          />
        </div>
        <div>
          <label htmlFor="contact-email" className="sr-only">
            Email
          </label>
          <input
            id="contact-email"
            type="email"
            required
            value={form.email}
            onChange={update("email")}
            placeholder="you@example.com"
            className={fieldClasses}
          />
        </div>
      </div>

      <div>
        <label htmlFor="contact-topic" className="sr-only">
          Topic
        </label>
        <select
          id="contact-topic"
          value={form.topic}
          onChange={update("topic")}
          className={fieldClasses}
        >
          {topics.map((topic) => (
            <option key={topic} value={topic}>
              {topic}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="contact-message" className="sr-only">
          Message
        </label>
        <textarea
          id="contact-message"
          required
          rows={6}
          value={form.message}
          onChange={update("message")}
          placeholder="What are we building?"
          className={fieldClasses}
        />
      </div>

      <button
        type="submit"
        className="inline-flex items-center gap-2 bg-gold px-9 py-4 text-xs font-medium uppercase tracking-[0.2em] text-ink transition-colors hover:bg-gold-soft"
      >
        Send Enquiry <ArrowRight className="h-4 w-4" />
      </button>
    </form>
  );
}
