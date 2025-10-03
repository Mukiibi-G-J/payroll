import type { Metadata } from "next";
import Link from "next/link";
import { Search, ChevronDown, MessageSquare, Phone, Mail } from "lucide-react";
import PayrollFAQAccordion from "@/components/faq/PayrollFAQAccordion";

export const metadata: Metadata = {
  title: "Payroll FAQ - Frequently Asked Questions | Accupay",
  description:
    "Find answers to common payroll questions. Get help with payroll processing, tax compliance, employee management, and more.",
};

export default function FAQPage() {
  const categories = [
    {
      name: "General Payroll",
      icon: "📊",
      description: "Basic payroll questions and general information",
    },
    {
      name: "Tax Compliance",
      icon: "📋",
      description: "Tax filing, compliance, and regulatory questions",
    },
    {
      name: "Implementation",
      icon: "⚙️",
      description: "Setup, onboarding, and integration questions",
    },
    {
      name: "Support",
      icon: "🛠️",
      description: "Technical support and troubleshooting",
    },
  ];

  const quickLinks = [
    {
      title: "How quickly can you set up my payroll?",
      href: "#setup",
    },
    {
      title: "What information do you need to get started?",
      href: "#information",
    },
    {
      title: "Do you handle multi-state payroll?",
      href: "#multi-state",
    },
    {
      title: "How secure is my payroll data?",
      href: "#security",
    },
    {
      title: "What if there&apos;s an error in payroll?",
      href: "#errors",
    },
    {
      title: "Can I integrate with my existing HR systems?",
      href: "#integration",
    },
  ];

  return (
    <main>
      {/* Hero Section */}
      <section className="stp-30 sbp-30 bg-repeat hero_bg_gradient">
        <div className="container">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="display-2 text-s1 mb-6 animate__animated animate__fadeInDown">
              Payroll Frequently Asked Questions
            </h1>
            <p className="text-xl text-white/90 mb-8 animate__animated animate__fadeInUp">
              Find answers to common payroll questions. Can&apos;t find what
              you&apos;re looking for? Our payroll experts are here to help.
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto animate__animated animate__fadeInUp">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-bodyText" />
                <input
                  type="text"
                  placeholder="Search payroll questions..."
                  className="w-full pl-12 pr-4 py-4 rounded-full border-2 border-white/20 bg-white/10 backdrop-blur-sm text-white placeholder-white/70 focus:border-s2 focus:outline-none"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="stp-30 sbp-30">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="display-3 text-s1 mb-6">Browse by Category</h2>
            <p className="text-xl text-bodyText max-w-3xl mx-auto">
              Find answers organized by topic to quickly locate the information
              you need.
            </p>
          </div>

          <div className="grid grid-cols-12 gap-6">
            {categories.map((category, index) => (
              <div
                key={index}
                className="col-span-12 md:col-span-6 lg:col-span-3"
              >
                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border border-strokeColor">
                  <div className="text-4xl mb-4">{category.icon}</div>
                  <h3 className="text-xl font-bold text-s1 mb-3">
                    {category.name}
                  </h3>
                  <p className="text-bodyText mb-6">{category.description}</p>
                  <Link
                    href={`#${category.name.toLowerCase().replace(" ", "-")}`}
                    className="text-s2 font-semibold hover:underline"
                  >
                    View Questions →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="stp-30 sbp-30 bg-softBg1">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="display-3 text-s1 mb-6">Popular Questions</h2>
            <p className="text-xl text-bodyText max-w-3xl mx-auto">
              Here are the most frequently asked questions about our payroll
              services.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-12 gap-4">
              {quickLinks.map((link, index) => (
                <div key={index} className="col-span-12 md:col-span-6">
                  <Link
                    href={link.href}
                    className="block bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-all duration-300 border border-strokeColor hover:border-s2 group"
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-s1 group-hover:text-s2 transition-colors duration-300">
                        {link.title}
                      </h3>
                      <ChevronDown className="w-5 h-5 text-s2 group-hover:rotate-180 transition-transform duration-300" />
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="stp-30 sbp-30">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="display-3 text-s1 mb-6">All Questions & Answers</h2>
            <p className="text-xl text-bodyText max-w-3xl mx-auto">
              Comprehensive answers to all your payroll questions, organized by
              category.
            </p>
          </div>

          <PayrollFAQAccordion />
        </div>
      </section>

      {/* Contact Support */}
      <section className="stp-30 sbp-30 bg-s1">
        <div className="container">
          <div className="text-center">
            <h2 className="display-3 text-s2 mb-6">Still Have Questions?</h2>
            <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              Our payroll experts are here to help. Get personalized answers to
              your specific payroll questions.
            </p>

            <div className="grid grid-cols-12 gap-6 max-w-4xl mx-auto">
              <div className="col-span-12 md:col-span-4">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center">
                  <Phone className="w-8 h-8 text-s2 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-white mb-2">
                    Call Us
                  </h3>
                  <p className="text-white/80 mb-4">
                    Speak directly with our payroll experts
                  </p>
                  <a
                    href="tel:+15551234567"
                    className="text-s2 font-semibold hover:underline"
                  >
                    +1 (555) 123-4567
                  </a>
                </div>
              </div>

              <div className="col-span-12 md:col-span-4">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center">
                  <Mail className="w-8 h-8 text-s2 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-white mb-2">
                    Email Us
                  </h3>
                  <p className="text-white/80 mb-4">
                    Get detailed answers via email
                  </p>
                  <a
                    href="mailto:support@accupay.com"
                    className="text-s2 font-semibold hover:underline"
                  >
                    support@accupay.com
                  </a>
                </div>
              </div>

              <div className="col-span-12 md:col-span-4">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center">
                  <MessageSquare className="w-8 h-8 text-s2 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-white mb-2">
                    Live Chat
                  </h3>
                  <p className="text-white/80 mb-4">
                    Chat with us in real-time
                  </p>
                  <Link
                    href="/contact"
                    className="text-s2 font-semibold hover:underline"
                  >
                    Start Chat
                  </Link>
                </div>
              </div>
            </div>

            <div className="mt-12">
              <Link
                href="/contact"
                className="bg-s2 text-mainTextColor px-8 py-4 rounded-full font-semibold hover:bg-s2/90 transition-colors duration-300 inline-block"
              >
                Contact Our Team
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
