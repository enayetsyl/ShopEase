import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import { H2, H3 } from "../shared/CustomTypography";
import CustomButton from "../shared/CustomButton";
import { MoveRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { carouselItems } from "@/constants";

const HomeCarousel = () => {
  const router = useRouter();
  const goToShop = () => {
    router.push("/shop");
  };

  return (
    <Carousel
      plugins={[Autoplay({ delay: 3000 })]}
      opts={{
        align: "start",
        loop: true,
      }}
    >
      <CarouselContent>
        {carouselItems.map((item, index) => (
          <CarouselItem key={index}>
            <div
              className={`${item.bgClass} rounded-lg flex p-4 justify-between items-center min-h-[40vh] lg:min-h-[60vh]`}
            >
              <div className="lg:pl-8 lg:space-y-5">
                <H3 className="text-primary dark:text-primary lg:text-3xl">
                  {item.h3Text}
                </H3>
                <div className="flex justify-start items-center pb-3">
                  <H2 className="lg:text-6xl text-white">
                    Up To{" "}
                    <span className="text-primary dark:text-primary">
                      {item.spanText}
                    </span>{" "}
                    {item.h2Text}
                  </H2>
                </div>

                <CustomButton
                  icon={<MoveRight />}
                  className="lg:py-6"
                  iconPosition="right"
                  onClick={goToShop}
                >
                  Shop Now
                </CustomButton>
              </div>
              <div className="w-2/5 lg:w-1/3">
                <Image
                  src={item.imageSrc}
                  height={100}
                  width={100}
                  alt={item.h3Text}
                  className="object-cover w-full h-full rounded-lg lg:p-10"
                />
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};

export default HomeCarousel;
