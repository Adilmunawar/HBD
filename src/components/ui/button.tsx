import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { Spotlight } from "./spotlight"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-all duration-300 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 relative",
  {
    variants: {
      variant: {
        default:
          "bg-primary/90 text-primary-foreground hover:bg-primary/80 border border-primary",
        destructive:
          "bg-destructive/90 text-destructive-foreground hover:bg-destructive/80 border border-destructive",
        outline:
          "border border-input bg-background/80 hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary/90 text-secondary-foreground hover:bg-secondary/80 border border-secondary",
        ghost:
          "hover:bg-accent hover:text-accent-foreground",
        link:
          "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Spotlight className={cn(buttonVariants({ variant: 'default', size, className: 'p-0 border-none' }), className)}>
        <Comp
          className={cn(buttonVariants({ variant, size, className }), 'w-full h-full bg-transparent')}
          ref={ref}
          {...props}
        />
      </Spotlight>
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
