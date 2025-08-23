import React, { lazy, Suspense } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";

const Footer = lazy(() => import("../Footer/Footer"));

function MainLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Footer  */}
      <footer>
        <Suspense
          fallback={
            <div className="p-10 text-center text-lg font-semibold py-16">
              Loading...
            </div>
          }
        >
          <Footer />
        </Suspense>
      </footer>
    </div>
  );
}

export default MainLayout;
