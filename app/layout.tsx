import type { Metadata } from "next";
import { Lato, Inter } from "next/font/google"; // keeping Inter just in case but switching to Lato
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { SocialProofNotifications } from "@/components/social-proof-notifications";
import { CharacterProvider } from "@/context/CharacterContext";

const lato = Lato({ 
  weight: ["100", "300", "400", "700", "900"],
  subsets: ["latin"] 
});

export const metadata: Metadata = {
    title: "Characteria",
    description: "Characteria",
    icons: {
        icon: "https://res.cloudinary.com/dkwxxfewv/image/upload/v1768320016/logo_ukwjo9.png",
        shortcut: "https://res.cloudinary.com/dkwxxfewv/image/upload/v1768320016/logo_ukwjo9.png",
        apple: "https://res.cloudinary.com/dkwxxfewv/image/upload/v1768320016/logo_ukwjo9.png",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6739868173955553" crossOrigin="anonymous"></script>
            </head>
            <body className={lato.className} suppressHydrationWarning>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="dark"
                    enableSystem
                    disableTransitionOnChange
                >
                    <CharacterProvider>
                        {children}
                        <SocialProofNotifications />
                    </CharacterProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}
