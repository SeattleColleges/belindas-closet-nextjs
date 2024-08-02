import { Inter } from "next/font/google";
import NavBar from "@/components/Navbar";
import { CssBaseline } from "@mui/material";
import WrapperDiv from "@/components/WrapperDiv";
import ThemeContextProvider from "./theme/providers";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

// Navbar contains (and will contain) basic menu items

export const metadata = {
  title: "Belinda's Closet",
  description: "This is a website for Belinda's Closet",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
    >
      <body className={inter.className}>
        <ThemeContextProvider>
          <CssBaseline />
          <NavBar />
          <WrapperDiv>{children}</WrapperDiv>
          <Footer />
        </ThemeContextProvider>
      </body>
    </html>
  );
}
