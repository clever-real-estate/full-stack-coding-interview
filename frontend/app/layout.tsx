import type { Metadata } from "next";
import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";


export const metadata: Metadata = {
  title: "Clever App",
  description: "An assessment for my future job",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex justify-center mt-20">
        <div className="max-w-[980px]">
          {children}
        </div>
      </body>
    </html>
  );
}
