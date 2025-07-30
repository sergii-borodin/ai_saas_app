import { SignedIn, SignedOut } from "@clerk/nextjs";
import CompanionsList from "@/components/CompanionsList";

export default function CompanionsLibrary() {
  return (
    <div className="container mx-auto px-4 py-8">
      <SignedIn>
        <div>
          <h1 className="text-3xl font-bold mb-6">Your AI Companions</h1>
          <CompanionsList title="Recent sections" />
        </div>
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
}
