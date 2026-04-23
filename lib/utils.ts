import { type ClassValue, clsx } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [
        {
          text: [
            "label-xs", "label-sm", "label-md", "label-lg", "label-xl", "label-2xl",
            "body-xs", "body-sm", "body-md", "body-lg", "body-xl",
            "heading-xs", "heading-sm", "heading-md", "heading-lg", "heading-xl", "heading-2xl",
            "display-xs", "display-sm", "display-md",
          ],
        },
      ],
      "text-color": [
        {
          text: [
            "content-primary", "content-secondary", "content-tertiary",
            "content-placeholder", "content-disabled", "content-inverse",
            "content-brand", "content-error", "content-success", "content-warning",
            "content-on-brand", "content-on-critical",
            "foreground",
          ],
        },
      ],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
