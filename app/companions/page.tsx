import { SignedIn, SignedOut } from "@clerk/nextjs";
import { getAllCompanions } from "@/lib/actions/companion.actions";
import CompanionCard from "@/components/CompanionCard";
import { getSubjectColor } from "@/lib/utils";
import SearchInput from "@/components/SearchInput";
import SubjectFilter from "@/components/SubjectFilter";

const CompanionsLibrary = async ({ searchParams }: SearchParams) => {
  const filters = await searchParams;

  const subject = filters.subject ? filters.subject : "";
  const topic = filters.topic ? filters.topic : "";

  const companions = await getAllCompanions({
    subject,
    topic,
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <SignedIn>
        <main>
          <section className="flex justify-between gap-4 max-sm:flex-col">
            <h1>Companion Library</h1>
            <div className="flex gap-4">
              <SearchInput />
              <SubjectFilter />
            </div>
          </section>
          <section className="companions-grid">
            {companions.map((companion) => (
              <CompanionCard
                key={companion.id}
                {...companion}
                color={getSubjectColor(companion.subject)}
              />
            ))}
          </section>
        </main>
      </SignedIn>
      <SignedOut>
        <div className="text-center py-12">
          <h2 className="text-2xl font-semibold mb-4">
            Sign in to access your companions
          </h2>
          <p className="text-gray-600 mb-6">
            Create and manage your AI teaching companions
          </p>
        </div>
      </SignedOut>
    </div>
  );
};

export default CompanionsLibrary;
