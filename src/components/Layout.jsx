import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import ScarfProgressBar from "./ScarfProgressBar";

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <ScarfProgressBar />
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
