import { FocusCardsSkeleton } from "@/components/ui/focus-cards-skeleton";

export default function LoadingBlogs() {
  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-6 text-center">Blogs</h1>

      <FocusCardsSkeleton count={3} />
    </div>
  );
}