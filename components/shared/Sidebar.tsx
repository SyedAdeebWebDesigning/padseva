"use client";

import User from "@/lib/database/model/User.model";
import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "../ui/button";
import {
  Home,
  LayoutDashboard,
  Mail,
  MessageSquare,
  Newspaper,
  Users2,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { toast } from "react-toastify";
import useSWR from "swr"; // Import SWR
import { countUnreadReviews } from "@/lib/actions/Review.action"; // Your action to fetch unread reviews

interface SidebarProps {
  user: User;
}

const fetchUnreadReviews = async () => {
  try {
    const unreadCount = await countUnreadReviews();
    return unreadCount;
  } catch (error) {
    toast.error("Failed to get unread messages");
    return 0;
  }
};

const Sidebar = ({ user }: SidebarProps) => {
  const pathname = usePathname(); // Get the current route

  if (!user) return null;

  // Use SWR to fetch and automatically revalidate unread reviews
  const { data: unread = 0, error } = useSWR(
    "unreadReviews",
    fetchUnreadReviews,
    {
      refreshInterval: 10000, // Poll every 10 seconds
    },
  );

  if (error) toast.error("Failed to get unread messages");

  return (
    <section>
      <div className="flex justify-start">
        <picture className="relative w-[150px] sm:w-[250px] md:w-[300px] h-12 lg:w-[400px]">
          <Image
            src={"/assets/PD.webp"}
            fill
            alt="Dashboard Image"
            className="object-contain"
          />
        </picture>
      </div>
      <div className="flex flex-col bg-gray-300 mt-10 p-2 rounded">
        {/* Admin Details */}
        <div className="flex items-center">
          <div>
            <picture className="relative size-12">
              <Image
                src={user.photo}
                fill
                alt="admin"
                className="rounded-full"
              />
            </picture>
          </div>
          <div className="ml-2">
            <h2 className="text-xl font-semibold line-clamp-1">
              {user.firstName} {user.lastName}
            </h2>
            <p className="line-clamp-1 text-muted-foreground text-xs">
              {user.email}
            </p>
          </div>
        </div>
      </div>
      {/* Sidebar Links */}
      <div className="flex flex-col my-12 items-start space-y-4">
        <Link
          href="/"
          className={`${buttonVariants({
            variant: "link",
          })} ${
            pathname === "/" ? "font-semibold underline underline-offset-4" : ""
          }`}
        >
          <Home className="mr-2" />
          <p className="text-lg">Home</p>
        </Link>
        <Link
          href="/dashboard"
          className={`${buttonVariants({
            variant: "link",
          })} ${
            pathname === "/dashboard"
              ? "font-semibold underline underline-offset-4"
              : ""
          }`}
        >
          <LayoutDashboard className="mr-2" />
          <p className="text-lg">Dashboard</p>
        </Link>

        <Link
          href="/newsletter"
          className={`${buttonVariants({
            variant: "link",
          })} ${
            pathname === "/newsletter"
              ? "font-semibold underline underline-offset-4"
              : ""
          }`}
        >
          <Newspaper className="mr-2" />
          <p className="text-lg">Your Newsletter</p>
        </Link>

        <Link
          href="/messages"
          className={`relative ${buttonVariants({
            variant: "link",
          })} ${pathname === "/messages" ? "font-semibold " : ""}`}
        >
          <MessageSquare className="mr-2" />
          <div className="text-lg text-left flex flex-col">
            <p className="hover:underline underline-offset-4">Your Messages</p>

            {unread > 0 && (
              <span className="text-muted-foreground rounded-full text-xs">
                {unread} New Messages
              </span>
            )}
          </div>
        </Link>

        <Link
          href="/users"
          className={`${buttonVariants({
            variant: "link",
          })} ${
            pathname === "/users"
              ? "font-semibold underline underline-offset-4"
              : ""
          }`}
        >
          <Users2 className="mr-2" />
          <p className="text-lg">Users</p>
        </Link>
        <Link
          href="/subscriptions"
          className={`${buttonVariants({
            variant: "link",
          })} ${
            pathname === "/subscriptions"
              ? "font-semibold underline underline-offset-4"
              : ""
          }`}
        >
          <Mail className="mr-2" />
          <p className="text-lg">Subscriptions</p>
        </Link>
      </div>
    </section>
  );
};

export default Sidebar;
