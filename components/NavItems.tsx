"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SignInButton, UserButton, SignedIn, SignedOut } from "@clerk/nextjs";

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
          <button className="btn-signin">Sign in</button>
        </SignInButton>
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </div>
  );
};

export default NavItems;
