import { Users, HandCoins, UserCog, Shield } from "lucide-react";
import Link from "next/link";

export default function PayrollFeatures() {
  const features = [
    {
      icon: Users,
      title: "Employee Management",
      description:
        "Easily manage employee information, benefits, and payroll data with our comprehensive system.",
      link: "/contact",
    },
    {
      icon: HandCoins,
      title: "Global Payroll",
      description:
        "Streamline your global payroll with precision and compliance. Our expert services ensure accurate and timely payments.",
      link: "/contact",
    },
    {
      icon: UserCog,
      title: "Contractor Services",
      description:
        "Reliable contractor payroll services delivering quality processing and exceptional compliance support.",
      link: "/contact",
    },
    {
      icon: Shield,
      title: "Compliance & Security",
      description:
        "Stay compliant with all payroll regulations while maintaining the highest security standards for your data.",
      link: "/contact",
    },
  ];

  return (
    <section className="bg-softBg1 stp-30 sbp-30">
      <div className="container">
        <div className="flex justify-between items-end gap-6 max-lg:flex-col max-lg:items-start">
          <div className="max-w-[600px] flex justify-center items-start flex-col">
            <p className="bg-p1 py-3 px-5 rounded-full text-white animate__animated animate__fadeInUp">
              Features
            </p>
            <h1 className="display-4 pt-4 animate__animated animate__fadeInDown">
              Perfect payroll solutions for your business
            </h1>
          </div>
          <p className="text-bodyText max-w-[500px]">
            We&apos;re simplifying every aspect of managing payroll, from
            employee payments to tax compliance. It&apos;s one platform made to
            get you set up.
          </p>
        </div>
        <div className="grid grid-cols-12 gap-6 stp-15">
          {features.map((feature, index) => (
            <div
              key={index}
              className="col-span-12 sm:col-span-6 lg:col-span-3 animate__animated animate__fadeInUp"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="bg-white p-6 xl:p-8 flex flex-col border border-white group hover:border-mainTextColor duration-700 hover:bg-s2">
                <div className="text-4xl text-s1 pb-6 group-hover:text-mainTextColor duration-500">
                  <feature.icon className="w-10 h-10" />
                </div>
                <h4 className="heading-4 pb-5">{feature.title}</h4>
                <p className="text-bodyText pb-6">{feature.description}</p>
                <Link
                  href={feature.link}
                  className="flex justify-start items-center gap-2 font-medium"
                >
                  Learn more <span className="text-s1">→</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
