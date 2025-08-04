"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import Image from "next/image";

const SearchInput = () => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get("topic") || "";

  const [searchQuery, setSearchQuery] = useState(query);

  // Update local state when URL query changes
  useEffect(() => {
    setSearchQuery(query);
  }, [query]);

  // Debounced URL update when search query changes
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const params = new URLSearchParams(searchParams);

      if (searchQuery.trim()) {
        params.set("topic", searchQuery.trim());
      } else {
        params.delete("topic");
      }

      const newUrl = `${pathname}?${params.toString()}`;
      router.push(newUrl);
    }, 300); // 300ms delay

    return () => clearTimeout(timeoutId);
  }, [searchQuery, router, pathname, searchParams]);

  return (
    <div className="relative border border-black rounded-lg items-center flex gap-2 px-2 py-1 h-fit">
      <Image src="/icons/search.svg" alt="search" width={15} height={15} />
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search companion..."
        className="outline-none"
      />
    </div>
  );
};

export default SearchInput;
