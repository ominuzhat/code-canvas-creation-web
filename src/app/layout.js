"use client";
import { useEffect } from "react";
import { Inter, Roboto_Mono, Hanken_Grotesk } from "next/font/google";
import "../../public/assets/css/bootstrap-icons.css";
import "../../public/assets/css/boxicons.min.css";
import "../../public/assets/css/swiper-bundle.min.css";
import "react-modal-video/css/modal-video.css";
import "../../public/assets/css/slick-theme.css";
import "../../public/assets/css/animate.min.css";
import "../../public/assets/css/slick.css";
import "../../public/assets/css/bootstrap-datetimepicker.min.css";
import "react-datepicker/dist/react-datepicker.css";
import "../../public/assets/css/bootstrap.min.css";
import "yet-another-react-lightbox/styles.css";
import "../../public/assets/css/style.css";
import ScrollProgress from "@/components/common/ScrollProgress";
import ThemeSwitch from "@/components/common/Theme";
import useWow from "@/hooks/useWow";
import TanstakProviders from "../../providers/TanstakProviders";
import { SnackbarProvider } from "notistack";
import AOS from "aos";
import "aos/dist/aos.css"; // Import AOS styles
import AuthProviders from "../../providers/AuthProviders";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const hankenGrotesk = Hanken_Grotesk({
  subsets: ["latin"],
  variable: "--font-hankenGrotesk",
  display: "swap",
});
export default function RootLayout({ children }) {
  useWow();

  useEffect(() => {
    AOS.init({
      duration: 1500,
      once: true,
    });

    require("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);
  return (
    <html lang="en" className={`${inter.variable} ${hankenGrotesk.variable}`}>
      <head>
        <link
          rel="icon"
          href="/public/code canvas creations/icon.png"
          type="image/x-icon"
          sizes="16x16"
        />
        <title>Code Canvas Solutions</title>
      </head>
      <body>
        <AuthProviders>
          <TanstakProviders>
            <SnackbarProvider>
              <ScrollProgress />
              <ThemeSwitch />
              {children}
            </SnackbarProvider>
          </TanstakProviders>{" "}
        </AuthProviders>
      </body>
    </html>
  );
}
