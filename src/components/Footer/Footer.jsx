import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
        {/* About */}
        <div>
          <h2 className="text-white text-xl font-semibold mb-4">E-Shop</h2>
          <p className="text-gray-400 text-sm">
            Your one-stop online store for all your favorite products. Quality
            and service guaranteed.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li>
              <a href="/" className="hover:text-white">
                Home
              </a>
            </li>
            <li>
              <a href="/shop" className="hover:text-white">
                Shop
              </a>
            </li>
            <li>
              <a href="/cart" className="hover:text-white">
                Cart
              </a>
            </li>
            <li>
              <a href="/login" className="hover:text-white">
                Login
              </a>
            </li>
          </ul>
        </div>

        {/* Customer Service */}
        <div>
          <h3 className="text-white text-lg font-semibold mb-4">
            Customer Service
          </h3>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li>
              <a href="#" className="hover:text-white">
                Shipping & Returns
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Terms & Conditions
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                FAQ
              </a>
            </li>
          </ul>
        </div>

        {/* Contact & Social */}
        <div>
          <h3 className="text-white text-lg font-semibold mb-4">Contact Us</h3>
          <p className="text-gray-400 text-sm mb-4">
            123 E-Shop Street <br />
            New Delhi, India <br />
            +91 98765 43210
          </p>
          <div className="flex space-x-4 items-center justify-center">
            <a href="#" className="hover:text-white">
              <FaFacebookF />
            </a>
            <a href="#" className="hover:text-white">
              <FaTwitter />
            </a>
            <a href="#" className="hover:text-white">
              <FaInstagram />
            </a>
            <a href="#" className="hover:text-white">
              <FaLinkedinIn />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-10 pt-4 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} E-Shop. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
