import { useEffect } from "react";

type SeoProps = {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  keywords?: string[];
  noIndex?: boolean;
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
};

function setMeta(name: string, content: string, attr: "name" | "property" = "name") {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${name}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setLink(rel: string, href: string) {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

export function Seo({
  title,
  description,
  canonical,
  ogImage,
  keywords,
  noIndex = false,
  jsonLd,
}: SeoProps) {
  useEffect(() => {
    document.title = title;
    setMeta("description", description);
    setMeta("robots", noIndex ? "noindex, nofollow" : "index, follow");
    if (keywords?.length) setMeta("keywords", keywords.join(", "));
    setMeta("og:title", title, "property");
    setMeta("og:description", description, "property");
    setMeta("og:type", "website", "property");
    setMeta("og:site_name", "Vitala Global Holdings", "property");
    setMeta("og:locale", "en_US", "property");
    if (ogImage) setMeta("og:image", ogImage, "property");
    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:title", title);
    setMeta("twitter:description", description);
    if (ogImage) setMeta("twitter:image", ogImage);
    const siteUrl = import.meta.env.VITE_SITE_URL?.replace(/\/$/, "");
    const url =
      canonical ??
      (siteUrl && typeof window !== "undefined"
        ? `${siteUrl}${window.location.pathname}`
        : typeof window !== "undefined"
          ? window.location.href.split(/[?#]/)[0]
          : "");
    if (url) {
      setLink("canonical", url);
      setMeta("og:url", url, "property");
    }
    const id = "ld-json-tag";
    let script = document.getElementById(id) as HTMLScriptElement | null;
    if (jsonLd) {
      if (!script) {
        script = document.createElement("script");
        script.type = "application/ld+json";
        script.id = id;
        document.head.appendChild(script);
      }
      script.text = JSON.stringify(jsonLd);
    } else if (script) {
      script.remove();
    }
  }, [title, description, canonical, ogImage, keywords, noIndex, jsonLd]);
  return null;
}
