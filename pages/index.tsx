import { Inter } from "next/font/google";
import CreateScript from "@/components/CreateScript";
import Record from "@/components/RecordingModal";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <CreateScript />
      <Record />
    </main>
  );
}
