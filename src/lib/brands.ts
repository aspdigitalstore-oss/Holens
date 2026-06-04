const makeSvgImage = (headline: string, subtitle: string, background: string) => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="1200"><rect width="100%" height="100%" fill="${background}"/><style>.headline{font:700 72px Inter,ui-sans-serif,system-ui,sans-serif;fill:#fff;letter-spacing:2px;}.subtitle{font:400 36px Inter,ui-sans-serif,system-ui,sans-serif;fill:#fff;letter-spacing:1px;}</style><text x="50%" y="46%" dominant-baseline="middle" text-anchor="middle" class="headline">${headline}</text><text x="50%" y="66%" dominant-baseline="middle" text-anchor="middle" class="subtitle">${subtitle}</text></svg>`;
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
};

const brandImage = (brandName: string, background: string) =>
  makeSvgImage(brandName, "Wholesale Products", background);

const productImage = (productName: string, brandName: string, background: string) =>
  makeSvgImage(productName, brandName, background);

import sensodyneImg from "@/assets/Sensodyne.jpg";
import sensodyneRepairProtect75mlImg from "@/assets/Sensodyne Repair & Protect Toothpaste.jpg";
import SensodynePronamelGentleWhiteningToothpasteImg from "@/assets/Sensodyne Pronamel Gentle Whitening Toothpaste.jpg";
import SensodyneRapidReliefToothpasteImg from "@/assets/Sensodyne Rapid Relief Toothpaste.jpg";

import parodontaxImg from "@/assets/Parodontax.jpg";
import ParodontaxCompleteProtectionToothpasteImg from "@/assets/Parodontax Complete Protection Toothpaste.jpg";
import ParodontaxActiveGumHealthMouthwashImg from "@/assets/Parodontax Active Gum Health Mouthwash.jpg";

import corsodylImg from "@/assets/Corsodyl.jpg";
import CorsodylDailyMouthwash500mlImg from "@/assets/Corsodyl Daily Mouthwash.jpg";

import polidentImg from "@/assets/Polident.jpg";
import Polident3MinuteDentureCleanserTabletsImg from "@/assets/Polident 3 Minute Denture Cleanser Tablets.jpg";

import coregaImg from "@/assets/Corega.jpg";
import CoregaUltraDentureFixativeCreamImg from "@/assets/Corega Ultra Denture Fixative Cream.jpg";

import aquafreshImg from "@/assets/Aquafresh.jpg";
import AquafreshTripleProtectionToothpasteImg from "@/assets/Aquafresh Triple Protection Toothpaste.jpg";
import AquafreshKidsToothpasteImg from "@/assets/Aquafresh Kids Toothpaste 3-5 Years.jpg";

import centrumImg from "@/assets/Centrum.jpg";
import CentrumAdvanceMultivitamins30TabletsImg from "@/assets/Centrum Advance Multivitamins 30 Tablets.jpg";
import CentrumWomenMultivitaminsImg from "@/assets/Centrum Women Multivitamins.jpg";

import emergenCImg from "@/assets/Emergen-C.jpg";
import EmergenCVitaminCOrangeImg from "@/assets/Emergen-C Vitamin C Orange.jpg";

import panadolImg from "@/assets/Panadol.jpg";
import PanadolExtraTablets24PackImg from "@/assets/Panadol Extra Tablets 24 Pack.jpg";

import voltarenImg from "@/assets/Voltaren.jpg";  
import VoltarenEmulgel100gImg from "@/assets/Voltaren Emulgel 100g.jpg";

import advilImg from "@/assets/Advil.jpg";
import AdvilIbuprofen200mg50TabletsImg from "@/assets/Advil Ibuprofen 200mg 50 Tablets.jpg";

import therafluImg from "@/assets/Theraflu.jpg";
import TherafluFluandColdReliefSachetsImg from "@/assets/Theraflu Flu & Cold Relief Sachets.jpg";

import otrivinImg from "@/assets/Otrivin.jpg";
import OtrivinNasalSpray10mlImg from "@/assets/Otrivin Nasal Spray.jpg";

import tumsImg from "@/assets/Tums.jpg";
import TumsAntacidTabletsAssortedFruitImg from "@/assets/Tums Antacid Tablets Assorted Fruit.jpg";

import nicotinellImg from "@/assets/Nicotinell.jpg";
import NicotinellNicotineGumMint2mgImg from "@/assets/Nicotinell Nicotine Gum Mint.jpg";

import chapstickImg from "@/assets/ChapStick.jpg";
import ChapStickClassicOriginalLipBalmImg from "@/assets/ChapStick Classic Original Lip Balm.jpg";

import { Tablets } from "lucide-react";

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
    slug: "sensodyne",
    name: "Sensodyne",
    monogram: "Se",
    category: "Oral Care",
    categoryGroup: "Oral Health",
    tagline: "Trusted sensitivity relief for everyday oral care.",
    short: "Specialized oral care products designed for pharmacies, distributors and retailers.",
    description:
      "Sensodyne delivers dentist-trusted sensitivity protection and everyday oral care performance for wholesale oral health assortments.",
    accent: "#4E7DBF",
    story:
      "Sensodyne is built around gentle protection, reliable consumer trust and broad oral care familiarity to support pharmacy and retail assortments.",
    subcategories: ["Toothpaste", "Sensitivity Relief", "Daily Care"],
    supplyAvailability: "Wholesale planning with branded quality control",
    distributionSupport: "Retail merchandising and pharmacy channel support",
    shippingAvailability: "International B2B shipping subject to destination requirements",
    image: sensodyneImg,
    imageAlt: "Sensodyne wholesale oral care brand imagery",
    products: [
      {
        id: "sensodyne-repair-protect-toothpaste",
        name: "Repair & Protect Toothpaste 75ml",
        tagline: "Gentle enamel repair and daily protection.",
        description:
          "A sensitive teeth toothpaste format designed to repair enamel and strengthen daily oral care routines for wholesalers and pharmacies.",
        packaging: "Retail toothpaste tube 75ml",
        details: [
          "Enamel repair and sensitivity relief",
          "Retail-ready tube packaging",
          "Wholesale case quantities available",
        ],
        image: sensodyneRepairProtect75mlImg,
        imageAlt: "Sensodyne Repair & Protect Toothpaste 75ml",
      },
      {
        id: "sensodyne-pronamel-gentle-whitening",
        name: "Pronamel Gentle Whitening Toothpaste",
        tagline: "Strengthens enamel while brightening smiles.",
        description:
          "A gentle whitening toothpaste formulated for enamel protection, ideal for pharmacy and oral care retail assortments.",
        packaging: "Retail toothpaste tube",
        details: [
          "Whitening support with enamel care",
          "Suitable for sensitive teeth",
          "Wholesale volume pricing available",
        ],
        image: SensodynePronamelGentleWhiteningToothpasteImg,
        imageAlt: "Sensodyne Pronamel Gentle Whitening Toothpaste",
      },
      {
        id: "sensodyne-rapid-relief-toothpaste",
        name: "Rapid Relief Toothpaste",
        tagline: "Fast sensitivity relief for everyday use.",
        description:
          "A fast-acting toothpaste for sensitive teeth designed for pharmacy and personal care retail channels.",
        packaging: "Retail toothpaste tube",
        details: [
          "Rapid sensitivity relief",
          "Retail-ready format",
          "Wholesale case packing available",
        ],
        image: SensodyneRapidReliefToothpasteImg,
        imageAlt: "Sensodyne Rapid Relief Toothpaste",
      },
    ],
    keywords: [
      "sensodyne wholesale",
      "oral care distributor",
      "sensitive teeth toothpaste",
      "wholesale pharmacy products",
    ],
  },
  {
    slug: "parodontax",
    name: "Parodontax",
    monogram: "Pa",
    category: "Oral Care",
    categoryGroup: "Oral Health",
    tagline: "Proven gum health support for everyday brushing.",
    short: "Oral care products built for gum health, retail pharmacies and distributors.",
    description:
      "Parodontax offers clinically-inspired oral care formats to support gum health and daily brushing routines in wholesale oral care assortments.",
    accent: "#6A8C4D",
    story:
      "Parodontax is recognized for its gum health positioning and dependable performance, making it a strong fit for pharmacy and retail oral care channels.",
    subcategories: ["Gum Health", "Toothpaste", "Mouthwash"],
    supplyAvailability: "Wholesale planning with clinical quality support",
    distributionSupport: "Product training and retail display guidance",
    shippingAvailability: "International B2B shipping subject to destination requirements",
    image: parodontaxImg,
    imageAlt: "Parodontax wholesale gum health brand imagery",
    products: [
      {
        id: "parodontax-complete-protection-toothpaste",
        name: "Complete Protection Toothpaste 75ml",
        tagline: "Daily protection for healthy gums and teeth.",
        description:
          "A toothpaste designed for gum health and complete oral protection, ideal for pharmacy and oral care retail assortments.",
        packaging: "Retail toothpaste tube 75ml",
        details: [
          "Gum health focused toothpaste",
          "Retail-ready pack",
          "Wholesale case quantities available",
        ],
        image: ParodontaxCompleteProtectionToothpasteImg,
        imageAlt: "Parodontax Complete Protection Toothpaste 75ml",
      },
      {
        id: "parodontax-active-gum-health-mouthwash",
        name: "Active Gum Health Mouthwash",
        tagline: "Targeted gum health rinse for daily use.",
        description:
          "A mouthwash formulated to support gum health and fresh breath, suited to pharmacy and retail oral care assortments.",
        packaging: "Retail mouthwash bottle",
        details: [
          "Gum health and fresh breath support",
          "Retail-friendly bottle",
          "Wholesale case pricing available",
        ],
        image: ParodontaxActiveGumHealthMouthwashImg,
        imageAlt: "Parodontax Active Gum Health Mouthwash",
      },
    ],
    keywords: [
      "parodontax wholesale",
      "gum health products",
      "oral health distributor",
      "bulk mouthwash supplier",
    ],
  },
  {
    slug: "corsodyl",
    name: "Corsodyl",
    monogram: "Co",
    category: "Oral Care",
    categoryGroup: "Oral Health",
    tagline: "Daily antiseptic care for healthy mouths.",
    short: "Antiseptic oral care formats for distributors, pharmacies and retailers.",
    description:
      "Corsodyl provides antiseptic oral care products that help manage gum health and fresh breath in retail pharmacy assortments.",
    accent: "#3B7A89",
    story:
      "Corsodyl is trusted for antiseptic oral care, making it a reliable choice for wholesale healthcare and pharmacy channels.",
    subcategories: ["Mouthwash", "Antiseptic Care", "Fresh Breath"],
    supplyAvailability: "Wholesale planning with clinical quality assurance",
    distributionSupport: "Retail and pharmacy merchandising support",
    shippingAvailability: "International B2B shipping subject to destination requirements",
    image: corsodylImg,
    imageAlt: "Corsodyl wholesale antiseptic oral care brand imagery",
    products: [
      {
        id: "corsodyl-daily-mouthwash-500ml",
        name: "Daily Mouthwash 500ml",
        tagline: "Effective antiseptic mouthwash for daily freshness.",
        description:
          "A daily mouthwash formula developed for oral hygiene routines in pharmacy and retail assortments.",
        packaging: "Retail mouthwash bottle 500ml",
        details: [
          "Antiseptic oral care support",
          "Retail-ready bottle format",
          "Wholesale case availability",
        ],
        image: CorsodylDailyMouthwash500mlImg,
        imageAlt: "Corsodyl Daily Mouthwash 500ml",
      },
    ],
    keywords: [
      "corsodyl wholesale",
      "antiseptic mouthwash",
      "oral hygiene distributor",
      "bulk mouthwash",
    ],
  },
  {
    slug: "polident",
    name: "Polident",
    monogram: "Po",
    category: "Denture Care",
    categoryGroup: "Denture Care",
    tagline: "Complete denture cleaning solutions for pharmacy shelves.",
    short: "Denture care tablets and cleansers for distributors and retailers.",
    description:
      "Polident provides denture care formats that support daily cleaning routines and retail pharmacy assortments.",
    accent: "#7A5B9A",
    story:
      "Polident is recognized for delivering reliable denture care products that meet the needs of distributors, pharmacies and caregiving retailers.",
    subcategories: ["Denture Cleanser", "Daily Care", "Pharmacy"],
    supplyAvailability: "Wholesale manufacturing planned for repeat supply",
    distributionSupport: "Retail merchandising and product education",
    shippingAvailability: "International B2B shipping subject to destination requirements",
    image: polidentImg,
    imageAlt: "Polident denture care brand imagery",
    products: [
      {
        id: "polident-3-minute-denture-cleanser-tablets",
        name: "3 Minute Denture Cleanser Tablets",
        tagline: "Fast, effective denture cleaning.",
        description:
          "Denture cleanser tablets formulated for quick and easy daily cleaning routines in wholesale care assortments.",
        packaging: "Tablet blister pack",
        details: [
          "Fast 3-minute cleansing action",
          "Retail-friendly dosing format",
          "Wholesale case quantities available",
        ],
        image: Polident3MinuteDentureCleanserTabletsImg,
        imageAlt: "Polident 3 Minute Denture Cleanser Tablets",
      },
    ],
    keywords: [
      "polident wholesale",
      "denture care products",
      "pharmacy denture supplies",
      "bulk denture cleanser",
    ],
  },
  {
    slug: "corega",
    name: "Corega",
    monogram: "Co",
    category: "Denture Care",
    categoryGroup: "Denture Care",
    tagline: "Secure denture fit and comfort for retail customers.",
    short: "Denture adhesive and fit solutions for pharmacies and distributors.",
    description:
      "Corega delivers denture fixative formats designed to keep dentures comfortable and secure through daily wear.",
    accent: "#A0503C",
    story:
      "Corega is built for denture wearers who demand secure fit and daily confidence, making it a dependable choice for B2B care assortments.",
    subcategories: ["Denture Adhesive", "Comfort", "Daily Support"],
    supplyAvailability: "Wholesale production planning with quality oversight",
    distributionSupport: "Retail display guidance and product education",
    shippingAvailability: "International B2B shipping subject to destination requirements",
    image: coregaImg,
    imageAlt: "Corega denture care brand imagery",
    products: [
      {
        id: "corega-ultra-denture-fixative-cream",
        name: "Ultra Denture Fixative Cream",
        tagline: "Reliable fit with all-day comfort.",
        description:
          "A denture fixative cream formulated for secure, comfortable wear and retail pharmacy assortments.",
        packaging: "Tube of adhesive cream",
        details: [
          "Long-lasting denture hold",
          "Retail-ready tube format",
          "Wholesale case pack options",
        ],
        image: CoregaUltraDentureFixativeCreamImg,
        imageAlt: "Corega Ultra Denture Fixative Cream",
      },
    ],
    keywords: [
      "corega wholesale",
      "denture fixative",
      "pharmacy denture supplies",
      "bulk adhesive cream",
    ],
  },
  {
    slug: "aquafresh",
    name: "Aquafresh",
    monogram: "Af",
    category: "Oral Care",
    categoryGroup: "Oral Health",
    tagline: "Fresh, gentle toothpaste for everyday family use.",
    short: "Family-friendly toothpaste ranges for distributors, pharmacies and retailers.",
    description:
      "Aquafresh offers approachable toothpaste formats that deliver fresh breath and cavity protection for broad retail and pharmacy appeal.",
    accent: "#2A9D8F",
    story:
      "Aquafresh is designed to feel familiar, fresh and easy to stock in pharmacy and consumer care assortments.",
    subcategories: ["Toothpaste", "Family Oral Care", "Fresh Breath"],
    supplyAvailability: "Wholesale planning with branded quality assurance",
    distributionSupport: "Retail marketing support and product positioning",
    shippingAvailability: "International B2B shipping subject to destination requirements",
    image: aquafreshImg,
    imageAlt: "Aquafresh oral care brand imagery",
    products: [
      {
        id: "aquafresh-triple-protection-toothpaste",
        name: "Triple Protection Toothpaste",
        tagline: "Cavity protection, freshness and strong enamel.",
        description:
          "A toothpaste designed for family oral care with cavity protection and fresh breath benefits.",
        packaging: "Retail toothpaste tube",
        details: [
          "Triple cavity protection",
          "Retail-ready packaging",
          "Wholesale case quantities available",
        ],
        image: AquafreshTripleProtectionToothpasteImg,
        imageAlt: "Aquafresh Triple Protection Toothpaste",
      },
      {
        id: "aquafresh-kids-toothpaste-3-5-years",
        name: "Kids Toothpaste 3-5 Years",
        tagline: "Gentle, kid-friendly fluoride protection.",
        description:
          "A children's toothpaste format developed for family retail and pharmacy compartments.",
        packaging: "Retail child-friendly toothpaste tube",
        details: [
          "Gentle formula for ages 3-5",
          "Retail-ready packaging",
          "Wholesale volume pricing available",
        ],
        image: AquafreshKidsToothpasteImg,
        imageAlt: "Aquafresh Kids Toothpaste 3-5 Years",
      },
    ],
    keywords: [
      "aquafresh wholesale",
      "family toothpaste supplier",
      "oral care distributor",
      "bulk toothpaste products",
    ],
  },
  {
    slug: "centrum",
    name: "Centrum",
    monogram: "Ce",
    category: "Daily Nutrition",
    categoryGroup: "Vitamins & Supplements",
    tagline: "Trusted multivitamins for daily wellness.",
    short: "Multivitamin products for pharmacies, retailers and wellness distributors.",
    description:
      "Centrum supports daily nutritional wellness with multivitamin formats designed for pharmacy and health retail assortments.",
    accent: "#E09F3E",
    story:
      "Centrum is a recognized nutrition brand that helps wholesale buyers stock dependable daily vitamins for adult and women's health.",
    subcategories: ["Multivitamins", "Adult Nutrition", "Wellness"],
    supplyAvailability: "Wholesale manufacturing with quality assurance",
    distributionSupport: "Retail merchandising guidance and nutrition positioning",
    shippingAvailability: "International B2B shipping subject to destination requirements",
    image: centrumImg,
    imageAlt: "Centrum vitamin brand imagery",
    products: [
      {
        id: "centrum-advance-multivitamins-30-tablets",
        name: "Advance Multivitamins 30 Tablets",
        tagline: "Daily adult wellness support.",
        description:
          "A 30-tablet adult multivitamin format developed for health retailers, pharmacies and distributor assortments.",
        packaging: "Retail bottle with 30 tablets",
        details: [
          "Complete daily multivitamin",
          "Retail-ready bottle",
          "Wholesale case quantities available",
        ],
        image: CentrumAdvanceMultivitamins30TabletsImg,
        imageAlt: "Centrum Advance Multivitamins 30 Tablets",
      },
      {
        id: "centrum-women-multivitamins",
        name: "Women Multivitamins",
        tagline: "Gender-specific wellness support.",
        description:
          "A women’s multivitamin formulation designed for pharmacy and wellness retail channels.",
        packaging: "Retail bottle",
        details: [
          "Daily women’s health support",
          "Retail-ready presentation",
          "Wholesale volume pricing available",
        ],
        image: CentrumWomenMultivitaminsImg,
        imageAlt: "Centrum Women Multivitamins",
      },
    ],
    keywords: [
      "centrum wholesale",
      "multivitamin distributor",
      "daily nutrition products",
      "pharmacy wellness supplies",
    ],
  },
  {
    slug: "emergen-c",
    name: "Emergen-C",
    monogram: "Em",
    category: "Immune Support",
    categoryGroup: "Vitamins & Supplements",
    tagline: "Fast-acting vitamin C for daily resilience.",
    short: "Immune support supplements for pharmacies, retailers and distributors.",
    description:
      "Emergen-C offers immune support and wellness formats ideal for pharmacy and nutrition retail assortments.",
    accent: "#E0522D",
    story:
      "Emergen-C is recognized for its bright, convenient vitamin C formats that fit into daily routines and wellness shelves.",
    subcategories: ["Vitamin C", "Immune Support", "Wellness"],
    supplyAvailability: "Wholesale production with branded quality control",
    distributionSupport: "Retail positioning and product messaging support",
    shippingAvailability: "International B2B shipping subject to destination requirements",
    image: emergenCImg,
    imageAlt: "Emergen-C wellness brand imagery",
    products: [
      {
        id: "emergen-c-vitamin-c-orange",
        name: "Vitamin C Orange",
        tagline: "Effervescent immune support.",
        description:
          "An orange-flavored vitamin C supplement ideal for pharmacy and wellness retail assortments.",
        packaging: "Retail tube of effervescent tablets",
        details: [
          "Vitamin C immune support",
          "Retail-ready packaging",
          "Wholesale case quantities available",
        ],
        image: EmergenCVitaminCOrangeImg,
        imageAlt: "Emergen-C Vitamin C Orange",
      },
    ],
    keywords: [
      "emergen-c wholesale",
      "vitamin c supplier",
      "immune support products",
      "wellness distributor",
    ],
  },
  {
    slug: "panadol",
    name: "Panadol",
    monogram: "Pa",
    category: "Pain Relief",
    categoryGroup: "Pain Relief",
    tagline: "Fast-acting pain relief for everyday comfort.",
    short: "Analgesic tablets for pharmacies, retail and distribution channels.",
    description:
      "Panadol delivers fast, trusted pain relief formats for pharmacy and drugstore assortments.",
    accent: "#57843A",
    story:
      "Panadol is built around dependable over-the-counter pain relief that customers recognize and retailers can trust.",
    subcategories: ["Pain Relief", "Analgesics", "Pharmacy"],
    supplyAvailability: "Wholesale production with quality assurance",
    distributionSupport: "Retail merchandising and channel support",
    shippingAvailability: "International B2B shipping subject to destination requirements",
    image: panadolImg,
    imageAlt: "Panadol pain relief brand imagery",
    products: [
      {
        id: "panadol-extra-tablets-24-pack",
        name: "Extra Tablets 24 Pack",
        tagline: "Reliable pain relief in a retail-friendly pack.",
        description:
          "A 24-tablet analgesic format designed for pharmacy shelves and retail pain relief assortments.",
        packaging: "Retail blister pack of 24 tablets",
        details: [
          "Trusted pain relief",
          "Retail-ready pack",
          "Wholesale case quantities available",
        ],
        image: PanadolExtraTablets24PackImg,
        imageAlt: "Panadol Extra Tablets 24 Pack",
      },
    ],
    keywords: [
      "panadol wholesale",
      "pain relief distributor",
      "pharmacy analgesic",
      "bulk pain tablets",
    ],
  },
  {
    slug: "voltaren",
    name: "Voltaren",
    monogram: "Vo",
    category: "Pain Relief",
    categoryGroup: "Pain Relief",
    tagline: "Targeted topical relief for muscle and joint discomfort.",
    short: "Topical analgesics for pharmacies, physical therapy and retail channels.",
    description:
      "Voltaren supplies topical analgesic formats designed for muscle, joint and back pain relief in retail and professional channels.",
    accent: "#3F6F8A",
    story:
      "Voltaren is known for targeted topical relief, making it a valuable addition to wholesale health and pharmacy assortments.",
    subcategories: ["Topical Relief", "Pain Management", "Physical Care"],
    supplyAvailability: "Wholesale planning with medical quality support",
    distributionSupport: "Retail positioning and sales materials",
    shippingAvailability: "International B2B shipping subject to destination requirements",
    image: voltarenImg,
    imageAlt: "Voltaren topical relief brand imagery",
    products: [
      {
        id: "voltaren-emulgel-1-100g",
        name: "Emulgel 1% 100g",
        tagline: "Targeted topical relief in a retail tube.",
        description:
          "A 1% diclofenac emulgel formulated for targeted muscle and joint comfort in pharmacy and retail assortments.",
        packaging: "Retail gel tube 100g",
        details: [
          "Topical analgesic gel",
          "Retail-ready tube format",
          "Wholesale case quantities available",
        ],
        image: VoltarenEmulgel100gImg,

        imageAlt: "Voltaren Emulgel 1% 100g",
      },
    ],
    keywords: [
      "voltaren wholesale",
      "topical pain relief",
      "pharmacy analgesic gel",
      "bulk pain care",
    ],
  },
  {
    slug: "advil",
    name: "Advil",
    monogram: "Ad",
    category: "Pain Relief",
    categoryGroup: "Pain Relief",
    tagline: "Trusted ibuprofen for everyday discomfort.",
    short: "Pain relief tablets for pharmacies, retail and distributor assortments.",
    description:
      "Advil provides ibuprofen-based pain relief formats that serve pharmacy and consumer care shelves with trusted brand recognition.",
    accent: "#A12F2F",
    story:
      "Advil is trusted for over-the-counter pain relief, making it a strong fit for pharmacy and retail wellness assortments.",
    subcategories: ["Pain Relief", "Analgesics", "Pharmacy"],
    supplyAvailability: "Wholesale planning with quality assurance",
    distributionSupport: "Retail merchandising and channel support",
    shippingAvailability: "International B2B shipping subject to destination requirements",
    image: advilImg,
    imageAlt: "Advil pain relief brand imagery",
    products: [
      {
        id: "advil-ibuprofen-200mg-50-tablets",
        name: "Ibuprofen 200mg 50 Tablets",
        tagline: "Trusted relief in a retail count pack.",
        description:
          "A 50-tablet ibuprofen format developed for pharmacy and retail pain relief assortments.",
        packaging: "Bottle with 50 tablets",
        details: [
          "Trusted ibuprofen pain relief",
          "Retail-ready bottle",
          "Wholesale case quantities available",
        ],
        image: AdvilIbuprofen200mg50TabletsImg,

        imageAlt: "Advil Ibuprofen 200mg 50 Tablets",
      },
    ],
    keywords: [
      "advil wholesale",
      "ibuprofen distributor",
      "pharmacy pain relief",
      "bulk analgesic tablets",
    ],
  },
  {
    slug: "theraflu",
    name: "Theraflu",
    monogram: "Th",
    category: "Cold & Flu",
    categoryGroup: "Cold & Flu",
    tagline: "Comforting relief for cold and flu symptoms.",
    short: "Cold and flu sachets for pharmacies and retail wellness assortments.",
    description:
      "Theraflu provides sachet-based symptom relief formats for seasonal cold and flu retail assortments.",
    accent: "#8A3FAA",
    story:
      "Theraflu is designed to deliver familiar symptom relief, helping pharmacies and retailers support consumer wellness needs during cold season.",
    subcategories: ["Cold Relief", "Flu Support", "Pharmacy"],
    supplyAvailability: "Wholesale planning with seasonal demand support",
    distributionSupport: "Retail merchandising and product information",
    shippingAvailability: "International B2B shipping subject to destination requirements",
    image: therafluImg,
    imageAlt: "Theraflu cold and flu brand imagery",
    products: [
      {
        id: "theraflu-flu-cold-relief-sachets",
        name: "Flu & Cold Relief Sachets",
        tagline: "Warm symptom relief in a convenient sachet.",
        description:
          "Sachets formulated to ease cold and flu symptoms, ideal for pharmacy shelves and retail wellness assortments.",
        packaging: "Retail sachet box",
        details: [
          "Symptom relief for cold and flu",
          "Retail-ready sachet packaging",
          "Wholesale volume pricing available",
        ],
        image: TherafluFluandColdReliefSachetsImg,

        imageAlt: "Theraflu Flu & Cold Relief Sachets",
      },
    ],
    keywords: [
      "theraflu wholesale",
      "cold and flu distributor",
      "pharmacy wellness products",
      "bulk symptom relief",
    ],
  },
  {
    slug: "otrivin",
    name: "Otrivin",
    monogram: "Ot",
    category: "Respiratory Care",
    categoryGroup: "Respiratory Care",
    tagline: "Rapid nasal relief for congestion and cold symptoms.",
    short: "Nasal spray solutions for pharmacies, retailers and distributors.",
    description:
      "Otrivin offers fast-acting nasal spray formats that support respiratory relief and pharmacy wellness assortments.",
    accent: "#2F6F9B",
    story:
      "Otrivin is known for fast nasal congestion relief, making it a valuable addition to healthcare and retail shelf assortments.",
    subcategories: ["Nasal Care", "Congestion Relief", "Pharmacy"],
    supplyAvailability: "Wholesale planning with clinical quality support",
    distributionSupport: "Retail merchandising and health channel support",
    shippingAvailability: "International B2B shipping subject to destination requirements",
    image: otrivinImg,
    imageAlt: "Otrivin respiratory care brand imagery",
    products: [
      {
        id: "otrivin-nasal-spray-10ml",
        name: "Nasal Spray 10ml",
        tagline: "Fast congestion relief for everyday use.",
        description:
          "A 10ml nasal spray formulation designed for fast relief of congestion, suited to pharmacy shelves and retail wellness assortments.",
        packaging: "Retail nasal spray bottle 10ml",
        details: [
          "Fast-acting congestion relief",
          "Retail-ready bottle",
          "Wholesale case pricing available",
        ],
        image: OtrivinNasalSpray10mlImg,

        imageAlt: "Otrivin Nasal Spray 10ml",
      },
    ],
    keywords: [
      "otrivin wholesale",
      "nasal spray distributor",
      "respiratory care products",
      "bulk congestion relief",
    ],
  },
  {
    slug: "tums",
    name: "Tums",
    monogram: "Tu",
    category: "Digestive Health",
    categoryGroup: "Digestive Health",
    tagline: "Fast relief for heartburn and indigestion.",
    short: "Antacid tablets for pharmacies, convenience stores and distributors.",
    description:
      "Tums offers fast-acting antacid tablets that support digestive comfort and retail pharmacy assortments.",
    accent: "#D87E3D",
    story:
      "Tums is built around instant digestive relief and trusted consumer appeal, making it an easy fit for pharmacy and retail wellness assortments.",
    subcategories: ["Antacid", "Digestive Comfort", "Retail"],
    supplyAvailability: "Wholesale planning with category-specific support",
    distributionSupport: "Retail merchandising and product education",
    shippingAvailability: "International B2B shipping subject to destination requirements",
    image: tumsImg,
    imageAlt: "Tums digestive health brand imagery",
    products: [
      {
        id: "tums-antacid-tablets-assorted-fruit",
        name: "Antacid Tablets Assorted Fruit",
        tagline: "Fast relief with fruit-flavored tablets.",
        description:
          "Assorted fruit-flavored antacid tablets designed for retail pharmacy and convenience assortments.",
        packaging: "Retail bottle of tablets",
        details: [
          "Fast heartburn relief",
          "Retail-ready presentation",
          "Wholesale case quantities available",
        ],
        image: TumsAntacidTabletsAssortedFruitImg,

        imageAlt: "Tums Antacid Tablets Assorted Fruit",
      },
    ],
    keywords: [
      "tums wholesale",
      "antacid distributor",
      "digestive relief products",
      "bulk antacid tablets",
    ],
  },
  {
    slug: "nicotinell",
    name: "Nicotinell",
    monogram: "Ni",
    category: "Smoking Cessation",
    categoryGroup: "Quit Smoking",
    tagline: "Helps support nicotine withdrawal and quitting efforts.",
    short: "Nicotine replacement formats for pharmacies, retailers and wellness distributors.",
    description:
      "Nicotinell provides nicotine replacement products designed to support smoking cessation and retail health assortments.",
    accent: "#5C8B3F",
    story:
      "Nicotinell offers familiar nicotine gum formats that fit pharmacy and wellness channel needs for smoking cessation support.",
    subcategories: ["Nicotine Gum", "Smoking Cessation", "Pharmacy"],
    supplyAvailability: "Wholesale production with health quality assurance",
    distributionSupport: "Retail and pharmacy support materials",
    shippingAvailability: "International B2B shipping subject to destination requirements",
    image: nicotinellImg,
    imageAlt: "Nicotinell smoking cessation brand imagery",
    products: [
      {
        id: "nicotinell-nicotine-gum-mint-2mg",
        name: "Nicotine Gum Mint 2mg",
        tagline: "Mint-flavored support for quitting smoking.",
        description:
          "Mint-flavored nicotine gum designed for pharmacies and wellness retail channels to support nicotine reduction.",
        packaging: "Retail gum pack",
        details: [
          "2mg nicotine gum",
          "Mint flavor",
          "Wholesale case quantities available",
        ],
        image: NicotinellNicotineGumMint2mgImg,

        imageAlt: "Nicotinell Nicotine Gum Mint 2mg",
      },
    ],
    keywords: [
      "nicotinell wholesale",
      "smoking cessation distributor",
      "nicotine gum supplier",
      "pharmacy quit smoking products",
    ],
  },
  {
    slug: "chapstick",
    name: "ChapStick",
    monogram: "Ch",
    category: "Lip Care",
    categoryGroup: "Lip Care",
    tagline: "Classic lip balm for everyday lip comfort.",
    short: "Lip care products for pharmacies, retailers and convenience channels.",
    description:
      "ChapStick offers classic lip balm formats that support everyday comfort and retail impulse purchases.",
    accent: "#C75432",
    story:
      "ChapStick is a familiar lip care brand that brings reliable comfort and strong retail recognition to wholesale assortments.",
    subcategories: ["Lip Balm", "Everyday Care", "Retail"],
    supplyAvailability: "Wholesale planning with strict quality standards",
    distributionSupport: "Retail merchandising and product positioning support",
    shippingAvailability: "International B2B shipping subject to destination requirements",
    image: chapstickImg,
    imageAlt: "ChapStick lip care brand imagery",
    products: [
      {
        id: "chapstick-classic-original-lip-balm",
        name: "Classic Original Lip Balm",
        tagline: "Everyday lip protection in a familiar format.",
        description:
          "A classic lip balm format created for pharmacy and retail lip care assortments.",
        packaging: "Retail lip balm stick",
        details: [
          "Classic moisturizing lip balm",
          "Retail-ready stick format",
          "Wholesale case quantities available",
        ],
        image: ChapStickClassicOriginalLipBalmImg,

        imageAlt: "ChapStick Classic Original Lip Balm",
      },
    ],
    keywords: [
      "chapstick wholesale",
      "lip balm distributor",
      "retail lip care products",
      "bulk lip balm",
    ],
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
