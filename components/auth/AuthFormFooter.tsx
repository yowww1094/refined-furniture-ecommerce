import * as React from "react";
import Link from "next/link";

interface AuthFormFooterProps {
  primaryAction: {
    text: string;
    href: string;
  };
  secondaryAction?: {
    text: string;
    href: string;
  };
  showDivider?: boolean;
}

export function AuthFormFooter({
  primaryAction,
  secondaryAction,
  showDivider = true,
}: AuthFormFooterProps) {
  return (
    <div className="mt-6 text-center text-sm">
      {showDivider && (
        <div className="flex items-center my-6">
          <div className="w-full border-t border-muted-foreground/20"></div>
          <div className="px-2 text-muted-foreground">Or continue with</div>
          <div className="w-full border-t border-muted-foreground/20"></div>
        </div>
      )}

      <div>
        <Link href={primaryAction.href} className="font-medium text-primary hover:underline">
          {primaryAction.text}
        </Link>
      </div>

      {secondaryAction && (
        <>
          <div className="mt-2">
            <Link href={secondaryAction.href} className="font-medium text-muted-foreground hover:text-primary hover:underline">
              {secondaryAction.text}
            </Link>
          </div>
        </>
      )}
    </div>
  );
}