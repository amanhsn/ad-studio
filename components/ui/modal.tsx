"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { useEffect, useRef, type ReactNode, type HTMLAttributes } from "react";

const modalVariants = cva(
  "relative flex flex-col rounded-8 bg-surface-elevated shadow-lg backdrop:bg-neutral-black/50 p-0 border-none max-h-[85vh]",
  {
    variants: {
      size: {
        sm: "w-[400px]",
        md: "w-[560px]",
        lg: "w-[720px]",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

export interface ModalProps
  extends Omit<HTMLAttributes<HTMLDialogElement>, "title">,
    VariantProps<typeof modalVariants> {
  open: boolean;
  onClose: () => void;
  title?: ReactNode;
  description?: ReactNode;
  footer?: ReactNode;
  closeOnOverlay?: boolean;
  children: ReactNode;
}

function Modal({
  open,
  onClose,
  title,
  description,
  footer,
  closeOnOverlay = true,
  size,
  className,
  children,
  ...props
}: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    else if (!open && dialog.open) dialog.close();
  }, [open]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const handleClose = () => onClose();
    dialog.addEventListener("close", handleClose);
    return () => dialog.removeEventListener("close", handleClose);
  }, [onClose]);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    if (closeOnOverlay && e.target === dialogRef.current) onClose();
  };

  return (
    <dialog
      ref={dialogRef}
      data-slot="modal"
      onClick={handleBackdropClick}
      className={cn(modalVariants({ size }), className)}
      {...props}
    >
      <div className="flex flex-col">
        {(title || description) && (
          <div className="flex flex-col gap-2 px-7 pt-7 pb-4">
            {title && (
              <h2 className="text-heading-sm font-semibold text-content-primary">
                {title}
              </h2>
            )}
            {description && (
              <p className="text-body-sm text-content-secondary">{description}</p>
            )}
          </div>
        )}
        <div className="flex-1 overflow-y-auto px-7 py-2">{children}</div>
        {footer && (
          <div className="flex items-center justify-end gap-3 px-7 pt-4 pb-7">
            {footer}
          </div>
        )}
      </div>
    </dialog>
  );
}

export { Modal, modalVariants };
