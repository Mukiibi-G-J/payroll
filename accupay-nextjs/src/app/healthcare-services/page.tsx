import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  CheckCircle,
  Heart,
  Clock,
  Shield,
  Users,
  Calculator,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Healthcare Services - Accupay",
  description:
    "Specialized payroll and HR services for healthcare providers with industry-specific compliance. Starting at $8/employee/month.",
};

const services = [
  {
    icon: Heart,
    title: "Healthcare Payroll Processing",
    description:
      "Specialized payroll processing for healthcare facilities with complex scheduling and shift differentials.",
  },
  {
    icon: Clock,
    title: "Shift Management",
    description:
      "Advanced shift tracking and overtime calculations for healthcare workers with varying schedules.",
  },
  {
    icon: Shield,
    title: "Healthcare Compliance",
    description:
      "Full compliance with healthcare industry regulations including HIPAA and labor law requirements.",
  },
  {
    icon: Users,
    title: "Staff Scheduling",
    description:
      "Comprehensive staff scheduling solutions to ensure proper coverage and compliance with labor laws.",
  },
  {
    icon: Calculator,
    title: "Benefits Administration",
    description:
      "Complete benefits administration including health insurance, retirement plans, and healthcare-specific benefits.",
  },
  {
    icon: Shield,
    title: "HR Support",
    description:
      "Dedicated HR support for healthcare facilities with industry-specific expertise and compliance knowledge.",
  },
];

const features = [
  "24/7 shift coverage tracking",
  "Overtime and differential calculations",
  "HIPAA-compliant data handling",
  "Healthcare-specific reporting",
  "Staff certification tracking",
  "Compliance monitoring",
];

const pricingPlans = [
  {
    name: "Small Practice",
    price: "$8",
    period: "per employee/month",
    features: [
      "Basic payroll processing",
      "Shift tracking",
      "Tax filing",
      "Basic reporting",
      "Email support",
    ],
    popular: false,
  },
  {
    name: "Medical Facility",
    price: "$12",
    period: "per employee/month",
    features: [
      "Everything in Small Practice",
      "Advanced scheduling",
      "Compliance monitoring",
      "Benefits administration",
      "Phone support",
      "Custom reporting",
    ],
    popular: true,
  },
  {
    name: "Healthcare System",
    price: "$15",
    period: "per employee/month",
    features: [
      "Everything in Medical Facility",
      "Multi-location support",
      "Dedicated account manager",
      "API integration",
      "Priority support",
      "Custom compliance solutions",
    ],
    popular: false,
  },
];

export default function HealthcareServicesPage() {
  return (
    <main>
      {/* Hero Section */}
      <section className="stp-30 sbp-30 bg-repeat hero_bg_gradient">
        <div className="container">
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12 lg:col-span-6">
              <p className="uppercase text-base lg:text-xl font-semibold text-s2 animate__animated animate__fadeInUp">
                Healthcare Services
              </p>
              <h1 className="display-2 text-s1 animate__animated animate__fadeInUp">
                Specialized Healthcare Solutions
              </h1>
              <p className="text-lg text-white/80 animate__animated animate__fadeInUp mb-8">
                Comprehensive payroll and HR services designed specifically for
                healthcare providers. We understand the unique challenges of
                healthcare staffing and compliance requirements.
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
                src="/images/core/05.png"
                alt="Healthcare Services"
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
              Healthcare-Specific Services
            </h2>
            <p className="text-xl text-bodyText max-w-3xl mx-auto">
              Our services are tailored to meet the unique needs of healthcare
              facilities, from small practices to large hospital systems.
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
                Healthcare-Specific Features
              </h2>
              <p className="text-xl text-white/80 mb-8">
                Our healthcare payroll solutions include specialized features
                designed for the unique needs of healthcare providers.
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
                src="/images/core/05.png"
                alt="Healthcare Features"
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
            <h2 className="display-3 text-s1 mb-6">Healthcare Pricing Plans</h2>
            <p className="text-xl text-bodyText max-w-3xl mx-auto">
              Flexible pricing options designed for healthcare facilities of all
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
              Ready to Streamline Your Healthcare Operations?
            </h2>
            <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              Let our healthcare specialists help you manage your staff and
              compliance requirements efficiently.
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

