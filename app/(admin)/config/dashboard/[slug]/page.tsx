import MessageDetail from "@/components/admin/MessageDetail";

export default function ContactDetailPage({ params }: { params: { slug: string } }) {
  return <MessageDetail id={params.slug} />;
}