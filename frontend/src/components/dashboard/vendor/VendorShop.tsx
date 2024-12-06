import AddShop from "@/components/forms/AddShop";
import CustomBreadcrumb from "@/components/shared/CustomBreadcrumb";
import CustomButton from "@/components/shared/CustomButton";
import { H1, H2 } from "@/components/shared/CustomTypography";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { useGetShopQuery } from "@/redux/api/shopApi";
const VendorShop = () => {
  const { data, isLoading } = useGetShopQuery();

  const handleCreateShop = (name: string, description: string) => {
    console.log("Shop Name:", name);
    console.log("Shop Description:", description);
    // Add logic to create a shop (API call or state update)
  };

  if (isLoading) return <div>Loading...</div>;
  // if (error) return <div>Error: {error.message}</div>;
  return (
    <div className="">
      <CustomBreadcrumb
        items={[
          { label: "Home", path: "/" },
          { label: "Dashboard", path: "/dashboard/vendor" },
          { label: "Shop" },
        ]}
        title="Shop Page"
      />
      <div>
        <div>
          {!data && (
            <div>
              <div className="flex justify-end items-center mr-10 mt-10">
                <Dialog>
                  <DialogTrigger asChild>
                    <CustomButton className="bg-primary dark:bg-primary-foreground text-black dark:text-white dark:hover:text-black ">
                      Add Shop
                    </CustomButton>
                  </DialogTrigger>
                  <AddShop />
                </Dialog>
              </div>
              <div className="flex flex-col justify-center items-center mt-32 mx-10">
                <H2 className="text-center text-accent-foreground">
                  You do not have any shop yet.
                </H2>
                <H2>Create your shop Now.</H2>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VendorShop;
