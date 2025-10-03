import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Mail,
  Phone,
  Linkedin,
  Calendar,
  Award,
  BookOpen,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Sarah Johnson - CEO & Founder - Accupay",
  description:
    "Meet Sarah Johnson, CEO and Founder of Accupay. Learn about her experience in payroll processing and her vision for simplifying business operations.",
};

const achievements = [
  {
    icon: Award,
    title: "CPA Certification",
    description:
      "Certified Public Accountant with over 15 years of experience in accounting and payroll services.",
  },
  {
    icon: BookOpen,
    title: "Industry Expertise",
    description:
      "Specialized knowledge in small business payroll, tax compliance, and financial management.",
  },
  {
    icon: Calendar,
    title: "15+ Years Experience",
    description:
      "Extensive experience helping small businesses streamline their payroll and accounting processes.",
  },
];

const experience = [
  {
    year: "2020 - Present",
    title: "CEO & Founder",
    company: "Accupay",
    description:
      "Founded Accupay with a vision to simplify payroll processing for small businesses. Led the company to serve over 1,000 clients across various industries.",
  },
  {
    year: "2015 - 2020",
    title: "Senior Payroll Manager",
    company: "Payroll Solutions Inc.",
    description:
      "Managed payroll operations for 500+ clients, implemented new software systems, and trained staff on payroll best practices.",
  },
  {
    year: "2010 - 2015",
    title: "Payroll Specialist",
    company: "Business Services Group",
    description:
      "Provided payroll processing services for small to medium-sized businesses, ensuring compliance with federal and state regulations.",
  },
];

export default function TeamMemberPage() {
  return (
    <main>
      {/* Back Navigation */}
      <section className="stp-15 sbp-15 bg-white">
        <div className="container">
          <Link
            href="/team"
            className="inline-flex items-center gap-2 text-s2 hover:text-s2/80 transition-colors duration-300"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Team
          </Link>
        </div>
      </section>

      {/* Team Member Header */}
      <section className="stp-30 sbp-30 bg-repeat hero_bg_gradient">
        <div className="container">
          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-12 lg:col-span-4">
              <div className="relative">
                <Image
                  src="/images/core/02.png"
                  alt="Sarah Johnson"
                  width={400}
                  height={500}
                  className="rounded-2xl shadow-2xl"
                />
                <div className="absolute -bottom-4 -right-4">
                  <span className="bg-s2 text-mainTextColor px-4 py-2 rounded-full text-sm font-medium">
                    CEO & Founder
                  </span>
                </div>
              </div>
            </div>

            <div className="col-span-12 lg:col-span-8">
              <h1 className="display-2 text-s1 mb-4">Sarah Johnson</h1>
              <p className="text-xl text-s2 font-semibold mb-6">
                CEO & Founder
              </p>
              <p className="text-lg text-white/80 mb-8">
                Sarah founded Accupay with a vision to simplify payroll
                processing for small businesses. With over 15 years of
                experience in accounting and payroll, she leads our team with
                passion and expertise. Her commitment to client success and
                innovation has made Accupay a trusted partner for businesses
                across various industries.
              </p>

              <div className="flex flex-wrap gap-4 mb-8">
                <a
                  href="mailto:sarah@accupay.com"
                  className="flex items-center gap-2 bg-white/10 text-white px-4 py-2 rounded-full hover:bg-white/20 transition-colors duration-300"
                >
                  <Mail className="w-4 h-4" />
                  <span>sarah@accupay.com</span>
                </a>
                <a
                  href="tel:+15551234567"
                  className="flex items-center gap-2 bg-white/10 text-white px-4 py-2 rounded-full hover:bg-white/20 transition-colors duration-300"
                >
                  <Phone className="w-4 h-4" />
                  <span>+1 (555) 123-4567</span>
                </a>
                <a
                  href="https://linkedin.com/in/sarahjohnson"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-white/10 text-white px-4 py-2 rounded-full hover:bg-white/20 transition-colors duration-300"
                >
                  <Linkedin className="w-4 h-4" />
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="stp-30 sbp-30">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="display-3 text-s1 mb-8">About Sarah</h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-lg text-bodyText mb-6">
                Sarah Johnson is a Certified Public Accountant with over 15
                years of experience in accounting and payroll services. She
                founded Accupay in 2020 with the mission to simplify payroll
                processing for small businesses and help them focus on what they
                do best.
              </p>
              <p className="text-lg text-bodyText mb-6">
                Throughout her career, Sarah has helped hundreds of small
                businesses streamline their payroll operations, reduce errors,
                and ensure compliance with federal and state regulations. Her
                expertise in payroll processing, tax compliance, and business
                consulting has made her a trusted advisor to business owners
                across various industries.
              </p>
              <p className="text-lg text-bodyText mb-8">
                Sarah is passionate about helping small businesses succeed and
                believes that efficient payroll processing is essential for
                business growth. She leads the Accupay team with a commitment to
                excellence, innovation, and client success.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="stp-30 sbp-30 bg-s1">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="display-3 text-s2 mb-6">Key Achievements</h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Sarah&apos;s expertise and dedication have earned her recognition
              in the industry and the trust of our clients.
            </p>
          </div>

          <div className="grid grid-cols-12 gap-6">
            {achievements.map((achievement, index) => (
              <div
                key={index}
                className="col-span-12 md:col-span-6 lg:col-span-4"
              >
                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border border-strokeColor text-center">
                  <div className="flex justify-center items-center mb-6">
                    <div className="bg-s2/10 p-4 rounded-full">
                      <achievement.icon className="w-8 h-8 text-s2" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-s1 mb-4">
                    {achievement.title}
                  </h3>
                  <p className="text-bodyText">{achievement.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="stp-30 sbp-30">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="display-3 text-s1 mb-8">Professional Experience</h2>
            <div className="space-y-8">
              {experience.map((exp, index) => (
                <div key={index} className="border-l-4 border-s2 pl-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                    <h3 className="text-xl font-bold text-s1">{exp.title}</h3>
                    <span className="text-s2 font-semibold">{exp.year}</span>
                  </div>
                  <p className="text-s2 font-semibold mb-3">{exp.company}</p>
                  <p className="text-bodyText">{exp.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="stp-30 sbp-30 bg-s1">
        <div className="container">
          <div className="text-center">
            <h2 className="display-3 text-s2 mb-6">
              Ready to Work with Sarah?
            </h2>
            <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              Schedule a consultation with Sarah to discuss how Accupay can help
              streamline your business operations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="bg-s2 text-mainTextColor px-8 py-4 rounded-full font-semibold hover:bg-s2/90 transition-colors duration-300"
              >
                Schedule Consultation
              </Link>
              <Link
                href="/team"
                className="border-2 border-s2 text-s2 px-8 py-4 rounded-full font-semibold hover:bg-s2 hover:text-mainTextColor transition-colors duration-300"
              >
                Meet the Team
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
