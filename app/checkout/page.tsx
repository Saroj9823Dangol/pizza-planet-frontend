import type { Metadata } from "next";
import CheckoutForm from "@/components/CheckoutForm";
import { fetchBranchesServer } from "@/lib/api-server";

export const metadata: Metadata = {
  title: "Checkout — Pizza Planet",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false },
  },
};

// Checkout is a client experience, but the branch list is fetched server-side
// so it always reflects the live branch list (add/edit from the admin dashboard).
export const dynamic = "force-dynamic";

export default async function CheckoutPage() {
  const branches = await fetchBranchesServer();
  return <CheckoutForm branches={branches} />;
}