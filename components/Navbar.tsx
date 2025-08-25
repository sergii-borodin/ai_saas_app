import Image from "next/image";
import Link from "next/link";
import React from "react";
import NavItems from "./NavItems";

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link href="/">
        <div>
          <Image
            src="/images/chatBot.jpeg"
            alt="logo"
            width={46}
            height={44}
            className="rounded-lg"
          />
        </div>
      </Link>
      <div className="flex items-center gap-8">
        <NavItems />
      </div>
    </nav>
  );
};

export default Navbar;
