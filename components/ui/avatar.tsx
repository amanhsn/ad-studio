"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { User } from "react-iconly";

const avatarVariants = cva(
  "relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-fill-secondary font-medium text-content-secondary",
  {
    variants: {
      size: {
        sm: "h-7 w-7 text-label-xs",
        md: "h-9 w-9 text-label-sm",
        lg: "h-11 w-11 text-label-md",
        xl: "h-14 w-14 text-label-lg",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

export interface AvatarProps
  extends VariantProps<typeof avatarVariants> {
  src?: string;
  alt?: string;
  name?: string;
  className?: string;
}

function getInitials(name: string) {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0][0]?.toUpperCase() ?? "";
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

const fallbackIconSize: Record<string, number> = {
  sm: 14,
  md: 18,
  lg: 22,
  xl: 28,
};

function Avatar({ className, size = "md", src, alt, name }: AvatarProps) {
  const [imgError, setImgError] = useState(false);

  return (
    <span data-slot="avatar" className={cn(avatarVariants({ size }), className)}>
      {src && !imgError ? (
        <img
          src={src}
          alt={alt ?? name ?? ""}
          onError={() => setImgError(true)}
          className="h-full w-full object-cover"
        />
      ) : name ? (
        <span aria-label={name}>{getInitials(name)}</span>
      ) : (
        <User
          set="bold"
          primaryColor="currentColor"
          style={{ width: fallbackIconSize[size ?? "md"], height: fallbackIconSize[size ?? "md"] }}
        />
      )}
    </span>
  );
}

export { Avatar, avatarVariants };
