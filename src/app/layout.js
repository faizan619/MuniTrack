import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Header from "./components/Header";
import { Toaster } from "react-hot-toast";
import { AuthContextProvider } from "@/context/AuthContext";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
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
