"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { TickSquare } from "react-iconly";

/* ── Pricing Card ── */

const pricingCardVariants = cva(
  "flex flex-col rounded-8 border p-6 transition-all",
  {
    variants: {
      tier: {
        basic: "border-border-primary bg-surface-primary-variant",
        standard: "border-border-primary bg-surface-primary-variant",
        creator: "border-border-brand bg-surface-brand",
        ultimate:
          "border-primary-60 bg-gradient-to-b from-primary-90 to-primary-100 text-white",
      },
      highlighted: {
        true: "ring-2 ring-border-brand shadow-md scale-[1.02]",
        false: "",
      },
    },
    defaultVariants: {
      tier: "basic",
      highlighted: false,
    },
  }
);

export interface PricingFeature {
  label: string;
  included: boolean;
}

export interface PricingCardProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "children">,
    VariantProps<typeof pricingCardVariants> {
  name: string;
  description?: string;
  price: string;
  period?: string;
  features: PricingFeature[];
  cta?: ReactNode;
  badge?: string;
  teams?: boolean;
}

const PricingCard = forwardRef<HTMLDivElement, PricingCardProps>(
  (
    {
      className,
      tier,
      highlighted,
      name,
      description,
      price,
      period = "/month",
      features,
      cta,
      badge,
      teams,
      ...props
    },
    ref
  ) => {
    const isUltimate = tier === "ultimate";
    const isCreator = tier === "creator";

    return (
      <div
        ref={ref}
        data-slot="pricing-card"
        className={cn(pricingCardVariants({ tier, highlighted }), className)}
        {...props}
      >
        {/* Badge */}
        {badge && (
          <span
            className={cn(
              "self-start rounded-full px-3 py-1 text-label-xs font-semibold mb-4",
              isUltimate
                ? "bg-primary-40 text-primary-100"
                : "bg-surface-brand text-content-brand"
            )}
          >
            {badge}
          </span>
        )}

        {/* Plan name */}
        <h3
          className={cn(
            "text-heading-sm font-bold",
            isUltimate ? "text-white" : "text-content-primary"
          )}
        >
          {name}
        </h3>
        {description && (
          <p
            className={cn(
              "text-body-sm mt-1",
              isUltimate
                ? "text-primary-30"
                : isCreator
                ? "text-content-brand"
                : "text-content-secondary"
            )}
          >
            {description}
          </p>
        )}

        {/* Price */}
        <div className="flex items-baseline gap-1 mt-5">
          <span
            className={cn(
              "text-display-xs font-bold",
              isUltimate ? "text-white" : "text-content-primary"
            )}
          >
            {price}
          </span>
          <span
            className={cn(
              "text-body-sm",
              isUltimate ? "text-primary-30" : "text-content-tertiary"
            )}
          >
            {period}
          </span>
        </div>

        {/* Teams badge */}
        {teams && (
          <span
            className={cn(
              "inline-flex items-center gap-1 mt-3 text-label-xs font-medium",
              isUltimate ? "text-primary-30" : "text-content-secondary"
            )}
          >
            Team plan available
          </span>
        )}

        {/* Divider */}
        <div
          className={cn(
            "h-px my-5",
            isUltimate ? "bg-primary-70" : "bg-border-secondary"
          )}
        />

        {/* Features */}
        <ul className="flex flex-col gap-3 flex-1">
          {features.map((f, i) => (
            <li key={i} className="flex items-start gap-2">
              <span
                className={cn(
                  "shrink-0 mt-[2px]",
                  f.included
                    ? isUltimate
                      ? "text-primary-30"
                      : "text-content-success"
                    : "text-content-primary-disabled"
                )}
              >
                {f.included ? (
                  <TickSquare
                    set="bold"
                    primaryColor="currentColor"
                    style={{ width: 16, height: 16 }}
                  />
                ) : (
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M4 8H12"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                )}
              </span>
              <span
                className={cn(
                  "text-body-sm",
                  f.included
                    ? isUltimate
                      ? "text-primary-20"
                      : "text-content-primary"
                    : "text-content-primary-disabled"
                )}
              >
                {f.label}
              </span>
            </li>
          ))}
        </ul>

        {/* CTA */}
        {cta && <div className="mt-6">{cta}</div>}
      </div>
    );
  }
);
PricingCard.displayName = "PricingCard";

/* ── Discount Banner ── */

export interface DiscountBannerProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string;
  code?: string;
  variant?: "default" | "colored" | "colored-purple";
}

function DiscountBanner({
  title,
  description,
  code,
  variant = "default",
  className,
  ...props
}: DiscountBannerProps) {
  const variantClasses = {
    default: "bg-surface-secondary border-border-primary text-content-primary",
    colored: "bg-success-10 border-success-30 text-content-success",
    "colored-purple": "bg-primary-10 border-primary-30 text-content-brand",
  };

  return (
    <div
      data-slot="discount-banner"
      className={cn(
        "flex items-center justify-between gap-4 rounded-4 border px-4 py-3",
        variantClasses[variant],
        className
      )}
      {...props}
    >
      <div className="flex flex-col gap-1">
        <span className="text-label-sm font-semibold">{title}</span>
        {description && (
          <span className="text-body-xs opacity-80">{description}</span>
        )}
      </div>
      {code && (
        <span className="shrink-0 rounded-2 border border-current/20 px-3 py-1 text-label-xs font-mono font-semibold">
          {code}
        </span>
      )}
    </div>
  );
}

export { PricingCard, DiscountBanner, pricingCardVariants };
