import type { Metadata } from "next";
import TeamClient from "./TeamClient";

export const metadata: Metadata = {
  title: "Our Payroll Team - Meet the Experts | Accupay",
  description:
    "Meet our team of payroll experts, CPAs, and tax specialists dedicated to providing exceptional payroll services and ensuring your business compliance.",
};

export default function TeamPage() {
  return <TeamClient />;
}
