import { Nunito_Sans } from "next/font/google";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./globals.css";
import "./posts.css";

const nunitoSans = Nunito_Sans({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={nunitoSans.className}>
        {children}
      </body>
    </html>
  );
}
