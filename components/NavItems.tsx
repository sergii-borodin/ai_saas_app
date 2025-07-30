"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  SignInButton,
  SignUpButton,
  UserButton,
  SignedIn,
  SignedOut,
} from "@clerk/nextjs";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Companions", href: "/companions" },
  { label: "My journey", href: "/my-journey" },
];

const NavItems = () => {
  const pathname = usePathname();

  return (
    <div className="flex items-center gap-4">
      {navItems.map(({ label, href }) => (
        <Link
          key={label}
          href={href}
          className={cn(pathname === href && "text-primary font-semibold")}>
          {label}
        </Link>
      ))}

      {/* Clerk Authentication Components */}
      <SignedOut>
        <SignInButton mode="modal">
          <button className="text-sm font-medium text-gray-700 hover:text-gray-900">
            Sign in
          </button>
        </SignInButton>
        <SignUpButton mode="modal">
          <button className="text-sm font-medium bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90">
            Sign up
          </button>
        </SignUpButton>
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </div>
  );
};

export default NavItems;
