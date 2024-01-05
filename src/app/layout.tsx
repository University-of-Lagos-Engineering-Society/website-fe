import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

const globalFont = Montserrat({
    subsets: ["latin"],
    weight: ["200", "400", "500", "600"],
});

export const metadata: Metadata = {
    title: "University of Lagos Engineering Society",
    description: "University of Lagos Engineering Society's web presence.",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={globalFont.className}>{children}</body>
        </html>
    );
}
