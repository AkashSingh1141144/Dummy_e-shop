import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { ShoppingCart, Menu, X } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../features/auth/authSlice";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const cartCount = useSelector((state) => state.cart.totalQuantity);
  const user = useSelector((state) => state.auth?.user);
  const dispatch = useDispatch();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Shop", path: "/shop" },
    { name: "Cart", path: "/cart" },
  ];

  return (
    <nav className="bg-white shadow-md fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-blue-600">
            E-Shop
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6 items-center">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  `font-medium hover:text-blue-600 transition ${
                    isActive ? "text-blue-600" : "text-gray-700"
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}

            {/* User Auth Links */}
            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-gray-700 font-medium">
                  Hi, {user.username}
                </span>
                <button
                  onClick={() => dispatch(logout())}
                  className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex space-x-4">
                <NavLink
                  to="/login"
                  className="font-medium text-gray-700 hover:text-blue-600"
                >
                  Login
                </NavLink>
                <NavLink
                  to="/register"
                  className="font-medium text-gray-700 hover:text-blue-600"
                >
                  Register
                </NavLink>
              </div>
            )}
          </div>

          {/* Cart Icon */}
          <Link to="/cart" className="relative ml-4">
            <ShoppingCart size={24} />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full px-2">
                {cartCount}
              </span>
            )}
          </Link>

          {/* Mobile Menu Button */}
          <button className="md:hidden ml-4" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-lg">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
            >
              {link.name}
            </NavLink>
          ))}

          {/* Auth in Mobile */}
          {user ? (
            <div className="px-4 py-2 flex justify-between items-center">
              <span className="text-gray-700">Hi, {user.username}</span>
              <button
                onClick={() => dispatch(logout())}
                className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex flex-col px-4 py-2 space-y-2">
              <NavLink
                to="/login"
                onClick={() => setIsOpen(false)}
                className="block text-gray-700 hover:bg-gray-100 px-2 py-1 rounded"
              >
                Login
              </NavLink>
              <NavLink
                to="/register"
                onClick={() => setIsOpen(false)}
                className="block text-gray-700 hover:bg-gray-100 px-2 py-1 rounded"
              >
                Register
              </NavLink>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
