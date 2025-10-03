import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  CheckCircle,
  Calculator,
  FileText,
  TrendingUp,
  Shield,
  Users,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Accounting Services - Accupay",
  description:
    "Professional bookkeeping, financial reporting, and accounting services for businesses of all sizes. Starting at $200/month.",
};

const services = [
  {
    icon: Calculator,
    title: "Bookkeeping & Record Keeping",
    description:
      "Comprehensive bookkeeping services including accounts payable, accounts receivable, and general ledger maintenance.",
  },
  {
    icon: FileText,
    title: "Financial Statement Preparation",
    description:
      "Monthly, quarterly, and annual financial statements including P&L, balance sheet, and cash flow statements.",
  },
  {
    icon: TrendingUp,
    title: "Financial Analysis & Reporting",
    description:
      "Detailed financial analysis and custom reports to help you make informed business decisions.",
  },
  {
    icon: Shield,
    title: "Tax Preparation Support",
    description:
      "Complete tax preparation services for individuals and businesses with year-round tax planning.",
  },
  {
    icon: Users,
    title: "Business Consulting",
    description:
      "Strategic business consulting to help optimize your financial processes and improve profitability.",
  },
  {
    icon: FileText,
    title: "Bank Reconciliation",
    description:
      "Regular bank reconciliation services to ensure accuracy and identify discrepancies.",
  },
];

const pricingPlans = [
  {
    name: "Starter",
    price: "$200",
    period: "per month",
    features: [
      "Basic bookkeeping",
      "Monthly financial statements",
      "Bank reconciliation",
      "Quarterly tax preparation",
      "Email support",
    ],
    popular: false,
  },
  {
    name: "Professional",
    price: "$400",
    period: "per month",
    features: [
      "Everything in Starter",
      "Advanced financial reporting",
      "Tax planning",
      "Business consulting",
      "Phone support",
      "Cloud-based access",
    ],
    popular: true,
  },
  {
    name: "Enterprise",
    price: "$600",
    period: "per month",
    features: [
      "Everything in Professional",
      "Dedicated accountant",
      "Custom reporting",
      "Strategic planning",
      "Priority support",
      "Multi-entity support",
    ],
    popular: false,
  },
];

export default function AccountingServicesPage() {
  return (
    <main>
      {/* Hero Section */}
      <section className="stp-30 sbp-30 bg-repeat hero_bg_gradient">
        <div className="container">
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12 lg:col-span-6">
              <p className="uppercase text-base lg:text-xl font-semibold text-s2 animate__animated animate__fadeInUp">
                Accounting Services
              </p>
              <h1 className="display-2 text-s1 animate__animated animate__fadeInUp">
                Professional Accounting Solutions
              </h1>
              <p className="text-lg text-white/80 animate__animated animate__fadeInUp mb-8">
                Comprehensive accounting services including bookkeeping,
                financial reporting, and tax preparation. Let our certified
                accountants handle your financial needs so you can focus on
                growing your business.
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
                src="/images/core/03.png"
                alt="Accounting Services"
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
            <h2 className="display-3 text-s1 mb-6">Our Accounting Services</h2>
            <p className="text-xl text-bodyText max-w-3xl mx-auto">
              From basic bookkeeping to complex financial analysis, we provide
              comprehensive accounting solutions tailored to your business
              needs.
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

      {/* Process Section */}
      <section className="stp-30 sbp-30 bg-s1">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="display-3 text-s2 mb-6">Our Accounting Process</h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              We follow a systematic approach to ensure accuracy, compliance,
              and timely delivery of your financial information.
            </p>
          </div>

          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12 md:col-span-6 lg:col-span-3">
              <div className="text-center">
                <div className="bg-s2 text-mainTextColor w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  1
                </div>
                <h3 className="text-xl font-bold text-s2 mb-4">
                  Data Collection
                </h3>
                <p className="text-white/80">
                  We gather all necessary financial documents and data from your
                  business operations.
                </p>
              </div>
            </div>
            <div className="col-span-12 md:col-span-6 lg:col-span-3">
              <div className="text-center">
                <div className="bg-s2 text-mainTextColor w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  2
                </div>
                <h3 className="text-xl font-bold text-s2 mb-4">
                  Data Processing
                </h3>
                <p className="text-white/80">
                  Our team processes and organizes your financial data using
                  industry-standard practices.
                </p>
              </div>
            </div>
            <div className="col-span-12 md:col-span-6 lg:col-span-3">
              <div className="text-center">
                <div className="bg-s2 text-mainTextColor w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  3
                </div>
                <h3 className="text-xl font-bold text-s2 mb-4">
                  Analysis & Reporting
                </h3>
                <p className="text-white/80">
                  We analyze your financial data and prepare comprehensive
                  reports and statements.
                </p>
              </div>
            </div>
            <div className="col-span-12 md:col-span-6 lg:col-span-3">
              <div className="text-center">
                <div className="bg-s2 text-mainTextColor w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  4
                </div>
                <h3 className="text-xl font-bold text-s2 mb-4">
                  Review & Delivery
                </h3>
                <p className="text-white/80">
                  We review all work for accuracy and deliver your financial
                  reports on time.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="stp-30 sbp-30">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="display-3 text-s1 mb-6">Flexible Pricing Plans</h2>
            <p className="text-xl text-bodyText max-w-3xl mx-auto">
              Choose the accounting plan that best fits your business size and
              needs.
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
              Ready to Streamline Your Accounting?
            </h2>
            <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              Let our certified accountants handle your financial needs while
              you focus on growing your business.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="bg-s2 text-mainTextColor px-8 py-4 rounded-full font-semibold hover:bg-s2/90 transition-colors duration-300"
              >
                Start Your Free Consultation
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

