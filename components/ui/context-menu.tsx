"use client";

import { cn } from "@/lib/utils";
import {
  createContext,
  useContext,
  useState,
  useRef,
  useEffect,
  useCallback,
  type ReactNode,
  type HTMLAttributes,
} from "react";

/* ── Context ── */

interface ContextMenuContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
  position: { x: number; y: number };
  setPosition: (pos: { x: number; y: number }) => void;
}

const ContextMenuCtx = createContext<ContextMenuContextValue | null>(null);

function useContextMenu() {
  const ctx = useContext(ContextMenuCtx);
  if (!ctx)
    throw new Error(
      "ContextMenu compound components must be used within <ContextMenu>"
    );
  return ctx;
}

/* ── Root ── */

export interface ContextMenuProps {
  children: ReactNode;
}

function ContextMenu({ children }: ContextMenuProps) {
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  return (
    <ContextMenuCtx.Provider value={{ open, setOpen, position, setPosition }}>
      <div data-slot="context-menu">{children}</div>
    </ContextMenuCtx.Provider>
  );
}

/* ── Trigger ── */

export interface ContextMenuTriggerProps extends HTMLAttributes<HTMLDivElement> {}

function ContextMenuTrigger({
  className,
  children,
  ...props
}: ContextMenuTriggerProps) {
  const { setOpen, setPosition } = useContextMenu();

  const handleContextMenu = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      setPosition({ x: e.clientX, y: e.clientY });
      setOpen(true);
    },
    [setOpen, setPosition]
  );

  return (
    <div onContextMenu={handleContextMenu} className={className} {...props}>
      {children}
    </div>
  );
}

/* ── Content ── */

export interface ContextMenuContentProps
  extends HTMLAttributes<HTMLDivElement> {}

function ContextMenuContent({
  className,
  children,
  ...props
}: ContextMenuContentProps) {
  const { open, setOpen, position } = useContextMenu();
  const contentRef = useRef<HTMLDivElement>(null);
  const [adjusted, setAdjusted] = useState(position);

  /* Adjust position to stay within viewport */
  useEffect(() => {
    if (!open || !contentRef.current) return;
    const rect = contentRef.current.getBoundingClientRect();
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    let x = position.x;
    let y = position.y;

    if (x + rect.width > vw) x = vw - rect.width - 4;
    if (y + rect.height > vh) y = vh - rect.height - 4;
    if (x < 0) x = 4;
    if (y < 0) y = 4;

    setAdjusted({ x, y });
  }, [open, position]);

  /* Close on click outside & Escape */
  useEffect(() => {
    if (!open) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (
        contentRef.current &&
        !contentRef.current.contains(e.target as Node)
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
  }, [open, setOpen]);

  if (!open) return null;

  return (
    <div
      ref={contentRef}
      role="menu"
      style={{ left: adjusted.x, top: adjusted.y }}
      className={cn(
        "fixed z-50 min-w-[180px] overflow-hidden rounded-4 border border-border-primary bg-surface-elevated shadow-md",
        "py-1",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

/* ── Item ── */

export interface ContextMenuItemProps extends HTMLAttributes<HTMLDivElement> {
  disabled?: boolean;
  destructive?: boolean;
  onSelect?: () => void;
  icon?: ReactNode;
  shortcut?: string;
}

function ContextMenuItem({
  className,
  disabled,
  destructive,
  onSelect,
  icon,
  shortcut,
  children,
  ...props
}: ContextMenuItemProps) {
  const { setOpen } = useContextMenu();

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
      <span className="flex-1">{children}</span>
      {shortcut && (
        <span className="ml-auto text-body-xs text-content-tertiary">
          {shortcut}
        </span>
      )}
    </div>
  );
}

/* ── Separator ── */

function ContextMenuSeparator({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      role="separator"
      className={cn("my-1 h-px bg-border-secondary", className)}
      {...props}
    />
  );
}

/* ── Label ── */

function ContextMenuLabel({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "px-4 py-[6px] text-label-xs font-semibold text-content-tertiary",
        className
      )}
      {...props}
    />
  );
}

export {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuLabel,
};
