export const FAQS = [
  {
    question: "Is Vitala Global Holdings a wholesale-only supplier?",
    answer:
      "Yes. Vitala Global Holdings serves verified businesses, distributors, wholesalers, pharmacies, beauty retailers and other commercial buyers. We do not accept personal purchases.",
  },
  {
    question: "What is the minimum order quantity?",
    answer:
      "The minimum order quantity is 2000 units. The MOQ can be achieved by mixing products from different Vitala brands and categories in one inquiry.",
  },
  {
    question: "Can I combine skincare, oral care and wellness products?",
    answer:
      "Yes. Buyers can combine products across cosmetics and skincare, oral care, and wellness categories to reach the 2000-unit minimum order quantity.",
  },
  {
    question: "Do I pay online when I submit an inquiry?",
    answer:
      "No. There is no direct online payment gateway. Submit your product inquiry and our team will review availability, commercial terms, documentation and shipping requirements before sending a quotation.",
  },
  {
    question: "Do you support USA wholesale buyers?",
    answer:
      "Yes. We work with wholesale buyers serving the USA and other international markets. Product eligibility, documentation and shipping terms are confirmed during quotation.",
  },
  {
    question: "Can you discuss private label opportunities?",
    answer:
      "Private label cosmetics, skincare and personal care opportunities are reviewed case by case. Share your target market, product category, volume and packaging goals with our partnership team.",
  },
] as const;

export type CategoryContent = {
  slug: string;
  name: string;
  categoryGroups: string[];
  eyebrow: string;
  title: string;
  description: string;
  intro: string;
  seoTitle: string;
  seoDescription: string;
  keywords: string[];
};

export const CATEGORY_CONTENT: CategoryContent[] = [
  {
    slug: "dermaceutical-skincare",
    name: "Dermaceutical Skincare",
    categoryGroups: ["Dermaceutical Skincare"],
    eyebrow: "Wholesale dermaceutical skincare",
    title: "Dermaceutical skincare products for professional assortments.",
    description:
      "Source wholesale dermaceutical skincare products built for distributors, pharmacies, beauty retailers and clinical channels.",
    intro:
      "Vitala Global Holdings helps USA-focused buyers build thoughtful dermaceutical skincare assortments with clear product positioning, mixed-category MOQ flexibility and direct access to a partnership team.",
    seoTitle: "Wholesale Dermaceutical Skincare | Vitala Global Holdings",
    seoDescription:
      "Explore wholesale dermaceutical skincare products for distributors, pharmacies and beauty retailers. Vitala Global Holdings supports dermaceutical wholesale inquiries.",
    keywords: [
      "wholesale dermaceutical skincare",
      "bulk skincare products",
      "B2B beauty products",
      "wholesale skincare USA",
      "private label skincare manufacturer",
    ],
  },
  {
    slug: "oral-health",
    name: "Oral Health",
    categoryGroups: ["Oral Health"],
    eyebrow: "Wholesale oral health products",
    title: "Oral health supply for retail and pharmacy channels.",
    description:
      "Build a wholesale oral health assortment for pharmacies, distributors and personal care retailers.",
    intro:
      "Our inquiry-led process gives B2B buyers a practical way to request oral health products alongside skincare and wellness categories. Mixed product quantities can contribute toward the 2000-unit MOQ.",
    seoTitle: "Wholesale Oral Health Products USA | Vitala Global Holdings",
    seoDescription:
      "Request wholesale oral health products for pharmacies, distributors and personal care retailers. Mix categories to reach Vitala Global Holdings' 2000-unit MOQ.",
    keywords: [
      "wholesale oral health products",
      "oral health wholesale",
      "B2B beauty products",
      "bulk oral health products",
    ],
  },
  {
    slug: "wellness-nutrition",
    name: "Wellness & Nutrition",
    categoryGroups: ["Wellness & Nutrition", "Children Nutrition", "Sleep & Wellness", "Vitamins & Supplements"],
    eyebrow: "Wholesale wellness products",
    title: "Everyday wellness products for business buyers.",
    description:
      "Source wellness, nutrition and lifestyle products for pharmacy, distributor and retail channels.",
    intro:
      "Vitala Global Holdings supports business buyers who want to complement beauty and personal care assortments with practical wellness and nutrition products. Our partnership team reviews each inquiry for product availability, destination requirements and commercial fit.",
    seoTitle: "Wholesale Wellness & Nutrition Products | Vitala Global Holdings",
    seoDescription:
      "Explore wholesale wellness and nutrition products for pharmacies, distributors and retailers through Vitala Global Holdings' inquiry-based B2B process.",
    keywords: ["B2B wellness products", "bulk personal care products", "wholesale health products"],
  },
  {
    slug: "children-nutrition",
    name: "Children Nutrition",
    categoryGroups: ["Children Nutrition"],
    eyebrow: "Wholesale children's nutrition",
    title: "Family nutrition formats for pharmacy and retail assortments.",
    description:
      "Source wholesale children's nutrition products designed for family wellness and pharmacy shelves.",
    intro:
      "Vitala Global Holdings helps buyers build family-focused nutrition assortments with clear wholesale positioning and dependable supply.",
    seoTitle: "Wholesale Children's Nutrition | Vitala Global Holdings",
    seoDescription:
      "Explore wholesale children's nutrition products for pharmacies, distributors and family wellness retailers.",
    keywords: ["wholesale children's nutrition", "bulk kids vitamins", "family wellness products"],
  },
  {
    slug: "sleep-wellness",
    name: "Sleep & Wellness",
    categoryGroups: ["Sleep & Wellness"],
    eyebrow: "Wholesale sleep and wellness",
    title: "Sleep support products for retail and wellbeing channels.",
    description:
      "Source wholesale sleep support and evening wellness products for pharmacy, wellness and personal care assortments.",
    intro:
      "Vitala Global Holdings supports business buyers seeking dependable sleep and wellbeing products for retail, distributor and pharmacy channels.",
    seoTitle: "Wholesale Sleep & Wellness Products | Vitala Global Holdings",
    seoDescription:
      "Explore wholesale sleep support and wellness products for pharmacies, distributors and retailers.",
    keywords: ["wholesale sleep wellness", "bulk sleep supplements", "B2B wellness products"],
  },
  {
    slug: "vitamins-supplements",
    name: "Vitamins & Supplements",
    categoryGroups: ["Vitamins & Supplements"],
    eyebrow: "Wholesale vitamins and supplements",
    title: "Nutrition supplements for wellness and pharmacy assortments.",
    description:
      "Source wholesale vitamins and supplements designed for pharmacy, wellness and distributor channels.",
    intro:
      "Vitala Global Holdings supports B2B buyers building vitamin and supplement assortments with clear product positioning and commercial support.",
    seoTitle: "Wholesale Vitamins & Supplements | Vitala Global Holdings",
    seoDescription:
      "Explore wholesale vitamins and supplements for pharmacies, distributors and wellness retailers.",
    keywords: ["wholesale vitamins", "bulk supplements", "B2B nutrition products"],
  },
];

export const getCategoryContent = (slug: string) =>
  CATEGORY_CONTENT.find((category) => category.slug === slug);
