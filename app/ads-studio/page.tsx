"use client";

import Image from "next/image";
import { TopNav } from "@/components/ui/top-nav";
import { SideNav, type SideNavItem } from "@/components/ui/side-nav";
import {
  Home,
  Image as ImageIcon,
  Video,
  Folder,
  Setting,
} from "react-iconly";
import { PainterlyBackdrop } from "@/components/ads-studio/painterly-backdrop";
import { HeroBlock } from "@/components/ads-studio/hero-block";
import { ReferenceTilesRow } from "@/components/ads-studio/reference-tiles-row";
import { PromptComposer } from "@/components/ads-studio/prompt-composer";
import { ProjectRail } from "@/components/ads-studio/project-rail";
import { InspirationsGrid } from "@/components/ads-studio/inspirations-grid";

const SIDE_NAV_ITEMS: SideNavItem[] = [
  { label: "Home", href: "/", icon: <Home set="light" size="small" /> },
  {
    label: "Ads Studio",
    href: "/ads-studio",
    icon: <ImageIcon set="light" size="small" />,
    active: true,
  },
  { label: "Director", href: "#", icon: <Video set="light" size="small" /> },
  { label: "Projects", href: "#", icon: <Folder set="light" size="small" /> },
  { label: "Settings", href: "#", icon: <Setting set="light" size="small" /> },
];

export default function AdsStudioPage() {
  return (
    <>
      <TopNav
        brand={
          <Image
            src="/brand/logo-color.png"
            alt="Imagine"
            width={28}
            height={28}
            priority
          />
        }
        items={[]}
      />
      <div className="flex flex-1 min-h-0">
        <SideNav collapsed items={SIDE_NAV_ITEMS} />

        {/* Central column */}
        <main className="relative flex-1 overflow-hidden">
          <PainterlyBackdrop />

          {/* Scrollable foreground */}
          <div className="relative z-10 h-full overflow-y-auto">
            <div className="max-w-[640px] mx-auto px-4 pt-12 flex flex-col gap-6">
              <HeroBlock />
              <div className="flex flex-col gap-3">
                <ReferenceTilesRow />
                <PromptComposer />
              </div>
            </div>

            <div className="mt-12 px-6 pb-12">
              <InspirationsGrid />
            </div>
          </div>

          {/* Project rail — floats at right edge of central column */}
          <ProjectRail className="absolute right-3 top-7 z-20" />
        </main>
      </div>
    </>
  );
}
