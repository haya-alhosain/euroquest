import { Metadata } from "next";
import JoinPageClient from "./_components/join-page-client";

// Generate metadata dynamically
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Join Our Team | EuroQuest International Professional Development",
    description:
      "Join EuroQuest International's team of professional trainers and consultants. We're looking for talented individuals passionate about training, development, and making an impact in professional education.",
    keywords:
      "join EuroQuest International, career opportunities, training jobs, professional development careers, trainer positions, consultant jobs, education careers",
  };
}

export default function JoinPage() {
  return <JoinPageClient />;
}
