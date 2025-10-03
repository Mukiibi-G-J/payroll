import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  CheckCircle,
  Home,
  TrendingUp,
  FileText,
  Calculator,
  Users,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Real Estate Services - Accupay",
  description:
    "Comprehensive financial services for real estate professionals and property management companies. Starting at $300/month.",
};

const services = [
  {
    icon: Home,
    title: "Property Management Accounting",
    description:
      "Complete accounting services for property management companies including rent collection and expense tracking.",
  },
  {
    icon: TrendingUp,
    title: "Commission Tracking",
    description:
      "Specialized commission tracking and reporting for real estate agents and brokers.",
  },
  {
    icon: FileText,
    title: "Financial Reporting",
    description:
      "Comprehensive financial reports for real estate investments and property portfolios.",
  },
  {
    icon: Calculator,
    title: "Expense Management",
    description:
      "Detailed expense tracking and categorization for real estate operations and investments.",
  },
  {
    icon: Users,
    title: "Business Consulting",
    description:
      "Strategic business consulting to help real estate professionals optimize their operations.",
  },
  {
    icon: FileText,
    title: "Tax Preparation",
    description:
      "Specialized tax preparation for real estate professionals with industry-specific deductions.",
  },
];

const features = [
  "Property portfolio management",
  "Rent roll tracking and analysis",
  "Commission reconciliation",
  "Investment property accounting",
  "Real estate tax planning",
  "Property expense categorization",
];

const pricingPlans = [
  {
    name: "Individual Agent",
    price: "$300",
    period: "per month",
    features: [
      "Basic accounting services",
      "Commission tracking",
      "Tax preparation",
      "Monthly reporting",
      "Email support",
    ],
    popular: false,
  },
  {
    name: "Real Estate Team",
    price: "$500",
    period: "per month",
    features: [
      "Everything in Individual Agent",
      "Team commission tracking",
      "Advanced reporting",
      "Business consulting",
      "Phone support",
      "Quarterly planning",
    ],
    popular: true,
  },
  {
    name: "Property Management",
    price: "$800",
    period: "per month",
    features: [
      "Everything in Real Estate Team",
      "Property portfolio management",
      "Rent roll tracking",
      "Dedicated accountant",
      "Priority support",
      "Custom reporting",
    ],
    popular: false,
  },
];

export default function RealEstateServicesPage() {
  return (
    <main>
      {/* Hero Section */}
      <section className="stp-30 sbp-30 bg-repeat hero_bg_gradient">
        <div className="container">
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12 lg:col-span-6">
              <p className="uppercase text-base lg:text-xl font-semibold text-s2 animate__animated animate__fadeInUp">
                Real Estate Services
              </p>
              <h1 className="display-2 text-s1 animate__animated animate__fadeInUp">
                Real Estate Financial Solutions
              </h1>
              <p className="text-lg text-white/80 animate__animated animate__fadeInUp mb-8">
                Comprehensive financial services designed specifically for real
                estate professionals, property managers, and real estate
                investors. We understand the unique financial needs of the real
                estate industry.
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
                src="/images/core/06.png"
                alt="Real Estate Services"
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
            <h2 className="display-3 text-s1 mb-6">
              Real Estate Financial Services
            </h2>
            <p className="text-xl text-bodyText max-w-3xl mx-auto">
              Our specialized services are designed to meet the unique financial
              needs of real estate professionals and property management
              companies.
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
                Real Estate-Specific Features
              </h2>
              <p className="text-xl text-white/80 mb-8">
                Our real estate accounting solutions include specialized
                features designed for property management and real estate
                investment.
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
                src="/images/core/06.png"
                alt="Real Estate Features"
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
            <h2 className="display-3 text-s1 mb-6">
              Real Estate Pricing Plans
            </h2>
            <p className="text-xl text-bodyText max-w-3xl mx-auto">
              Flexible pricing options designed for real estate professionals at
              every level.
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
              Ready to Optimize Your Real Estate Business?
            </h2>
            <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              Let our real estate specialists help you manage your finances and
              grow your business.
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

