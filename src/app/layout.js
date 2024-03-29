import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./element/component/Flotter";
import Header from "./element/component/Header";
import { Toaster } from "react-hot-toast";
import { AuthContextProvider } from "@/context/AuthContext";
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from '@vercel/speed-insights/react';

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <Analytics/>
      <SpeedInsights/>
        <AuthContextProvider>
        <Toaster
          position="top-center"
          toastOptions={{
            success: {
              theme: {
                primary: "#4aed88",
              },
            },
          }}
        />
        <Header />
        <Navbar />
          <div>{children}</div>
        </AuthContextProvider>
      </body>
    </html>
  );
}
