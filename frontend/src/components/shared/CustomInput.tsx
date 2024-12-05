import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ReactNode } from "react";
import { cn } from "@/lib/utils"; 

type InputProps = {
  label?: string; 
  placeholder?: string; 
  isRequired?: boolean; 
  icon?: ReactNode; 
  type?: string; 
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  inputClassName?: string; 
  labelClassName?: string; 
  iconClassName?: string; 
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
