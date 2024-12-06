import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import CustomButton from "@/components/shared/CustomButton";
import { useState } from "react";
import CustomInput from "../shared/CustomInput";
import { CgRename } from "react-icons/cg";

const AddShop = ({
  onCreate,
}: {
  onCreate: (name: string, description: string) => void;
}) => {
  const [shopName, setShopName] = useState("");
  const [shopDescription, setShopDescription] = useState("");

  const handleCreateShop = () => {
    onCreate(shopName, shopDescription);
    setShopName("");
    setShopDescription("");
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle className="">Create a New Shop</DialogTitle>
        <DialogDescription>
          Fill in the details below to create your shop.
        </DialogDescription>
      </DialogHeader>
      <div className="space-y-4">
        <CustomInput
          icon={<CgRename />}
          placeholder="Shop Name"
          label="Shop Name"
          inputClassName="bg-white py-4 focus-visible:ring-0"
          // {...register("name")}
          // error={errors.name?.message as string | undefined}
        />
        <CustomInput
          icon={<CgRename />}
          placeholder="Description"
          label="Description"
          inputClassName="bg-white py-4  focus-visible:ring-0"

          // {...register("name")}
          // error={errors.name?.message as string | undefined}
        />
        <CustomInput
          // icon={<CgRename />}
          placeholder="Logo"
          label="Logo"
          inputClassName="bg-white pb-3 focus-visible:ring-0"
          type="file"
          // {...register("name")}
          // error={errors.name?.message as string | undefined}
        />
      </div>
      <div className="mt-4">
        <CustomButton
          className="bg-primary text-black"
          onClick={handleCreateShop}
        >
          Create Shop
        </CustomButton>
      </div>
    </DialogContent>
  );
};

export default AddShop;
