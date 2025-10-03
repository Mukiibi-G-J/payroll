import Link from "next/link";
import Image from "next/image";
import {
  Phone,
  Mail,
  MapPin,
  ArrowRight,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Clock,
  Award,
  Shield,
} from "lucide-react";
import NewsletterSignup from "@/components/forms/NewsletterSignup";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    services: [
      { name: "Payroll Processing", href: "/payroll-processing" },
      { name: "Accounting Services", href: "/accounting-services" },
      { name: "Taxation Services", href: "/taxation-services" },
    ],
    company: [
      { name: "About Us", href: "/about" },
      { name: "Our Team", href: "/team" },
      { name: "Careers", href: "/careers" },
      { name: "Contact", href: "/contact" },
      { name: "Blog", href: "/blog" },
    ],
    support: [
      { name: "Help Center", href: "/help" },
      { name: "Documentation", href: "/docs" },
      { name: "API Reference", href: "/api" },
      { name: "Status", href: "/status" },
      { name: "Security", href: "/security" },
    ],
    legal: [
      { name: "Privacy Policy", href: "/privacy-policy" },
      { name: "Terms of Service", href: "/terms-conditions" },
      { name: "Cookie Policy", href: "/cookies" },
      { name: "GDPR", href: "/gdpr" },
      { name: "Compliance", href: "/compliance" },
    ],
  };

  const socialLinks = [
    { name: "Facebook", icon: Facebook, href: "https://facebook.com/accupay" },
    { name: "Twitter", icon: Twitter, href: "https://twitter.com/accupay" },
    {
      name: "LinkedIn",
      icon: Linkedin,
      href: "https://linkedin.com/company/accupay",
    },
    {
      name: "Instagram",
      icon: Instagram,
      href: "https://instagram.com/accupay",
    },
  ];

  return (
    <footer className="bg-s1 text-white">
      {/* Newsletter Signup */}
      <div className="bg-s1/50 py-16">
        <div className="container">
          <div className="max-w-2xl mx-auto">
            <NewsletterSignup />
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container py-16">
        <div className="grid grid-cols-12 gap-8">
          {/* Company Info */}
          <div className="col-span-12 lg:col-span-4">
            <Link href="/" className="inline-block mb-6">
              <Image
                src="/images/logo.png"
                alt="Accupay Logo"
                width={150}
                height={50}
                className="brightness-0 invert"
              />
            </Link>
            <p className="text-white/80 mb-6 max-w-sm">
              We make payroll painless. Streamline your business operations with
              our comprehensive payroll processing, accounting, and taxation
              services.
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-s2" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-s2" />
                <span>info@accupay.com</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-s2" />
                <span>123 Business Street, Suite 100, New York, NY 10001</span>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-s2" />
                <span>Mon-Fri: 9AM-6PM EST</span>
              </div>
            </div>

            {/* Certifications */}
            <div className="mt-8">
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-2 text-white/80">
                  <Award className="w-4 h-4 text-s2" />
                  <span className="text-sm">CPA Certified</span>
                </div>
                <div className="flex items-center gap-2 text-white/80">
                  <Shield className="w-4 h-4 text-s2" />
                  <span className="text-sm">SOC 2 Compliant</span>
                </div>
              </div>
            </div>
          </div>

          {/* Services Links */}
          <div className="col-span-12 md:col-span-6 lg:col-span-2">
            <h3 className="text-lg font-bold text-s2 mb-6">Services</h3>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-white/80 hover:text-s2 transition-colors duration-300 flex items-center gap-2 group"
                  >
                    <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div className="col-span-12 md:col-span-6 lg:col-span-2">
            <h3 className="text-lg font-bold text-s2 mb-6">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-white/80 hover:text-s2 transition-colors duration-300 flex items-center gap-2 group"
                  >
                    <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div className="col-span-12 md:col-span-6 lg:col-span-2">
            <h3 className="text-lg font-bold text-s2 mb-6">Support</h3>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-white/80 hover:text-s2 transition-colors duration-300 flex items-center gap-2 group"
                  >
                    <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div className="col-span-12 md:col-span-6 lg:col-span-2">
            <h3 className="text-lg font-bold text-s2 mb-6">Legal</h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-white/80 hover:text-s2 transition-colors duration-300 flex items-center gap-2 group"
                  >
                    <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-white/10">
        <div className="container py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-white/60 text-sm">
              © {currentYear} Accupay. All rights reserved.
            </div>

            <div className="flex items-center gap-6">
              <div className="flex items-center gap-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/60 hover:text-s2 transition-colors duration-300"
                    aria-label={social.name}
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
