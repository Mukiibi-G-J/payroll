import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Calculator, FileText, Shield, TrendingUp, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Taxation Services - Accupay",
  description:
    "Expert tax planning, preparation, and compliance services to minimize your tax burden legally. Starting at $150/return.",
};

const services = [
  {
    icon: Calculator,
    title: "Individual Tax Preparation",
    description:
      "Complete individual tax return preparation with maximum deductions and credits to minimize your tax liability.",
  },
  {
    icon: FileText,
    title: "Business Tax Returns",
    description:
      "Comprehensive business tax preparation including corporate, partnership, and LLC tax returns.",
  },
  {
    icon: TrendingUp,
    title: "Tax Planning & Strategy",
    description:
      "Year-round tax planning to help you minimize taxes and maximize your financial position.",
  },
  {
    icon: Shield,
    title: "Tax Audit Support",
    description:
      "Professional representation and support during IRS audits and tax examinations.",
  },
  {
    icon: Clock,
    title: "Quarterly Tax Estimates",
    description:
      "Accurate quarterly tax estimates to help you avoid penalties and manage cash flow.",
  },
  {
    icon: FileText,
    title: "Tax Compliance Monitoring",
    description:
      "Ongoing monitoring of tax law changes and compliance requirements for your business.",
  },
];

const taxTypes = [
  {
    name: "Individual Tax Returns",
    price: "$150",
    description:
      "Personal tax return preparation with standard deductions and credits.",
  },
  {
    name: "Business Tax Returns",
    price: "$300",
    description: "Corporate, partnership, and LLC tax return preparation.",
  },
  {
    name: "Tax Planning Consultation",
    price: "$200/hour",
    description: "Strategic tax planning and optimization consultation.",
  },
  {
    name: "Tax Audit Representation",
    price: "$250/hour",
    description:
      "Professional representation during IRS audits and examinations.",
  },
];

export default function TaxationServicesPage() {
  return (
    <main>
      {/* Hero Section */}
      <section className="stp-30 sbp-30 bg-repeat hero_bg_gradient">
        <div className="container">
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12 lg:col-span-6">
              <p className="uppercase text-base lg:text-xl font-semibold text-s2 animate__animated animate__fadeInUp">
                Taxation Services
              </p>
              <h1 className="display-2 text-s1 animate__animated animate__fadeInUp">
                Expert Tax Solutions
              </h1>
              <p className="text-lg text-white/80 animate__animated animate__fadeInUp mb-8">
                Professional tax preparation, planning, and compliance services
                to minimize your tax burden legally. Our certified tax
                professionals ensure accuracy and maximize your deductions.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 animate__animated animate__fadeInUp">
                <Link
                  href="/contact"
                  className="bg-s2 text-mainTextColor px-8 py-4 rounded-full font-semibold hover:bg-s2/90 transition-colors duration-300"
                >
                  Get Started Today
                </Link>
                <Link
                  href="#services"
                  className="border-2 border-s2 text-s2 px-8 py-4 rounded-full font-semibold hover:bg-s2 hover:text-mainTextColor transition-colors duration-300"
                >
                  View Services
                </Link>
              </div>
            </div>
            <div className="col-span-12 lg:col-span-6">
              <Image
                src="/images/core/04.png"
                alt="Taxation Services"
                width={500}
                height={400}
                className="animate__animated animate__fadeInUp"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="stp-30 sbp-30">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="display-3 text-s1 mb-6">Our Tax Services</h2>
            <p className="text-xl text-bodyText max-w-3xl mx-auto">
              From individual tax returns to complex business tax planning, we
              provide comprehensive tax solutions tailored to your needs.
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

      {/* Why Choose Us Section */}
      <section className="stp-30 sbp-30 bg-s1">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="display-3 text-s2 mb-6">
              Why Choose Our Tax Services?
            </h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Our certified tax professionals bring years of experience and
              expertise to help you navigate complex tax situations.
            </p>
          </div>

          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12 md:col-span-6 lg:col-span-3">
              <div className="text-center">
                <div className="bg-s2 text-mainTextColor w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  ✓
                </div>
                <h3 className="text-xl font-bold text-s2 mb-4">
                  Certified Professionals
                </h3>
                <p className="text-white/80">
                  Our team consists of certified public accountants and tax
                  professionals with extensive experience.
                </p>
              </div>
            </div>
            <div className="col-span-12 md:col-span-6 lg:col-span-3">
              <div className="text-center">
                <div className="bg-s2 text-mainTextColor w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  ✓
                </div>
                <h3 className="text-xl font-bold text-s2 mb-4">
                  Maximum Deductions
                </h3>
                <p className="text-white/80">
                  We ensure you receive all eligible deductions and credits to
                  minimize your tax liability.
                </p>
              </div>
            </div>
            <div className="col-span-12 md:col-span-6 lg:col-span-3">
              <div className="text-center">
                <div className="bg-s2 text-mainTextColor w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  ✓
                </div>
                <h3 className="text-xl font-bold text-s2 mb-4">
                  Audit Protection
                </h3>
                <p className="text-white/80">
                  We provide audit protection and representation services to
                  support you through any IRS examination.
                </p>
              </div>
            </div>
            <div className="col-span-12 md:col-span-6 lg:col-span-3">
              <div className="text-center">
                <div className="bg-s2 text-mainTextColor w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  ✓
                </div>
                <h3 className="text-xl font-bold text-s2 mb-4">
                  Year-Round Support
                </h3>
                <p className="text-white/80">
                  We provide ongoing tax planning and support throughout the
                  year, not just during tax season.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="stp-30 sbp-30">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="display-3 text-s1 mb-6">Transparent Pricing</h2>
            <p className="text-xl text-bodyText max-w-3xl mx-auto">
              Clear, upfront pricing for all our tax services with no hidden
              fees or surprises.
            </p>
          </div>

          <div className="grid grid-cols-12 gap-6">
            {taxTypes.map((service, index) => (
              <div
                key={index}
                className="col-span-12 md:col-span-6 lg:col-span-3"
              >
                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border border-strokeColor text-center">
                  <h3 className="text-xl font-bold text-s1 mb-4">
                    {service.name}
                  </h3>
                  <div className="text-3xl font-bold text-s2 mb-4">
                    {service.price}
                  </div>
                  <p className="text-bodyText mb-6">{service.description}</p>
                  <Link
                    href="/contact"
                    className="inline-block bg-s2 text-mainTextColor px-6 py-3 rounded-full font-semibold hover:bg-s2/90 transition-colors duration-300"
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
              Ready to Minimize Your Tax Burden?
            </h2>
            <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              Let our certified tax professionals help you maximize deductions
              and minimize your tax liability legally.
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
