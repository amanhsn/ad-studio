"use client";

import { cn } from "@/lib/utils";
import {
  createContext,
  useContext,
  useState,
  useRef,
  useEffect,
  type ReactNode,
  type HTMLAttributes,
} from "react";

/* ── Context ── */

interface MenuButtonContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
}

const MenuButtonContext = createContext<MenuButtonContextValue | null>(null);

function useMenuButton() {
  const ctx = useContext(MenuButtonContext);
  if (!ctx) throw new Error("MenuButton compound components must be used within <MenuButton>");
  return ctx;
}

/* ── Root ── */

export interface MenuButtonProps {
  children: ReactNode;
}

function MenuButton({ children }: MenuButtonProps) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);

  return (
    <MenuButtonContext.Provider value={{ open, setOpen, triggerRef }}>
      <div data-slot="menu-button" className="relative inline-block">{children}</div>
    </MenuButtonContext.Provider>
  );
}

/* ── Trigger ── */

export interface MenuButtonTriggerProps extends HTMLAttributes<HTMLButtonElement> {}

function MenuButtonTrigger({
  className,
  children,
  ...props
}: MenuButtonTriggerProps) {
  const { open, setOpen, triggerRef } = useMenuButton();

  return (
    <button
      ref={triggerRef}
      type="button"
      aria-expanded={open}
      aria-haspopup="menu"
      onClick={() => setOpen(!open)}
      className={cn(
        "inline-flex items-center gap-2 rounded-full ring-1 ring-inset ring-border-primary bg-surface-primary-variant px-4 py-2 text-label-sm font-medium text-content-primary hover:bg-fill-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus focus-visible:ring-offset-2",
        className
      )}
      {...props}
    >
      {children}
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        className={cn("transition-transform duration-200", open && "rotate-180")}
      >
        <path
          d="M4 6l4 4 4-4"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}

/* ── Content ── */

export interface MenuButtonContentProps extends HTMLAttributes<HTMLDivElement> {
  align?: "start" | "center" | "end";
}

function MenuButtonContent({
  className,
  align = "start",
  children,
  ...props
}: MenuButtonContentProps) {
  const { open, setOpen, triggerRef } = useMenuButton();
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        contentRef.current &&
        !contentRef.current.contains(target) &&
        triggerRef.current &&
        !triggerRef.current.contains(target)
      ) {
        setOpen(false);
      }
    };
    const handleEscape = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open, setOpen, triggerRef]);

  if (!open) return null;

  const alignClasses = {
    start: "left-0",
    center: "left-1/2 -translate-x-1/2",
    end: "right-0",
  };

  return (
    <div
      ref={contentRef}
      role="menu"
      className={cn(
        "absolute z-50 mt-1 min-w-[180px] overflow-hidden rounded-4 border border-border-primary bg-surface-elevated shadow-md py-1",
        alignClasses[align],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

/* ── Item ── */

export interface MenuButtonItemProps extends HTMLAttributes<HTMLDivElement> {
  disabled?: boolean;
  destructive?: boolean;
  onSelect?: () => void;
  icon?: ReactNode;
}

function MenuButtonItem({
  className,
  disabled,
  destructive,
  onSelect,
  icon,
  children,
  ...props
}: MenuButtonItemProps) {
  const { setOpen } = useMenuButton();

  return (
    <div
      role="menuitem"
      tabIndex={disabled ? -1 : 0}
      aria-disabled={disabled}
      onClick={() => {
        if (disabled) return;
        onSelect?.();
        setOpen(false);
      }}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          if (!disabled) {
            onSelect?.();
            setOpen(false);
          }
        }
      }}
      className={cn(
        "flex cursor-pointer items-center gap-3 px-4 py-2 text-body-sm transition-colors outline-none",
        "hover:bg-fill-primary focus-visible:bg-fill-primary",
        destructive ? "text-content-error" : "text-content-primary",
        disabled && "cursor-not-allowed text-content-primary-disabled",
        className
      )}
      {...props}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      {children}
    </div>
  );
}

/* ── Separator ── */

function MenuButtonSeparator({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      role="separator"
      className={cn("my-1 h-px bg-border-secondary", className)}
      {...props}
    />
  );
}

export {
  MenuButton,
  MenuButtonTrigger,
  MenuButtonContent,
  MenuButtonItem,
  MenuButtonSeparator,
};
