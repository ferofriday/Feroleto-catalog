import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Feroleto Garden Co. — What We Grow',
  description: 'Browse our crop catalog and choose what you\'d like in your garden this season.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
