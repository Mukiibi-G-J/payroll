import type { Metadata } from 'next';
import { Outfit } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/context/AuthContext';
import { ConditionalLayout } from '@/components/layout/ConditionalLayout';

const outfit = Outfit({
  variable: '--font-outfit',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
});

export const metadata: Metadata = {
  title: {
    default:
      'AccuPay - Professional Payroll Services | We Make Payroll Painless',
    template: '%s | AccuPay',
  },
  description:
    'Professional payroll services for businesses of all sizes. Accurate payroll processing, tax compliance, and employee self-service portal. Starting at $5/employee/month.',
  keywords: [
    'payroll services',
    'payroll processing',
    'payroll tax filing',
    'employee payroll',
    'payroll compliance',
    'payroll software',
    'payroll outsourcing',
    'small business payroll',
    'payroll management',
    'payroll solutions',
  ],
  authors: [{ name: 'AccuPay Team' }],
  creator: 'AccuPay',
  publisher: 'AccuPay',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://accupay.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://accupay.com',
    title: 'AccuPay - Professional Payroll Services',
    description:
      'Professional payroll services for businesses of all sizes. Accurate payroll processing, tax compliance, and employee self-service portal.',
    siteName: 'AccuPay',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'AccuPay - Professional Payroll Services',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AccuPay - Professional Payroll Services',
    description:
      'Professional payroll services for businesses of all sizes. Accurate payroll processing, tax compliance, and employee self-service portal.',
    images: ['/images/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body
        className={`${outfit.variable} font-outfit antialiased`}
        suppressHydrationWarning={true}
      >
        <AuthProvider>
          <ConditionalLayout>{children}</ConditionalLayout>
        </AuthProvider>
      </body>
    </html>
  );
}
