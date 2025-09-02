import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
