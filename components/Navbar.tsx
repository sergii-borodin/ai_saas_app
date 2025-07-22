import Image from "next/image";
import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link href="/">
        <div className="">
          <Image src="images/logo.svg" alt="logo" width={46} height={44} />
        </div>
      </Link>
    </nav>
  );
};

export default Navbar;
