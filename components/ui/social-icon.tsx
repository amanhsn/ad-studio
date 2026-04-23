"use client";

import { cn } from "@/lib/utils";
import { forwardRef, type HTMLAttributes } from "react";

export type SocialPlatform =
  | "facebook"
  | "twitter"
  | "instagram"
  | "linkedin"
  | "youtube"
  | "github"
  | "discord"
  | "tiktok"
  | "dribbble"
  | "behance"
  | "spotify"
  | "twitch"
  | "reddit"
  | "pinterest"
  | "snapchat";

export interface SocialIconProps extends HTMLAttributes<HTMLAnchorElement> {
  platform: SocialPlatform;
  href?: string;
  size?: "sm" | "md" | "lg";
  variant?: "default" | "filled";
}

const sizeMap = {
  sm: 24,
  md: 32,
  lg: 40,
} as const;

const platformPaths: Record<SocialPlatform, React.ReactNode> = {
  facebook: (
    <path
      d="M9.5 2H11v3h-1.5c-.6 0-1 .4-1 1v1.5H11l-.5 2.5H8.5V15H6V10H4.5V7.5H6V5.5C6 3.6 7.6 2 9.5 2z"
      fill="currentColor"
    />
  ),
  twitter: (
    <path
      d="M3 3l4.3 5.7L3 13h1.2l3.6-3.6L10.5 13H14l-4.5-6L13.5 3h-1.2L9 6.3 6.5 3H3zm1.8 1h1.6l6.8 8h-1.6L4.8 4z"
      fill="currentColor"
    />
  ),
  instagram: (
    <>
      <rect
        x="2.5"
        y="2.5"
        width="11"
        height="11"
        rx="3"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
      />
      <circle
        cx="8"
        cy="8"
        r="2.5"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
      />
      <circle cx="11.5" cy="4.5" r="0.8" fill="currentColor" />
    </>
  ),
  linkedin: (
    <path
      d="M3 6h2v8H3V6zm1-1a1 1 0 110-2 1 1 0 010 2zm3 1h2v1.1C9.4 6.4 10.2 6 11.2 6 13 6 13.5 7.2 13.5 9v5h-2V9.4c0-.8-.4-1.4-1.2-1.4-.8 0-1.3.6-1.3 1.4V14H7V6z"
      fill="currentColor"
    />
  ),
  youtube: (
    <>
      <rect
        x="1.5"
        y="3.5"
        width="13"
        height="9"
        rx="3"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
      />
      <path d="M6.5 5.5l4 2.5-4 2.5V5.5z" fill="currentColor" />
    </>
  ),
  github: (
    <path
      d="M8 1.5C4.4 1.5 1.5 4.4 1.5 8c0 2.9 1.9 5.3 4.4 6.2.3.1.4-.1.4-.3v-1c-1.8.4-2.2-.9-2.2-.9-.3-.7-.7-1-.7-1-.6-.4 0-.4 0-.4.6 0 1 .7 1 .7.6 1 1.5.7 1.9.5 0-.4.2-.7.4-.9-1.4-.2-2.9-.7-2.9-3.2 0-.7.3-1.3.7-1.8-.1-.1-.3-.8.1-1.7 0 0 .5-.2 1.8.7.5-.1 1.1-.2 1.6-.2s1.1.1 1.6.2c1.2-.9 1.8-.7 1.8-.7.4.9.2 1.6.1 1.7.4.5.7 1.1.7 1.8 0 2.5-1.5 3-2.9 3.2.2.2.4.6.4 1.2v1.8c0 .2.1.4.4.3 2.6-.9 4.4-3.3 4.4-6.2C14.5 4.4 11.6 1.5 8 1.5z"
      fill="currentColor"
    />
  ),
  discord: (
    <path
      d="M6.1 5.5c-.5 0-.9.4-.9 1s.4 1 .9 1c.5 0 .9-.4.9-1s-.4-1-.9-1zm3.8 0c-.5 0-.9.4-.9 1s.4 1 .9 1c.5 0 .9-.4.9-1s-.4-1-.9-1zM13 1.5H3c-.8 0-1.5.7-1.5 1.5v8.5c0 .8.7 1.5 1.5 1.5h8.5l-.4-1.4 1 .9.9.8L14.5 15V3c0-.8-.7-1.5-1.5-1.5zM10 10.2s-.3-.3-.5-.6c1-.3 1.4-1 1.4-1-.3.2-.6.4-1 .5-.4.2-.8.3-1.2.3-.8.2-1.5.1-2.2 0-.5-.1-.9-.3-1.2-.5-.2-.1-.4-.2-.6-.3l-.1-.1c0 0-.1 0-.1-.1.4-.2.7-.5.7-.5L4.6 9c-.4.5-1 1.6-1 1.6 2.1 0 3.8-1 3.8-1l.3.3c-1 .4-1.8.4-2.4.3-.7-.1-1.2-.3-1.6-.6"
      fill="currentColor"
    />
  ),
  tiktok: (
    <path
      d="M10.5 2v6.5c0 1.4-1.1 2.5-2.5 2.5S5.5 9.9 5.5 8.5 6.6 6 8 6v2c-.6 0-1 .4-1 .5s.4 1 1 1 1-.4 1-1V2h1.5zm1 1c.5 1 1.5 1.5 2.5 1.5v2c-1 0-2-.4-2.5-1v3c0 2.2-1.8 4-4 4s-4-1.8-4-4 1.8-4 4-4v2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2V3h1z"
      fill="currentColor"
    />
  ),
  dribbble: (
    <>
      <circle
        cx="8"
        cy="8"
        r="6"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
      />
      <path
        d="M2.5 6.5c2 .5 4 .5 5.5 0s3-1.5 4.5-3M2.5 9.5c1.5-.5 3-1 5-.5s3.5 1.5 5 2.5M8 2c-1 2-1.5 4-1 6s1.5 3.5 2.5 5"
        stroke="currentColor"
        strokeWidth="1.2"
        fill="none"
      />
    </>
  ),
  behance: (
    <>
      <path
        d="M1.5 4h3.2c1.3 0 2 .8 2 1.7 0 .6-.3 1.1-.8 1.4.7.3 1.1.9 1.1 1.6 0 1.1-.9 1.8-2.2 1.8H1.5V4zm2.9 2.7c.4 0 .7-.3.7-.6 0-.4-.3-.6-.7-.6H3v1.2h1.4zm.2 2.8c.5 0 .8-.3.8-.7 0-.4-.3-.7-.8-.7H3v1.4h1.6z"
        fill="currentColor"
      />
      <path
        d="M9.5 10.7c.5.3 1 .4 1.6.4.6 0 1.1-.2 1.4-.5h1.4c-.5 1-1.5 1.6-2.8 1.6-1.8 0-3.1-1.3-3.1-3.1s1.3-3.1 3.1-3.1 2.9 1.3 2.9 3.1v.5H9.5c.1.5.4.8.9 1.1zM12 8.4c-.1-.5-.5-.9-1.1-.9-.6 0-1 .4-1.1.9H12z"
        fill="currentColor"
      />
      <path
        d="M9 4.5h3v1H9v-1z"
        fill="currentColor"
      />
    </>
  ),
  spotify: (
    <>
      <circle
        cx="8"
        cy="8"
        r="6"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
      />
      <path
        d="M4.5 6.5c2-.5 4.5-.3 6.5.5M5 8.5c1.5-.4 3.5-.3 5 .4M5.5 10.5c1.2-.3 2.8-.2 4 .3"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        fill="none"
      />
    </>
  ),
  twitch: (
    <path
      d="M3 2L2 4.5v8h3V14h1.5l1.5-1.5 2.5 1.5H14V4L13 2H3zm9 6.5l-2 2H7.5L6 12v-1.5H3.5V3.5h8.5v5zM10 5v3h-1V5h1zM7.5 5v3h-1V5h1z"
      fill="currentColor"
    />
  ),
  reddit: (
    <>
      <circle
        cx="8"
        cy="8"
        r="6"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
      />
      <circle cx="6" cy="7.5" r="0.8" fill="currentColor" />
      <circle cx="10" cy="7.5" r="0.8" fill="currentColor" />
      <path
        d="M5.5 9.5c.5.8 1.5 1.2 2.5 1.2s2-.4 2.5-1.2"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="12" cy="5" r="0.6" fill="currentColor" />
      <path
        d="M8 3v2.5M8 5.5c1 0 3-.5 4-.5"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        fill="none"
      />
    </>
  ),
  pinterest: (
    <path
      d="M8 1.5C4.4 1.5 1.5 4.4 1.5 8c0 2.7 1.6 5 4 6-.1-.5-.1-1.3 0-1.9l.7-3s-.2-.4-.2-.9c0-.8.5-1.5 1.1-1.5.5 0 .8.4.8.8 0 .5-.3 1.2-.5 1.9-.1.6.3 1.1.9 1.1 1.1 0 2-1.2 2-2.9 0-1.5-1.1-2.6-2.6-2.6-1.8 0-2.9 1.3-2.9 2.7 0 .5.2 1.1.4 1.4.1.1.1.1 0 .2l-.2.6c0 .1-.1.2-.3.1-.8-.4-1.3-1.5-1.3-2.4 0-2 1.4-3.8 4.1-3.8 2.2 0 3.8 1.6 3.8 3.6 0 2.2-1.3 3.9-3.2 3.9-.6 0-1.2-.3-1.4-.7l-.4 1.5c-.1.5-.5 1.2-.7 1.5.6.2 1.1.3 1.7.3 3.6 0 6.5-2.9 6.5-6.5S11.6 1.5 8 1.5z"
      fill="currentColor"
    />
  ),
  snapchat: (
    <path
      d="M8 2c1.3 0 2.3.6 2.8 1.6.3.5.3 1.4.2 2.1l.1.1c.3-.1.7-.1.9.1.2.2.2.5.1.7-.2.4-.6.5-.9.6-.1 0-.2.1-.2.1 0 .2.2.6.5 1 .5.6 1.1.8 1.3.9.2.1.3.2.3.3 0 .2-.1.4-.4.5-.4.2-1 .3-1.3.3-.1.1-.2.4-.3.6-.1.2-.2.3-.4.3-.2 0-.5-.1-.9-.2-.4-.1-.9-.2-1.5-.1-.5.1-1 .3-1.4.7-.5.4-.9.6-1.3.6-.1 0-.3-.1-.4-.3-.1-.2-.2-.5-.3-.6-.3-.1-.9-.1-1.3-.3-.3-.2-.4-.3-.4-.5 0-.2.1-.3.3-.3.2-.1.8-.3 1.3-.9.3-.4.5-.8.5-1 0-.1-.1-.1-.2-.1-.3-.1-.7-.2-.9-.6-.1-.2-.1-.5.1-.7.2-.2.6-.2.9-.1h.1c-.1-.7-.1-1.6.2-2.1C5.7 2.6 6.7 2 8 2z"
      fill="currentColor"
    />
  ),
};

const SocialIcon = forwardRef<HTMLAnchorElement, SocialIconProps>(
  (
    {
      platform,
      href,
      size = "md",
      variant = "default",
      className,
      ...props
    },
    ref
  ) => {
    const px = sizeMap[size];
    const iconSize = size === "sm" ? 14 : size === "md" ? 16 : 20;

    if (variant === "filled") {
      return (
        <a
          ref={ref}
          href={href}
          target={href ? "_blank" : undefined}
          rel={href ? "noopener noreferrer" : undefined}
          data-slot="social-icon"
          className={cn(
            "inline-flex items-center justify-center rounded-full transition-colors",
            "bg-fill-primary text-content-secondary hover:text-content-primary hover:bg-fill-primary-active",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus",
            className
          )}
          style={{ width: px, height: px }}
          aria-label={platform}
          {...props}
        >
          <svg
            width={iconSize}
            height={iconSize}
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {platformPaths[platform]}
          </svg>
        </a>
      );
    }

    return (
      <a
        ref={ref}
        href={href}
        target={href ? "_blank" : undefined}
        rel={href ? "noopener noreferrer" : undefined}
        data-slot="social-icon"
        className={cn(
          "inline-flex items-center justify-center transition-colors",
          "text-content-secondary hover:text-content-primary",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus focus-visible:rounded-2",
          className
        )}
        style={{ width: px, height: px }}
        aria-label={platform}
        {...props}
      >
        <svg
          width={iconSize}
          height={iconSize}
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {platformPaths[platform]}
        </svg>
      </a>
    );
  }
);
SocialIcon.displayName = "SocialIcon";

export { SocialIcon };
