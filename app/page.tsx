import { Sidebar } from "@/components/sidebar";
import { FeedContent } from "@/components/feed-content";

export default function Home() {
  return (
    <div className="flex min-h-screen bg-[#F6ECDF]">
      <Sidebar activeItem="feed" />
      <FeedContent />
    </div>
  );
}
