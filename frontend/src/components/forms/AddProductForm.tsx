import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import CustomButton from "@/components/shared/CustomButton";
import CustomInput from "../shared/CustomInput";
import { CgRename } from "react-icons/cg";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateShopMutation } from "@/redux/api/shopApi";
import { useToast } from "@/hooks/use-toast";
import CategorySelectOption from "../home/CategorySelectOption";
import { useCreateProductMutation } from "@/redux/api/productApi";

// Define Zod schema

// Define Zod schema for validation
const productSchema = z.object({
  name: z.string().nonempty("Name is required"),
  description: z.string().nonempty("Description is required"),
  price: z.number().min(0, "Price must be greater than or equal to 0"),
  discount: z
    .number()
    .min(0, "Discount must be greater than or equal to 0")
    .optional(),
  categoryId: z.string().nonempty("Category is required"),
  inventory: z.number().min(0, "Inventory must be greater than or equal to 0"),
  images: z
    .instanceof(FileList)
    .refine((files) => files.length >= 2, "You must upload at least 2 images.")
    .refine((files) => files.length <= 5, "You can upload up to 5 images."),
});

type ProductFormValues = z.infer<typeof productSchema>;

const AddProductForm = ({ onClose }: { onClose: () => void }) => {
  const { toast } = useToast();
  const [createProduct, { isLoading }] = useCreateProductMutation();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
  });

  const onSubmit = async (data: ProductFormValues) => {
    const uploadedImages = Array.from(data.images);

    try {
      const response = await createProduct({
        ...data,
        images: uploadedImages,
      }).unwrap();
      toast({
        description: `${response.message}`,
      });
      onClose();
    } catch (error) {
      toast({
        description: "An error occurred while creating the product",
        variant: "destructive",
      });
    }
  };

  return (
    <DialogContent className="text-card-foreground">
      <DialogHeader>
        <DialogTitle>Create a New Product</DialogTitle>
        <DialogDescription>
          Fill in the details below to add your product.
        </DialogDescription>
      </DialogHeader>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <CustomInput
          label="Name"
          placeholder="Enter Product Name"
          {...register("name")}
          error={errors.name?.message}
        />

        {/* Product Description */}
        <CustomInput
          label="Description"
          placeholder="Enter Product Description"
          {...register("description")}
          error={errors.description?.message}
        />

        {/* Product Price */}
        <CustomInput
          label="Price"
          type="number"
          placeholder="Enter Product Price"
          {...register("price", { valueAsNumber: true })}
          error={errors.price?.message}
        />

        {/* Product Discount */}
        <CustomInput
          label="Discount"
          type="number"
          placeholder="Enter Product Discount (optional)"
          {...register("discount", { valueAsNumber: true })}
          error={errors.discount?.message}
        />

        {/* Product Inventory */}
        <CustomInput
          label="Inventory"
          type="number"
          placeholder="Enter Inventory Count"
          {...register("inventory", { valueAsNumber: true })}
          error={errors.inventory?.message}
        />

        {/* Product Category */}
        <CategorySelectOption
          isForm={true}
          control={control}
          error={errors.categoryId?.message}
        />

        {/* Product Images */}
        <CustomInput
          label="Upload Images (2-5)"
          type="file"
          inputClassName="bg-white py-2 focus-visible:ring-0"
          multiple
          {...register("images")}
          error={errors.images?.message}
        />

        {/* Submit Button */}
        <div className="mt-4">
          <CustomButton
            type="submit"
            className="bg-primary text-black"
            loading={isLoading}
          >
            Add Product
          </CustomButton>
        </div>
      </form>
    </DialogContent>
  );
};

export default AddProductForm;
