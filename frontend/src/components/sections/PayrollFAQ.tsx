"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function PayrollFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "How long does it take to set up payroll services?",
      answer:
        "Most businesses are up and running within 24-48 hours. We handle all the setup, including employee onboarding, tax registration, and system configuration.",
    },
    {
      question: "What information do you need from my business?",
      answer:
        "We need basic business information, employee details, and banking information. Our team will guide you through the entire process and help gather all necessary documentation.",
    },
    {
      question: "How do you ensure tax compliance?",
      answer:
        "Our system automatically calculates and files all required taxes at federal, state, and local levels. We stay updated with the latest tax regulations and handle all compliance requirements.",
    },
    {
      question: "Can employees access their pay stubs online?",
      answer:
        "Yes! Employees can access their pay stubs, tax forms, and update personal information through our secure self-service portal 24/7.",
    },
    {
      question: "What if I have employees in multiple states?",
      answer:
        "We handle multi-state payroll seamlessly. Our system automatically applies the correct tax rates and regulations for each employee&apos;s work location.",
    },
    {
      question: "How secure is my payroll data?",
      answer:
        "We use bank-level encryption and security measures to protect your data. All information is stored securely and we comply with all data protection regulations.",
    },
    {
      question: "What happens if there&apos;s an error in payroll?",
      answer:
        "We have a 100% accuracy guarantee. If there&apos;s ever an error, we&apos;ll fix it immediately and cover any associated costs. Our team is available 24/7 for support.",
    },
    {
      question: "Can I integrate with my existing HR systems?",
      answer:
        "Yes! We offer API integrations with most major HR systems and can work with your existing time tracking and HR management tools.",
    },
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="stp-30 sbp-30">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="display-3 text-s1 mb-6">Frequently Asked Questions</h2>
          <p className="text-xl text-bodyText max-w-3xl mx-auto">
            Have questions about our payroll services? We&apos;ve got answers.
            If you don&apos;t see your question here, feel free to contact us.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-lg border border-strokeColor overflow-hidden"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-softBg1 transition-colors duration-300"
                >
                  <h3 className="text-lg font-semibold text-s1 pr-4">
                    {faq.question}
                  </h3>
                  {openIndex === index ? (
                    <ChevronUp className="w-5 h-5 text-s2 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-s2 flex-shrink-0" />
                  )}
                </button>
                {openIndex === index && (
                  <div className="px-6 pb-4">
                    <p className="text-bodyText leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-12">
          <p className="text-bodyText mb-6">
            Still have questions? Our payroll experts are here to help.
          </p>
          <a
            href="/contact"
            className="bg-s2 text-mainTextColor px-8 py-4 rounded-full font-semibold hover:bg-s2/90 transition-colors duration-300 inline-block"
          >
            Contact Our Team
          </a>
        </div>
      </div>
    </section>
  );
}
