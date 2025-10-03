"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function PayrollFAQAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqCategories = [
    {
      category: "General Payroll",
      questions: [
        {
          question: "What is payroll processing?",
          answer:
            "Payroll processing is the complete management of employee compensation, including calculating wages, withholding taxes, processing payments, and ensuring compliance with all applicable laws and regulations.",
        },
        {
          question: "How does AccuPay's payroll service work?",
          answer:
            "Our payroll service handles everything from employee onboarding to final payment processing. We calculate wages, withhold taxes, process direct deposits, file tax returns, and provide comprehensive reporting - all while ensuring full compliance.",
        },
        {
          question: "What types of businesses do you serve?",
          answer:
            "We serve businesses of all sizes, from small startups with just a few employees to large enterprises with hundreds of employees across multiple states. Our scalable solutions adapt to your business needs.",
        },
        {
          question: "How accurate is your payroll processing?",
          answer:
            "We maintain a 99.9% accuracy rate in payroll processing. Our automated systems and experienced team ensure that every calculation is correct, and we have a 100% accuracy guarantee with error correction at no additional cost.",
        },
      ],
    },
    {
      category: "Tax Compliance",
      questions: [
        {
          question: "Do you handle all tax filings?",
          answer:
            "Yes, we handle all federal, state, and local tax filings on your behalf. This includes quarterly and annual tax returns, W-2 and 1099 forms, and any other required tax documentation.",
        },
        {
          question: "How do you ensure tax compliance?",
          answer:
            "Our system automatically calculates and withholds the correct taxes based on current tax rates and regulations. We stay updated with all tax law changes and ensure your business remains compliant with all applicable regulations.",
        },
        {
          question: "What happens if there's a tax law change?",
          answer:
            "We monitor all tax law changes and automatically update our systems. You'll be notified of any changes that affect your business, and we'll handle all necessary adjustments to ensure continued compliance.",
        },
        {
          question: "Do you provide tax reports?",
          answer:
            "Yes, we provide comprehensive tax reports including quarterly summaries, annual reports, and detailed breakdowns of all tax withholdings and payments. All reports are available through our secure online portal.",
        },
      ],
    },
    {
      category: "Implementation",
      questions: [
        {
          question: "How quickly can you set up my payroll?",
          answer:
            "Most businesses are up and running within 24-48 hours. We handle all the setup including employee onboarding, tax registration, and system configuration. Our team will guide you through every step of the process.",
        },
        {
          question: "What information do you need to get started?",
          answer:
            "We need basic business information (EIN, business address, banking details), employee information (names, SSNs, addresses, pay rates), and any existing payroll data. Our team will help you gather all necessary documentation.",
        },
        {
          question: "Can you migrate data from my current payroll provider?",
          answer:
            "Yes, we can migrate data from most major payroll providers. Our team will work with your current provider to ensure a smooth transition with no data loss and minimal disruption to your business.",
        },
        {
          question: "Do you provide training for my team?",
          answer:
            "Absolutely! We provide comprehensive training for your team on how to use our payroll system. This includes live training sessions, video tutorials, and ongoing support to ensure your team is comfortable with the system.",
        },
        {
          question: "Can I integrate with my existing HR systems?",
          answer:
            "Yes! We offer API integrations with most major HR systems and can work with your existing time tracking and HR management tools. Our technical team will help you set up seamless integrations.",
        },
      ],
    },
    {
      category: "Support",
      questions: [
        {
          question: "What support do you provide?",
          answer:
            "We provide comprehensive support including phone and email support, live chat, detailed documentation, video tutorials, and dedicated account management for Enterprise clients. Our support team is available during business hours with 24/7 emergency support for critical issues.",
        },
        {
          question: "How secure is my payroll data?",
          answer:
            "We use bank-level encryption and security measures to protect your data. All information is stored securely in SOC 2 compliant data centers, and we comply with all data protection regulations including GDPR and CCPA.",
        },
        {
          question: "What if there's an error in payroll?",
          answer:
            "We have a 100% accuracy guarantee. If there's ever an error, we'll fix it immediately and cover any associated costs. Our team is available 24/7 to address any issues and ensure your employees are paid correctly.",
        },
        {
          question: "How do I access my payroll reports?",
          answer:
            "All reports are available through our secure online portal. You can access real-time reports, download historical data, and customize reports to meet your specific needs. Reports are available in multiple formats including PDF and Excel.",
        },
        {
          question: "Can employees access their information online?",
          answer:
            "Yes! Employees can access their pay stubs, tax forms, and personal information through our secure self-service portal. They can update their information, view payment history, and download documents 24/7.",
        },
      ],
    },
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-4xl mx-auto">
      {faqCategories.map((category, categoryIndex) => (
        <div key={categoryIndex} className="mb-12">
          <h3 className="text-2xl font-bold text-s1 mb-8 text-center">
            {category.category}
          </h3>
          <div className="space-y-4">
            {category.questions.map((faq, index) => {
              const globalIndex = categoryIndex * 10 + index;
              return (
                <div
                  key={index}
                  className="bg-white rounded-lg border border-strokeColor overflow-hidden"
                >
                  <button
                    onClick={() => toggleFAQ(globalIndex)}
                    className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-softBg1 transition-colors duration-300"
                  >
                    <h4 className="text-lg font-semibold text-s1 pr-4">
                      {faq.question}
                    </h4>
                    {openIndex === globalIndex ? (
                      <ChevronUp className="w-5 h-5 text-s2 flex-shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-s2 flex-shrink-0" />
                    )}
                  </button>
                  {openIndex === globalIndex && (
                    <div className="px-6 pb-4">
                      <p className="text-bodyText leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
