import "../../globals.css"

export default function ConfigLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
        {/* no NavBar here */}
      </body>
    </html>
  );
}