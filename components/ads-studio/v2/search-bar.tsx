"use client";

import { Search } from "react-iconly";

/**
 * SEARCH BAR — Ads Studio v2. 225px input with search icon.
 * Matches Figma node 22577:57008.
 */
export function SearchBar() {
  return (
    <div className="px-1">
      <div className="w-[225px] h-8 rounded-6 border-2 border-border-tertiary bg-transparent flex items-center gap-2 px-[10px]">
        <span className="shrink-0 [&_svg]:h-4 [&_svg]:w-4 text-content-tertiary">
          <Search set="light" size="small" />
        </span>
        <input
          type="text"
          placeholder="Search Inspirations"
          aria-label="Search inspirations"
          className="flex-1 min-w-0 bg-transparent outline-none text-label-md text-content-primary placeholder:text-content-tertiary"
        />
      </div>
    </div>
  );
}
