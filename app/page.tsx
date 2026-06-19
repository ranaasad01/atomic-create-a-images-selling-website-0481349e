"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Search, Star, Download, Shield, Zap, Globe, Camera, Heart, Eye, ArrowRight, Check, TrendingUp, Users, Image, Sparkles, ChevronRight } from 'lucide-react';
import { fadeInUp, fadeIn, staggerContainer, scaleIn, slideInLeft, slideInRight } from "@/lib/motion";
import { APP_NAME, APP_TAGLINE, APP_DESCRIPTION, STATS, licenseTypes } from "@/lib/data";

// ─── Inline mock data ────────────────────────────────────────────────────────

const FEATURED_IMAGES = [
  {
    id: "1",
    title: "Golden Hour Cityscape",
    photographer: "Elena Vasquez",
    category: "Architecture",
    price: 29,
    rating: 4.9,
    downloads: 2341,
    likes: 891,
    imageUrl: "https://iso.500px.com/wp-content/uploads/2014/07/hong-kong-cityscape1.jpg",
    featured: true,
  },
  {
    id: "2",
    title: "Misty Mountain Range",
    photographer: "James Thornton",
    category: "Nature",
    price: 19,
    rating: 4.8,
    downloads: 1876,
    likes: 654,
    imageUrl: "https://images.stockcake.com/public/f/5/a/f5a897bb-bcc4-4bb6-bc13-ef3dc3493755_large/misty-mountain-peaks-stockcake.jpg",
    featured: false,
  },
  {
    id: "3",
    title: "Ocean Waves at Dusk",
    photographer: "Aiko Nakamura",
    category: "Seascape",
    price: 24,
    rating: 4.9,
    downloads: 3102,
    likes: 1203,
    imageUrl: "https://images.unsplash.com/photo-1605422504455-c4be51ea789b?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    featured: false,
  },
  {
    id: "4",
    title: "Vibrant Street Market",
    photographer: "Carlos Mendez",
    category: "Street",
    price: 19,
    rating: 4.7,
    downloads: 987,
    likes: 432,
    imageUrl: "https://i.guim.co.uk/img/media/3c1655645c104886533efaea9ad22781ef49499e/0_400_6000_3600/master/6000.jpg?width=465&dpr=1&s=none&crop=none",
    featured: false,
  },
  {
    id: "5",
    title: "Abstract Light Trails",
    photographer: "Sophie Laurent",
    category: "Abstract",
    price: 34,
    rating: 5.0,
    downloads: 1543,
    likes: 720,
    imageUrl: "https://images.unsplash.com/photo-1741096930793-1a32e3a8a4d5?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    featured: false,
  },
  {
    id: "6",
    title: "Lush Rainforest Canopy",
    photographer: "Ravi Patel",
    category: "Nature",
    price: 22,
    rating: 4.8,
    downloads: 2210,
    likes: 867,
    imageUrl: "https://thumbs.dreamstime.com/b/lush-green-rainforest-canopy-viewed-above-sunlight-filtering-jungle-dense-stretches-out-vibrant-leaves-441095154.jpg",
    featured: false,
  },
];

const CATEGORIES = [
  { id: "nature", name: "Nature", count: "420K+", imageUrl: "https://d4g0cdul6yygp.cloudfront.net/uploads/2022/01/good-nature-homepage-hero_2-scaled.jpg", color: "from-emerald-500/80 to-teal-600/80" },
  { id: "architecture", name: "Architecture", count: "185K+", imageUrl: "https://d4g0cdul6yygp.cloudfront.net/uploads/2022/01/good-nature-homepage-hero_2-scaled.jpg", color: "from-slate-500/80 to-slate-700/80" },
  { id: "people", name: "People", count: "310K+", imageUrl: "https://thearchitectsdiary.com/wp-content/uploads/2023/02/Arch2O-architectural-sketching-10-architecture-sketching-tips-1-1024x585.jpg", color: "from-rose-500/80 to-pink-600/80" },
  { id: "travel", name: "Travel", count: "275K+", imageUrl: "https://getdex.com/blog/content/images/2022/09/how-to-be-a-people-person-1662995088.jpg", color: "from-amber-500/80 to-orange-600/80" },
  { id: "abstract", name: "Abstract", count: "98K+", imageUrl: "https://www.internationalinsurance.com/wp-content/uploads/2021/08/travel-lessons.jpg", color: "from-violet-500/80 to-purple-700/80" },
  { id: "food", name: "Food & Drink", count: "143K+", imageUrl: "https://thevirtualinstructor.com/blog/wp-content/uploads/2013/08/understanding-abstract-art.jpg", color: "from-yellow-500/80 to-amber-600/80" },
];

const TESTIMONIALS = [
  {
    id: "t1",
    name: "Sarah Mitchell",
    role: "Creative Director, Apex Studio",
    avatar: "https://potatorolls.com/wp-content/uploads/2020/06/Summer-Food-Drink-Pairing.jpg",
    quote: "ImageMarket has completely transformed how we source visuals. The quality is unmatched and licensing is crystal clear — no legal headaches.",
    rating: 5,
  },
  {
    id: "t2",
    name: "David Chen",
    role: "Freelance Photographer",
    avatar: "https://m.media-amazon.com/images/M/MV5BODYzNTU2MzktZmFjYy00ODc0LWFjYmMtY2Q4OWU1ZmU3ZDRjXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
    quote: "I've been selling on ImageMarket for two years and it's my primary income source. The platform is intuitive and payouts are always on time.",
    rating: 5,
  },
  {
    id: "t3",
    name: "Priya Sharma",
    role: "Marketing Manager, Bloom Co.",
    avatar: "https://upload.wikimedia.org/wikipedia/en/thumb/d/de/Priya_Sharma_%28fictional_character%29.jpg/250px-Priya_Sharma_%28fictional_character%29.jpg",
    quote: "The search is incredibly powerful. I find exactly what I need in minutes, not hours. The commercial licensing options are perfect for our campaigns.",
    rating: 5,
  },
];

const VALUE_PROPS = [
  {
    icon: Shield,
    title: "Legally Cleared Licensing",
    description: "Every image comes with a clear, legally vetted license. Personal, commercial, or extended — choose the right fit with zero ambiguity.",
    color: "from-indigo-500 to-violet-600",
  },
  {
    icon: Zap,
    title: "Instant High-Res Downloads",
    description: "Purchase and download full-resolution files immediately. No waiting, no approval queues — your creative workflow stays uninterrupted.",
    color: "from-amber-500 to-orange-500",
  },
  {
    icon: Globe,
    title: "Global Photographer Network",
    description: "18,000+ vetted photographers from 120 countries contribute unique perspectives you won't find anywhere else.",
    color: "from-emerald-500 to-teal-500",
  },
  {
    icon: TrendingUp,
    title: "Fair Photographer Payouts",
    description: "Photographers earn up to 60% commission — the highest in the industry. Great content deserves great compensation.",
    color: "from-rose-500 to-pink-500",
  },
  {
    icon: Search,
    title: "AI-Powered Search",
    description: "Our semantic search understands mood, color, and concept — not just keywords. Find the perfect shot in seconds.",
    color: "from-sky-500 to-blue-600",
  },
  {
    icon: Users,
    title: "Dedicated Support Team",
    description: "Real humans available 7 days a week. Whether you're a buyer or seller, we're here to help you succeed.",
    color: "from-violet-500 to-purple-600",
  },
];

const TRENDING_TAGS = [
  "Aerial Photography", "Minimalism", "Golden Hour", "Black & White",
  "Urban Life", "Wildlife", "Macro", "Long Exposure", "Portraits", "Seasons",
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function ImageCard({ img, index }: { img: typeof FEATURED_IMAGES[0]; index: number }) {
  const [liked, setLiked] = useState(false);
  const shouldReduce = useReducedMotion();

  return (
    <motion.div
      variants={scaleIn}
      whileHover={shouldReduce ? {} : { y: -6, scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className="group relative rounded-2xl overflow-hidden bg-slate-800 shadow-xl shadow-black/30 cursor-pointer"
    >
      <div className={`relative ${index === 0 ? "aspect-[4/5]" : "aspect-[3/4]"} overflow-hidden`}>
        <img
          src={img.imageUrl}
          alt={img.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Top badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          <span className="px-2.5 py-1 bg-black/50 backdrop-blur-sm text-white text-xs font-medium rounded-full">
            {img.category}
          </span>
          {img.featured && (
            <span className="px-2.5 py-1 bg-gradient-to-r from-indigo-500 to-violet-500 text-white text-xs font-semibold rounded-full flex items-center gap-1">
              <Sparkles className="w-3 h-3" /> Featured
            </span>
          )}
        </div>

        {/* Like button */}
        <motion.button
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setLiked((v) => !v)}
          className="absolute top-3 right-3 p-2 bg-black/40 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          aria-label="Like"
        >
          <Heart
            className={`w-4 h-4 transition-colors ${liked ? "fill-rose-500 text-rose-500" : "text-white"}`}
          />
        </motion.button>

        {/* Bottom info on hover */}
        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white font-semibold text-sm leading-tight">{img.title}</p>
              <p className="text-slate-300 text-xs mt-0.5">by {img.photographer}</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              className="px-3 py-1.5 bg-gradient-to-r from-indigo-500 to-violet-600 text-white text-xs font-bold rounded-lg shadow-lg"
            >
              ${img.price}
            </motion.button>
          </div>
          <div className="flex items-center gap-3 mt-2">
            <span className="flex items-center gap-1 text-slate-300 text-xs">
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              {img.rating}
            </span>
            <span className="flex items-center gap-1 text-slate-300 text-xs">
              <Download className="w-3 h-3" />
              {(img.downloads ?? 0).toLocaleString()}
            </span>
            <span className="flex items-center gap-1 text-slate-300 text-xs">
              <Eye className="w-3 h-3" />
              {(img.likes ?? 0).toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const shouldReduce = useReducedMotion();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <main className="bg-[#0F172A] text-white overflow-x-hidden">

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-4 pt-24 pb-16 overflow-hidden">
        {/* Background grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:64px_64px]" />
        {/* Radial glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-indigo-600/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-1/2 left-1/4 w-[400px] h-[400px] bg-violet-600/15 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="flex flex-col items-center gap-6"
          >
            {/* Badge */}
            <motion.div variants={fadeInUp}>
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-500/10 border border-indigo-500/30 rounded-full text-indigo-300 text-sm font-medium">
                <Sparkles className="w-4 h-4" />
                2.4 Million+ Premium Photos
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={fadeInUp}
              className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.08]"
            >
              <span className="text-white">License the World's</span>
              <br />
              <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-purple-400 bg-clip-text text-transparent">
                Finest Photography
              </span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              variants={fadeInUp}
              className="text-slate-400 text-lg sm:text-xl max-w-2xl leading-relaxed"
            >
              {APP_DESCRIPTION}
            </motion.p>

            {/* Search bar */}
            <motion.form
              variants={fadeInUp}
              onSubmit={handleSearch}
              className="w-full max-w-2xl"
            >
              <div className="relative flex items-center">
                <Search className="absolute left-5 w-5 h-5 text-slate-400 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search mountains, portraits, architecture…"
                  className="w-full pl-14 pr-36 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-slate-500 text-base focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all backdrop-blur-sm"
                />
                <motion.button
                  whileHover={shouldReduce ? {} : { scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  type="submit"
                  className="absolute right-2 px-5 py-2.5 bg-gradient-to-r from-indigo-500 to-violet-600 text-white font-semibold rounded-xl shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 transition-shadow text-sm"
                >
                  Search
                </motion.button>
              </div>
            </motion.form>

            {/* Trending tags */}
            <motion.div variants={fadeInUp} className="flex flex-wrap justify-center gap-2">
              <span className="text-slate-500 text-sm self-center">Trending:</span>
              {TRENDING_TAGS.slice(0, 6).map((tag) => (
                <motion.button
                  key={tag}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  className="px-3 py-1 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-indigo-500/40 rounded-full text-slate-300 hover:text-white text-xs font-medium transition-all"
                >
                  {tag}
                </motion.button>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Hero image mosaic */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
          className="relative z-10 mt-16 w-full max-w-6xl mx-auto"
        >
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 h-48 sm:h-64">
            {FEATURED_IMAGES.slice(0, 5).map((img, i) => (
              <div
                key={img.id}
                className={`relative rounded-xl overflow-hidden ${i === 2 ? "col-span-1 sm:col-span-1 row-span-1" : ""}`}
              >
                <img
                  src={img.imageUrl}
                  alt={img.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>
            ))}
          </div>
          {/* Fade out bottom */}
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#0F172A] to-transparent" />
        </motion.div>
      </section>

      {/* ── STATS ────────────────────────────────────────────────────────── */}
      <section className="py-16 border-y border-white/5 bg-white/[0.02]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={staggerContainer}
            className="grid grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {STATS.map((stat) => (
              <motion.div
                key={stat.label}
                variants={fadeInUp}
                className="text-center"
              >
                <p className="text-4xl font-extrabold bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
                  {stat.value}
                </p>
                <p className="text-slate-400 text-sm mt-1 font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── EXPLORE / FEATURED IMAGES ────────────────────────────────────── */}
      <section id="explore" className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={staggerContainer}
            className="text-center mb-14"
          >
            <motion.span variants={fadeInUp} className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 rounded-full text-indigo-400 text-xs font-semibold uppercase tracking-widest mb-4">
              <Image className="w-3.5 h-3.5" /> Curated Picks
            </motion.span>
            <motion.h2 variants={fadeInUp} className="text-4xl sm:text-5xl font-extrabold text-white mb-4">
              Featured Images
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-slate-400 text-lg max-w-xl mx-auto">
              Hand-picked by our editorial team — the most stunning, versatile shots available right now.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={staggerContainer}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4 lg:gap-6"
          >
            {FEATURED_IMAGES.map((img, i) => (
              <ImageCard key={img.id} img={img} index={i} />
            ))}
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeInUp}
            className="text-center mt-12"
          >
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-indigo-500/40 text-white font-semibold rounded-2xl transition-all"
            >
              Browse All Photos <ArrowRight className="w-4 h-4" />
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* ── CATEGORIES ───────────────────────────────────────────────────── */}
      <section id="categories" className="py-24 px-4 sm:px-6 lg:px-8 bg-white/[0.02] border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={staggerContainer}
            className="text-center mb-14"
          >
            <motion.span variants={fadeInUp} className="inline-flex items-center gap-2 px-3 py-1 bg-violet-500/10 border border-violet-500/20 rounded-full text-violet-400 text-xs font-semibold uppercase tracking-widest mb-4">
              <Camera className="w-3.5 h-3.5" /> Browse by Category
            </motion.span>
            <motion.h2 variants={fadeInUp} className="text-4xl sm:text-5xl font-extrabold text-white mb-4">
              Find Your Perfect Shot
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-slate-400 text-lg max-w-xl mx-auto">
              From sweeping landscapes to intimate portraits — explore our curated categories and discover images that speak to your vision.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={staggerContainer}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4"
          >
            {CATEGORIES.map((cat) => (
              <motion.div
                key={cat.id}
                variants={scaleIn}
                whileHover={{ y: -6, scale: 1.03 }}
                transition={{ duration: 0.25 }}
                className="group relative rounded-2xl overflow-hidden cursor-pointer aspect-[3/4]"
              >
                <img
                  src={cat.imageUrl}
                  alt={cat.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${cat.color} opacity-70 group-hover:opacity-80 transition-opacity`} />
                <div className="absolute inset-0 flex flex-col items-center justify-end p-4 text-center">
                  <p className="text-white font-bold text-sm leading-tight">{cat.name}</p>
                  <p className="text-white/70 text-xs mt-0.5">{cat.count} photos</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── TRENDING ─────────────────────────────────────────────────────── */}
      <section id="trending" className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            {/* Left copy */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={slideInLeft}
              className="flex-1 max-w-lg"
            >
              <span className="inline-flex items-center gap-2 px-3 py-1 bg-rose-500/10 border border-rose-500/20 rounded-full text-rose-400 text-xs font-semibold uppercase tracking-widest mb-6">
                <TrendingUp className="w-3.5 h-3.5" /> What's Hot
              </span>
              <h2 className="text-4xl sm:text-5xl font-extrabold text-white mb-6 leading-tight">
                Trending Tags This Week
              </h2>
              <p className="text-slate-400 text-lg leading-relaxed mb-8">
                Stay ahead of the curve. These are the styles and subjects buyers are searching for most — perfect for photographers looking to maximize their sales.
              </p>
              <div className="flex flex-wrap gap-3">
                {TRENDING_TAGS.map((tag, i) => (
                  <motion.button
                    key={tag}
                    initial={{ opacity: 0, scale: 0.85 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.06, duration: 0.35 }}
                    whileHover={{ scale: 1.07 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 bg-white/5 hover:bg-indigo-500/20 border border-white/10 hover:border-indigo-500/50 rounded-full text-slate-300 hover:text-indigo-300 text-sm font-medium transition-all"
                  >
                    {tag}
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* Right image collage */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={slideInRight}
              className="flex-1 w-full max-w-lg"
            >
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-4">
                  <div className="rounded-2xl overflow-hidden aspect-[4/5]">
                    <img src="https://www.photopilot.com/media/images/San_Diego_3A5RGcc.0ec3cdf0.fill-1600x900.jpg" alt="Aerial Photography" className="w-full h-full object-cover" />
                  </div>
                  <div className="rounded-2xl overflow-hidden aspect-square">
                    <img src="https://www.photopilot.com/media/images/San_Diego_3A5RGcc.0ec3cdf0.fill-1600x900.jpg" alt="Minimalism" className="w-full h-full object-cover" />
                  </div>
                </div>
                <div className="flex flex-col gap-4 mt-8">
                  <div className="rounded-2xl overflow-hidden aspect-square">
                    <img src="https://images.adsttc.com/media/images/6290/ac61/3e4b/31f4/d600/0001/large_jpg/155108.jpg?1653648474" alt="Wildlife" className="w-full h-full object-cover" />
                  </div>
                  <div className="rounded-2xl overflow-hidden aspect-[4/5]">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/7/7d/Wildlife_at_Maasai_Mara_%28Lion%29.jpg" alt="Long Exposure" className="w-full h-full object-cover" />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── VALUE PROPS ──────────────────────────────────────────────────── */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white/[0.02] border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.span variants={fadeInUp} className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-400 text-xs font-semibold uppercase tracking-widest mb-4">
              <Zap className="w-3.5 h-3.5" /> Why ImageMarket
            </motion.span>
            <motion.h2 variants={fadeInUp} className="text-4xl sm:text-5xl font-extrabold text-white mb-4">
              Built for Creators & Buyers
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-slate-400 text-lg max-w-xl mx-auto">
              Everything you need to find, license, and use world-class photography — or sell your own work to a global audience.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {VALUE_PROPS.map((vp) => {
              const Icon = vp.icon;
              return (
                <motion.div
                  key={vp.title}
                  variants={fadeInUp}
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.25 }}
                  className="p-6 bg-white/[0.03] hover:bg-white/[0.06] border border-white/5 hover:border-indigo-500/20 rounded-2xl transition-all group"
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${vp.color} flex items-center justify-center mb-5 shadow-lg`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-white font-bold text-lg mb-2">{vp.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{vp.description}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ── PRICING ──────────────────────────────────────────────────────── */}
      <section id="pricing" className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.span variants={fadeInUp} className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 border border-amber-500/20 rounded-full text-amber-400 text-xs font-semibold uppercase tracking-widest mb-4">
              <Star className="w-3.5 h-3.5" /> Licensing Plans
            </motion.span>
            <motion.h2 variants={fadeInUp} className="text-4xl sm:text-5xl font-extrabold text-white mb-4">
              Simple, Transparent Pricing
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-slate-400 text-lg max-w-xl mx-auto">
              No subscriptions required. Pay per image, choose the license that fits your project, and download instantly.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {licenseTypes.map((plan, i) => {
              const isPopular = plan.id === "commercial";
              return (
                <motion.div
                  key={plan.id}
                  variants={scaleIn}
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.25 }}
                  className={`relative p-8 rounded-2xl border transition-all ${
                    isPopular
                      ? "bg-gradient-to-b from-indigo-500/10 to-violet-500/5 border-indigo-500/40 shadow-xl shadow-indigo-500/10"
                      : "bg-white/[0.03] border-white/10 hover:border-white/20"
                  }`}
                >
                  {isPopular && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                      <span className="px-4 py-1 bg-gradient-to-r from-indigo-500 to-violet-500 text-white text-xs font-bold rounded-full shadow-lg">
                        Most Popular
                      </span>
                    </div>
                  )}
                  <div className="mb-6">
                    <h3 className="text-white font-bold text-xl mb-1">{plan.name}</h3>
                    <p className="text-slate-400 text-sm">{plan.description}</p>
                  </div>
                  <div className="mb-6">
                    <span className="text-5xl font-extrabold text-white">${plan.price}</span>
                    <span className="text-slate-400 text-sm ml-2">per image</span>
                  </div>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2.5">
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${isPopular ? "bg-indigo-500/20" : "bg-white/10"}`}>
                          <Check className={`w-3 h-3 ${isPopular ? "text-indigo-400" : "text-slate-300"}`} />
                        </div>
                        <span className="text-slate-300 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <motion.button
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                    className={`w-full py-3.5 rounded-xl font-semibold text-sm transition-all ${
                      isPopular
                        ? "bg-gradient-to-r from-indigo-500 to-violet-600 text-white shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50"
                        : "bg-white/5 hover:bg-white/10 border border-white/10 text-white"
                    }`}
                  >
                    Get {plan.name} License
                  </motion.button>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ── TESTIMONIALS ─────────────────────────────────────────────────── */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white/[0.02] border-y border-white/5">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.span variants={fadeInUp} className="inline-flex items-center gap-2 px-3 py-1 bg-sky-500/10 border border-sky-500/20 rounded-full text-sky-400 text-xs font-semibold uppercase tracking-widest mb-4">
              <Heart className="w-3.5 h-3.5" /> Loved by Creators
            </motion.span>
            <motion.h2 variants={fadeInUp} className="text-4xl sm:text-5xl font-extrabold text-white mb-4">
              What Our Community Says
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-slate-400 text-lg max-w-xl mx-auto">
              Thousands of photographers and buyers trust ImageMarket every day. Here's what they have to say.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {TESTIMONIALS.map((t) => (
              <motion.div
                key={t.id}
                variants={fadeInUp}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.25 }}
                className="p-6 bg-white/[0.03] hover:bg-white/[0.05] border border-white/5 hover:border-white/10 rounded-2xl transition-all"
              >
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-slate-300 text-sm leading-relaxed mb-6">"{t.quote}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden bg-slate-700 flex-shrink-0">
                    <img src={t.avatar} alt={t.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm">{t.name}</p>
                    <p className="text-slate-500 text-xs">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── SELL CTA ─────────────────────────────────────────────────────── */}
      <section id="sell" className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeIn}
            className="relative rounded-3xl overflow-hidden"
          >
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-violet-600 to-purple-700" />
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:48px_48px]" />
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

            <div className="relative z-10 flex flex-col lg:flex-row items-center gap-10 p-10 lg:p-16">
              <div className="flex-1 text-center lg:text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 border border-white/20 rounded-full text-white/80 text-xs font-semibold uppercase tracking-widest mb-6">
                  <Camera className="w-3.5 h-3.5" /> For Photographers
                </div>
                <h2 className="text-4xl sm:text-5xl font-extrabold text-white mb-4 leading-tight">
                  Turn Your Passion Into Profit
                </h2>
                <p className="text-white/70 text-lg leading-relaxed mb-8 max-w-lg">
                  Join 18,000+ photographers already earning on ImageMarket. Upload your portfolio, set your prices, and start earning up to 60% commission — the highest in the industry.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.97 }}
                    className="px-8 py-4 bg-white text-indigo-700 font-bold rounded-2xl shadow-xl hover:shadow-2xl transition-shadow text-base"
                  >
                    Start Selling Today
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.97 }}
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold rounded-2xl transition-all text-base"
                  >
                    Learn More <ChevronRight className="w-4 h-4" />
                  </motion.button>
                </div>
              </div>

              {/* Stats column */}
              <div className="flex-shrink-0 grid grid-cols-2 gap-4 w-full lg:w-auto">
                {[
                  { label: "Avg. Monthly Earnings", value: "$1,240" },
                  { label: "Commission Rate", value: "Up to 60%" },
                  { label: "Time to First Sale", value: "< 48 hrs" },
                  { label: "Payout Frequency", value: "Monthly" },
                ].map((s) => (
                  <div key={s.label} className="p-5 bg-white/10 backdrop-blur-sm border border-white/10 rounded-2xl text-center">
                    <p className="text-white font-extrabold text-2xl">{s.value}</p>
                    <p className="text-white/60 text-xs mt-1">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── ABOUT ────────────────────────────────────────────────────────── */}
      <section id="about" className="py-24 px-4 sm:px-6 lg:px-8 bg-white/[0.02] border-t border-white/5">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={staggerContainer}
            className="flex flex-col items-center gap-6"
          >
            <motion.span variants={fadeInUp} className="inline-flex items-center gap-2 px-3 py-1 bg-violet-500/10 border border-violet-500/20 rounded-full text-violet-400 text-xs font-semibold uppercase tracking-widest">
              <Globe className="w-3.5 h-3.5" /> Our Mission
            </motion.span>
            <motion.h2 variants={fadeInUp} className="text-4xl sm:text-5xl font-extrabold text-white leading-tight max-w-3xl">
              Connecting the World Through the Power of Photography
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-slate-400 text-lg leading-relaxed max-w-2xl">
              ImageMarket was founded in 2019 with a simple belief: great photography should be accessible to everyone, and great photographers should be rewarded fairly. We've built a platform that puts quality, transparency, and community first — and we're just getting started.
            </motion.p>
            <motion.div variants={fadeInUp} className="flex flex-wrap justify-center gap-4 mt-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-500 to-violet-600 text-white font-semibold rounded-xl shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 transition-shadow"
              >
                Our Story <ArrowRight className="w-4 h-4" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold rounded-xl transition-all"
              >
                Meet the Team <Users className="w-4 h-4" />
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </section>

    </main>
  );
}