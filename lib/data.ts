export const APP_NAME = "ImageMarket";
export const APP_TAGLINE = "License the world's finest photography.";
export const APP_DESCRIPTION =
  "The premier marketplace where world-class photographers sell and buyers discover stunning, high-quality licensed images.";

export interface NavLink {
  label: string;
  href: string;
}

export const navLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Explore", href: "#explore" },
  { label: "Categories", href: "#categories" },
  { label: "Trending", href: "#trending" },
  { label: "Pricing", href: "#pricing" },
  { label: "About", href: "#about" },
];

export const navCTA = {
  label: "Start Selling",
  href: "#sell",
};

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  imageUrl: string;
  count: number;
}

export interface LicenseType {
  id: string;
  name: string;
  description: string;
  price: number;
  features: string[];
}

export const licenseTypes: LicenseType[] = [
  {
    id: "personal",
    name: "Personal",
    description: "For personal, non-commercial use only.",
    price: 9,
    features: [
      "Personal projects",
      "Social media (non-commercial)",
      "Prints for personal use",
      "Single user license",
    ],
  },
  {
    id: "commercial",
    name: "Commercial",
    description: "For business and commercial applications.",
    price: 29,
    features: [
      "All Personal uses",
      "Commercial advertising",
      "Product packaging",
      "Website & digital media",
      "Up to 500,000 impressions",
    ],
  },
  {
    id: "extended",
    name: "Extended",
    description: "Unlimited commercial use with full rights.",
    price: 79,
    features: [
      "All Commercial uses",
      "Unlimited impressions",
      "Resale in products",
      "Broadcast & film",
      "Exclusive usage rights",
      "Priority support",
    ],
  },
];

export const BRAND_COLORS = {
  dark: "#0F172A",
  white: "#FFFFFF",
  indigo: "#6366F1",
  light: "#F8FAFC",
  border: "#E2E8F0",
} as const;

export const STATS = [
  { label: "Photos Available", value: "2.4M+" },
  { label: "Active Photographers", value: "18,000+" },
  { label: "Happy Buyers", value: "340,000+" },
  { label: "Countries Served", value: "120+" },
];