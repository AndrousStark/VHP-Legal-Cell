import type { ReactNode } from "react";

// Root layout — minimal wrapper; locale layout handles everything
export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
