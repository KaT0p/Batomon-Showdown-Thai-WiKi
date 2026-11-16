import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Batomon Showdown Wiki ภาษาไทย",
    short_name: "Batomon TH",
    description: "วิกิภาษาไทยของเกม Batomon Showdown",
    start_url: "/",
    display: "standalone",
    background_color: "#0f141d",
    theme_color: "#0f141d",
    lang: "th",
    icons: [
      { src: "/brand/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/brand/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
