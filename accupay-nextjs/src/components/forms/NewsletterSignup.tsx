"use client";

import { useState } from "react";
import { Mail, CheckCircle } from "lucide-react";

export default function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsSubmitted(true);
    setIsSubmitting(false);
    setEmail("");
  };

  if (isSubmitted) {
    return (
      <div className="flex items-center gap-2 text-green-600">
        <CheckCircle className="w-5 h-5" />
        <span className="text-sm">Thank you for subscribing!</span>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <div className="relative flex-1">
        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-bodyText" />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="w-full pl-10 pr-4 py-2 border border-strokeColor rounded-lg focus:outline-none focus:border-s2 text-sm"
          required
        />
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-s2 text-mainTextColor px-4 py-2 rounded-lg font-medium hover:bg-s2/90 transition-colors duration-300 disabled:opacity-50 text-sm"
      >
        {isSubmitting ? "..." : "Subscribe"}
      </button>
    </form>
  );
}
