import "./globals.css";

export const metadata = {
  title: 'Founder Insights Hub',
  description: 'Knowledge sharing platform for Berkeley founders',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-slate-800 text-gray-200">
        {children}
      </body>
    </html>
  );
}