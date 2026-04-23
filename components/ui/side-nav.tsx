"use client";

import { cn } from "@/lib/utils";
import {
  useState,
  useCallback,
  type ReactNode,
  type HTMLAttributes,
} from "react";

/* ── Types ── */

export interface SideNavItem {
  label: string;
  href?: string;
  icon?: ReactNode;
  badge?: string | number;
  children?: SideNavItem[];
  active?: boolean;
}

export interface SideNavProps extends HTMLAttributes<HTMLElement> {
  items: SideNavItem[];
  collapsed?: boolean;
  onCollapse?: (collapsed: boolean) => void;
  header?: ReactNode;
  footer?: ReactNode;
}

/* ── NavItem ── */

function NavItem({
  item,
  collapsed,
  depth = 0,
}: {
  item: SideNavItem;
  collapsed: boolean;
  depth?: number;
}) {
  const [expanded, setExpanded] = useState(false);
  const hasChildren = item.children && item.children.length > 0;

  const content = (
    <div
      role="button"
      tabIndex={0}
      title={collapsed ? item.label : undefined}
      onClick={() => {
        if (hasChildren && !collapsed) setExpanded(!expanded);
      }}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          if (hasChildren && !collapsed) setExpanded(!expanded);
        }
      }}
      className={cn(
        "flex items-center gap-3 px-3 py-2 rounded-4 mx-2 transition-colors text-label-sm cursor-pointer",
        item.active
          ? "bg-surface-brand text-content-brand font-medium"
          : "text-content-secondary hover:bg-fill-primary hover:text-content-primary",
        collapsed && "justify-center px-0",
        depth > 0 && !collapsed && "pl-[36px]"
      )}
    >
      {item.icon && (
        <span className="shrink-0 w-[20px] h-[20px] flex items-center justify-center">
          {item.icon}
        </span>
      )}
      {!collapsed && (
        <>
          <span className="flex-1 truncate">{item.label}</span>
          {item.badge !== undefined && (
            <span className="ml-auto text-label-xs bg-fill-brand text-white rounded-full px-[6px] py-[1px]">
              {item.badge}
            </span>
          )}
          {hasChildren && (
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              className={cn(
                "shrink-0 transition-transform",
                expanded && "rotate-90"
              )}
            >
              <path
                d="M6 4l4 4-4 4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </>
      )}
    </div>
  );

  const wrapper =
    item.href && !hasChildren ? (
      <a href={item.href} className="block no-underline">
        {content}
      </a>
    ) : (
      content
    );

  return (
    <li className="list-none">
      {wrapper}
      {hasChildren && expanded && !collapsed && (
        <ul className="mt-0.5">
          {item.children!.map((child, i) => (
            <NavItem key={i} item={child} collapsed={collapsed} depth={depth + 1} />
          ))}
        </ul>
      )}
    </li>
  );
}

/* ── SideNav ── */

function SideNav({
  className,
  items,
  collapsed: controlledCollapsed,
  onCollapse,
  header,
  footer,
  ...props
}: SideNavProps) {
  const [internalCollapsed, setInternalCollapsed] = useState(false);
  const collapsed = controlledCollapsed ?? internalCollapsed;

  const toggleCollapse = useCallback(() => {
    const next = !collapsed;
    setInternalCollapsed(next);
    onCollapse?.(next);
  }, [collapsed, onCollapse]);

  return (
    <nav
      data-slot="side-nav"
      className={cn(
        "h-full flex flex-col border-r border-border-secondary bg-surface-primary-variant transition-all duration-200",
        collapsed ? "w-[60px]" : "w-[240px]",
        className
      )}
      {...props}
    >
      {/* Header */}
      {header && (
        <div className={cn("shrink-0 px-3 py-3", collapsed && "px-1")}>
          {header}
        </div>
      )}

      {/* Nav items */}
      <ul className="flex-1 overflow-y-auto py-2">
        {items.map((item, i) => (
          <NavItem key={i} item={item} collapsed={collapsed} />
        ))}
      </ul>

      {/* Footer */}
      {footer && (
        <div className={cn("shrink-0 px-3 py-3", collapsed && "px-1")}>
          {footer}
        </div>
      )}

      {/* Collapse toggle */}
      <div className="shrink-0 border-t border-border-secondary p-2 flex justify-center">
        <button
          type="button"
          onClick={toggleCollapse}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          className={cn(
            "flex items-center justify-center w-[32px] h-[32px] rounded-4 transition-colors",
            "text-content-secondary hover:bg-fill-primary hover:text-content-primary",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus focus-visible:ring-offset-2"
          )}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            className={cn(
              "transition-transform",
              collapsed && "rotate-180"
            )}
          >
            <path
              d="M10 4l-4 4 4 4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </nav>
  );
}

SideNav.displayName = "SideNav";

export { SideNav };
