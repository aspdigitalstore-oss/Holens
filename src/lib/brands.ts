export type Product = {
  id: string;
  name: string;
  tagline: string;
  description: string;
  usdPrice: number;
  eurPrice: number;
  ean?: string;
  gtin?: string;
  packaging: string;
  details: string[];
};

export type Brand = {
  slug: string;
  name: string;
  monogram: string;
  category: string;
  categoryGroup: string; // Oral Health, Vitamins & Supplements, etc.
  tagline: string;
  short: string;
  description: string;
  accent: string;
  story: string;
  subcategories: string[];
  supplyAvailability: string;
  distributionSupport: string;
  shippingAvailability: string;
  products: Product[];
  keywords: string[];
};

// Real Haleon brands database
export const BRANDS: Brand[] = [
  // ORAL HEALTH CATEGORY
  {
    slug: "sensodyne",
    name: "Sensodyne",
    monogram: "Sd",
    category: "Sensodyne",
    categoryGroup: "Oral Health",
    tagline: "Relief for sensitive teeth, clinically proven.",
    short: "Leading sensitivity relief toothpaste brand trusted by dentists worldwide.",
    description:
      "Sensodyne delivers advanced sensitivity relief with potassium compounds that block pain at the source. Trusted by healthcare professionals across 130+ countries.",
    accent: "#2E5090",
    story:
      "Developed by leading oral care scientists, Sensodyne has pioneered sensitivity relief for over 60 years. The brand is recommended by dentists more than any other.",
    subcategories: ["Sensitivity Relief", "Whitening", "Repair & Protect"],
    supplyAvailability: "Global distribution centers with 24-48 hour fulfillment",
    distributionSupport: "Dedicated distributor support and market training",
    shippingAvailability: "Worldwide logistics including cold chain where needed",
    products: [
      {
        id: "sd-repair-75ml",
        name: "Repair & Protect Toothpaste 75ml",
        tagline: "Restore and protect sensitive teeth",
        description: "Advanced formula repairs vulnerable areas while protecting against sensitivity.",
        usdPrice: 4.0,
        eurPrice: 3.5,
        ean: "5054563008069",
        gtin: "5054563008069",
        packaging: "75ml tube",
        details: [
          "Relief in 3 days, full relief in 2 weeks",
          "Potassium nitrate & strontium compounds",
          "Restores natural white shade",
        ],
      },
      {
        id: "sd-pronamel-gentle",
        name: "Pronamel Gentle Whitening Toothpaste",
        tagline: "Gentle whitening for enamel protection",
        description: "Specially formulated to whiten while protecting against acid erosion.",
        usdPrice: 4.5,
        eurPrice: 4.0,
        ean: "5054563008151",
        gtin: "5054563008151",
        packaging: "75ml tube",
        details: [
          "Gentle whitening action",
          "Acid-erosion protective formula",
          "Sensitivity relief included",
        ],
      },
      {
        id: "sd-rapid-relief",
        name: "Rapid Relief Toothpaste",
        tagline: "Fast-acting sensitivity relief",
        description: "Clinically proven to provide relief from sensitivity in just 3 days.",
        usdPrice: 4.0,
        eurPrice: 3.5,
        ean: "5054563008083",
        gtin: "5054563008083",
        packaging: "75ml tube",
        details: [
          "Relief within 3 days",
          "Advanced strontium acetate",
          "Long-lasting protection",
        ],
      },
    ],
    keywords: ["sensodyne", "sensitivity", "toothpaste", "oral care", "relief"],
  },
  {
    slug: "parodontax",
    name: "Parodontax",
    monogram: "Pd",
    category: "Parodontax",
    categoryGroup: "Oral Health",
    tagline: "Specially formulated for gum health.",
    short: "Professional gum care brand targeting bleeding and inflamed gums.",
    description:
      "Parodontax is clinically formulated to target the specific needs of people with gum problems. Used by dental professionals for active gum disease management.",
    accent: "#C41E3A",
    story:
      "Developed with periodontists, Parodontax has specialized in active gum care for over 70 years, focusing on bleeding and swollen gums.",
    subcategories: ["Complete Protection", "Active Gum Health"],
    supplyAvailability: "Global distribution with regional hubs",
    distributionSupport: "Dental professional training programs available",
    shippingAvailability: "International shipping to 150+ countries",
    products: [
      {
        id: "pd-complete-75ml",
        name: "Complete Protection Toothpaste 75ml",
        tagline: "Complete gum health protection",
        description: "Targets multiple signs of gum problems with specialized formula.",
        usdPrice: 3.5,
        eurPrice: 3.1,
        ean: "5054563007529",
        gtin: "5054563007529",
        packaging: "75ml tube",
        details: [
          "Reduces bleeding gums",
          "Fights plaque buildup",
          "Freshens breath",
        ],
      },
      {
        id: "pd-active-gum-500ml",
        name: "Active Gum Health Mouthwash 500ml",
        tagline: "Daily gum health rinse",
        description: "Comprehensive mouthwash for gum disease prevention and management.",
        usdPrice: 3.0,
        eurPrice: 2.7,
        ean: "5054563008175",
        gtin: "5054563008175",
        packaging: "500ml bottle",
        details: [
          "Reduces gum inflammation",
          "Alcohol-free formula",
          "Clinically proven results",
        ],
      },
    ],
    keywords: ["parodontax", "gum health", "mouthwash", "bleeding gums", "oral care"],
  },
  {
    slug: "corsodyl",
    name: "Corsodyl",
    monogram: "Co",
    category: "Corsodyl",
    categoryGroup: "Oral Health",
    tagline: "Daily antibacterial mouthwash for healthy gums.",
    short: "Chlorhexidine-based mouthwash for professional gum care.",
    description:
      "Corsodyl contains chlorhexidine, a potent antimicrobial agent. Used in dental practices for intensive gum care and periodontal disease management.",
    accent: "#1B4965",
    story:
      "The gold standard in antimicrobial oral rinses, Corsodyl has been used by dental professionals since the 1970s for therapeutic gum care.",
    subcategories: ["Daily Mouthwash", "Intensive Care"],
    supplyAvailability: "Pharmaceutical-grade supply chain",
    distributionSupport: "Clinical training for dental partners",
    shippingAvailability: "Licensed pharmaceutical distribution",
    products: [
      {
        id: "co-daily-500ml",
        name: "Daily Mouthwash 500ml",
        tagline: "Professional strength daily rinse",
        description: "Antimicrobial mouthwash for intensive gum care and plaque control.",
        usdPrice: 3.5,
        eurPrice: 3.1,
        ean: "5054563008298",
        gtin: "5054563008298",
        packaging: "500ml bottle",
        details: [
          "0.2% chlorhexidine",
          "Kills bacteria on contact",
          "Reduces plaque formation",
        ],
      },
    ],
    keywords: ["corsodyl", "chlorhexidine", "mouthwash", "gum disease", "antibacterial"],
  },
  {
    slug: "polident",
    name: "Polident",
    monogram: "Po",
    category: "Polident",
    categoryGroup: "Oral Health",
    tagline: "Complete denture care solution.",
    short: "Leading denture cleansing and care brand.",
    description:
      "Polident specializes in denture care with cleansing tablets, adhesives, and care solutions that maintain denture hygiene and comfort.",
    accent: "#7B9E89",
    story:
      "The trusted leader in denture care for over 70 years, Polident provides complete solutions for denture wearers worldwide.",
    subcategories: ["Cleansing Tablets", "Denture Adhesive"],
    supplyAvailability: "Global distributor network",
    distributionSupport: "Point-of-sale materials and customer support",
    shippingAvailability: "Worldwide delivery available",
    products: [
      {
        id: "po-3min-tablets",
        name: "3 Minute Denture Cleanser Tablets",
        tagline: "Fast denture cleaning",
        description: "Effervescent tablets that clean dentures in just 3 minutes.",
        usdPrice: 3.0,
        eurPrice: 2.7,
        ean: "5054563008338",
        gtin: "5054563008338",
        packaging: "30 tablets per pack",
        details: [
          "Cleans in 3 minutes",
          "Removes stains and odor",
          "Gentle on denture materials",
        ],
      },
    ],
    keywords: ["polident", "denture", "cleanser", "denture care", "oral health"],
  },
  {
    slug: "corega",
    name: "Corega",
    monogram: "Cr",
    category: "Corega",
    categoryGroup: "Oral Health",
    tagline: "Extra strong denture fixative.",
    short: "Premium denture adhesive brand for secure fit.",
    description:
      "Corega offers powerful denture fixatives that keep dentures secure throughout the day with no slipping or movement.",
    accent: "#E8B4B8",
    story:
      "A trusted name in denture care, Corega provides the holding power and comfort that denture wearers depend on daily.",
    subcategories: ["Denture Fixative", "Denture Care"],
    supplyAvailability: "Reliable distribution and stock management",
    distributionSupport: "Customer care training programs",
    shippingAvailability: "Global shipping with fast delivery",
    products: [
      {
        id: "cr-ultra-fixative",
        name: "Ultra Denture Fixative Cream",
        tagline: "Superior hold all day",
        description: "Extra-strong adhesive cream for secure denture retention.",
        usdPrice: 2.5,
        eurPrice: 2.2,
        ean: "5054563008444",
        gtin: "5054563008444",
        packaging: "40ml tube",
        details: [
          "Extra strong formula",
          "12-hour hold",
          "Easy to apply and remove",
        ],
      },
    ],
    keywords: ["corega", "denture fixative", "denture cream", "adhesive", "oral care"],
  },
  {
    slug: "aquafresh",
    name: "Aquafresh",
    monogram: "Af",
    category: "Aquafresh",
    categoryGroup: "Oral Health",
    tagline: "Triple action protection for the whole family.",
    short: "Family toothpaste brand with whitening and cavity protection.",
    description:
      "Aquafresh provides comprehensive oral care with fluoride, whitening agents, and cavity protection in a refreshing formula suitable for the whole family.",
    accent: "#0099CC",
    story:
      "Aquafresh has been a family favorite for generations, known for its distinctive stripes and comprehensive cavity and whitening protection.",
    subcategories: ["Triple Protection", "Kids Toothpaste", "Whitening"],
    supplyAvailability: "Extensive distribution network",
    distributionSupport: "Retail partner programs and training",
    shippingAvailability: "Fast global delivery",
    products: [
      {
        id: "af-triple-75ml",
        name: "Triple Protection Toothpaste 75ml",
        tagline: "Three-in-one protection",
        description: "Complete cavity protection, fresh breath, and whitening in one paste.",
        usdPrice: 2.0,
        eurPrice: 1.8,
        ean: "5054563008550",
        gtin: "5054563008550",
        packaging: "75ml tube",
        details: [
          "Cavity protection",
          "Whitening action",
          "Fresh breath formula",
        ],
      },
      {
        id: "af-kids-75ml",
        name: "Kids Toothpaste 75ml",
        tagline: "Gentle, fun toothpaste for children",
        description: "Specially formulated for children's teeth with mild fluoride.",
        usdPrice: 2.0,
        eurPrice: 1.8,
        ean: "5054563008667",
        gtin: "5054563008667",
        packaging: "75ml tube",
        details: [
          "Reduced fluoride for kids",
          "Mild, fruity flavor",
          "Fun brushing experience",
        ],
      },
    ],
    keywords: ["aquafresh", "toothpaste", "family", "whitening", "cavity protection"],
  },

  // VITAMINS & SUPPLEMENTS
  {
    slug: "centrum",
    name: "Centrum",
    monogram: "Ce",
    category: "Centrum",
    categoryGroup: "Vitamins & Supplements",
    tagline: "Complete multivitamin for whole body wellness.",
    short: "The world's #1 selling multivitamin brand.",
    description:
      "Centrum delivers a complete portfolio of multivitamins and specialty supplements formulated to support overall health, energy, and immunity. Available in multiple formulations for different life stages.",
    accent: "#F39200",
    story:
      "For over 40 years, Centrum has been the trusted choice of millions worldwide, delivering scientifically formulated vitamins for complete nutrition.",
    subcategories: ["Multivitamins", "Women's Health", "Men's Health", "Active"],
    supplyAvailability: "Global manufacturing and logistics network",
    distributionSupport: "Comprehensive distributor support programs",
    shippingAvailability: "Fast, reliable worldwide shipping",
    products: [
      {
        id: "ce-advance-multi",
        name: "Advance Multivitamins 30 Tablets",
        tagline: "Complete daily nutrition",
        description: "Comprehensive multivitamin with 24 essential nutrients for daily wellness.",
        usdPrice: 6.0,
        eurPrice: 5.3,
        ean: "5054563008773",
        gtin: "5054563008773",
        packaging: "Bottle of 30 tablets",
        details: [
          "24 essential vitamins and minerals",
          "Supports energy and immunity",
          "Easy-to-swallow tablets",
        ],
      },
      {
        id: "ce-women-multi",
        name: "Women Multivitamins 30 Tablets",
        tagline: "Nutrition for women's health",
        description: "Specially formulated with nutrients to support women's unique health needs.",
        usdPrice: 7.0,
        eurPrice: 6.2,
        ean: "5054563008880",
        gtin: "5054563008880",
        packaging: "Bottle of 30 tablets",
        details: [
          "Iron for energy support",
          "Calcium for bone health",
          "Women's health focused formula",
        ],
      },
    ],
    keywords: ["centrum", "multivitamin", "vitamins", "wellness", "supplements"],
  },
  {
    slug: "emergen-c",
    name: "Emergen-C",
    monogram: "Ec",
    category: "Emergen-C",
    categoryGroup: "Vitamins & Supplements",
    tagline: "Immune support effervescent drink mix.",
    short: "Vitamin C and B-vitamin energy drink formula.",
    description:
      "Emergen-C provides a convenient way to get essential vitamins and minerals through an effervescent drink mix. Rich in Vitamin C and B-vitamins for energy and immune support.",
    accent: "#FF9900",
    story:
      "Created to provide a delicious, convenient way to supplement with essential vitamins, Emergen-C has become a trusted name in immune and energy support.",
    subcategories: ["Vitamin C", "Energy Support", "Immunity"],
    supplyAvailability: "Wide distribution across retail and wholesale",
    distributionSupport: "Marketing and merchandising support available",
    shippingAvailability: "Global distribution capability",
    products: [
      {
        id: "ec-vitamin-c-orange",
        name: "Vitamin C Orange 30 Sachets",
        tagline: "Refreshing immune support",
        description: "Effervescent drink mix with 1000mg Vitamin C and essential B-vitamins.",
        usdPrice: 7.5,
        eurPrice: 6.6,
        ean: "5054563008997",
        gtin: "5054563008997",
        packaging: "30 sachets per box",
        details: [
          "1000mg Vitamin C",
          "B-vitamin complex",
          "Orange flavor",
        ],
      },
    ],
    keywords: ["emergen-c", "vitamin c", "immune support", "energy", "supplements"],
  },

  // PAIN RELIEF
  {
    slug: "panadol",
    name: "Panadol",
    monogram: "Pa",
    category: "Panadol",
    categoryGroup: "Pain Relief",
    tagline: "Trusted pain relief, fever reduction.",
    short: "Leading paracetamol-based pain relief brand.",
    description:
      "Panadol provides effective, clinically proven pain relief and fever reduction with a strong safety profile. Available in multiple formulations for different needs.",
    accent: "#ED1C24",
    story:
      "For over 60 years, Panadol has been a trusted name in pain relief, used by millions worldwide for safe, effective symptom management.",
    subcategories: ["Pain Relief", "Extra Strength", "Cold & Flu"],
    supplyAvailability: "Global supply chain with regional warehouses",
    distributionSupport: "Healthcare professional training available",
    shippingAvailability: "Reliable worldwide logistics",
    products: [
      {
        id: "pa-extra-tablets",
        name: "Extra Tablets 24 Pack",
        tagline: "Strong pain relief",
        description: "Extra strength formula for effective pain and fever relief.",
        usdPrice: 3.0,
        eurPrice: 2.7,
        ean: "5054563009104",
        gtin: "5054563009104",
        packaging: "24 tablets per pack",
        details: [
          "500mg paracetamol",
          "Fast acting formula",
          "Effective for headaches, body aches",
        ],
      },
    ],
    keywords: ["panadol", "pain relief", "paracetamol", "fever", "analgesic"],
  },
  {
    slug: "voltaren",
    name: "Voltaren",
    monogram: "Vn",
    category: "Voltaren",
    categoryGroup: "Pain Relief",
    tagline: "Topical anti-inflammatory pain relief.",
    short: "Leading topical NSAID gel for localized pain.",
    description:
      "Voltaren Emulgel provides targeted topical pain relief with anti-inflammatory action. Ideal for localized muscle and joint pain without systemic absorption.",
    accent: "#00A651",
    story:
      "Voltaren has been the preferred choice for anti-inflammatory pain relief for decades, combining efficacy with topical safety.",
    subcategories: ["Topical Gel", "Anti-Inflammatory", "Joint Care"],
    supplyAvailability: "Pharmacy and healthcare distributor channels",
    distributionSupport: "Clinical pharmacist support programs",
    shippingAvailability: "Licensed pharmaceutical distribution",
    products: [
      {
        id: "vn-emulgel-100g",
        name: "Emulgel 1% 100g",
        tagline: "Localized anti-inflammatory relief",
        description: "Topical gel with 1% diclofenac for effective pain relief and reduced inflammation.",
        usdPrice: 7.0,
        eurPrice: 6.2,
        ean: "5054563009211",
        gtin: "5054563009211",
        packaging: "100g tube",
        details: [
          "1% diclofenac sodium",
          "Penetrating gel formula",
          "Reduces swelling and pain",
        ],
      },
    ],
    keywords: ["voltaren", "emulgel", "nsaid", "pain relief", "anti-inflammatory"],
  },
  {
    slug: "advil",
    name: "Advil",
    monogram: "Ad",
    category: "Advil",
    categoryGroup: "Pain Relief",
    tagline: "Powerful ibuprofen pain relief.",
    short: "Fast-acting ibuprofen for various pain types.",
    description:
      "Advil delivers rapid pain relief with ibuprofen's proven anti-inflammatory action. Effective for headaches, muscle aches, minor arthritis pain, and more.",
    accent: "#0066CC",
    story:
      "Advil has helped millions manage pain effectively for over 40 years with trusted ibuprofen formulations.",
    subcategories: ["Pain Relief", "Anti-Inflammatory", "Cold & Flu"],
    supplyAvailability: "Widespread retail and wholesale distribution",
    distributionSupport: "Marketing and educational materials available",
    shippingAvailability: "Fast global delivery",
    products: [
      {
        id: "ad-ibuprofen-200mg",
        name: "Ibuprofen 200mg Capsules 20 Pack",
        tagline: "Fast pain relief",
        description: "200mg ibuprofen soft capsules for quick absorption and fast pain relief.",
        usdPrice: 4.5,
        eurPrice: 4.0,
        ean: "5054563009328",
        gtin: "5054563009328",
        packaging: "20 capsules per pack",
        details: [
          "200mg ibuprofen",
          "Fast absorption capsules",
          "Effective pain relief in 30 minutes",
        ],
      },
    ],
    keywords: ["advil", "ibuprofen", "pain relief", "anti-inflammatory", "fever"],
  },

  // RESPIRATORY
  {
    slug: "theraflu",
    name: "Theraflu",
    monogram: "Tf",
    category: "Theraflu",
    categoryGroup: "Respiratory",
    tagline: "Relief for cold and flu symptoms.",
    short: "Multi-symptom cold and flu relief formulas.",
    description:
      "Theraflu provides effective relief from multiple cold and flu symptoms with convenient sachets or tablets. Available in various formulations for day or night relief.",
    accent: "#DC143C",
    story:
      "Theraflu has been helping people manage cold and flu symptoms for generations with fast-acting, comprehensive symptom relief.",
    subcategories: ["Cold & Flu", "Night Time", "Day Time"],
    supplyAvailability: "Seasonal distribution with year-round availability",
    distributionSupport: "Cold season promotional support",
    shippingAvailability: "Reliable worldwide shipping",
    products: [
      {
        id: "tf-flu-cold-sachets",
        name: "Flu & Cold Relief Sachets 10 Pack",
        tagline: "Multi-symptom relief",
        description: "Instant sachets for fast relief from cold and flu symptoms.",
        usdPrice: 5.5,
        eurPrice: 4.9,
        ean: "5054563009435",
        gtin: "5054563009435",
        packaging: "10 sachets per box",
        details: [
          "Relief from multiple cold/flu symptoms",
          "Fast dissolving sachets",
          "Available in day and night formulas",
        ],
      },
    ],
    keywords: ["theraflu", "cold", "flu", "symptom relief", "multi-symptom"],
  },
  {
    slug: "otrivin",
    name: "Otrivin",
    monogram: "Ot",
    category: "Otrivin",
    categoryGroup: "Respiratory",
    tagline: "Nasal decongestant spray.",
    short: "Effective nasal relief from congestion.",
    description:
      "Otrivin nasal spray provides fast, effective relief from nasal congestion due to colds, allergies, and sinusitis. Available in standard and saline formulations.",
    accent: "#6B3BA0",
    story:
      "Otrivin has been the trusted choice for nasal relief for decades, offering safe and effective decongestion.",
    subcategories: ["Nasal Spray", "Decongestant", "Saline"],
    supplyAvailability: "Reliable pharmaceutical distribution",
    distributionSupport: "Healthcare professional education",
    shippingAvailability: "Global pharmaceutical distribution",
    products: [
      {
        id: "ot-nasal-spray-10ml",
        name: "Nasal Spray 10ml",
        tagline: "Fast nasal congestion relief",
        description: "Effective nasal decongestant spray for cold and allergy relief.",
        usdPrice: 4.0,
        eurPrice: 3.5,
        ean: "5054563009542",
        gtin: "5054563009542",
        packaging: "10ml spray bottle",
        details: [
          "Fast acting decongestant",
          "12-hour relief",
          "Safe for adults and children",
        ],
      },
    ],
    keywords: ["otrivin", "nasal spray", "decongestant", "congestion relief", "nasal"],
  },

  // DIGESTIVE HEALTH
  {
    slug: "tums",
    name: "Tums",
    monogram: "Tu",
    category: "Tums",
    categoryGroup: "Digestive Health",
    tagline: "Fast heartburn and antacid relief.",
    short: "Calcium-based antacid for quick symptom relief.",
    description:
      "Tums provides fast-acting antacid relief from heartburn, acid indigestion, and upset stomach. Available in multiple flavors with varying strength formulations.",
    accent: "#E41E3B",
    story:
      "For over 90 years, Tums has been America's most popular antacid, trusted by millions for fast, effective relief.",
    subcategories: ["Antacid", "Heartburn Relief", "Calcium"],
    supplyAvailability: "Extensive retail distribution network",
    distributionSupport: "Point-of-sale support and education",
    shippingAvailability: "Fast global delivery",
    products: [
      {
        id: "tu-antacid-tablets",
        name: "Antacid Tablets 48 Pack",
        tagline: "Fast heartburn relief",
        description: "Chewable calcium carbonate tablets for fast antacid relief.",
        usdPrice: 3.5,
        eurPrice: 3.1,
        ean: "5054563009649",
        gtin: "5054563009649",
        packaging: "48 chewable tablets",
        details: [
          "Fast-acting relief",
          "Calcium carbonate formula",
          "Multiple flavor options",
        ],
      },
    ],
    keywords: ["tums", "antacid", "heartburn", "indigestion", "calcium"],
  },

  // OTHER
  {
    slug: "nicotinell",
    name: "Nicotinell",
    monogram: "Ni",
    category: "Nicotinell",
    categoryGroup: "Smoking Cessation",
    tagline: "Nicotine replacement therapy for quitting smoking.",
    short: "Comprehensive nicotine replacement products.",
    description:
      "Nicotinell provides effective nicotine replacement therapy through gums, patches, lozenges, and inhalers to help smokers quit successfully.",
    accent: "#8B7355",
    story:
      "Nicotinell has helped millions quit smoking with scientifically formulated nicotine replacement products and support.",
    subcategories: ["Nicotine Gum", "Patches", "Lozenges"],
    supplyAvailability: "Pharmacy and healthcare distributor channels",
    distributionSupport: "Smoking cessation support materials",
    shippingAvailability: "Licensed pharmaceutical distribution worldwide",
    products: [
      {
        id: "ni-gum-mint",
        name: "Nicotine Gum Mint 24 Pieces",
        tagline: "Convenient nicotine replacement",
        description: "Mint-flavored nicotine gum for smoking cessation support.",
        usdPrice: 9.0,
        eurPrice: 7.9,
        ean: "5054563009756",
        gtin: "5054563009756",
        packaging: "24 pieces per pack",
        details: [
          "4mg nicotine per piece",
          "Mint flavor",
          "Helps reduce cravings",
        ],
      },
    ],
    keywords: ["nicotinell", "nicotine gum", "smoking cessation", "quit smoking"],
  },
  {
    slug: "chapstick",
    name: "ChapStick",
    monogram: "Ch",
    category: "ChapStick",
    categoryGroup: "Personal Care",
    tagline: "Moisturizing lip balm for lips.",
    short: "Classic lip care brand for dry lip relief.",
    description:
      "ChapStick offers convenient, portable lip balm solutions with moisturizing and protective formulations. A personal care essential trusted for generations.",
    accent: "#E74C3C",
    story:
      "ChapStick has been the go-to lip balm choice for over 100 years, providing essential moisture and protection.",
    subcategories: ["Lip Balm", "Medicated", "Moisturizing"],
    supplyAvailability: "Ubiquitous retail distribution",
    distributionSupport: "Consumer marketing support",
    shippingAvailability: "Global availability",
    products: [
      {
        id: "ch-classic-original",
        name: "Classic Original Lip Balm",
        tagline: "Original moisture and protection",
        description: "The iconic ChapStick formula with natural ingredients for lip care.",
        usdPrice: 1.5,
        eurPrice: 1.3,
        ean: "5054563009863",
        gtin: "5054563009863",
        packaging: "4.8g stick",
        details: [
          "Classic moisturizing formula",
          "Natural ingredients",
          "Easy to apply stick format",
        ],
      },
    ],
    keywords: ["chapstick", "lip balm", "lip care", "moisturizer", "personal care"],
  },
];

export const getBrand = (slug: string) => BRANDS.find((b) => b.slug === slug);
