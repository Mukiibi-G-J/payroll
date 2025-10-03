import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="bg-repeat stp-30 hero_bg_gradient overflow-hidden">
      <Image
        src="/images/hero_bg_element1.png"
        alt="image"
        className="absolute top-0 left-0 xxxl:left-36 max-lg:w-[300px] max-xxl:w-[500px] max-md:hidden"
        width={500}
        height={400}
      />
      <Image
        src="/images/hero_bg_element2.png"
        alt="image"
        className="absolute top-0 right-0 max-xxl:w-[300px] max-sm:hidden"
        width={300}
        height={400}
      />
      <div className="absolute -left-[200px] -bottom-1/2 bg-white blur-[200px] rounded-[1176px] max-w-full lg:w-[1176px] h-[1176px] overflow-hidden"></div>
      <div className="xxl:ml-[calc((100%-1296px)/2)] lg:max-xxl:py-10 max-xxl:container relative z-20 max-lg:pt-15 text-s1 grid grid-cols-12">
        <Image
          src="/images/hero_bg_element3.png"
          alt="image"
          className="absolute top-1/3 left-1/3 max-sm:hidden"
          width={200}
          height={200}
        />
        <div className="col-span-12 lg:col-span-5 flex flex-col justify-center gap-2">
          <p className="uppercase text-base lg:text-xl font-semibold animate__animated animate__fadeInUp">
            Professional Payroll Services
          </p>
          <div className="display-2">
            We Make
            <div className="text-s3 inline-flex">Payroll</div>
            <br />
            Painless.
          </div>
          <p className="max-w-[550px]">
            Streamline your payroll process with our comprehensive payroll
            services. We handle everything from employee payments to tax
            compliance, giving you peace of mind and more time to focus on
            growing your business.
          </p>
          <div className="flex justify-start items-center gap-4 pt-6 lg:pt-8 pb-15">
            <Link
              href="/contact"
              className="font-medium bg-s2 py-2 lg:py-3 px-4 lg:px-6 rounded-full text-mainTextColor"
            >
              Get Started
            </Link>
            <Link href="/payroll-processing" className="underline font-medium">
              Our Services
            </Link>
          </div>
        </div>
        <div className="col-span-12 lg:col-span-6 lg:col-start-7">
          <Image
            src="/images/hero_illus.png"
            alt="image"
            width={600}
            height={500}
          />
        </div>
      </div>
    </section>
  );
}
