import type { ReactNode } from "react";
import LogoImage from "../../assets/image-1@2x.png";
import Header from "../components/Header";

export function ShowcaseLayout({ children }: { children: ReactNode }) {
  return (
    <div className="showcase min-h-screen flex flex-col bg-background-default-default">
      <Header logoSrc={LogoImage} logoAlt="Logo" logoLinkTo="/time-cost" showAuth={true} />
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
}
