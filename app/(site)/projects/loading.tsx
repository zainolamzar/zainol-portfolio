import { FocusCardsSkeleton } from "@/components/ui/focus-cards-skeleton";

export default function LoadingProjects() {
  return (
    <div className="min-h-screen bg-[rgb(25,26,28)] text-[#dfe4ed] p-8">
      {/* Page Header */}
      <h1 className="text-5xl font-extrabold text-center mb-12 tracking-wide">
        Projects
      </h1>

      <FocusCardsSkeleton count={3} />
    </div>
  );
}