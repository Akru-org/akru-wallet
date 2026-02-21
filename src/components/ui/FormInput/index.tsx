import * as React from "react";
import { cn } from "@/lib/utils";

const formInputClasses =
  "w-full rounded-lg border border-border bg-secondary/50 px-4 py-3 text-sm placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-all";

const FormInput = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, ...props }, ref) => {
    return <input ref={ref} className={cn(formInputClasses, className)} {...props} />;
  },
);
FormInput.displayName = "FormInput";

export { FormInput };
