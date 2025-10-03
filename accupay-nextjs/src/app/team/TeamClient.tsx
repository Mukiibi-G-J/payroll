"use client";

import Image from "next/image";
import Link from "next/link";
import { Linkedin, Mail, Phone, ArrowRight, Search } from "lucide-react";
import { useState, useMemo } from "react";

const teamMembers = [
  {
    id: "1",
    name: "Sarah Johnson",
    position: "CEO & Founder",
    department: "Leadership",
    bio: "Sarah founded Accupay with a vision to simplify payroll processing for small businesses. With over 15 years of experience in payroll management and CPA certification, she leads our team with deep expertise in payroll compliance and tax regulations.",
    image: "/images/core/02.png",
    email: "sarah@accupay.com",
    phone: "+1 (555) 123-4567",
    linkedin: "https://linkedin.com/in/sarahjohnson",
    slug: "sarah-johnson",
  },
  {
    id: "2",
    name: "Michael Chen",
    position: "Chief Technology Officer",
    department: "Technology",
    bio: "Michael oversees our technology infrastructure and software development. He has a background in computer science and has led the development of our proprietary payroll software.",
    image: "/images/core/03.png",
    email: "michael@accupay.com",
    phone: "+1 (555) 123-4568",
    linkedin: "https://linkedin.com/in/michaelchen",
    slug: "michael-chen",
  },
  {
    id: "3",
    name: "Emily Rodriguez",
    position: "Head of Payroll Services",
    department: "Payroll",
    bio: "Emily manages our payroll services team and ensures all clients receive accurate, timely payroll processing. She has over 12 years of experience in payroll processing, tax compliance, and is a Certified Payroll Professional (CPP) with expertise in multi-state payroll regulations.",
    image: "/images/core/04.png",
    email: "emily@accupay.com",
    phone: "+1 (555) 123-4569",
    linkedin: "https://linkedin.com/in/emilyrodriguez",
    slug: "emily-rodriguez",
  },
  {
    id: "4",
    name: "David Thompson",
    position: "Senior Accountant",
    department: "Accounting",
    bio: "David provides accounting services to our clients and ensures compliance with all financial regulations. He is a CPA with over 10 years of experience in small business accounting and specializes in payroll tax compliance and financial reporting for payroll operations.",
    image: "/images/core/05.png",
    email: "david@accupay.com",
    phone: "+1 (555) 123-4570",
    linkedin: "https://linkedin.com/in/davidthompson",
    slug: "david-thompson",
  },
  {
    id: "5",
    name: "Lisa Wang",
    position: "Tax Specialist",
    department: "Taxation",
    bio: "Lisa specializes in tax preparation and planning for our clients. She is an Enrolled Agent with extensive experience in payroll tax filings, quarterly returns, and year-end tax compliance. She ensures all our clients meet their tax obligations accurately and on time.",
    image: "/images/core/06.png",
    email: "lisa@accupay.com",
    phone: "+1 (555) 123-4571",
    linkedin: "https://linkedin.com/in/lisawang",
    slug: "lisa-wang",
  },
  {
    id: "6",
    name: "Robert Martinez",
    position: "Client Success Manager",
    department: "Customer Success",
    bio: "Robert ensures our clients receive exceptional service and support. He works closely with clients to understand their needs and provide tailored solutions.",
    image: "/images/core/02.png",
    email: "robert@accupay.com",
    phone: "+1 (555) 123-4572",
    linkedin: "https://linkedin.com/in/robertmartinez",
    slug: "robert-martinez",
  },
];

const departments = [
  "All",
  "Leadership",
  "Technology",
  "Payroll",
  "Accounting",
  "Taxation",
  "Customer Success",
];

export default function TeamClient() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("All");

  // Filter team members based on search and department
  const filteredMembers = useMemo(() => {
    let filtered = teamMembers;

    // Filter by department
    if (selectedDepartment !== "All") {
      filtered = filtered.filter(
        (member) => member.department === selectedDepartment
      );
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (member) =>
          member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          member.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
          member.bio.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filtered;
  }, [searchTerm, selectedDepartment]);

  const handleDepartmentChange = (department: string) => {
    setSelectedDepartment(department);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <main>
      {/* Hero Section */}
      <section className="stp-30 sbp-30 bg-repeat hero_bg_gradient">
        <div className="container">
          <div className="text-center">
            <p className="uppercase text-base lg:text-xl font-semibold text-s2 animate__animated animate__fadeInUp">
              Our Team
            </p>
            <h1 className="display-2 text-s1 animate__animated animate__fadeInUp">
              Meet Our Experts
            </h1>
            <p className="text-lg text-white/80 animate__animated animate__fadeInUp max-w-3xl mx-auto">
              Our team of payroll experts, CPAs, and tax specialists is
              dedicated to providing exceptional payroll services, ensuring
              compliance, and helping your business streamline its payroll
              operations.
            </p>
          </div>
        </div>
      </section>

      {/* Search and Department Filter */}
      <section className="stp-15 sbp-15 bg-white">
        <div className="container">
          {/* Search Input */}
          <div className="max-w-md mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-bodyText w-5 h-5" />
              <input
                type="text"
                placeholder="Search team members..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="w-full pl-10 pr-4 py-3 border border-strokeColor rounded-full focus:outline-none focus:ring-2 focus:ring-s2 focus:border-transparent"
              />
            </div>
          </div>

          {/* Department Filter */}
          <div className="flex flex-wrap justify-center gap-2">
            {departments.map((department) => (
              <button
                key={department}
                onClick={() => handleDepartmentChange(department)}
                className={`px-4 py-2 rounded-full font-medium transition-colors duration-300 ${
                  department === selectedDepartment
                    ? "bg-s2 text-mainTextColor"
                    : "bg-gray-100 text-bodyText hover:bg-s2 hover:text-mainTextColor"
                }`}
              >
                {department}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Team Grid */}
      <section className="stp-30 sbp-30">
        <div className="container">
          {filteredMembers.length === 0 ? (
            <div className="text-center py-16">
              <h3 className="text-2xl font-bold text-s1 mb-4">
                No team members found
              </h3>
              <p className="text-bodyText mb-6">
                Try adjusting your search or department filter to find what
                you&apos;re looking for.
              </p>
              <button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedDepartment("All");
                }}
                className="bg-s2 text-mainTextColor px-6 py-3 rounded-full font-semibold hover:bg-s2/90 transition-colors duration-300"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-12 gap-6">
              {filteredMembers.map((member) => (
                <div
                  key={member.id}
                  className="col-span-12 md:col-span-6 lg:col-span-4 group"
                >
                  <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border border-strokeColor overflow-hidden">
                    <div className="relative">
                      <Image
                        src={member.image}
                        alt={member.name}
                        width={400}
                        height={300}
                        className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="bg-s2 text-mainTextColor px-3 py-1 rounded-full text-sm font-medium">
                          {member.department}
                        </span>
                      </div>
                    </div>

                    <div className="p-6">
                      <h3 className="text-xl font-bold text-s1 mb-2 group-hover:text-s2 transition-colors duration-300">
                        {member.name}
                      </h3>
                      <p className="text-s2 font-semibold mb-4">
                        {member.position}
                      </p>
                      <p className="text-bodyText mb-6 line-clamp-3">
                        {member.bio}
                      </p>

                      <div className="flex items-center gap-4 mb-6">
                        <a
                          href={`mailto:${member.email}`}
                          className="flex items-center gap-2 text-bodyText hover:text-s2 transition-colors duration-300"
                        >
                          <Mail className="w-4 h-4" />
                          <span className="text-sm">Email</span>
                        </a>
                        <a
                          href={`tel:${member.phone}`}
                          className="flex items-center gap-2 text-bodyText hover:text-s2 transition-colors duration-300"
                        >
                          <Phone className="w-4 h-4" />
                          <span className="text-sm">Call</span>
                        </a>
                        <a
                          href={member.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-bodyText hover:text-s2 transition-colors duration-300"
                        >
                          <Linkedin className="w-4 h-4" />
                          <span className="text-sm">LinkedIn</span>
                        </a>
                      </div>

                      <Link
                        href={`/team/${member.slug}`}
                        className="inline-flex items-center gap-2 text-s2 font-medium hover:text-s2/80 transition-colors duration-300"
                      >
                        Learn More
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="stp-30 sbp-30 bg-s1">
        <div className="container">
          <div className="text-center">
            <h2 className="display-3 text-s2 mb-6">
              Ready to Work with Our Team?
            </h2>
            <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              Our experienced payroll team is ready to help you streamline your
              payroll operations, ensure compliance, and achieve your business
              goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="bg-s2 text-mainTextColor px-8 py-4 rounded-full font-semibold hover:bg-s2/90 transition-colors duration-300"
              >
                Get Started Today
              </Link>
              <Link
                href="/about"
                className="border-2 border-s2 text-s2 px-8 py-4 rounded-full font-semibold hover:bg-s2 hover:text-mainTextColor transition-colors duration-300"
              >
                Learn More About Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
