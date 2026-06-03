import cureskinImage from "@/assets/brand-cureskin.jpg";
import dentaproImage from "@/assets/brand-dentapro.jpg";
import novavitImage from "@/assets/brand-novavit.jpg";
import kidgloImage from "@/assets/brand-kidglo.jpg";
import calmrestImage from "@/assets/brand-calmrest.jpg";

export type Product = {
  id: string;
  name: string;
  tagline: string;
  description: string;
  packaging: string;
  details: string[];
  image: string;
  imageAlt: string;
};

export type Brand = {
  slug: string;
  name: string;
  monogram: string;
  category: string;
  categoryGroup: string;
  tagline: string;
  short: string;
  description: string;
  accent: string;
  story: string;
  subcategories: string[];
  supplyAvailability: string;
  distributionSupport: string;
  shippingAvailability: string;
  image: string;
  imageAlt: string;
  products: Product[];
  keywords: string[];
};

export const BRANDS: Brand[] = [
  {
    slug: "cureskin",
    name: "CureSkin",
    monogram: "Ps",
    category: "Dermaceutical Skincare",
    categoryGroup: "Dermaceutical Skincare",
    tagline: "Evidence-led skincare for everyday routines.",
    short:
      "Modern skincare products designed for beauty retailers, distributors and professional channels.",
    description:
      "CureSkin combines thoughtful formulations, consumer-friendly textures and dependable wholesale supply for skincare buyers serving the USA and international markets.",
    accent: "#D8A77B",
    story:
      "CureSkin was created around a simple idea: effective skincare should be easy to understand, pleasant to use and ready for the demands of modern beauty retail.",
    subcategories: ["Facial Serums", "Hydration", "Daily Skincare"],
    supplyAvailability: "Planned wholesale production with batch documentation",
    distributionSupport: "Sales materials, product training and market support",
    shippingAvailability: "International B2B shipping subject to destination requirements",
    image: cureskinImage,
    imageAlt: "CureSkin facial serum product bottle for wholesale skincare buyers",
    products: [
      {
        id: "cureskin-hydrating-serum",
        name: "Hydrating Facial Serum",
        tagline: "Lightweight daily hydration",
        description:
          "A lightweight facial serum developed for everyday hydration routines and beauty retail assortments.",
        packaging: "Glass dropper bottle",
        details: [
          "Suitable for daily skincare routines",
          "Retail-ready presentation",
          "Wholesale case packing available on quotation",
        ],
        image: cureskinImage,
        imageAlt: "CureSkin Hydrating Facial Serum glass dropper bottle",
      },
    ],
    keywords: [
      "bulk skincare products",
      "wholesale skincare USA",
      "B2B beauty products",
      "private label skincare manufacturer",
    ],
  },
  {
    slug: "dentapro",
    name: "DentaPro",
    monogram: "Dp",
    category: "Oral Health",
    categoryGroup: "Oral Health",
    tagline: "Confident daily oral health.",
    short:
      "Oral care products for distributors, pharmacies, wholesalers and personal care retailers.",
    description:
      "DentaPro supports wholesale oral care programs with accessible daily-use products designed for dependable retail presentation and repeat consumer demand.",
    accent: "#4D9DB5",
    story:
      "DentaPro brings practical oral care products to buyers who need consistent supply, clear positioning and support for high-volume distribution.",
    subcategories: ["Toothpaste", "Daily Oral Care", "Fresh Breath"],
    supplyAvailability: "Wholesale production planning for recurring orders",
    distributionSupport: "Product specifications and distributor sales support",
    shippingAvailability: "International B2B shipping subject to destination requirements",
    image: dentaproImage,
    imageAlt: "DentaPro toothpaste product with toothbrush for wholesale oral care buyers",
    products: [
      {
        id: "dentapro-daily-protection-toothpaste",
        name: "Daily Protection Toothpaste",
        tagline: "Everyday oral care protection",
        description:
          "A daily toothpaste format designed for oral care retailers, pharmacies and wholesale personal care assortments.",
        packaging: "Retail toothpaste tube",
        details: [
          "Daily-use oral care format",
          "Retail-ready presentation",
          "Wholesale case packing available on quotation",
        ],
        image: dentaproImage,
        imageAlt: "DentaPro Daily Protection Toothpaste tube beside a toothbrush",
      },
      {
        id: "dentapro-whitening-formula",
        name: "Whitening Formula",
        tagline: "Brighten teeth naturally",
        description:
          "Professional-grade whitening toothpaste for wholesale retail distribution with visible results.",
        packaging: "Retail toothpaste tube",
        details: [
          "Advanced whitening technology",
          "Gentle on tooth enamel",
          "Bulk pricing available for distributors",
        ],
        image: dentaproImage,
        imageAlt: "DentaPro Whitening Formula toothpaste",
      },
      {
        id: "dentapro-sensitive-care",
        name: "Sensitive Teeth Care",
        tagline: "Comfort for sensitive teeth",
        description:
          "Specialized formula for sensitive teeth, ideal for wholesale personal care and pharmacy networks.",
        packaging: "Retail toothpaste tube",
        details: [
          "Relief for sensitive teeth",
          "Clinically tested formula",
          "Wholesale case quantities available",
        ],
        image: dentaproImage,
        imageAlt: "DentaPro Sensitive Teeth Care toothpaste",
      },
      {
        id: "dentapro-fresh-mint",
        name: "Fresh Mint Flavor",
        tagline: "Long-lasting fresh breath",
        description:
          "Refreshing mint flavor toothpaste for wholesale distribution to oral care retailers.",
        packaging: "Retail toothpaste tube",
        details: [
          "Premium mint flavoring",
          "Long-lasting freshness",
          "Wholesale volume discounts",
        ],
        image: dentaproImage,
        imageAlt: "DentaPro Fresh Mint toothpaste",
      },
    ],
    keywords: [
      "wholesale oral care products",
      "wholesale personal care products",
      "B2B oral care supplier",
      "bulk toothpaste supplier",
    ],
  },
  {
    slug: "novavit",
    name: "NovaVit",
    monogram: "Nv",
    category: "Vitamins & Supplements",
    categoryGroup: "Vitamins & Supplements",
    tagline: "Daily nutrition made straightforward.",
    short: "Adult wellness supplements designed for pharmacy, distributor and retail channels.",
    description:
      "NovaVit offers approachable daily wellness formats for B2B buyers building dependable health and personal care assortments.",
    accent: "#D8744D",
    story:
      "NovaVit focuses on clear, practical supplement formats that fit naturally into daily routines and modern retail environments.",
    subcategories: ["Daily Vitamins", "Adult Wellness", "Supplements"],
    supplyAvailability: "Planned wholesale production with batch documentation",
    distributionSupport: "Product specifications and channel support",
    shippingAvailability: "International B2B shipping subject to destination requirements",
    image: novavitImage,
    imageAlt: "NovaVit vitamin supplement bottle for wholesale wellness buyers",
    products: [
      {
        id: "novavit-daily-multivitamin",
        name: "Daily Multivitamin",
        tagline: "Simple daily wellness support",
        description:
          "An adult multivitamin format for pharmacy, wellness retail and distributor assortments.",
        packaging: "Amber supplement bottle",
        details: [
          "Daily wellness positioning",
          "Retail-ready bottle format",
          "Wholesale case packing available on quotation",
        ],
        image: novavitImage,
        imageAlt: "NovaVit Daily Multivitamin amber supplement bottle",
      },
    ],
    keywords: ["bulk wellness products", "B2B health products", "wholesale supplements"],
  },
  {
    slug: "kidglo",
    name: "KidGlo",
    monogram: "Kg",
    category: "Children Nutrition",
    categoryGroup: "Children Nutrition",
    tagline: "Friendly nutrition for growing families.",
    short:
      "Children's nutrition products created for family wellness and pharmacy retail channels.",
    description:
      "KidGlo supports family wellness assortments with approachable children's nutrition formats developed for B2B retail and distribution.",
    accent: "#F07B5A",
    story:
      "KidGlo was built to make family wellness products feel clear, friendly and easy for parents to bring into everyday routines.",
    subcategories: ["Kids Vitamins", "Gummies", "Family Wellness"],
    supplyAvailability: "Planned wholesale production with batch documentation",
    distributionSupport: "Product specifications and family retail support",
    shippingAvailability: "International B2B shipping subject to destination requirements",
    image: kidgloImage,
    imageAlt: "KidGlo children's vitamin gummies bottle for wholesale family wellness buyers",
    products: [
      {
        id: "kidglo-vitamin-gummies",
        name: "Kids Vitamin Gummies",
        tagline: "Family-friendly daily nutrition",
        description:
          "A children's vitamin gummy format designed for pharmacy and family wellness retail channels.",
        packaging: "Retail gummy supplement bottle",
        details: [
          "Family wellness positioning",
          "Retail-ready bottle format",
          "Wholesale case packing available on quotation",
        ],
        image: kidgloImage,
        imageAlt: "KidGlo Kids Vitamin Gummies bottle with fruit pieces",
      },
    ],
    keywords: ["wholesale kids vitamins", "family wellness products", "B2B nutrition products"],
  },
  {
    slug: "calmrest",
    name: "CalmRest",
    monogram: "Cr",
    category: "Sleep & Wellness",
    categoryGroup: "Sleep & Wellness",
    tagline: "Thoughtful support for evening routines.",
    short: "Sleep and wellbeing products for pharmacy, wellness and personal care distribution.",
    description:
      "CalmRest offers simple evening wellness formats for B2B buyers serving consumers who value dependable sleep-support routines.",
    accent: "#5D6F8D",
    story:
      "CalmRest was developed for the quieter part of everyday health: products that support consistent evening routines without unnecessary complexity.",
    subcategories: ["Sleep Support", "Evening Wellness", "Supplements"],
    supplyAvailability: "Planned wholesale production with batch documentation",
    distributionSupport: "Product specifications and wellness channel support",
    shippingAvailability: "International B2B shipping subject to destination requirements",
    image: calmrestImage,
    imageAlt: "CalmRest sleep support supplement bottle for wholesale wellness buyers",
    products: [
      {
        id: "calmrest-sleep-support",
        name: "Sleep Support Supplement",
        tagline: "A simple evening wellness format",
        description:
          "A sleep-support supplement format designed for pharmacy, wellbeing and personal care retail assortments.",
        packaging: "Amber supplement bottle",
        details: [
          "Evening wellness positioning",
          "Retail-ready bottle format",
          "Wholesale case packing available on quotation",
        ],
        image: calmrestImage,
        imageAlt: "CalmRest Sleep Support Supplement bottle on a bedside table",
      },
    ],
    keywords: ["wholesale sleep support", "B2B wellness products", "bulk personal care products"],
  },
];

export const getBrand = (slug: string) => BRANDS.find((brand) => brand.slug === slug);

export const getProduct = (productId: string) => {
  for (const brand of BRANDS) {
    const product = brand.products.find((entry) => entry.id === productId);
    if (product) return { brand, product };
  }
  return undefined;
};
