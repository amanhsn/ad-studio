"use client";

import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import {
  createContext,
  useContext,
  forwardRef,
  type ComponentPropsWithoutRef,
  type ElementRef,
} from "react";

/* ── Context ── */

interface TabsStyleContextValue {
  variant: "primary" | "secondary" | "brand";
  size: "sm" | "md" | "lg";
}

const TabsStyleContext = createContext<TabsStyleContextValue>({
  variant: "primary",
  size: "md",
});

function useTabsStyleContext() {
  return useContext(TabsStyleContext);
}

/* ── CVA trigger variants ── */

const triggerVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 relative -mb-px border-b-2",
  {
    variants: {
      variant: {
        primary:
          "data-[state=active]:border-fill-inverse data-[state=active]:text-content-primary data-[state=inactive]:border-transparent data-[state=inactive]:text-content-tertiary hover:text-content-primary",
        secondary:
          "data-[state=active]:border-fill-secondary data-[state=active]:text-content-primary data-[state=inactive]:border-transparent data-[state=inactive]:text-content-tertiary hover:text-content-primary",
        brand:
          "data-[state=active]:border-fill-brand data-[state=active]:text-content-brand data-[state=inactive]:border-transparent data-[state=inactive]:text-content-tertiary hover:text-content-brand",
      },
      size: {
        sm: "px-3 pb-2 pt-2 text-label-sm",
        md: "px-4 pb-3 pt-3 text-label-md",
        lg: "px-5 pb-3 pt-3 text-label-lg",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

/* ── Tabs Root ── */

export interface TabsProps
  extends ComponentPropsWithoutRef<typeof TabsPrimitive.Root> {
  variant?: "primary" | "secondary" | "brand";
  size?: "sm" | "md" | "lg";
}

const Tabs = forwardRef<ElementRef<typeof TabsPrimitive.Root>, TabsProps>(
  ({ variant = "primary", size = "md", className, children, ...props }, ref) => (
    <TabsStyleContext.Provider value={{ variant, size }}>
      <TabsPrimitive.Root
        ref={ref}
        data-slot="tabs"
        className={cn("flex flex-col", className)}
        {...props}
      >
        {children}
      </TabsPrimitive.Root>
    </TabsStyleContext.Provider>
  )
);
Tabs.displayName = "Tabs";

/* ── TabsList ── */

const TabsList = forwardRef<
  ElementRef<typeof TabsPrimitive.List>,
  ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    data-slot="tabs-list"
    className={cn(
      "inline-flex items-center gap-1 border-b border-border-secondary",
      className
    )}
    {...props}
  />
));
TabsList.displayName = "TabsList";

/* ── TabsTrigger ── */

export interface TabsTriggerProps
  extends ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger> {}

const TabsTrigger = forwardRef<
  ElementRef<typeof TabsPrimitive.Trigger>,
  TabsTriggerProps
>(({ className, ...props }, ref) => {
  const { variant, size } = useTabsStyleContext();

  return (
    <TabsPrimitive.Trigger
      ref={ref}
      data-slot="tabs-trigger"
      className={cn(triggerVariants({ variant, size }), className)}
      {...props}
    />
  );
});
TabsTrigger.displayName = "TabsTrigger";

/* ── TabsContent ── */

const TabsContent = forwardRef<
  ElementRef<typeof TabsPrimitive.Content>,
  ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    data-slot="tabs-content"
    className={cn("mt-4 focus-visible:outline-none", className)}
    {...props}
  />
));
TabsContent.displayName = "TabsContent";

export type TabsContentProps = ComponentPropsWithoutRef<typeof TabsPrimitive.Content>;

export { Tabs, TabsList, TabsTrigger, TabsContent, triggerVariants };
