"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Camera, ShoppingCart, Search } from 'lucide-react';
import { navLinks, navCTA, APP_NAME } from "@/lib/data";

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Only smooth-scroll anchors when already on the homepage
  const handleAnchorClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    if (href.startsWith("#") && pathname === "/") {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
      setIsOpen(false);
    }
    // Route links (starting with '/') — do nothing extra, let Next.js handle navigation
  };

  // Anchor links resolve to '/#section' when not on homepage; route links pass through unchanged
  const getLinkHref = (href: string) => {
    if (href.startsWith("/")) {
      return href;
    }
    if (href.startsWith("#")) {
      return pathname === "/" ? href : `/${href}`;
    }
    return href;
  };

  // Active highlight: exact match for route links only
  const isActive = (href: string) => {
    if (href.startsWith("/")) {
      return pathname === href;
    }
    return false;
  };

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.55, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#0F172A]/95 backdrop-blur-md shadow-lg shadow-black/20"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <motion.div
              whileHover={{ scale: 1.08, rotate: -5 }}
              whileTap={{ scale: 0.95 }}
              className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] flex items-center justify-center shadow-lg shadow-indigo-500/30"
            >
              <Camera className="w-5 h-5 text-white" />
            </motion.div>
            <span className="text-white font-bold text-xl tracking-tight">
              {APP_NAME}
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={getLinkHref(link.href)}
                onClick={(e) => handleAnchorClick(e, link.href)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive(link.href)
                    ? "text-[#6366F1] bg-[#6366F1]/10"
                    : "text-slate-300 hover:text-white hover:bg-white/10"
                }`}
              >
                <motion.span
                  whileHover={{ y: -1 }}
                  transition={{ duration: 0.15 }}
                  className="block"
                >
                  {link.label}
                </motion.span>
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 text-slate-300 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </motion.button>

            <Link href="/cart">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 text-slate-300 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200 relative"
                aria-label="Cart"
              >
                <ShoppingCart className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#6366F1] rounded-full text-white text-[10px] font-bold flex items-center justify-center">
                  2
                </span>
              </motion.button>
            </Link>

            <Link href="/sign-in">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
              >
                Sign In
              </motion.button>
            </Link>

            <Link href={getLinkHref(navCTA.href)} onClick={(e) => handleAnchorClick(e, navCTA.href)}>
              <motion.button
                whileHover={{ scale: 1.03, boxShadow: "0 0 20px rgba(99,102,241,0.4)" }}
                whileTap={{ scale: 0.97 }}
                className="px-5 py-2.5 bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] text-white text-sm font-semibold rounded-xl shadow-lg shadow-indigo-500/25 transition-all duration-200"
              >
                {navCTA.label}
              </motion.button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-2">
            <Link href="/cart">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 text-slate-300 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200 relative"
                aria-label="Cart"
              >
                <ShoppingCart className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#6366F1] rounded-full text-white text-[10px] font-bold flex items-center justify-center">
                  2
                </span>
              </motion.button>
            </Link>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-slate-300 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="lg:hidden bg-[#0F172A]/98 backdrop-blur-md border-t border-white/10 overflow-hidden"
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={getLinkHref(link.href)}
                  onClick={(e) => handleAnchorClick(e, link.href)}
                  className={`px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive(link.href)
                      ? "text-[#6366F1] bg-[#6366F1]/10"
                      : "text-slate-300 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-3 mt-2 border-t border-white/10 flex flex-col gap-2">
                <Link href="/sign-in">
                  <button className="w-full px-4 py-3 text-sm font-medium text-slate-300 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200 text-left">
                    Sign In
                  </button>
                </Link>
                <Link href={getLinkHref(navCTA.href)} onClick={(e) => handleAnchorClick(e, navCTA.href)}>
                  <button className="w-full px-4 py-3 bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] text-white text-sm font-semibold rounded-xl">
                    {navCTA.label}
                  </button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
