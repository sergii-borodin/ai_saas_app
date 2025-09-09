import CompanionCard from "@/components/CompanionCard";
import CompanionsList from "@/components/CompanionsList";
import Cta from "@/components/Cta";
import {
  getAllCompanions,
  getRecentSessions,
} from "@/lib/actions/companion.actions";
import { getSubjectColor } from "@/lib/utils";
import { SignedIn, SignedOut } from "@clerk/nextjs";

const Page = async () => {
  const companions = await getAllCompanions({ limit: 3 });
  const recentSessionsCompanions = await getRecentSessions();
  return (
    <main>
      <SignedIn>
        {companions.length > 0 && (
          <>
            <h1 className="text-2xl underline">Popular companions</h1>
            <section className="home-section">
              {companions.map((companion) => {
                return (
                  <CompanionCard
                    key={companion.id}
                    {...companion}
                    color={getSubjectColor(companion.subject)}
                  />
                );
              })}
            </section>
          </>
        )}
        {recentSessionsCompanions.length > 0 && (
          <section className="home-section">
            <CompanionsList
              title="Recently completed sessions"
              companions={recentSessionsCompanions}
              classNames="w-2/3 max-lg:w-full"
            />
            <Cta ctaClass="cta-logged-in-section" />
          </section>
        )}
      </SignedIn>
      <SignedOut>
        <section className="home-section">
          {/* <CompanionsList
          title="Recently completed sessions"
          companions={recentSessionsCompanions}
          classNames="w-2/3 max-lg:w-full"
        /> */}
          <Cta ctaClass="cta-logged-out-section" />
        </section>
      </SignedOut>
    </main>
  );
};

export default Page;
