"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, type ReactNode } from "react";
import { useSidebar } from "./sidebar-context";

/* ── Inline SVG icons ── */

const IconHome = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 7.5L10 2.5L17 7.5V16A1.5 1.5 0 0115.5 17.5H4.5A1.5 1.5 0 013 16V7.5Z" />
    <path d="M7.5 17.5V10H12.5V17.5" />
  </svg>
);

const IconBrand = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="10" cy="10" r="7.5" />
    <circle cx="7.5" cy="8.5" r="1" />
    <circle cx="10" cy="6.5" r="1" />
    <circle cx="12.5" cy="8.5" r="1" />
  </svg>
);

const IconComponents = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2.5" y="2.5" width="6" height="6" rx="1.5" />
    <rect x="11.5" y="2.5" width="6" height="6" rx="1.5" />
    <rect x="2.5" y="11.5" width="6" height="6" rx="1.5" />
    <rect x="11.5" y="11.5" width="6" height="6" rx="1.5" />
  </svg>
);

const IconTokens = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10 2L2 6.5L10 11L18 6.5L10 2Z" />
    <path d="M2 13.5L10 18L18 13.5" />
    <path d="M2 10L10 14.5L18 10" />
  </svg>
);

/* ── Types ── */

interface NavItem {
  label: string;
  href?: string;
  icon: ReactNode;
  children?: { label: string; href: string }[];
}

/* ── Navigation structure ── */

const navItems: NavItem[] = [
  {
    label: "Home",
    href: "/",
    icon: <IconHome />,
  },
  {
    label: "Brand Assets",
    icon: <IconBrand />,
    children: [
      { label: "Logo & Icon", href: "/brand" },
      { label: "Colors", href: "/colors" },
      { label: "Typography", href: "/typography" },
    ],
  },
  {
    label: "Components",
    href: "/components",
    icon: <IconComponents />,
  },
  {
    label: "Tokens",
    href: "/tokens",
    icon: <IconTokens />,
  },
];

/* ── Sidebar ── */

export function Sidebar() {
  const pathname = usePathname();
  const { collapsed, toggle, mobileOpen, setMobileOpen } = useSidebar();

  // Close mobile sidebar on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname, setMobileOpen]);

  return (
    <>
      {/* Backdrop overlay — mobile only */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside
        className={cn(
          "fixed top-0 left-0 z-50 flex h-screen flex-col border-r border-border-secondary bg-surface-primary-variant transition-all duration-200 ease-out",
          collapsed ? "lg:w-[60px]" : "lg:w-[240px]",
          "w-[260px]",
          mobileOpen
            ? "translate-x-0"
            : "-translate-x-full lg:translate-x-0"
        )}
      >
        {/* Logo area */}
        <div
          className={cn(
            "flex items-center shrink-0 h-[56px] transition-all duration-200",
            collapsed ? "lg:justify-center lg:px-0 px-4" : "px-4"
          )}
        >
          <Link href="/" className="flex items-center gap-3 shrink-0">
            <Image
              src="/brand/logo-color.png"
              alt="Imagine Art"
              width={28}
              height={28}
              className="shrink-0 rounded-2"
            />
            <span
              className={cn(
                "text-label-md font-bold text-content-primary whitespace-nowrap transition-opacity duration-200",
                collapsed
                  ? "lg:hidden lg:opacity-0 opacity-100"
                  : "opacity-100"
              )}
            >
              Imagine Art
            </span>
          </Link>
          {/* Close button — mobile only */}
          <button
            onClick={() => setMobileOpen(false)}
            className="flex items-center justify-center w-[32px] h-[32px] rounded-4 text-content-secondary hover:bg-fill-primary transition-colors lg:hidden ml-auto"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M4.5 4.5L13.5 13.5M13.5 4.5L4.5 13.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Divider */}
        <div
          className={cn(
            "h-px bg-border-secondary transition-all duration-200",
            collapsed ? "lg:mx-2 mx-4" : "mx-4"
          )}
        />

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-3 px-2">
          <ul className="flex flex-col gap-0.5">
            {navItems.map((item) => (
              <NavItemComponent
                key={item.label}
                item={item}
                pathname={pathname}
                collapsed={collapsed}
                isMobile={mobileOpen}
              />
            ))}
          </ul>
        </nav>

        {/* Bottom section */}
        <div className="shrink-0 px-2 pb-3 flex flex-col gap-0.5">
          <div
            className={cn(
              "mb-2 h-px bg-border-secondary transition-all duration-200",
              collapsed ? "lg:mx-0 mx-2" : "mx-2"
            )}
          />
          <ThemeToggle collapsed={collapsed} isMobile={mobileOpen} />

          {/* Collapse toggle — desktop only */}
          <button
            onClick={toggle}
            title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            className={cn(
              "hidden lg:flex items-center rounded-4 py-[10px] text-label-sm text-content-secondary hover:bg-fill-primary hover:text-content-primary transition-colors",
              collapsed ? "justify-center px-0" : "gap-3 px-3"
            )}
          >
            <span
              className={cn(
                "shrink-0 w-[20px] h-[20px] flex items-center justify-center transition-transform duration-200",
                collapsed && "rotate-180"
              )}
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M11 4.5L6.5 9L11 13.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            {!collapsed && <span>Collapse</span>}
          </button>
        </div>
      </aside>
    </>
  );
}

/* ── Mobile header bar ── */

export function MobileHeader() {
  const { setMobileOpen } = useSidebar();

  return (
    <header className="sticky top-0 z-30 flex items-center gap-3 border-b border-border-secondary bg-surface-primary-variant px-4 h-[56px] lg:hidden">
      <button
        onClick={() => setMobileOpen(true)}
        className="flex items-center justify-center w-[36px] h-[36px] rounded-4 text-content-secondary hover:bg-fill-primary transition-colors"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M3 5H17M3 10H17M3 15H17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>
      <Link href="/" className="flex items-center gap-2">
        <Image
          src="/brand/logo-color.png"
          alt="Imagine Art"
          width={24}
          height={24}
          className="rounded-2"
        />
        <span className="text-label-md font-bold text-content-primary">
          Imagine Art
        </span>
      </Link>
    </header>
  );
}

/* ── NavItem component ── */

function NavItemComponent({
  item,
  pathname,
  collapsed,
  isMobile,
}: {
  item: NavItem;
  pathname: string;
  collapsed: boolean;
  isMobile: boolean;
}) {
  const isActive =
    item.href === "/"
      ? pathname === "/"
      : item.href
      ? pathname.startsWith(item.href)
      : item.children?.some((c) => pathname.startsWith(c.href));

  const [expanded, setExpanded] = useState(!!isActive);

  const showLabels = isMobile || !collapsed;

  if (item.href) {
    return (
      <li>
        <Link
          href={item.href}
          title={collapsed && !isMobile ? item.label : undefined}
          className={cn(
            "flex items-center rounded-4 py-[10px] text-label-sm font-medium transition-colors",
            isActive
              ? "bg-surface-brand text-content-brand"
              : "text-content-secondary hover:bg-fill-primary hover:text-content-primary",
            collapsed && !isMobile ? "justify-center px-0" : "gap-3 px-3"
          )}
        >
          <span className="shrink-0 w-[20px] h-[20px] flex items-center justify-center">
            {item.icon}
          </span>
          {showLabels && (
            <span className="whitespace-nowrap">{item.label}</span>
          )}
        </Link>
      </li>
    );
  }

  return (
    <li>
      <button
        onClick={() => {
          if (showLabels) setExpanded(!expanded);
        }}
        title={collapsed && !isMobile ? item.label : undefined}
        className={cn(
          "flex w-full items-center rounded-4 py-[10px] text-label-sm font-medium transition-colors",
          isActive
            ? "text-content-brand"
            : "text-content-secondary hover:bg-fill-primary hover:text-content-primary",
          collapsed && !isMobile ? "justify-center px-0" : "gap-3 px-3"
        )}
      >
        <span className="shrink-0 w-[20px] h-[20px] flex items-center justify-center">
          {item.icon}
        </span>
        {showLabels && (
          <>
            <span className="flex-1 text-left whitespace-nowrap">
              {item.label}
            </span>
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              className={cn(
                "shrink-0 text-content-tertiary transition-transform duration-200",
                expanded && "rotate-180"
              )}
            >
              <path
                d="M4 6L8 10L12 6"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </>
        )}
      </button>
      {showLabels && expanded && item.children && (
        <ul className="ml-[32px] mt-0.5 flex flex-col gap-0.5 border-l border-border-secondary pl-3">
          {item.children.map((child) => {
            const childActive = pathname === child.href;
            return (
              <li key={child.href}>
                <Link
                  href={child.href}
                  className={cn(
                    "flex items-center rounded-2 px-3 py-[7px] text-label-sm transition-colors",
                    childActive
                      ? "text-content-brand font-medium"
                      : "text-content-secondary hover:text-content-primary"
                  )}
                >
                  {child.label}
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </li>
  );
}

/* ── Theme toggle ── */

function ThemeToggle({
  collapsed,
  isMobile,
}: {
  collapsed: boolean;
  isMobile: boolean;
}) {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
  }, []);

  const toggleTheme = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
  };

  const showLabel = isMobile || !collapsed;

  return (
    <button
      onClick={toggleTheme}
      title={collapsed && !isMobile ? (dark ? "Dark Mode" : "Light Mode") : undefined}
      className={cn(
        "flex items-center rounded-4 py-[10px] text-label-sm text-content-secondary hover:bg-fill-primary hover:text-content-primary transition-colors",
        collapsed && !isMobile ? "justify-center px-0" : "gap-3 px-3"
      )}
    >
      <span className="shrink-0 w-[20px] h-[20px] flex items-center justify-center">
        {dark ? <MoonIcon /> : <SunIcon />}
      </span>
      {showLabel && <span>{dark ? "Dark Mode" : "Light Mode"}</span>}
    </button>
  );
}

/* ── Sun / Moon icons ── */

function SunIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <circle cx="9" cy="9" r="3" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M9 2.5V4M9 14V15.5M15.5 9H14M4 9H2.5M13.6 4.4L12.5 5.5M5.5 12.5L4.4 13.6M13.6 13.6L12.5 12.5M5.5 5.5L4.4 4.4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path
        d="M15.5 10A6.5 6.5 0 018 2.5 6.5 6.5 0 1015.5 10z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
