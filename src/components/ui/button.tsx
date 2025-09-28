import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-all duration-300 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 relative overflow-hidden",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/90",
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
  ({ className, variant, size, asChild = false, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    const internalRef = React.useRef<HTMLButtonElement>(null);
    const combinedRef = (ref || internalRef) as React.RefObject<HTMLButtonElement>;

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { damping: 20, stiffness: 200 };
    const springX = useSpring(mouseX, springConfig);
    const springY = useSpring(mouseY, springConfig);

    const translateX = useTransform(springX, [-0.5, 0.5], ['-10%', '10%']);
    const translateY = useTransform(springY, [-0.5, 0.5], ['-10%', '10%']);

    const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
      const rect = combinedRef.current?.getBoundingClientRect();
      if (rect) {
        const { width, height, left, top } = rect;
        const x = e.clientX - left;
        const y = e.clientY - top;
        const normalizedX = (x / width) - 0.5;
        const normalizedY = (y / height) - 0.5;
        mouseX.set(normalizedX);
        mouseY.set(normalizedY);
      }
    };
    
    const handleMouseLeave = () => {
      mouseX.set(0);
      mouseY.set(0);
    };

    React.useEffect(() => {
        const button = combinedRef.current;
        if (!button) return;

        const handleShine = (e: MouseEvent) => {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            button.style.setProperty('--mouse-x', `${x}px`);
            button.style.setProperty('--mouse-y', `${y}px`);
        };

        button.addEventListener('mousemove', handleShine);

        return () => {
            button.removeEventListener('mousemove', handleShine);
        };
    }, [combinedRef]);
    
    return (
        <Comp
          className={cn(
              buttonVariants({ variant, size, className }), 
              'before:absolute before:inset-0 before:z-0 before:bg-[radial-gradient(400px_circle_at_var(--mouse-x)_var(--mouse-y),hsl(var(--primary)/0.2),transparent_80%)] before:opacity-0 before:transition-opacity before:duration-300 hover:before:opacity-100',
              'transition-transform duration-200 ease-out hover:scale-[1.02] active:scale-[0.98]'
          )}
          ref={combinedRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          {...props}
        >
          <motion.div
            className="relative z-10 flex h-full w-full items-center justify-center gap-2"
            style={{ x: translateX, y: translateY }}
          >
            {children}
          </motion.div>
        </Comp>
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
