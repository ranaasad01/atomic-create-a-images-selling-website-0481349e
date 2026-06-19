"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Download, Heart, ShoppingBag, Settings, User, Star, Eye, Package, CreditCard, Bell, ChevronRight, Search, Filter, Grid, List, Check, Clock, ArrowRight } from 'lucide-react';
import { fadeInUp, staggerContainer, scaleIn } from "@/lib/motion";
import { APP_NAME } from "@/lib/data";

// ─── Mock Data ───────────────────────────────────────────────────────────────

const user = {
  name: "Alex Johnson",
  email: "alex@example.com",
  avatar: "AJ",
  memberSince: "January 2023",
  totalPurchases: 24,
  totalSpent: 487,
  favoriteCategory: "Nature",
};

const purchasedImages = [
  {
    id: "p1",
    title: "Golden Hour Cityscape",
    photographer: "Elena Vasquez",
    purchaseDate: "Jun 12, 2024",
    licenseType: "Commercial" as const,
    price: 29,
    imageUrl:
      "https://iso.500px.com/wp-content/uploads/2014/07/hong-kong-cityscape1.jpg",
    resolution: "6000×4000",
  },
  {
    id: "p2",
    title: "Misty Mountain Range",
    photographer: "James Thornton",
    purchaseDate: "May 28, 2024",
    licenseType: "Personal" as const,
    price: 9,
    imageUrl:
      "https://images.stockcake.com/public/f/5/a/f5a897bb-bcc4-4bb6-bc13-ef3dc3493755_large/misty-mountain-peaks-stockcake.jpg",
    resolution: "5472×3648",
  },
  {
    id: "p3",
    title: "Ocean Waves at Dusk",
    photographer: "Aiko Nakamura",
    purchaseDate: "May 15, 2024",
    licenseType: "Commercial" as const,
    price: 29,
    imageUrl:
      "https://images.unsplash.com/photo-1605422504455-c4be51ea789b?fm=jpg&q=60&w=3000",
    resolution: "7360×4912",
  },
  {
    id: "p4",
    title: "Abstract Light Trails",
    photographer: "Sophie Laurent",
    purchaseDate: "Apr 30, 2024",
    licenseType: "Extended" as const,
    price: 79,
    imageUrl:
      "https://images.unsplash.com/photo-1741096930793-1a32e3a8a4d5?fm=jpg&q=60&w=3000",
    resolution: "6000×4000",
  },
  {
    id: "p5",
    title: "Lush Rainforest Canopy",
    photographer: "Ravi Patel",
    purchaseDate: "Apr 18, 2024",
    licenseType: "Personal" as const,
    price: 9,
    imageUrl:
      "https://thumbs.dreamstime.com/b/lush-green-rainforest-canopy-viewed-above-sunlight-filtering-jungle-dense-stretches-out-vibrant-leaves-441095154.jpg",
    resolution: "5184×3456",
  },
  {
    id: "p6",
    title: "Vibrant Street Market",
    photographer: "Carlos Mendez",
    purchaseDate: "Mar 22, 2024",
    licenseType: "Commercial" as const,
    price: 29,
    imageUrl:
      "https://i.guim.co.uk/img/media/3c1655645c104886533efaea9ad22781ef49499e/0_400_6000_3600/master/6000.jpg?width=465&dpr=1&s=none&crop=none",
    resolution: "6000×3600",
  },
];

const wishlistImages = [
  {
    id: "w1",
    title: "Misty Mountain Range",
    photographer: "James Thornton",
    price: 19,
    imageUrl:
      "https://images.stockcake.com/public/f/5/a/f5a897bb-bcc4-4bb6-bc13-ef3dc3493755_large/misty-mountain-peaks-stockcake.jpg",
  },
  {
    id: "w2",
    title: "Abstract Light Trails",
    photographer: "Sophie Laurent",
    price: 34,
    imageUrl:
      "https://images.unsplash.com/photo-1741096930793-1a32e3a8a4d5?fm=jpg&q=60&w=3000",
  },
  {
    id: "w3",
    title: "Vibrant Street Market",
    photographer: "Carlos Mendez",
    price: 19,
    imageUrl:
      "https://i.guim.co.uk/img/media/3c1655645c104886533efaea9ad22781ef49499e/0_400_6000_3600/master/6000.jpg?width=465&dpr=1&s=none&crop=none",
  },
  {
    id: "w4",
    title: "Lush Rainforest Canopy",
    photographer: "Ravi Patel",
    price: 22,
    imageUrl:
      "https://thumbs.dreamstime.com/b/lush-green-rainforest-canopy-viewed-above-sunlight-filtering-jungle-dense-stretches-out-vibrant-leaves-441095154.jpg",
  },
];

const orderHistory = [
  {
    id: "ORD-2024-0612",
    date: "Jun 12, 2024",
    items: 1,
    total: 29,
    status: "Completed" as const,
  },
  {
    id: "ORD-2024-0528",
    date: "May 28, 2024",
    items: 2,
    total: 38,
    status: "Completed" as const,
  },
  {
    id: "ORD-2024-0430",
    date: "Apr 30, 2024",
    items: 1,
    total: 79,
    status: "Completed" as const,
  },
  {
    id: "ORD-2024-0322",
    date: "Mar 22, 2024",
    items: 3,
    total: 67,
    status: "Completed" as const,
  },
];

// ─── License Badge ────────────────────────────────────────────────────────────

function LicenseBadge({ type }: { type: "Personal" | "Commercial" | "Extended" }) {
  const styles = {
    Personal: "bg-blue-100 text-blue-700",
    Commercial: "bg-indigo-100 text-indigo-700",
    Extended: "bg-purple-100 text-purple-700",
  };
  return (
    <span
      className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold ${styles[type]}`}
    >
      {type}
    </span>
  );
}

// ─── Toggle Switch ────────────────────────────────────────────────────────────

function Toggle({
  enabled,
  onToggle,
}: {
  enabled: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      onClick={onToggle}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none ${
        enabled ? "bg-[#6366F1]" : "bg-slate-200"
      }`}
      aria-pressed={enabled}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform duration-200 ${
          enabled ? "translate-x-6" : "translate-x-1"
        }`}
      />
    </button>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function BuyerDashboardPage() {
  const [activeTab, setActiveTab] = useState("purchases");
  const [wishlist, setWishlist] = useState(wishlistImages);
  const [notifications, setNotifications] = useState({
    purchases: true,
    priceDrops: true,
    newsletter: false,
    security: true,
  });

  const tabs = [
    { id: "purchases", label: "My Purchases", icon: ShoppingBag },
    { id: "wishlist", label: "Wishlist", icon: Heart },
    { id: "orders", label: "Order History", icon: Package },
    { id: "settings", label: "Account Settings", icon: Settings },
  ];

  const totalOrderSpend = orderHistory.reduce((sum, o) => sum + o.total, 0);

  const removeFromWishlist = (id: string) => {
    setWishlist((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] pt-20">
      {/* ── Hero / Profile Banner ─────────────────────────────────────────── */}
      <section className="bg-[#0F172A] text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8"
          >
            {/* Left — Avatar + Info */}
            <motion.div variants={fadeInUp} className="flex items-center gap-5">
              <div className="w-16 h-16 rounded-2xl bg-indigo-500 flex items-center justify-center text-2xl font-bold text-white shadow-lg shadow-indigo-500/30 flex-shrink-0">
                {user.avatar}
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">
                  Welcome back, Alex!
                </h1>
                <p className="text-slate-400 text-sm mt-0.5">{user.email}</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="inline-flex items-center gap-1.5 bg-white/10 text-slate-300 text-xs px-3 py-1 rounded-full">
                    <Star className="w-3 h-3 text-amber-400" />
                    Member since {user.memberSince}
                  </span>
                  <span className="inline-flex items-center gap-1.5 bg-white/10 text-slate-300 text-xs px-3 py-1 rounded-full">
                    {user.favoriteCategory} enthusiast
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Right — Stat Cards */}
            <motion.div
              variants={staggerContainer}
              className="flex flex-row gap-4 flex-wrap"
            >
              <motion.div
                variants={scaleIn}
                className="bg-white/10 rounded-xl p-4 flex items-center gap-3 min-w-[130px]"
              >
                <div className="w-10 h-10 rounded-lg bg-indigo-500/30 flex items-center justify-center">
                  <ShoppingBag className="w-5 h-5 text-indigo-300" />
                </div>
                <div>
                  <p className="text-slate-400 text-xs">Purchases</p>
                  <p className="text-white text-xl font-bold">{user.totalPurchases}</p>
                </div>
              </motion.div>

              <motion.div
                variants={scaleIn}
                className="bg-white/10 rounded-xl p-4 flex items-center gap-3 min-w-[130px]"
              >
                <div className="w-10 h-10 rounded-lg bg-emerald-500/30 flex items-center justify-center">
                  <CreditCard className="w-5 h-5 text-emerald-300" />
                </div>
                <div>
                  <p className="text-slate-400 text-xs">Total Spent</p>
                  <p className="text-white text-xl font-bold">${user.totalSpent}</p>
                </div>
              </motion.div>

              <motion.div
                variants={scaleIn}
                className="bg-white/10 rounded-xl p-4 flex items-center gap-3 min-w-[130px]"
              >
                <div className="w-10 h-10 rounded-lg bg-rose-500/30 flex items-center justify-center">
                  <Heart className="w-5 h-5 text-rose-300" />
                </div>
                <div>
                  <p className="text-slate-400 text-xs">Favorites</p>
                  <p className="text-white text-xl font-bold">{wishlist.length}</p>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── Tab Navigation + Content ──────────────────────────────────────── */}
      <section className="bg-[#F8FAFC] py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Tab Bar */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            className="flex flex-wrap gap-2 mb-8 bg-white rounded-2xl p-2 shadow-sm border border-[#E2E8F0]"
          >
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-[#6366F1] text-white shadow-md shadow-indigo-200"
                      : "text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </motion.div>

          {/* Tab Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              {/* ── PURCHASES TAB ── */}
              {activeTab === "purchases" && (
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <h2 className="text-2xl font-bold text-[#0F172A]">
                      My Purchased Images
                    </h2>
                    <span className="bg-[#6366F1] text-white text-xs font-bold px-2.5 py-1 rounded-full">
                      {purchasedImages.length}
                    </span>
                  </div>

                  <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                  >
                    {purchasedImages.map((img) => (
                      <motion.div
                        key={img.id}
                        variants={scaleIn}
                        className="bg-white rounded-2xl overflow-hidden shadow-sm border border-[#E2E8F0] group hover:shadow-md transition-shadow duration-200"
                      >
                        {/* Thumbnail */}
                        <div className="relative h-48 overflow-hidden">
                          <img
                            src={img.imageUrl}
                            alt={img.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute top-3 right-3">
                            <LicenseBadge type={img.licenseType} />
                          </div>
                        </div>

                        {/* Card Body */}
                        <div className="p-4">
                          <h3 className="font-semibold text-[#0F172A] text-sm mb-1 truncate">
                            {img.title}
                          </h3>
                          <p className="text-slate-500 text-xs mb-3">
                            by {img.photographer}
                          </p>

                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-1.5 text-slate-400 text-xs">
                              <Clock className="w-3.5 h-3.5" />
                              {img.purchaseDate}
                            </div>
                            <span className="text-slate-500 text-xs">
                              {img.resolution}
                            </span>
                          </div>

                          <div className="flex items-center justify-between mb-4">
                            <LicenseBadge type={img.licenseType} />
                            <span className="text-[#0F172A] font-bold text-sm">
                              ${img.price}
                            </span>
                          </div>

                          <button className="w-full bg-[#6366F1] hover:bg-indigo-600 text-white rounded-xl py-2.5 flex items-center justify-center gap-2 text-sm font-medium transition-colors duration-200">
                            <Download className="w-4 h-4" />
                            Download Image
                          </button>

                          <Link
                            href="/image"
                            className="mt-2 w-full flex items-center justify-center gap-1.5 text-xs text-slate-500 hover:text-[#6366F1] transition-colors duration-200 py-1"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            View Details
                          </Link>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                </div>
              )}

              {/* ── WISHLIST TAB ── */}
              {activeTab === "wishlist" && (
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <h2 className="text-2xl font-bold text-[#0F172A]">
                      Saved for Later
                    </h2>
                    <span className="bg-rose-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">
                      {wishlist.length}
                    </span>
                  </div>

                  {wishlist.length === 0 ? (
                    <div className="text-center py-20">
                      <Heart className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                      <p className="text-slate-500 text-lg font-medium">
                        Your wishlist is empty
                      </p>
                      <p className="text-slate-400 text-sm mt-1 mb-6">
                        Browse the gallery and save images you love.
                      </p>
                      <Link
                        href="/browse"
                        className="inline-flex items-center gap-2 bg-[#6366F1] text-white px-6 py-3 rounded-xl font-medium hover:bg-indigo-600 transition-colors"
                      >
                        Browse Gallery <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  ) : (
                    <motion.div
                      variants={staggerContainer}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
                    >
                      {wishlist.map((img) => (
                        <motion.div
                          key={img.id}
                          variants={scaleIn}
                          className="bg-white rounded-2xl overflow-hidden shadow-sm border border-[#E2E8F0] group hover:shadow-md transition-shadow duration-200"
                        >
                          <div className="relative h-44 overflow-hidden">
                            <img
                              src={img.imageUrl}
                              alt={img.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                          <div className="p-4">
                            <h3 className="font-semibold text-[#0F172A] text-sm mb-0.5 truncate">
                              {img.title}
                            </h3>
                            <p className="text-slate-500 text-xs mb-3">
                              by {img.photographer}
                            </p>
                            <p className="text-[#6366F1] font-bold text-base mb-3">
                              ${img.price}
                            </p>
                            <div className="flex gap-2">
                              <button className="flex-1 bg-[#6366F1] hover:bg-indigo-600 text-white rounded-xl py-2 text-xs font-medium transition-colors duration-200">
                                Add to Cart
                              </button>
                              <button
                                onClick={() => removeFromWishlist(img.id)}
                                className="w-9 h-9 flex items-center justify-center border border-rose-200 rounded-xl hover:bg-rose-50 transition-colors duration-200"
                                aria-label="Remove from wishlist"
                              >
                                <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </motion.div>
                  )}
                </div>
              )}

              {/* ── ORDERS TAB ── */}
              {activeTab === "orders" && (
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <h2 className="text-2xl font-bold text-[#0F172A]">
                      Order History
                    </h2>
                  </div>

                  {/* Desktop Table */}
                  <div className="bg-white rounded-2xl shadow-sm border border-[#E2E8F0] overflow-hidden mb-6">
                    {/* Table Header */}
                    <div className="hidden md:grid grid-cols-6 gap-4 px-6 py-4 bg-slate-50 border-b border-[#E2E8F0] text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      <div className="col-span-2">Order ID</div>
                      <div>Date</div>
                      <div>Items</div>
                      <div>Total</div>
                      <div>Status / Action</div>
                    </div>

                    {/* Table Rows */}
                    <motion.div
                      variants={staggerContainer}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                    >
                      {orderHistory.map((order, idx) => (
                        <motion.div
                          key={order.id}
                          variants={fadeInUp}
                          className={`px-6 py-4 ${
                            idx < orderHistory.length - 1
                              ? "border-b border-[#E2E8F0]"
                              : ""
                          }`}
                        >
                          {/* Desktop Row */}
                          <div className="hidden md:grid grid-cols-6 gap-4 items-center">
                            <div className="col-span-2">
                              <span className="font-mono text-sm font-semibold text-[#0F172A]">
                                {order.id}
                              </span>
                            </div>
                            <div className="text-sm text-slate-600">{order.date}</div>
                            <div className="text-sm text-slate-600">
                              {order.items} {order.items === 1 ? "item" : "items"}
                            </div>
                            <div className="text-sm font-bold text-[#0F172A]">
                              ${order.total}
                            </div>
                            <div className="flex items-center gap-3">
                              <span
                                className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${
                                  order.status === "Completed"
                                    ? "bg-green-100 text-green-700"
                                    : "bg-yellow-100 text-yellow-700"
                                }`}
                              >
                                {order.status === "Completed" ? (
                                  <Check className="w-3 h-3" />
                                ) : (
                                  <Clock className="w-3 h-3" />
                                )}
                                {order.status}
                              </span>
                              <button className="text-xs text-[#6366F1] border border-[#6366F1] px-3 py-1 rounded-lg hover:bg-indigo-50 transition-colors font-medium">
                                View Receipt
                              </button>
                            </div>
                          </div>

                          {/* Mobile Card */}
                          <div className="md:hidden space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="font-mono text-sm font-semibold text-[#0F172A]">
                                {order.id}
                              </span>
                              <span
                                className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${
                                  order.status === "Completed"
                                    ? "bg-green-100 text-green-700"
                                    : "bg-yellow-100 text-yellow-700"
                                }`}
                              >
                                {order.status === "Completed" ? (
                                  <Check className="w-3 h-3" />
                                ) : (
                                  <Clock className="w-3 h-3" />
                                )}
                                {order.status}
                              </span>
                            </div>
                            <div className="flex items-center justify-between text-sm text-slate-600">
                              <span>{order.date}</span>
                              <span>
                                {order.items} {order.items === 1 ? "item" : "items"}
                              </span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="font-bold text-[#0F172A]">
                                ${order.total}
                              </span>
                              <button className="text-xs text-[#6366F1] border border-[#6366F1] px-3 py-1 rounded-lg hover:bg-indigo-50 transition-colors font-medium">
                                View Receipt
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </motion.div>
                  </div>

                  {/* Summary Card */}
                  <motion.div
                    variants={fadeInUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="bg-gradient-to-r from-[#6366F1] to-indigo-500 rounded-2xl p-6 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                  >
                    <div>
                      <p className="text-indigo-200 text-sm font-medium">
                        Total spent across all orders
                      </p>
                      <p className="text-4xl font-bold mt-1">${totalOrderSpend}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-center">
                        <p className="text-2xl font-bold">{orderHistory.length}</p>
                        <p className="text-indigo-200 text-xs">Orders</p>
                      </div>
                      <div className="w-px h-10 bg-white/20" />
                      <div className="text-center">
                        <p className="text-2xl font-bold">
                          {orderHistory.reduce((s, o) => s + o.items, 0)}
                        </p>
                        <p className="text-indigo-200 text-xs">Images</p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              )}

              {/* ── SETTINGS TAB ── */}
              {activeTab === "settings" && (
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <h2 className="text-2xl font-bold text-[#0F172A]">
                      Account Settings
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                    {/* Profile Information */}
                    <motion.div
                      variants={fadeInUp}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      className="bg-white rounded-2xl p-6 border border-[#E2E8F0] shadow-sm"
                    >
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center">
                          <User className="w-5 h-5 text-[#6366F1]" />
                        </div>
                        <h3 className="text-lg font-bold text-[#0F172A]">
                          Profile Information
                        </h3>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-1.5">
                            Full Name
                          </label>
                          <input
                            type="text"
                            defaultValue={user.name}
                            className="w-full px-4 py-2.5 border border-[#E2E8F0] rounded-xl text-sm text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#6366F1]/30 focus:border-[#6366F1] transition-all"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-1.5">
                            Email Address
                          </label>
                          <input
                            type="email"
                            defaultValue={user.email}
                            className="w-full px-4 py-2.5 border border-[#E2E8F0] rounded-xl text-sm text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#6366F1]/30 focus:border-[#6366F1] transition-all"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-1.5">
                            Member Since
                          </label>
                          <div className="w-full px-4 py-2.5 border border-[#E2E8F0] rounded-xl text-sm text-slate-400 bg-slate-50">
                            {user.memberSince}
                          </div>
                        </div>
                        <button className="w-full bg-[#6366F1] hover:bg-indigo-600 text-white rounded-xl py-2.5 text-sm font-semibold transition-colors duration-200 flex items-center justify-center gap-2">
                          <Check className="w-4 h-4" />
                          Save Changes
                        </button>
                      </div>
                    </motion.div>

                    {/* Notification Preferences */}
                    <motion.div
                      variants={fadeInUp}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      className="bg-white rounded-2xl p-6 border border-[#E2E8F0] shadow-sm"
                    >
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center">
                          <Bell className="w-5 h-5 text-[#6366F1]" />
                        </div>
                        <h3 className="text-lg font-bold text-[#0F172A]">
                          Notification Preferences
                        </h3>
                      </div>

                      <div className="space-y-5">
                        {[
                          {
                            key: "purchases" as const,
                            label: "New purchase confirmations",
                            description:
                              "Get notified when your purchase is complete.",
                          },
                          {
                            key: "priceDrops" as const,
                            label: "Wishlist price drops",
                            description:
                              "Alert when a saved image drops in price.",
                          },
                          {
                            key: "newsletter" as const,
                            label: "Newsletter & promotions",
                            description:
                              "Weekly curated picks and exclusive deals.",
                          },
                          {
                            key: "security" as const,
                            label: "Security alerts",
                            description:
                              "Important alerts about your account security.",
                          },
                        ].map((pref) => (
                          <div
                            key={pref.key}
                            className="flex items-center justify-between gap-4"
                          >
                            <div>
                              <p className="text-sm font-medium text-[#0F172A]">
                                {pref.label}
                              </p>
                              <p className="text-xs text-slate-500 mt-0.5">
                                {pref.description}
                              </p>
                            </div>
                            <Toggle
                              enabled={notifications[pref.key]}
                              onToggle={() =>
                                setNotifications((prev) => ({
                                  ...prev,
                                  [pref.key]: !prev[pref.key],
                                }))
                              }
                            />
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  </div>

                  {/* Danger Zone */}
                  <motion.div
                    variants={fadeInUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="bg-white rounded-2xl p-6 border-2 border-red-200 shadow-sm"
                  >
                    <h3 className="text-lg font-bold text-red-600 mb-2">
                      Danger Zone
                    </h3>
                    <p className="text-slate-500 text-sm mb-4">
                      Once you delete your account, all your data, purchases, and
                      saved images will be permanently removed. This action cannot
                      be undone.
                    </p>
                    <button className="border-2 border-red-400 text-red-600 hover:bg-red-50 px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors duration-200">
                      Delete Account
                    </button>
                  </motion.div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
}
