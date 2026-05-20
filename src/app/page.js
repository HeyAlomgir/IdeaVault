import Banner from "@/components/Banner";
import FaqSection from "@/components/FaqSection";
import StatsSection from "@/components/StatsSection";

export const metadata = {
  title: "Home | IdeaVault - Startup Idea Sharing Platform",
  description: "Share and explore innovative startup ideas collectively.",
};
export default function Home() {
  return (
    <div>
     <Banner/>
     <StatsSection/>
     <FaqSection/>
    </div>
  );
}
