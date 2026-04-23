"use client";

import { cn } from "@/lib/utils";
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area";
import { forwardRef, type ComponentPropsWithoutRef } from "react";

export interface ScrollAreaProps
  extends ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Root> {
  size?: "sm" | "lg";
  orientation?: "vertical" | "horizontal" | "both";
}

const ScrollBar = forwardRef<
  React.ComponentRef<typeof ScrollAreaPrimitive.Scrollbar>,
  ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Scrollbar> & {
    size?: "sm" | "lg";
  }
>(({ className, orientation = "vertical", size = "sm", ...props }, ref) => (
  <ScrollAreaPrimitive.Scrollbar
    ref={ref}
    orientation={orientation}
    className={cn(
      "flex touch-none select-none transition-colors",
      orientation === "vertical" &&
        cn(
          "h-full border-l border-l-transparent",
          size === "sm" ? "w-[4px] p-px" : "w-[8px] p-px"
        ),
      orientation === "horizontal" &&
        cn(
          "w-full flex-col border-t border-t-transparent",
          size === "sm" ? "h-[4px] p-px" : "h-[8px] p-px"
        ),
      size === "lg" && "hover:bg-fill-primary",
      className
    )}
    {...props}
  >
    <ScrollAreaPrimitive.Thumb
      className={cn(
        "relative flex-1 rounded-full",
        size === "sm"
          ? "bg-neutral-30 dark:bg-neutral-70"
          : "bg-neutral-40 dark:bg-neutral-60"
      )}
    />
  </ScrollAreaPrimitive.Scrollbar>
));
ScrollBar.displayName = "ScrollBar";

const ScrollArea = forwardRef<
  React.ComponentRef<typeof ScrollAreaPrimitive.Root>,
  ScrollAreaProps
>(
  (
    { className, size = "sm", orientation = "vertical", children, ...props },
    ref
  ) => (
    <ScrollAreaPrimitive.Root
      ref={ref}
      data-slot="scroll-area"
      className={cn("relative overflow-hidden", className)}
      {...props}
    >
      <ScrollAreaPrimitive.Viewport className="h-full w-full rounded-[inherit]">
        {children}
      </ScrollAreaPrimitive.Viewport>
      {(orientation === "vertical" || orientation === "both") && (
        <ScrollBar orientation="vertical" size={size} />
      )}
      {(orientation === "horizontal" || orientation === "both") && (
        <ScrollBar orientation="horizontal" size={size} />
      )}
      <ScrollAreaPrimitive.Corner className="bg-transparent" />
    </ScrollAreaPrimitive.Root>
  )
);
ScrollArea.displayName = "ScrollArea";

export { ScrollArea };
