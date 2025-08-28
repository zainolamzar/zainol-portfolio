import { FocusCardsSkeleton } from "@/components/ui/focus-cards-skeleton";

export default function LoadingProjects() {
  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-6 text-center">Projects</h1>

      <FocusCardsSkeleton count={3} />
    </div>
  );
}