import CompanionCard from "@/components/CompanionsCards";
import CompanionsList from "@/components/CompanionsList";
import Cta from "@/components/Cta";

const Page = () => {
  return (
    <div>
      <h1 className="text-2xl underline">Popular companions</h1>
      <section className="home-section">
        <CompanionCard
          id="123"
          name="Neura the Brainy Explorer"
          topic="Neural Network of the Brain"
          subject="Science"
          duration={45}
          color="#ffda6e"
        />
        <CompanionCard
          id="456"
          name="Countsy the Number Wizard"
          topic="Derivatives & Integrals"
          subject="Maths"
          duration={30}
          color="#e5d0ff"
        />
        <CompanionCard
          id="789"
          name="Verba the Vocabulary Builder"
          topic="English Literature"
          subject="Language"
          duration={20}
          color="#ffda6e"
        />
      </section>
      <section className="home-section">
        <CompanionsList />
        <Cta />
      </section>
    </div>
  );
};

export default Page;
