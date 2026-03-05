"use client"

import {
  CircleCheckIcon,
  InfoIcon,
  Loader2Icon,
  OctagonXIcon,
  TriangleAlertIcon,
} from "lucide-react"
import { useTheme } from "next-themes"
import { Toaster as Sonner, type ToasterProps } from "sonner"

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      icons={{
        success: <CircleCheckIcon className="size-4" />,
        info: <InfoIcon className="size-4" />,
        warning: <TriangleAlertIcon className="size-4" />,
        error: <OctagonXIcon className="size-4" />,
        loading: <Loader2Icon className="size-4 animate-spin" />,
      }}
      toastOptions={{
        classNames: {
          toast:
            "!rounded-2xl !shadow-lg !border !border-border/60 !bg-card !text-card-foreground",
          title: "!font-semibold",
          description: "!text-muted-foreground",
          success: "!text-green-600 dark:!text-green-400 [&>[data-icon]]:!text-green-600 dark:[&>[data-icon]]:!text-green-400",
          error: "!text-destructive [&>[data-icon]]:!text-destructive",
          warning: "!text-amber-500 [&>[data-icon]]:!text-amber-500",
          info: "!text-primary [&>[data-icon]]:!text-primary",
        },
      }}
      style={
        {
          "--border-radius": "var(--radius)",
        } as React.CSSProperties
      }
      {...props}
    />
  )
}

export { Toaster }