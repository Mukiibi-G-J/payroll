import Link from "next/link";
import { ArrowRight, CheckCircle } from "lucide-react";

export default function PayrollCTA() {
  const benefits = [
    "Automated payroll processing",
    "Tax compliance guaranteed",
    "24/7 customer support",
    "Secure data protection",
  ];

  return (
    <section className="bg-s1 text-white stp-30 sbp-30">
      <div className="container">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="display-3 mb-6 animate__animated animate__fadeInDown">
            Ready to streamline your payroll?
          </h1>
          <p className="text-xl text-white/90 mb-8 animate__animated animate__fadeInUp">
            Join thousands of businesses who trust AccuPay for their payroll
            needs. Get started today and experience the difference.
          </p>

          <div className="grid grid-cols-12 gap-6 mb-10">
            <div className="col-span-12 md:col-span-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-4">What you get:</h3>
                <ul className="space-y-3">
                  {benefits.map((benefit, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-s2 flex-shrink-0" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="col-span-12 md:col-span-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-4">
                  Get started in minutes:
                </h3>
                <ol className="space-y-3 text-left">
                  <li className="flex items-start gap-3">
                    <span className="bg-s2 text-s1 rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold flex-shrink-0">
                      1
                    </span>
                    <span>Contact our payroll experts</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="bg-s2 text-s1 rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold flex-shrink-0">
                      2
                    </span>
                    <span>Get a customized quote</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="bg-s2 text-s1 rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold flex-shrink-0">
                      3
                    </span>
                    <span>Start processing payroll</span>
                  </li>
                </ol>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate__animated animate__fadeInUp">
            <Link
              href="/contact"
              className="bg-s2 text-s1 px-8 py-4 rounded-full font-semibold hover:bg-s3 duration-300 flex items-center gap-2 group"
            >
              Get Started Today
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 duration-300" />
            </Link>
            <Link
              href="/pricing"
              className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-s1 duration-300"
            >
              View Pricing
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
