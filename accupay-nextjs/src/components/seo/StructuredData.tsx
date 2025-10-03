import Script from "next/script";

interface StructuredDataProps {
  type: "Organization" | "Service" | "FAQ" | "BreadcrumbList";
  data: Record<string, unknown>;
}

export default function StructuredData({ type, data }: StructuredDataProps) {
  const getStructuredData = () => {
    switch (type) {
      case "Organization":
        return {
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "AccuPay",
          description:
            "Professional payroll services for businesses of all sizes",
          url: "https://accupay.com",
          logo: "https://accupay.com/images/logo.png",
          contactPoint: {
            "@type": "ContactPoint",
            telephone: "+1-555-123-4567",
            contactType: "customer service",
            areaServed: "US",
            availableLanguage: "English",
          },
          address: {
            "@type": "PostalAddress",
            streetAddress: "123 Business Street",
            addressLocality: "New York",
            addressRegion: "NY",
            postalCode: "10001",
            addressCountry: "US",
          },
          sameAs: [
            "https://www.linkedin.com/company/accupay",
            "https://twitter.com/accupay",
          ],
        };

      case "Service":
        return {
          "@context": "https://schema.org",
          "@type": "Service",
          name: data.name || "Payroll Processing Services",
          description:
            data.description ||
            "Professional payroll processing services for businesses",
          provider: {
            "@type": "Organization",
            name: "AccuPay",
          },
          areaServed: "US",
          serviceType: "Payroll Services",
          offers: {
            "@type": "Offer",
            price: data.price || "5",
            priceCurrency: "USD",
            priceSpecification: {
              "@type": "UnitPriceSpecification",
              price: data.price || "5",
              priceCurrency: "USD",
              unitText: "per employee per month",
            },
          },
        };

      case "FAQ":
        return {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: (
            data.faqs as Array<{ question: string; answer: string }>
          ).map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: faq.answer,
            },
          })),
        };

      case "BreadcrumbList":
        return {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: (
            data.breadcrumbs as Array<{ name: string; url: string }>
          ).map((breadcrumb, index: number) => ({
            "@type": "ListItem",
            position: index + 1,
            name: breadcrumb.name,
            item: breadcrumb.url,
          })),
        };

      default:
        return {};
    }
  };

  return (
    <Script
      id={`structured-data-${type.toLowerCase()}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(getStructuredData()),
      }}
    />
  );
}
