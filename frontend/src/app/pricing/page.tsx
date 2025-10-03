import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle, Star, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Payroll Pricing - Transparent Pricing Plans | Accupay",
  description:
    "Simple, transparent pricing for payroll services. Choose the plan that fits your business. No hidden fees, no surprises. Starting at $5/employee/month.",
};

export default function PricingPage() {
  const pricingPlans = [
    {
      name: "Basic",
      price: "$5",
      period: "per employee/month",
      description: "Perfect for small businesses getting started with payroll",
      features: [
        "Payroll processing",
        "Tax filing & compliance",
        "Direct deposit",
        "Basic reporting",
        "Email support",
        "Employee self-service portal",
      ],
      popular: false,
      cta: "Get Started",
      color: "border-strokeColor",
    },
    {
      name: "Professional",
      price: "$8",
      period: "per employee/month",
      description: "Ideal for growing businesses with advanced payroll needs",
      features: [
        "Everything in Basic",
        "Advanced reporting & analytics",
        "HR system integration",
        "Time tracking integration",
        "Phone & email support",
        "Multi-state payroll",
        "Contractor payments",
        "Benefits administration",
      ],
      popular: true,
      cta: "Most Popular",
      color: "border-s2",
    },
    {
      name: "Enterprise",
      price: "$12",
      period: "per employee/month",
      description: "Comprehensive solution for large organizations",
      features: [
        "Everything in Professional",
        "Custom reporting & dashboards",
        "Dedicated account manager",
        "API integration",
        "Priority support (24/7)",
        "Multi-location support",
        "Advanced compliance tools",
        "Payroll consulting",
        "Custom workflows",
      ],
      popular: false,
      cta: "Contact Sales",
      color: "border-strokeColor",
    },
  ];

  const addOns = [
    {
      name: "Additional Tax Filings",
      price: "$2",
      period: "per filing",
      description:
        "Extra state or local tax filings beyond standard requirements",
    },
    {
      name: "Custom Reports",
      price: "$50",
      period: "per report",
      description: "Bespoke reporting tailored to your specific business needs",
    },
    {
      name: "Priority Setup",
      price: "$200",
      period: "one-time",
      description: "Expedited setup and onboarding within 24 hours",
    },
    {
      name: "Payroll Consulting",
      price: "$150",
      period: "per hour",
      description:
        "Expert consultation on payroll best practices and optimization",
    },
  ];

  const faqs = [
    {
      question: "Are there any setup fees?",
      answer:
        "No setup fees for Basic and Professional plans. Enterprise plans may include setup fees depending on complexity, but we'll discuss this during consultation.",
    },
    {
      question: "Can I change plans anytime?",
      answer:
        "Yes! You can upgrade or downgrade your plan at any time. Changes take effect at the beginning of your next billing cycle.",
    },
    {
      question: "What happens if I exceed my employee count?",
      answer:
        "We'll automatically adjust your billing based on your actual employee count. You'll only pay for the employees you have.",
    },
    {
      question: "Do you offer discounts for annual payments?",
      answer:
        "Yes! We offer a 10% discount for annual payments on all plans. Contact us for more details.",
    },
    {
      question: "Is there a minimum contract length?",
      answer:
        "No minimum contract length. You can cancel anytime with 30 days notice.",
    },
    {
      question: "What's included in support?",
      answer:
        "Basic includes email support, Professional includes phone and email support, and Enterprise includes 24/7 priority support with dedicated account management.",
    },
  ];

  return (
    <main>
      {/* Hero Section */}
      <section className="stp-30 sbp-30 bg-repeat hero_bg_gradient">
        <div className="container">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="display-2 text-s1 mb-6 animate__animated animate__fadeInDown">
              Simple, Transparent Pricing
            </h1>
            <p className="text-xl text-white/90 mb-8 animate__animated animate__fadeInUp">
              Choose the payroll plan that fits your business. No hidden fees,
              no surprises. All plans include our core payroll processing and
              tax compliance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate__animated animate__fadeInUp">
              <Link
                href="#pricing-plans"
                className="bg-s2 text-mainTextColor px-8 py-4 rounded-full font-semibold hover:bg-s2/90 transition-colors duration-300"
              >
                View Plans
              </Link>
              <Link
                href="/contact"
                className="border-2 border-s2 text-s2 px-8 py-4 rounded-full font-semibold hover:bg-s2 hover:text-mainTextColor transition-colors duration-300"
              >
                Get Custom Quote
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Plans */}
      <section id="pricing-plans" className="stp-30 sbp-30">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="display-3 text-s1 mb-6">Choose Your Payroll Plan</h2>
            <p className="text-xl text-bodyText max-w-3xl mx-auto">
              All plans include core payroll processing, tax filing, and
              compliance. Choose the features that best fit your business needs.
            </p>
          </div>

          <div className="grid grid-cols-12 gap-6">
            {pricingPlans.map((plan, index) => (
              <div
                key={index}
                className="col-span-12 md:col-span-6 lg:col-span-4"
              >
                <div
                  className={`bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border-2 ${plan.color} relative h-full flex flex-col`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <span className="bg-s2 text-mainTextColor px-6 py-2 rounded-full font-semibold text-sm flex items-center gap-2">
                        <Star className="w-4 h-4" />
                        Most Popular
                      </span>
                    </div>
                  )}

                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-s1 mb-2">
                      {plan.name}
                    </h3>
                    <p className="text-bodyText mb-6">{plan.description}</p>
                    <div className="flex items-baseline justify-center gap-2 mb-4">
                      <span className="text-5xl font-bold text-s2">
                        {plan.price}
                      </span>
                      <span className="text-bodyText">{plan.period}</span>
                    </div>
                  </div>

                  <ul className="space-y-4 mb-8 flex-1">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-s2 flex-shrink-0 mt-0.5" />
                        <span className="text-bodyText">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={plan.name === "Enterprise" ? "/contact" : "/contact"}
                    className={`w-full block text-center py-4 rounded-full font-semibold transition-colors duration-300 ${
                      plan.popular
                        ? "bg-s2 text-mainTextColor hover:bg-s2/90"
                        : "border-2 border-s2 text-s2 hover:bg-s2 hover:text-mainTextColor"
                    }`}
                  >
                    {plan.cta}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Add-ons Section */}
      <section className="stp-30 sbp-30 bg-softBg1">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="display-3 text-s1 mb-6">Additional Services</h2>
            <p className="text-xl text-bodyText max-w-3xl mx-auto">
              Enhance your payroll solution with these optional add-on services.
            </p>
          </div>

          <div className="grid grid-cols-12 gap-6">
            {addOns.map((addon, index) => (
              <div
                key={index}
                className="col-span-12 md:col-span-6 lg:col-span-3"
              >
                <div className="bg-white rounded-lg p-6 border border-strokeColor hover:border-s2 transition-colors duration-300">
                  <h3 className="text-lg font-semibold text-s1 mb-2">
                    {addon.name}
                  </h3>
                  <div className="flex items-baseline gap-2 mb-3">
                    <span className="text-2xl font-bold text-s2">
                      {addon.price}
                    </span>
                    <span className="text-sm text-bodyText">
                      {addon.period}
                    </span>
                  </div>
                  <p className="text-bodyText text-sm">{addon.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Comparison */}
      <section className="stp-30 sbp-30">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="display-3 text-s1 mb-6">Feature Comparison</h2>
            <p className="text-xl text-bodyText max-w-3xl mx-auto">
              Compare features across all our payroll plans to find the perfect
              fit.
            </p>
          </div>

          <div className="bg-white rounded-2xl overflow-hidden shadow-lg">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-s1 text-white">
                  <tr>
                    <th className="px-6 py-4 text-left">Features</th>
                    <th className="px-6 py-4 text-center">Basic</th>
                    <th className="px-6 py-4 text-center">Professional</th>
                    <th className="px-6 py-4 text-center">Enterprise</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-strokeColor">
                    <td className="px-6 py-4 font-medium">
                      Payroll Processing
                    </td>
                    <td className="px-6 py-4 text-center">
                      <CheckCircle className="w-5 h-5 text-s2 mx-auto" />
                    </td>
                    <td className="px-6 py-4 text-center">
                      <CheckCircle className="w-5 h-5 text-s2 mx-auto" />
                    </td>
                    <td className="px-6 py-4 text-center">
                      <CheckCircle className="w-5 h-5 text-s2 mx-auto" />
                    </td>
                  </tr>
                  <tr className="border-b border-strokeColor bg-softBg1">
                    <td className="px-6 py-4 font-medium">
                      Tax Filing & Compliance
                    </td>
                    <td className="px-6 py-4 text-center">
                      <CheckCircle className="w-5 h-5 text-s2 mx-auto" />
                    </td>
                    <td className="px-6 py-4 text-center">
                      <CheckCircle className="w-5 h-5 text-s2 mx-auto" />
                    </td>
                    <td className="px-6 py-4 text-center">
                      <CheckCircle className="w-5 h-5 text-s2 mx-auto" />
                    </td>
                  </tr>
                  <tr className="border-b border-strokeColor">
                    <td className="px-6 py-4 font-medium">
                      Employee Self-Service
                    </td>
                    <td className="px-6 py-4 text-center">
                      <CheckCircle className="w-5 h-5 text-s2 mx-auto" />
                    </td>
                    <td className="px-6 py-4 text-center">
                      <CheckCircle className="w-5 h-5 text-s2 mx-auto" />
                    </td>
                    <td className="px-6 py-4 text-center">
                      <CheckCircle className="w-5 h-5 text-s2 mx-auto" />
                    </td>
                  </tr>
                  <tr className="border-b border-strokeColor bg-softBg1">
                    <td className="px-6 py-4 font-medium">
                      Advanced Reporting
                    </td>
                    <td className="px-6 py-4 text-center">-</td>
                    <td className="px-6 py-4 text-center">
                      <CheckCircle className="w-5 h-5 text-s2 mx-auto" />
                    </td>
                    <td className="px-6 py-4 text-center">
                      <CheckCircle className="w-5 h-5 text-s2 mx-auto" />
                    </td>
                  </tr>
                  <tr className="border-b border-strokeColor">
                    <td className="px-6 py-4 font-medium">HR Integration</td>
                    <td className="px-6 py-4 text-center">-</td>
                    <td className="px-6 py-4 text-center">
                      <CheckCircle className="w-5 h-5 text-s2 mx-auto" />
                    </td>
                    <td className="px-6 py-4 text-center">
                      <CheckCircle className="w-5 h-5 text-s2 mx-auto" />
                    </td>
                  </tr>
                  <tr className="border-b border-strokeColor bg-softBg1">
                    <td className="px-6 py-4 font-medium">
                      Multi-State Payroll
                    </td>
                    <td className="px-6 py-4 text-center">-</td>
                    <td className="px-6 py-4 text-center">
                      <CheckCircle className="w-5 h-5 text-s2 mx-auto" />
                    </td>
                    <td className="px-6 py-4 text-center">
                      <CheckCircle className="w-5 h-5 text-s2 mx-auto" />
                    </td>
                  </tr>
                  <tr className="border-b border-strokeColor">
                    <td className="px-6 py-4 font-medium">
                      Dedicated Account Manager
                    </td>
                    <td className="px-6 py-4 text-center">-</td>
                    <td className="px-6 py-4 text-center">-</td>
                    <td className="px-6 py-4 text-center">
                      <CheckCircle className="w-5 h-5 text-s2 mx-auto" />
                    </td>
                  </tr>
                  <tr className="border-b border-strokeColor bg-softBg1">
                    <td className="px-6 py-4 font-medium">
                      24/7 Priority Support
                    </td>
                    <td className="px-6 py-4 text-center">-</td>
                    <td className="px-6 py-4 text-center">-</td>
                    <td className="px-6 py-4 text-center">
                      <CheckCircle className="w-5 h-5 text-s2 mx-auto" />
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-medium">API Integration</td>
                    <td className="px-6 py-4 text-center">-</td>
                    <td className="px-6 py-4 text-center">-</td>
                    <td className="px-6 py-4 text-center">
                      <CheckCircle className="w-5 h-5 text-s2 mx-auto" />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="stp-30 sbp-30 bg-softBg1">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="display-3 text-s1 mb-6">Pricing FAQ</h2>
            <p className="text-xl text-bodyText max-w-3xl mx-auto">
              Common questions about our pricing and billing.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-12 gap-6">
              {faqs.map((faq, index) => (
                <div key={index} className="col-span-12 md:col-span-6">
                  <div className="bg-white rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-s1 mb-3">
                      {faq.question}
                    </h3>
                    <p className="text-bodyText">{faq.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="stp-30 sbp-30">
        <div className="container">
          <div className="bg-s1 rounded-2xl p-12 text-center">
            <h2 className="display-3 text-s2 mb-6">Ready to Get Started?</h2>
            <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              Choose your plan and start streamlining your payroll process
              today. Our team is here to help you get set up quickly and
              efficiently.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="bg-s2 text-mainTextColor px-8 py-4 rounded-full font-semibold hover:bg-s2/90 transition-colors duration-300 flex items-center justify-center gap-2"
              >
                Start Free Trial
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/contact"
                className="border-2 border-s2 text-s2 px-8 py-4 rounded-full font-semibold hover:bg-s2 hover:text-mainTextColor transition-colors duration-300"
              >
                Get Custom Quote
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
