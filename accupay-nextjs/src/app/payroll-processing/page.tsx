import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  CheckCircle,
  Clock,
  Shield,
  Users,
  Calculator,
  FileText,
} from "lucide-react";
import PayrollWorkflow from "@/components/sections/PayrollWorkflow";
import PayrollFAQ from "@/components/sections/PayrollFAQ";

export const metadata: Metadata = {
  title: "Payroll Processing Services - Accupay",
  description:
    "Complete payroll management with automated calculations, tax filings, and employee self-service portal. Starting at $5/employee/month.",
};

const features = [
  {
    icon: Calculator,
    title: "Automated Calculations",
    description:
      "Precise payroll calculations with automatic tax deductions, overtime, and benefits processing.",
  },
  {
    icon: Shield,
    title: "Tax Compliance",
    description:
      "Full tax filing and compliance management including federal, state, and local tax requirements.",
  },
  {
    icon: Users,
    title: "Employee Portal",
    description:
      "Self-service portal for employees to access paystubs, tax forms, and update personal information.",
  },
  {
    icon: FileText,
    title: "Comprehensive Reporting",
    description:
      "Detailed payroll reports and analytics to help you make informed business decisions.",
  },
  {
    icon: Clock,
    title: "On-Time Processing",
    description:
      "Guaranteed on-time payroll processing with direct deposit and check printing services.",
  },
  {
    icon: Shield,
    title: "Data Security",
    description:
      "Bank-level security to protect your sensitive payroll data and employee information.",
  },
];

const pricingPlans = [
  {
    name: "Basic",
    price: "$5",
    period: "per employee/month",
    features: [
      "Payroll processing",
      "Tax filing",
      "Direct deposit",
      "Basic reporting",
      "Email support",
    ],
    popular: false,
  },
  {
    name: "Professional",
    price: "$8",
    period: "per employee/month",
    features: [
      "Everything in Basic",
      "Employee self-service portal",
      "Advanced reporting",
      "HR integration",
      "Phone support",
      "Time tracking",
    ],
    popular: true,
  },
  {
    name: "Enterprise",
    price: "$12",
    period: "per employee/month",
    features: [
      "Everything in Professional",
      "Custom reporting",
      "Dedicated account manager",
      "API integration",
      "Priority support",
      "Multi-location support",
    ],
    popular: false,
  },
];

export default function PayrollProcessingPage() {
  return (
    <main>
      {/* Hero Section */}
      <section className="stp-30 sbp-30 bg-repeat hero_bg_gradient">
        <div className="container">
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12 lg:col-span-6">
              <p className="uppercase text-base lg:text-xl font-semibold text-s2 animate__animated animate__fadeInUp">
                Payroll Processing
              </p>
              <h1 className="display-2 text-s1 animate__animated animate__fadeInUp">
                Streamline Your Payroll Process
              </h1>
              <p className="text-lg text-white/80 animate__animated animate__fadeInUp mb-8">
                Complete payroll management with automated calculations, tax
                filings, and employee self-service portal. Focus on growing your
                business while we handle the complexities of payroll.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 animate__animated animate__fadeInUp">
                <Link
                  href="/contact"
                  className="bg-s2 text-mainTextColor px-8 py-4 rounded-full font-semibold hover:bg-s2/90 transition-colors duration-300"
                >
                  Get Started Today
                </Link>
                <Link
                  href="#pricing"
                  className="border-2 border-s2 text-s2 px-8 py-4 rounded-full font-semibold hover:bg-s2 hover:text-mainTextColor transition-colors duration-300"
                >
                  View Pricing
                </Link>
              </div>
            </div>
            <div className="col-span-12 lg:col-span-6">
              <Image
                src="/images/core/02.png"
                alt="Payroll Processing"
                width={500}
                height={400}
                className="animate__animated animate__fadeInUp"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="stp-30 sbp-30">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="display-3 text-s1 mb-6">
              Why Choose Our Payroll Services?
            </h2>
            <p className="text-xl text-bodyText max-w-3xl mx-auto">
              Our comprehensive payroll solutions are designed to save you time,
              reduce errors, and ensure compliance.
            </p>
          </div>

          <div className="grid grid-cols-12 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="col-span-12 md:col-span-6 lg:col-span-4"
              >
                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border border-strokeColor">
                  <div className="flex justify-center items-center mb-6">
                    <div className="bg-s2/10 p-4 rounded-full">
                      <feature.icon className="w-8 h-8 text-s2" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-s1 mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-bodyText">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="stp-30 sbp-30 bg-s1">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="display-3 text-s2 mb-6">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Choose the plan that best fits your business needs. No hidden
              fees, no surprises.
            </p>
          </div>

          <div className="grid grid-cols-12 gap-6">
            {pricingPlans.map((plan, index) => (
              <div
                key={index}
                className="col-span-12 md:col-span-6 lg:col-span-4"
              >
                <div
                  className={`bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border-2 ${
                    plan.popular ? "border-s2" : "border-strokeColor"
                  } relative`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <span className="bg-s2 text-mainTextColor px-6 py-2 rounded-full font-semibold text-sm">
                        Most Popular
                      </span>
                    </div>
                  )}

                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-s1 mb-2">
                      {plan.name}
                    </h3>
                    <div className="flex items-baseline justify-center gap-2">
                      <span className="text-4xl font-bold text-s2">
                        {plan.price}
                      </span>
                      <span className="text-bodyText">{plan.period}</span>
                    </div>
                  </div>

                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li
                        key={featureIndex}
                        className="flex items-center gap-3"
                      >
                        <CheckCircle className="w-5 h-5 text-s2 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    href="/contact"
                    className={`w-full block text-center py-4 rounded-full font-semibold transition-colors duration-300 ${
                      plan.popular
                        ? "bg-s2 text-mainTextColor hover:bg-s2/90"
                        : "border-2 border-s2 text-s2 hover:bg-s2 hover:text-mainTextColor"
                    }`}
                  >
                    Get Started
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Workflow Section */}
      <PayrollWorkflow />

      {/* FAQ Section */}
      <PayrollFAQ />

      {/* CTA Section */}
      <section className="stp-30 sbp-30">
        <div className="container">
          <div className="bg-s1 rounded-2xl p-12 text-center">
            <h2 className="display-3 text-s2 mb-6">
              Ready to Simplify Your Payroll?
            </h2>
            <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              Join thousands of businesses that trust us with their payroll
              processing. Get started today and experience the difference.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="bg-s2 text-mainTextColor px-8 py-4 rounded-full font-semibold hover:bg-s2/90 transition-colors duration-300"
              >
                Start Your Free Trial
              </Link>
              <Link
                href="/all-services"
                className="border-2 border-s2 text-s2 px-8 py-4 rounded-full font-semibold hover:bg-s2 hover:text-mainTextColor transition-colors duration-300"
              >
                View All Services
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
