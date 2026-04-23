"use client";

import { useState } from "react";
import { ReferenceChips } from "./reference-chips";
import { FloatingComposer, type FloatingComposerProps } from "./floating-composer";
import { ReferenceTray, type TrayCategory } from "./reference-tray";

/**
 * COMPOSER CLUSTER — ties ReferenceChips + ReferenceTray + FloatingComposer
 * together and owns tray open/category state.
 *
 * Tray positioning: popover (NOT a modal) — anchored above the chips with a
 * small gap. No backdrop, no dim. The rest of the page stays fully visible
 * and interactive underneath. Clicking a chip below the tray swaps the
 * tray's active category in the left list.
 */
export type ComposerClusterProps = FloatingComposerProps & {
  className?: string;
};

export function ComposerCluster({ className, onCreate }: ComposerClusterProps) {
  const [trayOpen, setTrayOpen] = useState(false);
  const [trayCategory, setTrayCategory] =
    useState<TrayCategory>("characters");

  const handleChip = (c: TrayCategory) => {
    setTrayCategory(c);
    // Click the same chip twice = toggle closed; otherwise ensure open.
    setTrayOpen((prev) => (c === trayCategory ? !prev : true));
  };

  return (
    <div
      className={
        "relative w-full flex flex-col items-center gap-1 " + (className ?? "")
      }
    >
      {/* Tray popover — absolute above the chips, aligned to the composer
          (64px inset from the segmented control on the left). */}
      {trayOpen && (
        <div
          className="absolute left-[64px] right-0 bottom-full mb-3 flex justify-start"
          data-slot="reference-tray-anchor"
        >
          <ReferenceTray
            category={trayCategory}
            onCategoryChange={setTrayCategory}
            onClose={() => setTrayOpen(false)}
          />
        </div>
      )}

      <ReferenceChips
        activeCategory={trayOpen ? trayCategory : undefined}
        onChipClick={handleChip}
      />
      <FloatingComposer onCreate={onCreate} />
    </div>
  );
}
