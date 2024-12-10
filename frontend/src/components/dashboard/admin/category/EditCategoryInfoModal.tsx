import React from "react";
import CustomInput from "@/components/shared/CustomInput";
import CustomButton from "@/components/shared/CustomButton";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const editCategorySchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters long."),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters long."),
});

type EditCategoryFormValues = z.infer<typeof editCategorySchema>;

const EditCategoryInfoModal = ({
  onClose,
  category,
  onSubmit,
  isLoading,
}: {
  onClose: () => void;
  category: { id: string; name: string; description: string };
  onSubmit: (data: EditCategoryFormValues) => void;
  isLoading: boolean;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EditCategoryFormValues>({
    resolver: zodResolver(editCategorySchema),
    defaultValues: {
      name: category.name,
      description: category.description,
    },
  });

  return (
    <DialogContent
      className="text-card-foreground"
      //  style={{ height: "90vh", overflowY: "auto" }}
    >
      <DialogHeader>
        <DialogTitle>Edit Category</DialogTitle>
        <DialogDescription>
          Update the Category details below.
        </DialogDescription>
      </DialogHeader>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <CustomInput
          placeholder="Category Name"
          label="Name *"
          inputClassName="bg-white py-4 focus-visible:ring-0 dark:text-black"
          {...register("name")}
          error={errors.name?.message}
        />

        <CustomInput
          placeholder="Category Description"
          label="Description *"
          inputClassName="bg-white py-4 focus-visible:ring-0 dark:text-black"
          {...register("description")}
          error={errors.description?.message}
        />

        <div className="mt-4">
          <CustomButton
            type="submit"
            className="bg-primary text-black"
            loading={isLoading}
          >
            Update Category
          </CustomButton>
        </div>
      </form>
    </DialogContent>
  );
};

export default EditCategoryInfoModal;
