import type { Metadata } from "next";
import BlogClient from "./BlogClient";

export const metadata: Metadata = {
  title: "Blog - Accupay",
  description:
    "Latest insights, tips, and updates on payroll, accounting, and business services from Accupay experts.",
};

export default function BlogPage() {
  return <BlogClient />;
}
