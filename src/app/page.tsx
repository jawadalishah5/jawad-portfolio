import type { Metadata } from "next";
import { AskChat } from "@/components/AskChat";

export const metadata: Metadata = {
  title: "Ask Jawad Bukhari",
  description:
    "Ask about Jawad Bukhari’s work, background, or how closely he fits a role.",
};

export default function Home() {
  return <AskChat />;
}
