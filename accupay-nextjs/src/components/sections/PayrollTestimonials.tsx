import Image from "next/image";
import { Star } from "lucide-react";

export default function PayrollTestimonials() {
  const testimonials = [
    {
      name: "Sarah Johnson",
      company: "TechStart Inc.",
      role: "CEO",
      image: "/images/team-1.png",
      rating: 5,
      text: "AccuPay has transformed our payroll process. What used to take hours now takes minutes, and the accuracy is unmatched.",
    },
    {
      name: "Michael Chen",
      company: "Global Solutions",
      role: "HR Director",
      image: "/images/team-2.png",
      rating: 5,
      text: "The compliance features are outstanding. We never worry about tax deadlines or regulatory changes anymore.",
    },
    {
      name: "Emily Rodriguez",
      company: "Growth Corp",
      role: "Finance Manager",
      image: "/images/team-3.png",
      rating: 5,
      text: "Customer support is exceptional. They helped us transition smoothly and continue to provide excellent service.",
    },
  ];

  return (
    <section className="stp-30 sbp-30">
      <div className="container">
        <div className="text-center mb-16">
          <p className="bg-p1 py-3 px-5 rounded-full text-white inline-block animate__animated animate__fadeInUp">
            Testimonials
          </p>
          <h1 className="display-4 pt-4 pb-6 animate__animated animate__fadeInDown">
            What our payroll clients say
          </h1>
          <p className="text-bodyText max-w-[600px] mx-auto animate__animated animate__fadeInDown">
            Don&apos;t just take our word for it. Here&apos;s what business
            owners and HR professionals say about our payroll services.
          </p>
        </div>

        <div className="grid grid-cols-12 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="col-span-12 md:col-span-6 lg:col-span-4 animate__animated animate__fadeInUp"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="bg-white p-8 rounded-lg border border-strokeColor hover:border-s1 duration-300 h-full">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-s2 fill-current" />
                  ))}
                </div>
                <p className="text-bodyText mb-6 italic">
                  &ldquo;{testimonial.text}&rdquo;
                </p>
                <div className="flex items-center gap-4">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    width={50}
                    height={50}
                    className="rounded-full"
                  />
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
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
