import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "All Services - Accupay",
  description:
    "Comprehensive payroll, accounting, and business services to streamline your operations and ensure compliance.",
};

const services = [
  {
    id: "payroll-processing",
    title: "Payroll Processing",
    description:
      "Complete payroll management with automated calculations, tax filings, and employee self-service portal.",
    features: [
      "Automated payroll calculations",
      "Tax filing and compliance",
      "Employee self-service portal",
      "Direct deposit processing",
      "Payroll reporting",
      "Year-end tax forms",
    ],
    pricing: "Starting at $5/employee/month",
    image: "/images/core/02.png",
    href: "/payroll-processing",
  },
  {
    id: "accounting-services",
    title: "Accounting Services",
    description:
      "Professional bookkeeping, financial reporting, and accounting services for businesses of all sizes.",
    features: [
      "Bookkeeping and record keeping",
      "Financial statement preparation",
      "Accounts payable/receivable",
      "Bank reconciliation",
      "Financial analysis",
      "Tax preparation support",
    ],
    pricing: "Starting at $200/month",
    image: "/images/core/03.png",
    href: "/accounting-services",
  },
  {
    id: "taxation-services",
    title: "Taxation Services",
    description:
      "Expert tax planning, preparation, and compliance services to minimize your tax burden legally.",
    features: [
      "Tax planning and strategy",
      "Individual tax preparation",
      "Business tax returns",
      "Tax audit support",
      "Quarterly tax estimates",
      "Tax compliance monitoring",
    ],
    pricing: "Starting at $150/return",
    image: "/images/core/04.png",
    href: "/taxation-services",
  },
  {
    id: "healthcare-services",
    title: "Healthcare Services",
    description:
      "Specialized payroll and HR services for healthcare providers with industry-specific compliance.",
    features: [
      "Healthcare payroll processing",
      "Shift differential calculations",
      "Overtime management",
      "Healthcare compliance",
      "Employee scheduling",
      "Benefits administration",
    ],
    pricing: "Starting at $8/employee/month",
    image: "/images/core/05.png",
    href: "/healthcare-services",
  },
  {
    id: "real-estate-services",
    title: "Real Estate Services",
    description:
      "Comprehensive financial services for real estate professionals and property management companies.",
    features: [
      "Property management accounting",
      "Commission tracking",
      "Expense management",
      "Financial reporting",
      "Tax preparation",
      "Business consulting",
    ],
    pricing: "Starting at $300/month",
    image: "/images/core/06.png",
    href: "/real-estate-services",
  },
  {
    id: "dentist-services",
    title: "Dentist Services",
    description:
      "Specialized accounting and payroll services for dental practices with industry expertise.",
    features: [
      "Dental practice accounting",
      "Payroll for dental staff",
      "Insurance billing support",
      "Financial reporting",
      "Tax preparation",
      "Practice management consulting",
    ],
    pricing: "Starting at $250/month",
    image: "/images/core/02.png",
    href: "/dentist-services",
  },
];

export default function AllServicesPage() {
  return (
    <main>
      {/* Hero Section */}
      <section className="stp-30 sbp-30 bg-repeat hero_bg_gradient">
        <div className="container">
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12 lg:col-span-6">
              <p className="uppercase text-base lg:text-xl font-semibold text-s2 animate__animated animate__fadeInUp">
                Our Services
              </p>
              <h1 className="display-2 text-s1 animate__animated animate__fadeInUp">
                Comprehensive Business Solutions
              </h1>
              <p className="text-lg text-white/80 animate__animated animate__fadeInUp">
                From payroll processing to tax preparation, we provide all the
                services your business needs to thrive and stay compliant.
              </p>
            </div>
            <div className="col-span-12 lg:col-span-6">
              <Image
                src="/images/core/02.png"
                alt="Business Services"
                width={500}
                height={400}
                className="animate__animated animate__fadeInUp"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="stp-30 sbp-30">
        <div className="container">
          <div className="grid grid-cols-12 gap-6">
            {services.map((service) => (
              <div
                key={service.id}
                className="col-span-12 md:col-span-6 lg:col-span-4 group"
              >
                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border border-strokeColor">
                  <div className="flex justify-center items-center mb-6">
                    <Image
                      src={service.image}
                      alt={service.title}
                      width={80}
                      height={80}
                      className="group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>

                  <h3 className="text-2xl font-bold text-s1 mb-4 group-hover:text-s2 transition-colors duration-300">
                    {service.title}
                  </h3>

                  <p className="text-bodyText mb-6">{service.description}</p>

                  <div className="mb-6">
                    <h4 className="font-semibold text-s1 mb-3">
                      Key Features:
                    </h4>
                    <ul className="space-y-2">
                      {service.features.map((feature, featureIndex) => (
                        <li
                          key={featureIndex}
                          className="flex items-center gap-2 text-sm"
                        >
                          <CheckCircle className="w-4 h-4 text-s2 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mb-6">
                    <p className="text-lg font-semibold text-s2">
                      {service.pricing}
                    </p>
                  </div>

                  <Link
                    href={service.href}
                    className="inline-flex items-center gap-2 bg-s2 text-mainTextColor px-6 py-3 rounded-full font-medium hover:bg-s2/90 transition-colors duration-300 group-hover:gap-3"
                  >
                    Learn More
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
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
            <h2 className="display-3 text-s2 mb-6">Ready to Get Started?</h2>
            <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              Choose the services that best fit your business needs. Our team of
              experts is ready to help you streamline your operations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="bg-s2 text-mainTextColor px-8 py-4 rounded-full font-semibold hover:bg-s2/90 transition-colors duration-300"
              >
                Get Started Today
              </Link>
              <Link
                href="/pricing"
                className="border-2 border-s2 text-s2 px-8 py-4 rounded-full font-semibold hover:bg-s2 hover:text-mainTextColor transition-colors duration-300"
              >
                View Pricing
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
