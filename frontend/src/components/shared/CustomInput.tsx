import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ReactNode } from "react";
import { cn } from "@/lib/utils"; // Assuming you have a cn utility

type InputProps = {
  label?: string; // For variations with labels
  placeholder?: string; // For variations with placeholders
  isRequired?: boolean; // For the "*" indicator
  icon?: ReactNode; // For variations with icons inside the input
  type?: string; // Input type (e.g., text, email)
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  inputClassName?: string; // Custom class for the input
  labelClassName?: string; // Custom class for the label
  iconClassName?: string; // Custom class for the icon
};

const CustomInput = ({
  label,
  placeholder,
  isRequired,
  icon,
  type = "text",
  value,
  onChange,
  inputClassName = "",
  labelClassName = "",
  iconClassName = "",
}: InputProps) => {
  return (
    <div className="flex flex-col gap-2">
      {label && (
        <Label className={cn("text-sm font-medium", labelClassName)}>
          {label} {isRequired && <span className="text-red-500">*</span>}
        </Label>
      )}
      <div className="relative">
        {icon && (
          <div
            className={cn(
              "absolute left-3 top-1/2 -translate-y-1/2 text-gray-500",
              iconClassName,
            )}
          >
            {icon}
          </div>
        )}
        <Input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={cn(
            icon ? "pl-10" : "",
            !placeholder ? "placeholder-transparent" : "",
            inputClassName,
          )}
        />
      </div>
    </div>
  );
};

export default CustomInput;
