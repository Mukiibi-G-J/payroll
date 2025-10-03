import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  CheckCircle,
  Stethoscope,
  Calculator,
  FileText,
  Users,
  Shield,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Dentist Services - Accupay",
  description:
    "Specialized accounting and payroll services for dental practices with industry expertise. Starting at $250/month.",
};

const services = [
  {
    icon: Stethoscope,
    title: "Dental Practice Accounting",
    description:
      "Complete accounting services for dental practices including patient billing and practice management.",
  },
  {
    icon: Users,
    title: "Dental Staff Payroll",
    description:
      "Specialized payroll processing for dental practices with complex scheduling and staff management.",
  },
  {
    icon: FileText,
    title: "Insurance Billing Support",
    description:
      "Comprehensive insurance billing support and patient payment processing for dental practices.",
  },
  {
    icon: Calculator,
    title: "Financial Reporting",
    description:
      "Detailed financial reports and analytics specifically designed for dental practice management.",
  },
  {
    icon: Shield,
    title: "Tax Preparation",
    description:
      "Specialized tax preparation for dental practices with industry-specific deductions and compliance.",
  },
  {
    icon: Users,
    title: "Practice Management Consulting",
    description:
      "Strategic consulting to help dental practices optimize their operations and financial performance.",
  },
];

const features = [
  "Dental practice financial management",
  "Staff payroll and benefits administration",
  "Insurance billing and collections",
  "Practice performance analytics",
  "Tax planning and preparation",
  "Compliance monitoring",
];

const pricingPlans = [
  {
    name: "Solo Practice",
    price: "$250",
    period: "per month",
    features: [
      "Basic accounting services",
      "Staff payroll processing",
      "Tax preparation",
      "Monthly reporting",
      "Email support",
    ],
    popular: false,
  },
  {
    name: "Group Practice",
    price: "$400",
    period: "per month",
    features: [
      "Everything in Solo Practice",
      "Advanced practice analytics",
      "Insurance billing support",
      "Business consulting",
      "Phone support",
      "Quarterly planning",
    ],
    popular: true,
  },
  {
    name: "Dental Group",
    price: "$600",
    period: "per month",
    features: [
      "Everything in Group Practice",
      "Multi-location support",
      "Dedicated accountant",
      "Custom reporting",
      "Priority support",
      "Strategic planning",
    ],
    popular: false,
  },
];

export default function DentistServicesPage() {
  return (
    <main>
      {/* Hero Section */}
      <section className="stp-30 sbp-30 bg-repeat hero_bg_gradient">
        <div className="container">
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12 lg:col-span-6">
              <p className="uppercase text-base lg:text-xl font-semibold text-s2 animate__animated animate__fadeInUp">
                Dentist Services
              </p>
              <h1 className="display-2 text-s1 animate__animated animate__fadeInUp">
                Dental Practice Solutions
              </h1>
              <p className="text-lg text-white/80 animate__animated animate__fadeInUp mb-8">
                Specialized accounting and payroll services designed
                specifically for dental practices. We understand the unique
                financial challenges of running a successful dental practice.
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
                alt="Dentist Services"
                width={500}
                height={400}
                className="animate__animated animate__fadeInUp"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="stp-30 sbp-30">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="display-3 text-s1 mb-6">Dental Practice Services</h2>
            <p className="text-xl text-bodyText max-w-3xl mx-auto">
              Our specialized services are designed to help dental practices
              manage their finances, staff, and operations more effectively.
            </p>
          </div>

          <div className="grid grid-cols-12 gap-6">
            {services.map((service, index) => (
              <div
                key={index}
                className="col-span-12 md:col-span-6 lg:col-span-4"
              >
                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border border-strokeColor">
                  <div className="flex justify-center items-center mb-6">
                    <div className="bg-s2/10 p-4 rounded-full">
                      <service.icon className="w-8 h-8 text-s2" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-s1 mb-4">
                    {service.title}
                  </h3>
                  <p className="text-bodyText">{service.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="stp-30 sbp-30 bg-s1">
        <div className="container">
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12 lg:col-span-6">
              <h2 className="display-3 text-s2 mb-6">
                Dental Practice Features
              </h2>
              <p className="text-xl text-white/80 mb-8">
                Our dental practice solutions include specialized features
                designed for the unique needs of dental professionals.
              </p>
              <ul className="space-y-4">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <CheckCircle className="w-6 h-6 text-s2 flex-shrink-0" />
                    <span className="text-white/90 text-lg">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="col-span-12 lg:col-span-6">
              <Image
                src="/images/core/02.png"
                alt="Dental Practice Features"
                width={500}
                height={400}
                className="rounded-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="stp-30 sbp-30">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="display-3 text-s1 mb-6">Dental Practice Pricing</h2>
            <p className="text-xl text-bodyText max-w-3xl mx-auto">
              Flexible pricing options designed for dental practices of all
              sizes.
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

      {/* CTA Section */}
      <section className="stp-30 sbp-30 bg-s1">
        <div className="container">
          <div className="text-center">
            <h2 className="display-3 text-s2 mb-6">
              Ready to Optimize Your Dental Practice?
            </h2>
            <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              Let our dental practice specialists help you manage your finances
              and grow your practice.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="bg-s2 text-mainTextColor px-8 py-4 rounded-full font-semibold hover:bg-s2/90 transition-colors duration-300"
              >
                Schedule Consultation
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

