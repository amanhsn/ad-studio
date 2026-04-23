"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import {
  createContext,
  useContext,
  forwardRef,
  type HTMLAttributes,
  type ReactNode,
} from "react";

/* ── Context ── */

type ListVariant = "unordered" | "ordered" | "check";

interface ListContextValue {
  variant: ListVariant;
  indexCounter: { current: number };
}

const ListContext = createContext<ListContextValue | null>(null);

function useListContext() {
  return useContext(ListContext);
}

/* ── List ── */

export interface ListProps extends HTMLAttributes<HTMLDivElement> {
  variant?: ListVariant;
}

function List({
  variant = "unordered",
  className,
  children,
  ...props
}: ListProps) {
  const indexCounter = { current: 0 };

  return (
    <ListContext.Provider value={{ variant, indexCounter }}>
      <div
        data-slot="list"
        role="list"
        className={cn("flex flex-col", className)}
        {...props}
      >
        {children}
      </div>
    </ListContext.Provider>
  );
}

List.displayName = "List";

/* ── ListItem ── */

const listItemVariants = cva(
  "flex items-center gap-3 transition-colors hover:bg-fill-primary rounded-4 text-content-primary",
  {
    variants: {
      size: {
        sm: "py-2 px-3",
        md: "py-3 px-4",
        lg: "py-4 px-5",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

export interface ListItemProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "title">,
    VariantProps<typeof listItemVariants> {
  title: string;
  description?: string;
  leading?: ReactNode;
  trailing?: ReactNode;
  active?: boolean;
  disabled?: boolean;
}

const ListItem = forwardRef<HTMLDivElement, ListItemProps>(
  (
    {
      className,
      size,
      title,
      description,
      leading,
      trailing,
      active = false,
      disabled = false,
      onClick,
      ...props
    },
    ref
  ) => {
    const listCtx = useListContext();
    let autoLeading: ReactNode = leading;

    if (!leading && listCtx) {
      if (listCtx.variant === "check") {
        autoLeading = (
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            className="text-content-brand"
          >
            <path
              d="M13 4L6 12L3 9"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        );
      } else if (listCtx.variant === "ordered") {
        listCtx.indexCounter.current += 1;
        autoLeading = (
          <span className="flex h-[20px] w-[20px] shrink-0 items-center justify-center rounded-full bg-fill-primary text-label-xs font-medium text-content-secondary">
            {listCtx.indexCounter.current}
          </span>
        );
      }
    }

    return (
      <div
        ref={ref}
        role="listitem"
        tabIndex={onClick && !disabled ? 0 : undefined}
        onClick={!disabled ? onClick : undefined}
        onKeyDown={(e) => {
          if (!disabled && onClick && (e.key === "Enter" || e.key === " ")) {
            e.preventDefault();
            onClick(e as unknown as React.MouseEvent<HTMLDivElement>);
          }
        }}
        className={cn(
          listItemVariants({ size }),
          active && "bg-surface-brand text-content-brand",
          disabled && "text-content-primary-disabled cursor-not-allowed hover:bg-transparent",
          onClick && !disabled && "cursor-pointer",
          className
        )}
        {...props}
      >
        {autoLeading && (
          <span className="shrink-0">{autoLeading}</span>
        )}
        <div className="flex flex-1 flex-col">
          <span className="text-label-sm font-medium">{title}</span>
          {description && (
            <span className="text-body-xs text-content-secondary">
              {description}
            </span>
          )}
        </div>
        {trailing && (
          <span className="shrink-0">{trailing}</span>
        )}
      </div>
    );
  }
);
ListItem.displayName = "ListItem";

export { List, ListItem, listItemVariants };
