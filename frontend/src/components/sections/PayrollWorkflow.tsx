import { ArrowRight, Clock, Users, FileText, CheckCircle } from "lucide-react";

export default function PayrollWorkflow() {
  const steps = [
    {
      icon: Users,
      title: "Employee Setup",
      description:
        "We collect all necessary employee information and set up their profiles in our secure system.",
    },
    {
      icon: Clock,
      title: "Time Tracking",
      description:
        "Employees log their hours through our user-friendly portal or integrated time tracking systems.",
    },
    {
      icon: FileText,
      title: "Payroll Processing",
      description:
        "Our system automatically calculates wages, taxes, and deductions with 100% accuracy.",
    },
    {
      icon: CheckCircle,
      title: "Payment & Reporting",
      description:
        "Employees receive payments on time, and you get comprehensive reports for your records.",
    },
  ];

  return (
    <section className="stp-30 sbp-30 bg-softBg1">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="display-3 text-s1 mb-6">
            How Our Payroll Process Works
          </h2>
          <p className="text-xl text-bodyText max-w-3xl mx-auto">
            Our streamlined payroll process is designed to be simple, accurate,
            and efficient. Here&apos;s how we handle your payroll from start to
            finish.
          </p>
        </div>

        <div className="grid grid-cols-12 gap-6">
          {steps.map((step, index) => (
            <div
              key={index}
              className="col-span-12 md:col-span-6 lg:col-span-3"
            >
              <div className="text-center">
                <div className="relative mb-8">
                  <div className="bg-s2/10 p-6 rounded-full w-20 h-20 mx-auto flex items-center justify-center mb-4">
                    <step.icon className="w-10 h-10 text-s2" />
                  </div>
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-10 left-full w-full">
                      <ArrowRight className="w-6 h-6 text-s2 mx-auto" />
                    </div>
                  )}
                </div>
                <h3 className="text-xl font-bold text-s1 mb-4">{step.title}</h3>
                <p className="text-bodyText">{step.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <div className="bg-white rounded-2xl p-8 shadow-lg max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-s1 mb-4">
              Ready to Get Started?
            </h3>
            <p className="text-bodyText mb-6">
              Our payroll experts will guide you through the entire setup
              process. Most businesses are up and running within 24-48 hours.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="bg-s2 text-mainTextColor px-8 py-4 rounded-full font-semibold hover:bg-s2/90 transition-colors duration-300 inline-block text-center"
              >
                Start Setup Process
              </a>
              <a
                href="/faq"
                className="border-2 border-s2 text-s2 px-8 py-4 rounded-full font-semibold hover:bg-s2 hover:text-mainTextColor transition-colors duration-300 inline-block text-center"
              >
                View FAQ
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
