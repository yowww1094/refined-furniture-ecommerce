import * as React from "react";
import { Button } from "@/components/ui/button";

interface SubmitButtonProps extends React.ComponentPropsWithoutRef<typeof Button> {
  isLoading?: boolean;
  children: React.ReactNode;
}

export function SubmitButton({
  isLoading = false,
  children,
  ...props
}: SubmitButtonProps) {
  return (
    <Button
      variant="default"
      disabled={isLoading}
      className="w-full"
      {...props}
    >
      {isLoading ? "Submitting..." : children}
    </Button>
  );
}