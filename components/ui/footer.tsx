"use client";

import { cn } from "@/lib/utils";
import { forwardRef, type HTMLAttributes, type ReactNode } from "react";

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterSection {
  title: string;
  links: FooterLink[];
}

export interface FooterProps extends HTMLAttributes<HTMLElement> {
  brand?: ReactNode;
  description?: string;
  sections?: FooterSection[];
  socialLinks?: { icon: ReactNode; href: string; label: string }[];
  copyright?: string;
  bottomLinks?: FooterLink[];
}

const Footer = forwardRef<HTMLElement, FooterProps>(
  (
    {
      className,
      brand,
      description,
      sections = [],
      socialLinks,
      copyright,
      bottomLinks,
      ...props
    },
    ref
  ) => {
    return (
      <footer
        ref={ref}
        data-slot="footer"
        className={cn(
          "border-t border-border-secondary bg-surface-primary-variant px-6 py-12 sm:px-12",
          className
        )}
        {...props}
      >
        <div className="mx-auto max-w-[1200px]">
          {/* Top section */}
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_2fr]">
            {/* Brand column */}
            <div className="flex flex-col gap-4">
              {brand}
              {description && (
                <p className="text-body-sm text-content-secondary max-w-[280px]">
                  {description}
                </p>
              )}
              {socialLinks && (
                <div className="flex items-center gap-3 mt-2">
                  {socialLinks.map((link, i) => (
                    <a
                      key={i}
                      href={link.href}
                      aria-label={link.label}
                      className="flex items-center justify-center w-[32px] h-[32px] rounded-full text-content-secondary hover:text-content-primary hover:bg-fill-primary transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {link.icon}
                    </a>
                  ))}
                </div>
              )}
            </div>

            {/* Link sections */}
            {sections.length > 0 && (
              <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-4">
                {sections.map((section) => (
                  <div key={section.title} className="flex flex-col gap-3">
                    <h4 className="text-label-sm font-semibold text-content-primary">
                      {section.title}
                    </h4>
                    <ul className="flex flex-col gap-2">
                      {section.links.map((link) => (
                        <li key={link.href}>
                          <a
                            href={link.href}
                            className="text-body-sm text-content-secondary hover:text-content-primary transition-colors"
                          >
                            {link.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Bottom bar */}
          {(copyright || bottomLinks) && (
            <>
              <div className="h-px bg-border-secondary my-8" />
              <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
                {copyright && (
                  <p className="text-body-xs text-content-tertiary">
                    {copyright}
                  </p>
                )}
                {bottomLinks && (
                  <div className="flex items-center gap-4">
                    {bottomLinks.map((link) => (
                      <a
                        key={link.href}
                        href={link.href}
                        className="text-body-xs text-content-tertiary hover:text-content-primary transition-colors"
                      >
                        {link.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </footer>
    );
  }
);
Footer.displayName = "Footer";

export { Footer };
