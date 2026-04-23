"use client";

import { Plus, MoreSquare } from "react-iconly";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type Project = {
  id: string;
  name: string;
  thumb?: string;
};

const PROJECTS: Project[] = [
  { id: "p1", name: "Summer skincare launch" },
  { id: "p2", name: "Headphones teaser" },
  { id: "p3", name: "App download push" },
  { id: "p4", name: "Holiday UGC set" },
  { id: "p5", name: "Brand anthem" },
];

export function ProjectRail({
  activeId = "p1",
  className,
}: {
  activeId?: string;
  className?: string;
}) {
  return (
    <TooltipProvider delayDuration={200}>
      <aside
        aria-label="Projects"
        className={
          "flex flex-col items-center gap-2 overflow-y-auto max-h-full py-2 pr-1 " +
          (className ?? "")
        }
      >
        {/* New project */}
        <RailTile>
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                type="button"
                aria-label="New project"
                onClick={() => console.log("[ads-studio] new project clicked")}
                className="h-10 w-10 rounded-3 border-1 border-white/[.18] bg-transparent flex items-center justify-center text-content-secondary hover:bg-white/[.06] transition-colors"
              >
                <Plus set="light" size="small" />
              </button>
            </TooltipTrigger>
            <TooltipContent side="left">New project</TooltipContent>
          </Tooltip>
        </RailTile>

        {PROJECTS.map((p) => {
          const isActive = p.id === activeId;
          return (
            <RailTile key={p.id}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    type="button"
                    aria-label={p.name}
                    onClick={() =>
                      console.log("[ads-studio] project clicked", p.id)
                    }
                    className={
                      "h-10 w-10 rounded-3 overflow-hidden transition-shadow " +
                      (isActive
                        ? "ring-2 ring-white/60"
                        : "ring-0 hover:ring-1 hover:ring-white/30")
                    }
                    style={{
                      background:
                        p.thumb == null
                          ? "var(--color-surface-elevated)"
                          : undefined,
                      backgroundImage: p.thumb
                        ? `url(${p.thumb})`
                        : undefined,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  />
                </TooltipTrigger>
                <TooltipContent side="left">{p.name}</TooltipContent>
              </Tooltip>
            </RailTile>
          );
        })}

        {/* Overflow */}
        <RailTile>
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                type="button"
                aria-label="More projects"
                onClick={() => console.log("[ads-studio] more projects clicked")}
                className="h-10 w-10 rounded-3 border-1 border-white/[.12] bg-transparent flex items-center justify-center text-content-secondary hover:bg-white/[.06] transition-colors"
              >
                <MoreSquare set="light" size="small" />
              </button>
            </TooltipTrigger>
            <TooltipContent side="left">More</TooltipContent>
          </Tooltip>
        </RailTile>
      </aside>
    </TooltipProvider>
  );
}

function RailTile({ children }: { children: React.ReactNode }) {
  return <div className="shrink-0">{children}</div>;
}
