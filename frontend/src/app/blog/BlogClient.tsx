"use client";

import Image from "next/image";
import Link from "next/link";
import { Calendar, User, ArrowRight, Search } from "lucide-react";
import { useState, useMemo } from "react";

// Mock blog data - in a real app, this would come from a CMS or database
const blogPosts = [
  {
    id: "1",
    title: "5 Essential Payroll Tips for Small Businesses",
    excerpt:
      "Learn the key strategies to streamline your payroll process and avoid common mistakes that can cost your business time and money.",
    author: "Sarah Johnson",
    date: "2024-01-15",
    category: "Payroll",
    readTime: "5 min read",
    image: "/images/core/02.png",
    slug: "5-essential-payroll-tips-small-businesses",
  },
  {
    id: "2",
    title: "Understanding Tax Deductions for Healthcare Practices",
    excerpt:
      "Discover the tax deductions available to healthcare providers and how to maximize your savings while staying compliant.",
    author: "Michael Chen",
    date: "2024-01-12",
    category: "Taxation",
    readTime: "7 min read",
    image: "/images/core/03.png",
    slug: "tax-deductions-healthcare-practices",
  },
  {
    id: "3",
    title: "The Future of Remote Work Payroll",
    excerpt:
      "Explore how remote work is changing payroll processing and what businesses need to know about multi-state compliance.",
    author: "Emily Rodriguez",
    date: "2024-01-10",
    category: "Payroll",
    readTime: "6 min read",
    image: "/images/core/04.png",
    slug: "future-remote-work-payroll",
  },
  {
    id: "4",
    title: "Accounting Software Comparison: QuickBooks vs Xero",
    excerpt:
      "A comprehensive comparison of the top accounting software platforms to help you choose the right solution for your business.",
    author: "David Thompson",
    date: "2024-01-08",
    category: "Accounting",
    readTime: "8 min read",
    image: "/images/core/05.png",
    slug: "accounting-software-comparison-quickbooks-xero",
  },
  {
    id: "5",
    title: "Year-End Tax Planning Strategies",
    excerpt:
      "Essential year-end tax planning strategies to help you minimize your tax burden and prepare for the upcoming tax season.",
    author: "Lisa Wang",
    date: "2024-01-05",
    category: "Taxation",
    readTime: "9 min read",
    image: "/images/core/06.png",
    slug: "year-end-tax-planning-strategies",
  },
  {
    id: "6",
    title: "Real Estate Accounting Best Practices",
    excerpt:
      "Learn the essential accounting practices for real estate professionals to maintain accurate records and maximize profitability.",
    author: "Robert Martinez",
    date: "2024-01-03",
    category: "Real Estate",
    readTime: "6 min read",
    image: "/images/core/02.png",
    slug: "real-estate-accounting-best-practices",
  },
];

const categories = [
  "All",
  "Payroll",
  "Accounting",
  "Taxation",
  "Real Estate",
  "Healthcare",
  "Dentist",
];

export default function BlogClient() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  // Filter and search functionality
  const filteredPosts = useMemo(() => {
    let filtered = blogPosts;

    // Filter by category
    if (selectedCategory !== "All") {
      filtered = filtered.filter((post) => post.category === selectedCategory);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (post) =>
          post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.author.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filtered;
  }, [searchTerm, selectedCategory]);

  // Pagination
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;
  const currentPosts = filteredPosts.slice(startIndex, endIndex);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1); // Reset to first page when changing category
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page when searching
  };

  return (
    <main>
      {/* Hero Section */}
      <section className="stp-30 sbp-30 bg-repeat hero_bg_gradient">
        <div className="container">
          <div className="text-center">
            <p className="uppercase text-base lg:text-xl font-semibold text-s2 animate__animated animate__fadeInUp">
              Our Blog
            </p>
            <h1 className="display-2 text-s1 animate__animated animate__fadeInUp">
              Insights & Updates
            </h1>
            <p className="text-lg text-white/80 animate__animated animate__fadeInUp max-w-3xl mx-auto">
              Stay informed with the latest insights, tips, and updates on
              payroll, accounting, and business services from our team of
              experts.
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="stp-15 sbp-15 bg-white">
        <div className="container">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-bodyText w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search blog posts..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="w-full pl-12 pr-4 py-3 border border-strokeColor rounded-full focus:outline-none focus:border-s2 transition-colors duration-300"
                />
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => handleCategoryChange(category)}
                  className={`px-4 py-2 rounded-full font-medium transition-colors duration-300 ${
                    selectedCategory === category
                      ? "bg-s2 text-mainTextColor"
                      : "bg-gray-100 text-bodyText hover:bg-s2 hover:text-mainTextColor"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="stp-30 sbp-30">
        <div className="container">
          {filteredPosts.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-2xl font-bold text-s1 mb-4">
                No posts found
              </h3>
              <p className="text-bodyText mb-6">
                Try adjusting your search terms or category filter.
              </p>
              <button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("All");
                }}
                className="bg-s2 text-mainTextColor px-6 py-3 rounded-full font-semibold hover:bg-s2/90 transition-colors duration-300"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-12 gap-6">
              {currentPosts.map((post) => (
                <article
                  key={post.id}
                  className="col-span-12 md:col-span-6 lg:col-span-4 group"
                >
                  <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border border-strokeColor overflow-hidden">
                    <div className="relative">
                      <Image
                        src={post.image}
                        alt={post.title}
                        width={400}
                        height={250}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="bg-s2 text-mainTextColor px-3 py-1 rounded-full text-sm font-medium">
                          {post.category}
                        </span>
                      </div>
                    </div>

                    <div className="p-6">
                      <div className="flex items-center gap-4 text-sm text-bodyText mb-4">
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4" />
                          <span>{post.author}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          <span>
                            {new Date(post.date).toLocaleDateString()}
                          </span>
                        </div>
                      </div>

                      <h2 className="text-xl font-bold text-s1 mb-3 group-hover:text-s2 transition-colors duration-300">
                        {post.title}
                      </h2>

                      <p className="text-bodyText mb-4 line-clamp-3">
                        {post.excerpt}
                      </p>

                      <div className="flex items-center justify-between">
                        <span className="text-sm text-bodyText">
                          {post.readTime}
                        </span>
                        <Link
                          href={`/blog/${post.slug}`}
                          className="inline-flex items-center gap-2 text-s2 font-medium hover:text-s2/80 transition-colors duration-300"
                        >
                          Read More
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Pagination */}
      {totalPages > 1 && (
        <section className="stp-15 sbp-30">
          <div className="container">
            <div className="flex justify-center">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-2 rounded-lg border border-strokeColor text-bodyText hover:bg-s2 hover:text-mainTextColor transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`px-3 py-2 rounded-lg transition-colors duration-300 ${
                        currentPage === page
                          ? "bg-s2 text-mainTextColor"
                          : "border border-strokeColor text-bodyText hover:bg-s2 hover:text-mainTextColor"
                      }`}
                    >
                      {page}
                    </button>
                  )
                )}

                <button
                  onClick={() =>
                    setCurrentPage(Math.min(totalPages, currentPage + 1))
                  }
                  disabled={currentPage === totalPages}
                  className="px-3 py-2 rounded-lg border border-strokeColor text-bodyText hover:bg-s2 hover:text-mainTextColor transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Newsletter Signup */}
      <section className="stp-30 sbp-30 bg-s1">
        <div className="container">
          <div className="text-center">
            <h2 className="display-3 text-s2 mb-6">Stay Updated</h2>
            <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              Subscribe to our newsletter and never miss the latest insights and
              updates from our experts.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-full border border-white/20 bg-white/10 text-white placeholder-white/60 focus:outline-none focus:border-s2"
              />
              <button className="bg-s2 text-mainTextColor px-6 py-3 rounded-full font-semibold hover:bg-s2/90 transition-colors duration-300">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
