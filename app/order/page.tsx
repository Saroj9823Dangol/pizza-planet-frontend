import Navbar from "@/components/Navbar";
import FullOrder from "@/components/FullOrder";
import Footer from "@/components/Footer";
import CartSidebar from "@/components/CartSidebar";
import { fetchBranchesServer, fetchCrustsServer } from "@/lib/api-server";

export const dynamic = "force-dynamic";

export default async function OrderPage() {
  const [branches, crusts] = await Promise.all([fetchBranchesServer(), fetchCrustsServer()]);
  return (
    <>
      <Navbar />
      <main>
        <FullOrder branches={branches} crusts={crusts} />
      </main>
      <Footer />
      <CartSidebar />
    </>
  );
}