import { TopBar } from "@/components/ads-studio/v2/top-bar";
import { SideRail } from "@/components/ads-studio/v2/side-rail";
import { TopGlow } from "@/components/ads-studio/v2/top-glow";
import { Hero } from "@/components/ads-studio/v2/hero";
import { FilterTabs } from "@/components/ads-studio/v2/filter-tabs";
import { SearchBar } from "@/components/ads-studio/v2/search-bar";
import { InspirationsGrid } from "@/components/ads-studio/v2/inspirations-grid";
import { ComposerCluster } from "@/components/ads-studio/v2/composer-cluster";
import { AssetsDock } from "@/components/ads-studio/v2/assets-dock";

export default function AdsStudioPage() {
  return (
    <div className="dark h-screen flex flex-col bg-background text-content-primary overflow-hidden">
      <TopBar />
      <div className="flex flex-1 min-h-0">
        <SideRail />

        <main className="relative flex-1 min-w-0 overflow-hidden">
          <TopGlow variant="home" />

          <div className="relative h-full overflow-y-auto">
            <div className="relative mx-auto max-w-[1300px] pr-[76px] pl-6">
              <div className="pt-6">
                <Hero />
              </div>
              <div className="pt-14 flex flex-col gap-3">
                <FilterTabs />
                <SearchBar />
              </div>
              <div className="pt-5">
                <InspirationsGrid />
              </div>
            </div>
            <div className="h-[220px]" aria-hidden />
          </div>

          <AssetsDock className="absolute right-2 top-[48%] -translate-y-1/2 z-20" />

          <div className="absolute left-0 right-[76px] bottom-5 z-30 px-6">
            <div className="max-w-[972px] mx-auto">
              <ComposerCluster />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
