"use client";

import { cn } from "@/lib/utils";
import { type HTMLAttributes } from "react";

export interface StepItem {
  label: string;
  description?: string;
}

export interface StepperProps extends HTMLAttributes<HTMLDivElement> {
  steps: StepItem[];
  activeStep: number;
  orientation?: "vertical" | "horizontal";
}

function Stepper({
  steps,
  activeStep,
  orientation = "vertical",
  className,
  ...props
}: StepperProps) {
  if (orientation === "horizontal") {
    return (
      <div
        data-slot="stepper"
        className={cn("flex items-start w-full", className)}
        {...props}
      >
        {steps.map((step, index) => {
          const isCompleted = index < activeStep;
          const isActive = index === activeStep;
          const isLast = index === steps.length - 1;

          return (
            <div
              key={index}
              className={cn("flex items-center", !isLast && "flex-1")}
            >
              <div className="flex flex-col items-center gap-1">
                {/* Circle */}
                <div
                  className={cn(
                    "flex h-[32px] w-[32px] shrink-0 items-center justify-center rounded-full border-2 text-label-sm font-semibold transition-colors",
                    isCompleted &&
                      "border-fill-brand bg-fill-brand text-white",
                    isActive &&
                      "border-border-brand bg-surface-brand text-content-brand",
                    !isCompleted &&
                      !isActive &&
                      "border-border-primary bg-surface-primary-variant text-content-tertiary"
                  )}
                >
                  {isCompleted ? (
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path
                        d="M2.5 7.5L5.5 10.5L11.5 3.5"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  ) : (
                    index + 1
                  )}
                </div>
                {/* Label & Description */}
                <div className="flex flex-col items-center text-center mt-1">
                  <span
                    className={cn(
                      "text-label-sm font-medium",
                      isActive
                        ? "text-content-primary"
                        : "text-content-secondary"
                    )}
                  >
                    {step.label}
                  </span>
                  {step.description && (
                    <span className="text-body-xs text-content-tertiary">
                      {step.description}
                    </span>
                  )}
                </div>
              </div>
              {/* Connector line */}
              {!isLast && (
                <div
                  className={cn(
                    "mx-2 h-[2px] flex-1 self-[center] mt-[15px]",
                    isCompleted ? "bg-fill-brand" : "bg-border-primary"
                  )}
                  style={{ alignSelf: "flex-start", marginTop: 15 }}
                />
              )}
            </div>
          );
        })}
      </div>
    );
  }

  /* ── Vertical layout ── */
  return (
    <div data-slot="stepper" className={cn("flex flex-col", className)} {...props}>
      {steps.map((step, index) => {
        const isCompleted = index < activeStep;
        const isActive = index === activeStep;
        const isLast = index === steps.length - 1;

        return (
          <div key={index} className="flex gap-3">
            {/* Left column: circle + connector */}
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  "flex h-[32px] w-[32px] shrink-0 items-center justify-center rounded-full border-2 text-label-sm font-semibold transition-colors",
                  isCompleted &&
                    "border-fill-brand bg-fill-brand text-white",
                  isActive &&
                    "border-border-brand bg-surface-brand text-content-brand",
                  !isCompleted &&
                    !isActive &&
                    "border-border-primary bg-surface-primary-variant text-content-tertiary"
                )}
              >
                {isCompleted ? (
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path
                      d="M2.5 7.5L5.5 10.5L11.5 3.5"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ) : (
                  index + 1
                )}
              </div>
              {/* Connector line */}
              {!isLast && (
                <div
                  className={cn(
                    "w-[2px] flex-1 min-h-[24px]",
                    isCompleted ? "bg-fill-brand" : "bg-border-primary"
                  )}
                />
              )}
            </div>
            {/* Right column: label + description */}
            <div className={cn("flex flex-col pb-6", isLast && "pb-0")}>
              <span
                className={cn(
                  "text-label-sm font-medium leading-[32px]",
                  isActive
                    ? "text-content-primary"
                    : "text-content-secondary"
                )}
              >
                {step.label}
              </span>
              {step.description && (
                <span className="text-body-xs text-content-tertiary">
                  {step.description}
                </span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

Stepper.displayName = "Stepper";

export { Stepper };
