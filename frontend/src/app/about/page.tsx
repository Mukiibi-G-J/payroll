import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Award,
  Users,
  Shield,
  Clock,
  CheckCircle,
  ArrowRight,
  Star,
} from "lucide-react";

export const metadata: Metadata = {
  title: "About AccuPay - Payroll Experts Since 2010 | AccuPay",
  description:
    "Learn about AccuPay's mission to simplify payroll processing. Our team of payroll experts, CPAs, and tax specialists has been helping businesses streamline their payroll operations for over a decade.",
};

export default function AboutPage() {
  const milestones = [
    {
      year: "2010",
      title: "Company Founded",
      description:
        "AccuPay was founded with a vision to simplify payroll processing for small and medium businesses.",
    },
    {
      year: "2012",
      title: "First 100 Clients",
      description:
        "Reached our first milestone of 100 satisfied clients, proving our payroll solutions work.",
    },
    {
      year: "2015",
      title: "Multi-State Expansion",
      description:
        "Expanded our services to handle multi-state payroll compliance across all 50 states.",
    },
    {
      year: "2018",
      title: "Technology Innovation",
      description:
        "Launched our proprietary payroll software with advanced automation and compliance features.",
    },
    {
      year: "2020",
      title: "Remote Work Support",
      description:
        "Adapted our services to support the growing remote workforce and distributed teams.",
    },
    {
      year: "2024",
      title: "Industry Leadership",
      description:
        "Now serving over 5,000 businesses with 99.9% accuracy in payroll processing.",
    },
  ];

  const values = [
    {
      icon: Shield,
      title: "Accuracy & Compliance",
      description:
        "We maintain the highest standards of accuracy in payroll processing and ensure full compliance with all tax regulations.",
    },
    {
      icon: Users,
      title: "Client-Focused Service",
      description:
        "Every client is unique. We provide personalized payroll solutions tailored to your specific business needs.",
    },
    {
      icon: Clock,
      title: "Timely Processing",
      description:
        "We guarantee on-time payroll processing, ensuring your employees are paid accurately and on schedule.",
    },
    {
      icon: Award,
      title: "Continuous Improvement",
      description:
        "We constantly evolve our services and technology to provide the best possible payroll experience.",
    },
  ];

  const achievements = [
    {
      number: "5,000+",
      label: "Businesses Served",
      description: "Trusted by businesses of all sizes",
    },
    {
      number: "99.9%",
      label: "Accuracy Rate",
      description: "Industry-leading payroll accuracy",
    },
    {
      number: "14+",
      label: "Years Experience",
      description: "Proven expertise in payroll processing",
    },
    {
      number: "50",
      label: "States Covered",
      description: "Multi-state payroll compliance",
    },
  ];

  const testimonials = [
    {
      name: "Jennifer Martinez",
      company: "TechStart Solutions",
      role: "CEO",
      text: "AccuPay has transformed our payroll process. What used to take hours now takes minutes, and the accuracy is unmatched. Their team truly understands payroll compliance.",
      rating: 5,
    },
    {
      name: "Michael Chen",
      company: "Global Manufacturing",
      role: "HR Director",
      text: "The multi-state payroll support is exceptional. We have employees in 12 different states, and AccuPay handles all the compliance seamlessly.",
      rating: 5,
    },
    {
      name: "Sarah Johnson",
      company: "Retail Plus",
      role: "Finance Manager",
      text: "Customer support is outstanding. They helped us transition from our old system and continue to provide excellent service. Highly recommended!",
      rating: 5,
    },
  ];

  return (
    <main>
      {/* Hero Section */}
      <section className="stp-30 sbp-30 bg-repeat hero_bg_gradient">
        <div className="container">
          <div className="grid grid-cols-12 gap-8 items-center">
            <div className="col-span-12 lg:col-span-6">
              <p className="uppercase text-base lg:text-xl font-semibold text-s2 animate__animated animate__fadeInUp">
                About AccuPay
              </p>
              <h1 className="display-2 text-s1 animate__animated animate__fadeInUp mb-6">
                Making Payroll Simple Since 2010
              </h1>
              <p className="text-lg text-white/90 animate__animated animate__fadeInUp mb-8">
                We&apos;re a team of payroll experts, CPAs, and tax specialists
                dedicated to simplifying payroll processing for businesses of
                all sizes. Our mission is to help you focus on growing your
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
                  href="/team"
                  className="border-2 border-s2 text-s2 px-8 py-4 rounded-full font-semibold hover:bg-s2 hover:text-mainTextColor transition-colors duration-300"
                >
                  Meet Our Team
                </Link>
              </div>
            </div>
            <div className="col-span-12 lg:col-span-6">
              <Image
                src="/images/core/02.png"
                alt="AccuPay Team"
                width={600}
                height={400}
                className="animate__animated animate__fadeInUp"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="stp-30 sbp-30">
        <div className="container">
          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-12 lg:col-span-6">
              <h2 className="display-3 text-s1 mb-6">Our Mission</h2>
              <p className="text-xl text-bodyText mb-6">
                To simplify payroll processing for businesses by providing
                accurate, compliant, and efficient payroll services that allow
                business owners to focus on what they do best - growing their
                business.
              </p>
              <p className="text-bodyText mb-8">
                We believe that payroll shouldn&apos;t be a burden. Our team of
                experts handles all the complexities of payroll processing, tax
                compliance, and regulatory requirements so you can focus on your
                core business operations.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-s2 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-s1 mb-1">
                      100% Accuracy Guarantee
                    </h3>
                    <p className="text-bodyText">
                      We guarantee accurate payroll processing with error
                      correction at no additional cost.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-s2 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-s1 mb-1">
                      Full Tax Compliance
                    </h3>
                    <p className="text-bodyText">
                      We handle all federal, state, and local tax filings to
                      keep you compliant.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-s2 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-s1 mb-1">
                      Expert Support
                    </h3>
                    <p className="text-bodyText">
                      Our team of CPAs and payroll specialists provides ongoing
                      support and guidance.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-span-12 lg:col-span-6">
              <h2 className="display-3 text-s1 mb-6">Our Vision</h2>
              <p className="text-xl text-bodyText mb-6">
                To be the leading payroll service provider that businesses trust
                for accurate, compliant, and efficient payroll processing across
                all industries and business sizes.
              </p>
              <div className="bg-softBg1 rounded-2xl p-8">
                <h3 className="text-xl font-bold text-s1 mb-4">
                  Why Choose AccuPay?
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <Star className="w-5 h-5 text-s2" />
                    <span>14+ years of payroll expertise</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Star className="w-5 h-5 text-s2" />
                    <span>Certified Payroll Professionals (CPP)</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Star className="w-5 h-5 text-s2" />
                    <span>Multi-state compliance expertise</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Star className="w-5 h-5 text-s2" />
                    <span>Advanced payroll technology</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Star className="w-5 h-5 text-s2" />
                    <span>24/7 customer support</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Company Timeline */}
      <section className="stp-30 sbp-30 bg-softBg1">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="display-3 text-s1 mb-6">Our Journey</h2>
            <p className="text-xl text-bodyText max-w-3xl mx-auto">
              From a small startup to a leading payroll service provider,
              here&apos;s how we&apos;ve grown and evolved over the years.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <div key={index} className="flex items-start gap-6">
                  <div className="flex-shrink-0">
                    <div className="bg-s2 text-mainTextColor rounded-full w-16 h-16 flex items-center justify-center font-bold text-lg">
                      {milestone.year}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-s1 mb-2">
                      {milestone.title}
                    </h3>
                    <p className="text-bodyText">{milestone.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="stp-30 sbp-30">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="display-3 text-s1 mb-6">Our Core Values</h2>
            <p className="text-xl text-bodyText max-w-3xl mx-auto">
              These values guide everything we do and shape how we serve our
              clients.
            </p>
          </div>

          <div className="grid grid-cols-12 gap-6">
            {values.map((value, index) => (
              <div
                key={index}
                className="col-span-12 md:col-span-6 lg:col-span-3"
              >
                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border border-strokeColor text-center">
                  <div className="bg-s2/10 p-4 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                    <value.icon className="w-8 h-8 text-s2" />
                  </div>
                  <h3 className="text-xl font-bold text-s1 mb-4">
                    {value.title}
                  </h3>
                  <p className="text-bodyText">{value.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="stp-30 sbp-30 bg-s1">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="display-3 text-s2 mb-6">Our Achievements</h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Numbers that speak to our commitment to excellence and client
              satisfaction.
            </p>
          </div>

          <div className="grid grid-cols-12 gap-6">
            {achievements.map((achievement, index) => (
              <div
                key={index}
                className="col-span-12 md:col-span-6 lg:col-span-3"
              >
                <div className="text-center">
                  <div className="text-4xl font-bold text-s2 mb-2">
                    {achievement.number}
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {achievement.label}
                  </h3>
                  <p className="text-white/80">{achievement.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="stp-30 sbp-30">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="display-3 text-s1 mb-6">What Our Clients Say</h2>
            <p className="text-xl text-bodyText max-w-3xl mx-auto">
              Don&apos;t just take our word for it. Here&apos;s what business
              owners say about our payroll services.
            </p>
          </div>

          <div className="grid grid-cols-12 gap-6">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="col-span-12 md:col-span-6 lg:col-span-4"
              >
                <div className="bg-white rounded-2xl p-8 shadow-lg border border-strokeColor h-full">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-s2 fill-current" />
                    ))}
                  </div>
                  <p className="text-bodyText mb-6 italic">
                    &ldquo;{testimonial.text}&rdquo;
                  </p>
                  <div>
                    <h4 className="font-semibold text-s1">
                      {testimonial.name}
                    </h4>
                    <p className="text-sm text-bodyText">
                      {testimonial.role}, {testimonial.company}
                    </p>
                  </div>
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
              Ready to Simplify Your Payroll?
            </h2>
            <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              Join thousands of businesses that trust AccuPay for their payroll
              needs. Let our experts handle your payroll so you can focus on
              growing your business.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="bg-s2 text-mainTextColor px-8 py-4 rounded-full font-semibold hover:bg-s2/90 transition-colors duration-300 flex items-center justify-center gap-2"
              >
                Get Started Today
                <ArrowRight className="w-5 h-5" />
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
