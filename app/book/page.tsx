import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CartSidebar from "@/components/CartSidebar";
import AnnouncementBar from "@/components/AnnouncementBar";
import BookForm from "@/components/BookForm";
import { fetchBranchesServer } from "@/lib/api-server";

export const dynamic = "force-dynamic";

export default async function BookPage() {
  const branches = await fetchBranchesServer();
  return (
    <>
      <AnnouncementBar />
      <Navbar />
      <main>
        <BookForm branches={branches} />
      </main>
      <Footer />
      <CartSidebar />
    </>
  );
}