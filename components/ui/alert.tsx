import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const alertVariants = cva(
  "relative w-full rounded-border border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-current [&>svg:~text-*=spacing-tight]:-translate-x-[0.3ch] [&>svg:~text-*=leading-none]:trim-[0]",
  {
    variants: {
      variant: {
        default: "bg-background",
        destructive: "border-destructive/50 text-destructive dark:border-destructive/[.3] bg-destructive/50",
        success: "border-success/50 text-success dark:border-success/[.3] bg-success/50",
        warning: "border-warning/50 text-warning dark:border-warning/[.3] bg-warning/50",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

interface AlertProps extends React.ComponentPropsWithoutRef<typeof Slot> {
  variant?: VariantProps<typeof alertVariants>["variant"];
  className?: string;
}

export const Alert = React.forwardRef<
  HTMLDivElement,
  AlertProps
>(({ className, variant = "default", ...props }, ref) => (
  <div
    ref={ref}
    className={cn(alertVariants({ variant }), className)}
    role="alert"
    {...props}
  >
    <Slot />
  </div>
));
Alert.displayName = "Alert";

interface AlertTitleProps extends React.ComponentPropsWithoutRef<typeof Slot> {
  className?: string;
}

export const AlertTitle = React.forwardRef<
  HTMLElement,
  AlertTitleProps
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "mb-2 font-semibold text-lg leading-none tracking-tight",
      className
    )}
    {...props}
  />
));
AlertTitle.displayName = "AlertTitle";

interface AlertDescriptionProps extends React.ComponentPropsWithoutRef<typeof Slot> {
  className?: string;
}

export const AlertDescription = React.forwardRef<
  HTMLElement,
  AlertDescriptionProps
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm", className)}
    {...props}
  />
));
AlertDescription.displayName = "AlertDescription";