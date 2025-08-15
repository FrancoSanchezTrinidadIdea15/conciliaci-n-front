import { auth } from "@/auth";
import { Sidebar, NavBar, MobileSidebar } from "@/components";
import { redirect } from "next/navigation";

export default async function AdminLayout({
 children
}: {
 children: React.ReactNode;
}) {
    const session = await auth();
    if (!session) {
        redirect("/auth/login");
    }
  return (
    <div className="flex h-screen bg-gray-50 transition-all">
      <Sidebar />
      <MobileSidebar />
      <div className="flex overflow-hidden flex-col flex-1">
        <NavBar />
        <main className="overflow-y-auto overflow-x-hidden flex-1 p-6 bg-gray-50">
          {children}
        </main>
      </div>
      
    </div>
  );
}