import * as React from "react";
import { FormInput } from "@/components/ui/FormInput/index";
import { cn } from "@/lib/utils";

interface SearchInputProps extends Omit<React.ComponentProps<"input">, "type"> {
  icon?: React.ReactNode;
}

export function SearchInput({ icon, className, ...props }: SearchInputProps) {
  return (
    <div className="relative">
      {icon && (
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground [&>svg]:size-4">
          {icon}
        </span>
      )}
      <FormInput
        type="text"
        className={cn(icon && "pl-9", className)}
        {...props}
      />
    </div>
  );
}
