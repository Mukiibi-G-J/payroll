import Image from "next/image";
import { FileText, HandHeart, Lightbulb, Rocket } from "lucide-react";

export default function PayrollSolutions() {
  const solutions = [
    {
      icon: FileText,
      title: "Tax Preparation",
      description:
        "Comprehensive tax preparation and filing services for all your payroll needs.",
    },
    {
      icon: HandHeart,
      title: "Payroll Processing",
      description:
        "Streamlined payroll processing that ensures accurate and timely payments.",
    },
    {
      icon: Lightbulb,
      title: "Cost Effective",
      description:
        "Reduce payroll costs while maintaining compliance and accuracy.",
    },
    {
      icon: Rocket,
      title: "Scale Rapidly",
      description:
        "Grow your business with payroll solutions that scale with your needs.",
    },
  ];

  return (
    <section className="stp-30 sbp-30 relative">
      <Image
        src="/images/circleIcon.png"
        alt="circle icon"
        className="absolute top-10 left-0 max-xxl:hidden xxl:-left-72 xxxl:-left-40"
        width={100}
        height={100}
      />
      <Image
        src="/images/sliceIcon.png"
        alt="slice icon"
        className="absolute right-0 sm:right-2 lg:right-10 top-10 xl:top-32 max-md:h-[80px]"
        width={100}
        height={100}
      />
      <div className="container z-10 relative">
        <div className="flex justify-center items-center">
          <div className="flex justify-center items-center max-xxl:overflow-hidden">
            <div className="max-w-[700px] text-center flex justify-center items-center flex-col">
              <p className="bg-p1 py-2 sm:py-3 px-5 rounded-full text-white animate__animated animate__fadeInUp">
                Solutions
              </p>
              <h1 className="display-4 pt-4 pb-4 lg:pb-6 animate__animated animate__fadeInDown">
                The global payroll solution
              </h1>
              <p className="text-bodyText animate__animated animate__fadeInDown">
                When it comes to payroll solutions, we have a variety of options
                that benefit both your company and your employees.
              </p>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-12 stp-15 max-lg:gap-6">
          <div className="col-span-12 lg:col-span-6">
            <div className="flex justify-center items-center overflow-hidden self-stretch">
              <Image
                src="/images/solution_illustrations.png"
                alt="Payroll solutions illustration"
                className="hover:scale-110 duration-500 w-full"
                width={600}
                height={400}
              />
            </div>
          </div>
          <div className="col-span-12 lg:col-start-8 lg:col-span-5 flex justify-center items-start flex-col">
            <h1 className="heading-1 pb-5">Consolidate Payroll Processing</h1>
            <p className="text-bodyText">
              We have designed a fast and effective payroll system that
              streamlines your payment process.
            </p>
            <div className="grid grid-cols-2 gap-4 lg:gap-6 py-6 lg:py-10 w-full">
              {solutions.map((solution, index) => (
                <div
                  key={index}
                  className="group col-span-2 sm:col-span-1 flex justify-start items-center gap-5"
                >
                  <div className="rounded-full border border-strokeColor bg-softBg w-[60px] h-[60px] sm:w-[80px] sm:h-[80px] text-4xl text-s1 group-hover:text-mainTextColor group-hover:bg-s2 group-hover:border-mainTextColor duration-500 flex justify-center items-center">
                    <solution.icon className="w-6 h-6" />
                  </div>
                  <p className="text-lg font-medium group-hover:text-s1 duration-500">
                    {solution.title}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
