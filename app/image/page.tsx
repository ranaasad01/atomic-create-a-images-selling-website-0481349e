"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Heart, Share2, Download, ShoppingCart, Star, Eye, Tag, Maximize2, User, Check, Shield, Zap } from 'lucide-react';
import {
  fadeInUp,
  fadeIn,
  staggerContainer,
  scaleIn,
  slideInLeft,
  slideInRight,
} from "@/lib/motion";
import { APP_NAME, licenseTypes } from "@/lib/data";

// ─── Mock image data ─────────────────────────────────────────────────────────
const IMAGE = {
  id: "1",
  title: "Golden Hour Cityscape",
  description:
    "A breathtaking panoramic view of the city skyline bathed in the warm golden light of sunset. This image captures the magical transition between day and night, with the city lights beginning to flicker on while the sky transitions through shades of amber, orange, and deep purple.",
  imageUrl:
    "https://iso.500px.com/wp-content/uploads/2014/07/hong-kong-cityscape1.jpg",
  category: "Architecture",
  tags: ["cityscape", "golden hour", "urban", "architecture", "skyline", "dusk"],
  resolution: "6000 × 4000 px",
  fileSize: "24.8 MB",
  format: "JPEG",
  colorProfile: "sRGB",
  uploadDate: "June 12, 2024",
  views: 18420,
  likes: 891,
  downloads: 2341,
  photographer: {
    name: "Elena Vasquez",
    initials: "EV",
    bio: "Award-winning urban photographer based in Barcelona with 12 years of experience capturing city life.",
    totalSales: 2341,
    rating: 4.9,
  },
};

const RELATED_IMAGES = [
  {
    id: "2",
    title: "Misty Mountain Range",
    photographer: "James Thornton",
    price: 19,
    imageUrl:
      "https://images.stockcake.com/public/f/5/a/f5a897bb-bcc4-4bb6-bc13-ef3dc3493755_large/misty-mountain-peaks-stockcake.jpg",
  },
  {
    id: "3",
    title: "Ocean Waves at Dusk",
    photographer: "Aiko Nakamura",
    price: 24,
    imageUrl:
      "https://images.unsplash.com/photo-1605422504455-c4be51ea789b?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0",
  },
  {
    id: "5",
    title: "Abstract Light Trails",
    photographer: "Sophie Laurent",
    price: 34,
    imageUrl:
      "https://images.unsplash.com/photo-1741096930793-1a32e3a8a4d5?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0",
  },
];

function formatNumber(n: number): string {
  return n.toLocaleString();
}

export default function ImageDetailPage() {
  const [selectedLicense, setSelectedLicense] = useState("commercial");
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);

  const activeLicense = licenseTypes.find((l) => l.id === selectedLicense);

  const handleAddToCart = () => {
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] pt-20">
      {/* ── Section 1: Hero / Image Preview ─────────────────────────────── */}
      <section className="bg-[#0F172A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Back button */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
          >
            <Link
              href="/browse"
              className="inline-flex items-center gap-2 text-slate-300 hover:text-white transition-colors duration-200 mb-8 group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-200" />
              <span className="text-sm font-medium">Back to Browse</span>
            </Link>
          </motion.div>

          {/* Two-column layout */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 pb-12"
          >
            {/* Left col — image preview */}
            <motion.div variants={slideInLeft}>
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src={IMAGE.imageUrl}
                  alt={IMAGE.title}
                  className="w-full h-auto object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800&q=80";
                  }}
                />
                {/* Watermark overlay */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <span
                    className="text-white/30 text-2xl font-bold select-none"
                    style={{ transform: "rotate(-20deg)", whiteSpace: "nowrap" }}
                  >
                    PREVIEW ONLY — {APP_NAME.toLowerCase()}.com
                  </span>
                </div>
              </div>

              {/* Stats row */}
              <div className="flex items-center gap-6 mt-4">
                <span className="flex items-center gap-1.5 text-white/70 text-sm">
                  <Eye className="w-4 h-4" />
                  {formatNumber(IMAGE.views)}
                </span>
                <span className="flex items-center gap-1.5 text-white/70 text-sm">
                  <Heart className="w-4 h-4" />
                  {formatNumber(IMAGE.likes)}
                </span>
                <span className="flex items-center gap-1.5 text-white/70 text-sm">
                  <Download className="w-4 h-4" />
                  {formatNumber(IMAGE.downloads)}
                </span>
              </div>
            </motion.div>

            {/* Right col — info */}
            <motion.div variants={slideInRight} className="flex flex-col justify-center">
              {/* Breadcrumb */}
              <p className="text-indigo-400 text-sm font-medium mb-3">
                Architecture / Cityscape
              </p>

              {/* Title */}
              <h1 className="text-4xl font-bold text-white mb-6 leading-tight">
                {IMAGE.title}
              </h1>

              {/* Photographer row */}
              <div className="flex items-center gap-3 mb-6">
                <div className="w-11 h-11 rounded-full bg-indigo-500 flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-sm">
                    {IMAGE.photographer.initials}
                  </span>
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">
                    {IMAGE.photographer.name}
                  </p>
                  <Link
                    href="/browse"
                    className="text-indigo-400 hover:text-indigo-300 text-xs transition-colors"
                  >
                    View Profile
                  </Link>
                </div>
              </div>

              {/* Rating + downloads */}
              <div className="flex items-center gap-4 mb-8">
                <div className="flex items-center gap-1.5">
                  <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                  <span className="text-white font-semibold text-sm">
                    {IMAGE.photographer.rating}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-400 text-sm">
                  <Download className="w-4 h-4" />
                  <span>{formatNumber(IMAGE.downloads)} downloads</span>
                </div>
              </div>

              {/* Quick specs */}
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: "Resolution", value: IMAGE.resolution },
                  { label: "Format", value: IMAGE.format },
                  { label: "File Size", value: IMAGE.fileSize },
                  { label: "Category", value: IMAGE.category },
                ].map((spec) => (
                  <div
                    key={spec.label}
                    className="bg-white/5 rounded-xl px-4 py-3 border border-white/10"
                  >
                    <p className="text-slate-400 text-xs mb-0.5">{spec.label}</p>
                    <p className="text-white text-sm font-medium">{spec.value}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── Section 2: Details & Purchase ───────────────────────────────── */}
      <section className="bg-[#F8FAFC] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left (2 cols) — description + specs */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="lg:col-span-2 flex flex-col gap-6"
            >
              {/* Description card */}
              <motion.div
                variants={fadeInUp}
                className="bg-white rounded-2xl p-6 shadow-sm border border-[#E2E8F0]"
              >
                <h2 className="text-xl font-bold text-[#0F172A] mb-3">
                  About This Image
                </h2>
                <p className="text-slate-600 leading-relaxed">
                  {IMAGE.description}
                </p>

                {/* Tags */}
                <div className="mt-5">
                  <p className="text-sm font-semibold text-[#0F172A] mb-2 flex items-center gap-1.5">
                    <Tag className="w-4 h-4 text-indigo-500" />
                    Tags
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {IMAGE.tags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-indigo-50 text-indigo-700 rounded-full px-3 py-1 text-sm font-medium hover:bg-indigo-100 transition-colors cursor-pointer"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Image specs card */}
              <motion.div
                variants={fadeInUp}
                className="bg-white rounded-2xl p-6 shadow-sm border border-[#E2E8F0]"
              >
                <h3 className="text-lg font-bold text-[#0F172A] mb-4 flex items-center gap-2">
                  <Maximize2 className="w-5 h-5 text-indigo-500" />
                  Image Details
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { label: "Resolution", value: IMAGE.resolution },
                    { label: "File Size", value: IMAGE.fileSize },
                    { label: "Format", value: IMAGE.format },
                    { label: "Color Profile", value: IMAGE.colorProfile },
                    { label: "Uploaded", value: IMAGE.uploadDate },
                    { label: "Category", value: IMAGE.category },
                  ].map((spec) => (
                    <div
                      key={spec.label}
                      className="flex justify-between items-center py-2 border-b border-[#E2E8F0] last:border-0"
                    >
                      <span className="text-slate-500 text-sm">{spec.label}</span>
                      <span className="text-[#0F172A] text-sm font-semibold">
                        {spec.value}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </motion.div>

            {/* Right col — purchase card */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="lg:col-span-1"
            >
              <div className="sticky top-24 bg-white rounded-2xl p-6 shadow-lg border border-[#E2E8F0]">
                <h2 className="text-lg font-bold text-[#0F172A] mb-4">
                  Choose License
                </h2>

                {/* License options */}
                <div className="flex flex-col gap-3 mb-6">
                  {licenseTypes.map((license) => (
                    <button
                      key={license.id}
                      onClick={() => setSelectedLicense(license.id)}
                      className={`w-full text-left rounded-xl p-4 border-2 transition-all duration-200 ${
                        selectedLicense === license.id
                          ? "border-[#6366F1] bg-indigo-50"
                          : "border-[#E2E8F0] hover:border-indigo-200 bg-white"
                      }`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <span
                          className={`font-semibold text-sm ${
                            selectedLicense === license.id
                              ? "text-[#6366F1]"
                              : "text-[#0F172A]"
                          }`}
                        >
                          {license.name}
                        </span>
                        <span
                          className={`font-bold text-sm ${
                            selectedLicense === license.id
                              ? "text-[#6366F1]"
                              : "text-[#0F172A]"
                          }`}
                        >
                          ${license.price}
                        </span>
                      </div>
                      <ul className="space-y-1">
                        {license.features.slice(0, 3).map((feature) => (
                          <li
                            key={feature}
                            className="flex items-center gap-1.5 text-xs text-slate-500"
                          >
                            <Check className="w-3 h-3 text-emerald-500 flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </button>
                  ))}
                </div>

                {/* Price display */}
                <div className="mb-5">
                  <p className="text-slate-500 text-xs mb-1">Selected price</p>
                  <p className="text-4xl font-bold text-[#0F172A]">
                    ${activeLicense?.price ?? 29}
                  </p>
                </div>

                {/* Add to Cart button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleAddToCart}
                  className={`w-full flex items-center justify-center gap-2 rounded-xl py-4 font-semibold text-white transition-all duration-200 mb-3 ${
                    addedToCart
                      ? "bg-emerald-500"
                      : "bg-[#6366F1] hover:bg-indigo-700"
                  }`}
                >
                  {addedToCart ? (
                    <>
                      <Check className="w-5 h-5" />
                      Added to Cart!
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="w-5 h-5" />
                      Add to Cart
                    </>
                  )}
                </motion.button>

                {/* Wishlist button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setIsWishlisted((prev) => !prev)}
                  className={`w-full flex items-center justify-center gap-2 rounded-xl py-3 font-semibold border-2 transition-all duration-200 mb-5 ${
                    isWishlisted
                      ? "border-rose-400 text-rose-500 bg-rose-50"
                      : "border-[#E2E8F0] text-slate-600 hover:border-rose-300 hover:text-rose-500"
                  }`}
                >
                  <Heart
                    className={`w-4 h-4 ${
                      isWishlisted ? "fill-rose-500 text-rose-500" : ""
                    }`}
                  />
                  {isWishlisted ? "Saved to Wishlist" : "Add to Wishlist"}
                </motion.button>

                {/* Trust badges */}
                <div className="flex items-center justify-around pt-4 border-t border-[#E2E8F0]">
                  <div className="flex flex-col items-center gap-1">
                    <Shield className="w-5 h-5 text-indigo-400" />
                    <span className="text-xs text-slate-500">Secure Payment</span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <Zap className="w-5 h-5 text-indigo-400" />
                    <span className="text-xs text-slate-500">Instant Download</span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <Check className="w-5 h-5 text-indigo-400" />
                    <span className="text-xs text-slate-500">Licensed Use</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Section 3: Photographer Info ────────────────────────────────── */}
      <section className="bg-white border-t border-[#E2E8F0] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.h2
              variants={fadeInUp}
              className="text-2xl font-bold text-[#0F172A] mb-8"
            >
              About the Photographer
            </motion.h2>

            <motion.div
              variants={fadeInUp}
              className="bg-[#F8FAFC] rounded-2xl p-8 border border-[#E2E8F0] flex flex-col md:flex-row items-start gap-8"
            >
              {/* Avatar */}
              <div className="flex-shrink-0">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-2xl">
                    {IMAGE.photographer.initials}
                  </span>
                </div>
              </div>

              {/* Info */}
              <div className="flex-1">
                <h3 className="text-xl font-bold text-[#0F172A] mb-1">
                  {IMAGE.photographer.name}
                </h3>
                <p className="text-slate-500 text-sm mb-4">
                  {IMAGE.photographer.bio}
                </p>

                {/* Stats */}
                <div className="flex flex-wrap gap-6 mb-6">
                  <div>
                    <p className="text-2xl font-bold text-[#0F172A]">
                      {formatNumber(IMAGE.photographer.totalSales)}
                    </p>
                    <p className="text-slate-500 text-xs">Total Sales</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-[#0F172A]">
                      {IMAGE.photographer.rating}
                    </p>
                    <p className="text-slate-500 text-xs">Rating</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-[#0F172A]">2019</p>
                    <p className="text-slate-500 text-xs">Member Since</p>
                  </div>
                </div>

                <Link
                  href="/browse"
                  className="inline-flex items-center gap-2 bg-[#6366F1] hover:bg-indigo-700 text-white rounded-xl px-5 py-2.5 text-sm font-semibold transition-colors duration-200"
                >
                  <User className="w-4 h-4" />
                  View All Photos
                </Link>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── Section 4: Related Images ────────────────────────────────────── */}
      <section className="bg-[#F8FAFC] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.div
              variants={fadeInUp}
              className="flex items-center justify-between mb-8"
            >
              <h2 className="text-2xl font-bold text-[#0F172A]">
                You May Also Like
              </h2>
              <Link
                href="/browse"
                className="text-[#6366F1] hover:text-indigo-700 text-sm font-semibold transition-colors"
              >
                Browse More →
              </Link>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
              {RELATED_IMAGES.map((img) => (
                <motion.div key={img.id} variants={scaleIn}>
                  <Link href="/image" className="group block">
                    <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-[#E2E8F0] hover:shadow-md transition-shadow duration-300">
                      <div className="relative overflow-hidden h-52">
                        <img
                          src={img.imageUrl}
                          alt={img.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src =
                              "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=600&q=80";
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold text-[#0F172A] text-sm mb-1 truncate">
                          {img.title}
                        </h3>
                        <div className="flex items-center justify-between">
                          <span className="text-slate-500 text-xs">
                            {img.photographer}
                          </span>
                          <span className="text-[#6366F1] font-bold text-sm">
                            ${img.price}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>

            <motion.div variants={fadeInUp} className="text-center">
              <Link
                href="/browse"
                className="inline-flex items-center gap-2 bg-[#6366F1] hover:bg-indigo-700 text-white rounded-xl px-8 py-3.5 font-semibold transition-colors duration-200"
              >
                Browse More Photos
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
