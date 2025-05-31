"use client"

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { VariantProps, cva } from "class-variance-authority"
import { useMobile } from "@/hooks/use-mobile"

const sidebarVariants = cva(
  "fixed z-50 flex flex-col gap-2 bg-secondary p-4 text-secondary-foreground shadow-md transition-all duration-300 ease-in-out",
  {
    variants: {
      orientation: {
        horizontal:
          "bottom-0 left-0 right-0 h-14 border-t border-muted",
        vertical:
          "top-0 left-0 h-screen w-64 border-r border-muted",
      },
      isOpen: {
        true: "translate-x-0",
        false: "-translate-x-full",
      },
    },
    compoundVariants: [
      {
        orientation: "horizontal",
        isOpen: true,
        className: "translate-y-0",
      },
      {
        orientation: "horizontal",
        isOpen: false,
        className: "translate-y-full",
      },
    ],
    defaultVariants: {
      orientation: "vertical",
      isOpen: false,
    },
  }
)

export interface SidebarProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof sidebarVariants> {}

const Sidebar = React.forwardRef<HTMLDivElement, SidebarProps>(
  ({ className, orientation, isOpen, ...props }, ref) => {
    const isMobile = useMobile()
    return (
      <div
        ref={ref}
        className={sidebarVariants({ className, orientation, isOpen })}
        {...props}
      />
    )
  }
)
Sidebar.displayName = "Sidebar"

const SidebarTrigger = ({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLButtonElement>) => {
  return (
    <button className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm h-9 px-4 py-2" {...props}>
      {children}
    </button>
  )
}
SidebarTrigger.displayName = "SidebarTrigger"

export { Sidebar, SidebarTrigger, sidebarVariants }
