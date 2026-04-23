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
 * Content stack inside the 1108px central column:
 *   - Top tabs (32h) + 12px gap
 *   - Canvas (flex-1)
 *   - 16px gap → thumbnails (40h)
 * The composer cluster floats at the bottom of the main area; a bottom gutter
 * reserves space so the thumbnails never sit under it.
 *
 * To mount the user's MP4, drop the file at /public/stock/<name>.mp4 and pass
 * `videoSrc="/stock/<name>.mp4"` to AssetCanvas. A poster image is wired as a
 * fallback so the canvas isn't empty while we're waiting on real generations.
 */

const UNSPLASH = (id: string, w = 160, h = 160) =>
  `https://images.unsplash.com/${id}?w=${w}&h=${h}&fit=crop&auto=format&q=80`;

const GENERATIONS = [
  { id: "g1", image: UNSPLASH("photo-1544005313-94ddf0286df2") },
  { id: "g2", image: UNSPLASH("photo-1488426862026-3ee34a7d66df") },
  { id: "g3", image: UNSPLASH("photo-1570872626485-d8ffea69f463") },
];

/* Poster until the pipeline returns a real MP4 for this project. */
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
              {/* Central content column — fills height above the floating composer */}
              <div className="h-full flex flex-col pt-6 pb-[200px]">
                <CreateTopTabs />

                <div className="pt-3 flex-1 min-h-0 flex flex-col">
                  <AssetCanvas
                    videoSrc="/stock/iphone-16-reveal.mp4"
                    posterSrc={DEFAULT_POSTER}
                  />

                  <div className="pt-4 flex justify-center">
                    <GenerationThumbnails thumbs={GENERATIONS} activeId="g1" />
                  </div>
                </div>
              </div>
            </div>
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
