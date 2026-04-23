import { TopBar } from "@/components/ads-studio/v2/top-bar";
import { SideRail } from "@/components/ads-studio/v2/side-rail";
import { TopGlow } from "@/components/ads-studio/v2/top-glow";
import { CreateTopTabs } from "@/components/ads-studio/v2/create-top-tabs";
import { AssetCanvas } from "@/components/ads-studio/v2/asset-canvas";
import { GenerationThumbnails } from "@/components/ads-studio/v2/generation-thumbnails";
import { ComposerCluster } from "@/components/ads-studio/v2/composer-cluster";
import { AssetsDock } from "@/components/ads-studio/v2/assets-dock";

/**
 * Ads Studio — creation view (Figma node 22585:61277).
 *
 * Vertical spacing inside the central 1108px column:
 *   pt-6  (24px)  — top offset below the top bar
 *   TopTabs
 *   pt-3  (8px)   — tabs → canvas
 *   AssetCanvas (flex-1, fills remaining height)
 *   pt-5  (16px)  — canvas → thumbnails   ← Figma spec
 *   GenerationThumbnails
 *   pt-9  (32px)  — thumbnails → composer chips   ← Figma spec
 *   ComposerCluster (chips + composer, inline)
 */

const UNSPLASH = (id: string, w = 160, h = 160) =>
  `https://images.unsplash.com/${id}?w=${w}&h=${h}&fit=crop&auto=format&q=80`;

const GENERATIONS = [
  { id: "g1", image: UNSPLASH("photo-1544005313-94ddf0286df2") },
  { id: "g2", image: UNSPLASH("photo-1488426862026-3ee34a7d66df") },
  { id: "g3", image: UNSPLASH("photo-1570872626485-d8ffea69f463") },
];

const DEFAULT_POSTER = UNSPLASH(
  "photo-1542291026-7eec264c27ff",
  1440,
  900
);

export default async function AdsStudioProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await params;

  return (
    <div className="dark h-screen flex flex-col bg-background text-content-primary overflow-hidden">
      <TopBar />
      <div className="flex flex-1 min-h-0">
        <SideRail />

        <main className="relative flex-1 min-w-0 overflow-hidden">
          <TopGlow variant="creation" />

          <div className="relative h-full">
            <div className="relative mx-auto max-w-[1300px] pr-[76px] pl-6 h-full">
              {/* Content column — fills height, concrete gaps between each section */}
              <div className="h-full flex flex-col pt-6 pb-6">
                <CreateTopTabs />

                <div className="pt-3 flex-1 min-h-0 flex flex-col">
                  <AssetCanvas
                    videoSrc="/stock/iphone-16-reveal.mp4"
                    posterSrc={DEFAULT_POSTER}
                  />

                  <div className="pt-5 flex justify-center shrink-0">
                    <GenerationThumbnails thumbs={GENERATIONS} activeId="g1" />
                  </div>

                  <div className="pt-9 flex justify-center shrink-0">
                    <div className="w-full max-w-[972px]">
                      <ComposerCluster />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <AssetsDock className="absolute right-2 top-[48%] -translate-y-1/2 z-20" />
        </main>
      </div>
    </div>
  );
}
