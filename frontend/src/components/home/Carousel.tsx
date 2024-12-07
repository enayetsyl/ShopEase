import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import { H2, H3 } from "../shared/CustomTypography";
import CustomButton from "../shared/CustomButton";
import { MoveRight } from "lucide-react";

const HomeCarousel = () => {
  return (
    <Carousel
      plugins={[Autoplay({ delay: 3000 })]}
      opts={{
        align: "start",
        loop: true,
      }}
    >
      <CarouselContent>
        <CarouselItem>
          <div className="bg-stone-600 rounded-lg flex p-4 justify-between items-center min-h-[50vh] lg:min-h-[60vh]">
            <div className="lg:pl-8 lg:space-y-5">
              <H3 className="text-primary dark:text-primary lg:text-3xl">
                Stationary
              </H3>
              <div className="flex justify-start items-center pb-3">
                <H2 className="lg:text-6xl text-white">
                  Up To{" "}
                  <span className="text-primary dark:text-primary">
                    30% off
                  </span>{" "}
                  on All Pen
                </H2>
              </div>
              <CustomButton
                icon={<MoveRight />}
                className="lg:py-6"
                iconPosition="right"
              >
                Shop Now
              </CustomButton>
            </div>
            <div className="w-2/5 lg:w-1/3">
              <Image
                src="/images/pen.jpg"
                height={100}
                width={100}
                alt="Pen"
                className="object-cover w-full h-full rounded-lg lg:p-10"
              />
            </div>
          </div>
        </CarouselItem>
        {/* <CarouselItem>
          <div className="h-64 bg-green-500 flex items-center justify-center">
            <p className="text-white">Item 2</p>
          </div>
        </CarouselItem>
        <CarouselItem>
          <div className="h-64 bg-blue-500 flex items-center justify-center">
            <p className="text-white">Item 3</p>
          </div>
        </CarouselItem> */}
      </CarouselContent>
      {/* <CarouselPrevious />
      <CarouselNext /> */}
    </Carousel>
  );
};

export default HomeCarousel;
