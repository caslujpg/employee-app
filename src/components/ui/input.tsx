import * as React from "react"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "h-11 w-full min-w-0 rounded-full border border-input bg-white px-5 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none",
        "selection:bg-primary selection:text-primary-foreground",
        "placeholder:text-muted-foreground",
        "file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground",
        "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
        "focus-visible:border-primary focus-visible:ring-[3px] focus-visible:ring-primary/20",
        "aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40",
        "dark:bg-input/30",
        "md:text-sm",
        className
      )}
      {...props}
    />
  )
}

export { Input }