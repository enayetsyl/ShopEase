"use client";

import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { H2 } from "../shared/CustomTypography";
import { selectButtonCategories } from "@/constants";

const CategorySelectOption = () => {
  const router = useRouter();

  const handleCategorySelect = (value: string) => {
    router.push(`/all-products?category=${value}`);
  };

  return (
    <div className="flex items-center gap-4 mb-4 pb-5">
      <H2 className="text-sm lg:text-2xl font-bold">Browse Categories</H2>
      <Select onValueChange={handleCategorySelect}>
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder="Select Category" />
        </SelectTrigger>
        <SelectContent>
          {selectButtonCategories.map((category) => (
            <SelectItem key={category.id} value={category.id}>
              {category.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default CategorySelectOption;
