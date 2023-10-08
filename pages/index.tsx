import { Inter } from "next/font/google";

import Main from "@/components/Main";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main
      className={`bg-black text-white flex min-h-screen flex-col items-center justify-between p-24`}
    >
      <Main />
    </main>
  );
}
