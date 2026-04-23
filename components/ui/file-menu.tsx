"use client";

import { cva, type VariantProps } from "class-variance-authority";
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

/* ── CVA variants for trigger sizing ── */

const fileMenuTriggerVariants = cva(
  "text-content-primary transition-colors rounded-[3px] select-none cursor-pointer",
  {
    variants: {
      size: {
        sm: "h-[28px] px-2 text-label-xs",
        md: "h-[32px] px-3 text-label-sm",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

/* ── Context ── */

interface FileMenuContextValue {
  openId: string | null;
  setOpenId: (id: string | null) => void;
  anyOpen: boolean;
  size: "sm" | "md";
  registerTrigger: (id: string, ref: HTMLButtonElement | null) => void;
  getTriggerRef: (id: string) => HTMLButtonElement | null;
}

const FileMenuContext = createContext<FileMenuContextValue | null>(null);

function useFileMenu() {
  const ctx = useContext(FileMenuContext);
  if (!ctx)
    throw new Error(
      "FileMenu compound components must be used within <FileMenu>"
    );
  return ctx;
}

/* ── Root ── */

export interface FileMenuProps {
  children: ReactNode;
  size?: "sm" | "md";
}

function FileMenu({ children, size = "md" }: FileMenuProps) {
  const [openId, setOpenId] = useState<string | null>(null);
  const triggerRefs = useRef<Map<string, HTMLButtonElement | null>>(new Map());

  const registerTrigger = useCallback(
    (id: string, ref: HTMLButtonElement | null) => {
      triggerRefs.current.set(id, ref);
    },
    []
  );

  const getTriggerRef = useCallback(
    (id: string) => triggerRefs.current.get(id) ?? null,
    []
  );

  return (
    <FileMenuContext.Provider
      value={{
        openId,
        setOpenId,
        anyOpen: openId !== null,
        size,
        registerTrigger,
        getTriggerRef,
      }}
    >
      <div data-slot="file-menu">{children}</div>
    </FileMenuContext.Provider>
  );
}

/* ── Bar ── */

export interface FileMenuBarProps extends HTMLAttributes<HTMLDivElement> {}

function FileMenuBar({ className, children, ...props }: FileMenuBarProps) {
  return (
    <div
      role="menubar"
      className={cn(
        "flex items-center border-b border-border-secondary bg-surface-primary",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

/* ── Trigger ── */

export interface FileMenuTriggerProps
  extends HTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof fileMenuTriggerVariants> {
  label: string;
  menuId: string;
  children?: ReactNode;
}

function FileMenuTrigger({
  className,
  label,
  menuId,
  children,
  ...props
}: FileMenuTriggerProps) {
  const { openId, setOpenId, anyOpen, size, registerTrigger } = useFileMenu();
  const ref = useRef<HTMLButtonElement>(null);
  const isOpen = openId === menuId;

  useEffect(() => {
    registerTrigger(menuId, ref.current);
  }, [menuId, registerTrigger]);

  return (
    <div className="relative">
      <button
        ref={ref}
        type="button"
        role="menuitem"
        aria-expanded={isOpen}
        aria-haspopup="menu"
        onClick={() => setOpenId(isOpen ? null : menuId)}
        onMouseEnter={() => {
          if (anyOpen && openId !== menuId) setOpenId(menuId);
        }}
        className={cn(
          fileMenuTriggerVariants({ size }),
          "inline-flex items-center justify-center",
          isOpen
            ? "bg-fill-primary-active"
            : "hover:bg-fill-primary",
          className
        )}
        {...props}
      >
        {label}
      </button>
      {isOpen && children}
    </div>
  );
}

/* ── Content ── */

export interface FileMenuContentProps extends HTMLAttributes<HTMLDivElement> {}

function FileMenuContent({
  className,
  children,
  ...props
}: FileMenuContentProps) {
  const { setOpenId } = useFileMenu();
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape") setOpenId(null);
    };
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (contentRef.current && !contentRef.current.contains(target)) {
        /* Check if the click is on any trigger (they handle their own toggle) */
        const closest = (e.target as HTMLElement).closest?.(
          '[role="menuitem"][aria-haspopup="menu"]'
        );
        if (!closest) setOpenId(null);
      }
    };
    document.addEventListener("keydown", handleEscape);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setOpenId]);

  return (
    <div
      ref={contentRef}
      role="menu"
      className={cn(
        "absolute left-0 top-full z-50 mt-0 min-w-[200px] overflow-hidden rounded-4 border border-border-primary bg-surface-elevated shadow-md",
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

export interface FileMenuItemProps extends HTMLAttributes<HTMLDivElement> {
  disabled?: boolean;
  destructive?: boolean;
  onSelect?: () => void;
  icon?: ReactNode;
  shortcut?: string;
}

function FileMenuItem({
  className,
  disabled,
  destructive,
  onSelect,
  icon,
  shortcut,
  children,
  ...props
}: FileMenuItemProps) {
  const { setOpenId } = useFileMenu();

  const handleClick = () => {
    if (disabled) return;
    onSelect?.();
    setOpenId(null);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleClick();
    }
  };

  return (
    <div
      role="menuitem"
      tabIndex={disabled ? -1 : 0}
      aria-disabled={disabled}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      className={cn(
        "flex cursor-pointer items-center gap-3 px-[16px] py-[8px] text-body-sm transition-colors outline-none",
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
        <span className="ml-auto text-label-xs text-content-tertiary">
          {shortcut}
        </span>
      )}
    </div>
  );
}

/* ── Separator ── */

function FileMenuSeparator({
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

export {
  FileMenu,
  FileMenuBar,
  FileMenuTrigger,
  FileMenuContent,
  FileMenuItem,
  FileMenuSeparator,
  fileMenuTriggerVariants,
};
