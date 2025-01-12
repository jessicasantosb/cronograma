import { ReactNode } from "react";

export default function AuthLayout({children} : {children: ReactNode}) {

  return (
    <main className="container flex items-center justify-center py-14">
      {children}
    </main>
  );
}
