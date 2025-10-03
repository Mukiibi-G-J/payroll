"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CheckCircle, AlertCircle, Loader2 } from "lucide-react";

const payrollContactSchema = z.object({
  // Company Information
  companyName: z.string().min(2, "Company name is required"),
  industry: z.string().min(2, "Industry is required"),
  employeeCount: z.string().min(1, "Employee count is required"),
  currentPayrollProvider: z.string().optional(),

  // Contact Information
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().min(10, "Valid phone number is required"),
  jobTitle: z.string().min(2, "Job title is required"),

  // Payroll Needs
  payrollNeeds: z
    .array(z.string())
    .min(1, "Please select at least one payroll need"),
  specificRequirements: z.string().optional(),

  // Contact Preferences
  preferredContactMethod: z.string().min(1, "Please select a contact method"),
  bestTimeToContact: z
    .string()
    .min(1, "Please select the best time to contact you"),
  urgency: z.string().min(1, "Please select urgency level"),

  // Additional Information
  additionalInfo: z.string().optional(),

  // Consent
  agreeToTerms: z
    .boolean()
    .refine((val) => val === true, "You must agree to the terms"),
  agreeToMarketing: z.boolean().optional(),
});

type PayrollContactFormData = z.infer<typeof payrollContactSchema>;

const payrollNeedsOptions = [
  "Payroll Processing",
  "Tax Filing & Compliance",
  "Employee Self-Service Portal",
  "Time Tracking Integration",
  "HR System Integration",
  "Multi-State Payroll",
  "Contractor Payments",
  "Benefits Administration",
  "Reporting & Analytics",
  "Payroll Consulting",
];

const contactMethods = [
  "Phone Call",
  "Email",
  "Video Call",
  "In-Person Meeting",
];

const timeSlots = [
  "Morning (9AM-12PM)",
  "Afternoon (12PM-5PM)",
  "Evening (5PM-8PM)",
  "Weekend",
];

const urgencyLevels = [
  "Immediate (within 24 hours)",
  "Within a week",
  "Within a month",
  "Just exploring options",
];

export default function PayrollContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<PayrollContactFormData>({
    resolver: zodResolver(payrollContactSchema),
    defaultValues: {
      payrollNeeds: [],
      agreeToTerms: false,
      agreeToMarketing: false,
    },
  });

  const watchedPayrollNeeds = watch("payrollNeeds");

  const togglePayrollNeed = (need: string) => {
    const currentNeeds = watchedPayrollNeeds || [];
    if (currentNeeds.includes(need)) {
      setValue(
        "payrollNeeds",
        currentNeeds.filter((n) => n !== need)
      );
    } else {
      setValue("payrollNeeds", [...currentNeeds, need]);
    }
  };

  const onSubmit = async (data: PayrollContactFormData) => {
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      console.log("Form submitted:", data);
      setSubmitStatus("success");
    } catch (error) {
      console.error("Form submission error:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitStatus === "success") {
    return (
      <div className="text-center py-12">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-s1 mb-4">Thank You!</h3>
        <p className="text-bodyText mb-6">
          Your payroll inquiry has been received. Our team will contact you
          within 24 hours to discuss your payroll needs and how we can help
          streamline your process.
        </p>
        <button
          onClick={() => setSubmitStatus("idle")}
          className="bg-s2 text-mainTextColor px-6 py-3 rounded-full font-semibold hover:bg-s2/90 transition-colors duration-300"
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {/* Company Information */}
      <div>
        <h3 className="text-xl font-semibold text-s1 mb-6">
          Company Information
        </h3>
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-6">
            <label className="block text-sm font-medium text-s1 mb-2">
              Company Name *
            </label>
            <input
              {...register("companyName")}
              className="w-full px-4 py-3 border border-strokeColor rounded-lg focus:border-s2 focus:outline-none"
              placeholder="Your company name"
            />
            {errors.companyName && (
              <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {errors.companyName.message}
              </p>
            )}
          </div>
          <div className="col-span-12 md:col-span-6">
            <label className="block text-sm font-medium text-s1 mb-2">
              Industry *
            </label>
            <input
              {...register("industry")}
              className="w-full px-4 py-3 border border-strokeColor rounded-lg focus:border-s2 focus:outline-none"
              placeholder="e.g., Technology, Healthcare, Retail"
            />
            {errors.industry && (
              <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {errors.industry.message}
              </p>
            )}
          </div>
          <div className="col-span-12 md:col-span-6">
            <label className="block text-sm font-medium text-s1 mb-2">
              Number of Employees *
            </label>
            <select
              {...register("employeeCount")}
              className="w-full px-4 py-3 border border-strokeColor rounded-lg focus:border-s2 focus:outline-none"
            >
              <option value="">Select employee count</option>
              <option value="1-10">1-10 employees</option>
              <option value="11-50">11-50 employees</option>
              <option value="51-200">51-200 employees</option>
              <option value="201-500">201-500 employees</option>
              <option value="500+">500+ employees</option>
            </select>
            {errors.employeeCount && (
              <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {errors.employeeCount.message}
              </p>
            )}
          </div>
          <div className="col-span-12 md:col-span-6">
            <label className="block text-sm font-medium text-s1 mb-2">
              Current Payroll Provider
            </label>
            <input
              {...register("currentPayrollProvider")}
              className="w-full px-4 py-3 border border-strokeColor rounded-lg focus:border-s2 focus:outline-none"
              placeholder="e.g., ADP, Paychex, In-house"
            />
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div>
        <h3 className="text-xl font-semibold text-s1 mb-6">
          Contact Information
        </h3>
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-6">
            <label className="block text-sm font-medium text-s1 mb-2">
              First Name *
            </label>
            <input
              {...register("firstName")}
              className="w-full px-4 py-3 border border-strokeColor rounded-lg focus:border-s2 focus:outline-none"
              placeholder="Your first name"
            />
            {errors.firstName && (
              <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {errors.firstName.message}
              </p>
            )}
          </div>
          <div className="col-span-12 md:col-span-6">
            <label className="block text-sm font-medium text-s1 mb-2">
              Last Name *
            </label>
            <input
              {...register("lastName")}
              className="w-full px-4 py-3 border border-strokeColor rounded-lg focus:border-s2 focus:outline-none"
              placeholder="Your last name"
            />
            {errors.lastName && (
              <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {errors.lastName.message}
              </p>
            )}
          </div>
          <div className="col-span-12 md:col-span-6">
            <label className="block text-sm font-medium text-s1 mb-2">
              Email Address *
            </label>
            <input
              {...register("email")}
              type="email"
              className="w-full px-4 py-3 border border-strokeColor rounded-lg focus:border-s2 focus:outline-none"
              placeholder="your.email@company.com"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {errors.email.message}
              </p>
            )}
          </div>
          <div className="col-span-12 md:col-span-6">
            <label className="block text-sm font-medium text-s1 mb-2">
              Phone Number *
            </label>
            <input
              {...register("phone")}
              type="tel"
              className="w-full px-4 py-3 border border-strokeColor rounded-lg focus:border-s2 focus:outline-none"
              placeholder="(555) 123-4567"
            />
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {errors.phone.message}
              </p>
            )}
          </div>
          <div className="col-span-12">
            <label className="block text-sm font-medium text-s1 mb-2">
              Job Title *
            </label>
            <input
              {...register("jobTitle")}
              className="w-full px-4 py-3 border border-strokeColor rounded-lg focus:border-s2 focus:outline-none"
              placeholder="e.g., HR Manager, CEO, Finance Director"
            />
            {errors.jobTitle && (
              <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {errors.jobTitle.message}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Payroll Needs */}
      <div>
        <h3 className="text-xl font-semibold text-s1 mb-6">Payroll Needs *</h3>
        <p className="text-bodyText mb-4">Select all that apply:</p>
        <div className="grid grid-cols-12 gap-4">
          {payrollNeedsOptions.map((need, index) => (
            <div
              key={index}
              className="col-span-12 sm:col-span-6 lg:col-span-4"
            >
              <label className="flex items-center gap-3 p-4 border border-strokeColor rounded-lg cursor-pointer hover:bg-softBg1 transition-colors duration-300">
                <input
                  type="checkbox"
                  checked={watchedPayrollNeeds?.includes(need) || false}
                  onChange={() => togglePayrollNeed(need)}
                  className="w-4 h-4 text-s2 border-strokeColor rounded focus:ring-s2"
                />
                <span className="text-sm font-medium">{need}</span>
              </label>
            </div>
          ))}
        </div>
        {errors.payrollNeeds && (
          <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
            <AlertCircle className="w-4 h-4" />
            {errors.payrollNeeds.message}
          </p>
        )}
      </div>

      {/* Specific Requirements */}
      <div>
        <label className="block text-sm font-medium text-s1 mb-2">
          Specific Requirements or Questions
        </label>
        <textarea
          {...register("specificRequirements")}
          rows={4}
          className="w-full px-4 py-3 border border-strokeColor rounded-lg focus:border-s2 focus:outline-none"
          placeholder="Tell us about any specific payroll requirements, compliance needs, or questions you have..."
        />
      </div>

      {/* Contact Preferences */}
      <div>
        <h3 className="text-xl font-semibold text-s1 mb-6">
          Contact Preferences
        </h3>
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-6">
            <label className="block text-sm font-medium text-s1 mb-2">
              Preferred Contact Method *
            </label>
            <select
              {...register("preferredContactMethod")}
              className="w-full px-4 py-3 border border-strokeColor rounded-lg focus:border-s2 focus:outline-none"
            >
              <option value="">Select contact method</option>
              {contactMethods.map((method, index) => (
                <option key={index} value={method}>
                  {method}
                </option>
              ))}
            </select>
            {errors.preferredContactMethod && (
              <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {errors.preferredContactMethod.message}
              </p>
            )}
          </div>
          <div className="col-span-12 md:col-span-6">
            <label className="block text-sm font-medium text-s1 mb-2">
              Best Time to Contact *
            </label>
            <select
              {...register("bestTimeToContact")}
              className="w-full px-4 py-3 border border-strokeColor rounded-lg focus:border-s2 focus:outline-none"
            >
              <option value="">Select best time</option>
              {timeSlots.map((time, index) => (
                <option key={index} value={time}>
                  {time}
                </option>
              ))}
            </select>
            {errors.bestTimeToContact && (
              <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {errors.bestTimeToContact.message}
              </p>
            )}
          </div>
          <div className="col-span-12">
            <label className="block text-sm font-medium text-s1 mb-2">
              Urgency Level *
            </label>
            <select
              {...register("urgency")}
              className="w-full px-4 py-3 border border-strokeColor rounded-lg focus:border-s2 focus:outline-none"
            >
              <option value="">Select urgency level</option>
              {urgencyLevels.map((level, index) => (
                <option key={index} value={level}>
                  {level}
                </option>
              ))}
            </select>
            {errors.urgency && (
              <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {errors.urgency.message}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Additional Information */}
      <div>
        <label className="block text-sm font-medium text-s1 mb-2">
          Additional Information
        </label>
        <textarea
          {...register("additionalInfo")}
          rows={4}
          className="w-full px-4 py-3 border border-strokeColor rounded-lg focus:border-s2 focus:outline-none"
          placeholder="Any additional information that would help us better understand your payroll needs..."
        />
      </div>

      {/* Consent */}
      <div className="space-y-4">
        <label className="flex items-start gap-3">
          <input
            {...register("agreeToTerms")}
            type="checkbox"
            className="w-4 h-4 text-s2 border-strokeColor rounded focus:ring-s2 mt-1"
          />
          <span className="text-sm text-bodyText">
            I agree to the{" "}
            <a href="/terms-conditions" className="text-s2 hover:underline">
              Terms & Conditions
            </a>{" "}
            and
            <a href="/privacy-policy" className="text-s2 hover:underline ml-1">
              Privacy Policy
            </a>{" "}
            *
          </span>
        </label>
        {errors.agreeToTerms && (
          <p className="text-red-500 text-sm flex items-center gap-1">
            <AlertCircle className="w-4 h-4" />
            {errors.agreeToTerms.message}
          </p>
        )}

        <label className="flex items-start gap-3">
          <input
            {...register("agreeToMarketing")}
            type="checkbox"
            className="w-4 h-4 text-s2 border-strokeColor rounded focus:ring-s2 mt-1"
          />
          <span className="text-sm text-bodyText">
            I would like to receive updates about payroll services and industry
            insights
          </span>
        </label>
      </div>

      {/* Submit Button */}
      <div className="pt-6">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-s2 text-mainTextColor px-8 py-4 rounded-full font-semibold hover:bg-s2/90 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Sending Message...
            </>
          ) : (
            "Send Message"
          )}
        </button>

        {submitStatus === "error" && (
          <p className="text-red-500 text-sm mt-4 flex items-center gap-1">
            <AlertCircle className="w-4 h-4" />
            There was an error sending your message. Please try again.
          </p>
        )}
      </div>
    </form>
  );
}
