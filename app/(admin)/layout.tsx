import Sidebar from "@/components/shared/Sidebar";
import { getUserById } from "@/lib/actions/User.action";
import User from "@/lib/database/model/User.model";
import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = async ({ children }: LayoutProps) => {
  const clerkUser = await currentUser();
  const clerkUserId = clerkUser?.id || "";
  const user = (await getUserById(clerkUserId)) as User;
  const isAdmin = user.role === "Admin";
  if (!isAdmin) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-xl">
        <h1 className="text-5xl">401</h1>
        <picture className="w-[400px] h-[150px] relative -mt-[40px]">
          <Image src={"/assets/ua.webp"} alt="" fill objectFit="contain" />
        </picture>
      </div>
    );
  }
  return (
    <main className="grid grid-cols-5 min-h-screen">
      {/* Sidebar */}
      <aside className="col-span-1 bg-gray-200 p-4">
        {/* Add your sidebar content here */}
        <Sidebar user={user} />
      </aside>

      {/* Main Content */}
      <section className="col-span-4 p-6">{children}</section>
    </main>
  );
};

export default Layout;
