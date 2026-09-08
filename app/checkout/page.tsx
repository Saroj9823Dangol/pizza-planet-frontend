import CheckoutForm from "@/components/CheckoutForm";
import { fetchBranchesServer } from "@/lib/api-server";

// Checkout is a client experience, but the branch list is fetched server-side
// so it always reflects the live branch list (add/edit from the admin dashboard).
export const dynamic = "force-dynamic";

export default async function CheckoutPage() {
  const branches = await fetchBranchesServer();
  return <CheckoutForm branches={branches} />;
}