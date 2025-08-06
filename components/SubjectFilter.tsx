"use client";

import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { recentSessions } from "@/constants";

const SubjectFilter = () => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get("subject") || "";

  const [subjectQuery, setSubjectQuery] = useState(query);
  useEffect(() => {
    setSubjectQuery(query);
  }, [query]);

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    console.log("subjectQuery", subjectQuery);

    if (subjectQuery.trim()) {
      params.set("subject", subjectQuery.trim());
    } else {
      params.delete("subject");
    }

    const newUrl = `${pathname}?${params.toString()}`;
    router.push(newUrl);
  }, [subjectQuery, router, pathname, searchParams]);

  return (
    <Select onValueChange={(e) => setSubjectQuery(e)} value={subjectQuery}>
      <SelectTrigger className="input capitalize">
        <SelectValue placeholder="Subject" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All Subjects</SelectItem>
        {recentSessions.map(({ subject }) => (
          <SelectItem key={subject} value={subject} className="capitalize">
            {subject}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default SubjectFilter;
