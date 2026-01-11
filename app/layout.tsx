
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { CharacterProvider } from "@/context/CharacterContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Characteria",
    description: "Characteria",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={inter.className}>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="dark"
                    enableSystem
                    disableTransitionOnChange
                >
                    <CharacterProvider>
                        {children}
                    </CharacterProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}
