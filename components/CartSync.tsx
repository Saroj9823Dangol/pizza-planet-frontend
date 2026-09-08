"use client";
import { useEffect } from "react";
import { initCartSync } from "@/lib/store";

/**
 * Boots the guest cart sync — hydrates from the server-side cart on load and
 * pushes every change (debounced). Renders nothing; mounted once in the root
 * layout so the cart survives refresh on every page.
 */
export default function CartSync() {
  useEffect(() => {
    initCartSync();
  }, []);
  return null;
}