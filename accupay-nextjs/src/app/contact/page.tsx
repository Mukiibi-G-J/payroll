import type { Metadata } from "next";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageSquare,
  Users,
  Calculator,
} from "lucide-react";
import PayrollContactForm from "@/components/forms/PayrollContactForm";

export const metadata: Metadata = {
  title: "Contact Us - Payroll Services | Accupay",
  description:
    "Get in touch with our payroll experts. We&apos;re here to help streamline your payroll process and answer any questions about our services.",
};

export default function ContactPage() {
  const contactInfo = [
    {
      icon: Phone,
      title: "Phone",
      details: ["+1 (555) 123-4567", "+1 (555) 123-4568"],
      description: "Call us for immediate payroll support",
    },
    {
      icon: Mail,
      title: "Email",
      details: ["info@accupay.com", "support@accupay.com"],
      description: "Send us your payroll questions",
    },
    {
      icon: MapPin,
      title: "Office",
      details: ["123 Business Street", "Suite 100", "New York, NY 10001"],
      description: "Visit our headquarters",
    },
    {
      icon: Clock,
      title: "Hours",
      details: ["Mon-Fri: 9AM-6PM EST", "Sat: 10AM-2PM EST", "Sun: Closed"],
      description: "Payroll support hours",
    },
  ];

  const payrollServices = [
    {
      icon: Calculator,
      title: "Payroll Processing",
      description:
        "Complete payroll management with automated calculations and tax filing",
    },
    {
      icon: Users,
      title: "Employee Management",
      description: "Comprehensive employee onboarding and management services",
    },
    {
      icon: MessageSquare,
      title: "Payroll Consulting",
      description: "Expert advice on payroll best practices and compliance",
    },
  ];

  return (
    <main>
      {/* Hero Section */}
      <section className="stp-30 sbp-30 bg-repeat hero_bg_gradient">
        <div className="container">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="display-2 text-s1 mb-6 animate__animated animate__fadeInDown">
              Get in Touch with Our Payroll Experts
            </h1>
            <p className="text-xl text-white/90 mb-8 animate__animated animate__fadeInUp">
              Ready to streamline your payroll process? Our team of payroll
              specialists is here to help you find the perfect solution for your
              business needs.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info & Form */}
      <section className="stp-30 sbp-30">
        <div className="container">
          <div className="grid grid-cols-12 gap-8">
            {/* Contact Information */}
            <div className="col-span-12 lg:col-span-4">
              <h2 className="display-4 text-s1 mb-8">Contact Information</h2>
              <div className="space-y-8">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="bg-s2/10 p-3 rounded-full flex-shrink-0">
                      <info.icon className="w-6 h-6 text-s2" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-s1 mb-2">
                        {info.title}
                      </h3>
                      <div className="space-y-1">
                        {info.details.map((detail, detailIndex) => (
                          <p key={detailIndex} className="text-bodyText">
                            {detail}
                          </p>
                        ))}
                      </div>
                      <p className="text-sm text-bodyText mt-2">
                        {info.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Payroll Services */}
              <div className="mt-12">
                <h3 className="text-xl font-semibold text-s1 mb-6">
                  Our Payroll Services
                </h3>
                <div className="space-y-4">
                  {payrollServices.map((service, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 p-4 bg-softBg1 rounded-lg"
                    >
                      <div className="bg-s2/10 p-2 rounded-full flex-shrink-0">
                        <service.icon className="w-5 h-5 text-s2" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-s1 mb-1">
                          {service.title}
                        </h4>
                        <p className="text-sm text-bodyText">
                          {service.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="col-span-12 lg:col-span-8">
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h2 className="display-4 text-s1 mb-6">Send us a Message</h2>
                <p className="text-bodyText mb-8">
                  Fill out the form below and our payroll experts will get back
                  to you within 24 hours. We&apos;re here to help with all your
                  payroll needs.
                </p>
                <PayrollContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="stp-30 sbp-30 bg-softBg1">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="display-3 text-s1 mb-6">Common Payroll Questions</h2>
            <p className="text-xl text-bodyText max-w-3xl mx-auto">
              Here are answers to some frequently asked questions about our
              payroll services.
            </p>
          </div>

          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12 md:col-span-6">
              <div className="bg-white rounded-lg p-6">
                <h3 className="text-lg font-semibold text-s1 mb-3">
                  How quickly can you set up my payroll?
                </h3>
                <p className="text-bodyText">
                  Most businesses are up and running within 24-48 hours. We
                  handle all the setup including employee onboarding and tax
                  registration.
                </p>
              </div>
            </div>
            <div className="col-span-12 md:col-span-6">
              <div className="bg-white rounded-lg p-6">
                <h3 className="text-lg font-semibold text-s1 mb-3">
                  What information do you need to get started?
                </h3>
                <p className="text-bodyText">
                  We need basic business information, employee details, and
                  banking information. Our team will guide you through the
                  entire process.
                </p>
              </div>
            </div>
            <div className="col-span-12 md:col-span-6">
              <div className="bg-white rounded-lg p-6">
                <h3 className="text-lg font-semibold text-s1 mb-3">
                  Do you handle multi-state payroll?
                </h3>
                <p className="text-bodyText">
                  Yes! We handle multi-state payroll seamlessly with automatic
                  tax rate calculations and compliance for each employee&apos;s
                  work location.
                </p>
              </div>
            </div>
            <div className="col-span-12 md:col-span-6">
              <div className="bg-white rounded-lg p-6">
                <h3 className="text-lg font-semibold text-s1 mb-3">
                  What if I have questions after setup?
                </h3>
                <p className="text-bodyText">
                  Our support team is available 24/7 to answer any questions. We
                  also provide ongoing training and support for your team.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
