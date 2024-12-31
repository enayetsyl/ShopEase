import { Facebook, Instagram, Twitter } from "lucide-react";
import Link from "next/link";

const links = [
  {
    link: "/",
    text: "Home",
  },
  {
    link: "/shop",
    text: "Shop",
  },
  {
    link: "/all-products",
    text: "All Products",
  },
  {
    link: "/flash-sale",
    text: "Flash Sale",
  },
  {
    link: "/cart",
    text: "Cart",
  },
];

const Footer = () => {
  return (
    <div className="bg-black mt-20 pt-20 pb-6 px-4 text-white flex flex-col gap-4 justify-center items-center">
      <h4 className="text-2xl md:text-3xl lg:text-4xl font-bold italic">
        ShopEase
      </h4>

      <div className="flex gap-4 items-center my-4">
        {links.map((item, i) => (
          <Link
            href={item.link}
            key={i}
            className="font-medium hover:text-primary duration-300"
          >
            {item.text}
          </Link>
        ))}
      </div>
      <div className="flex gap-8 items-center my-2">
        <Facebook />
        <Instagram />
        <Twitter />
      </div>

      <p className="text-sm opacity-50 my-6 text-center">
        Copyright ©{new Date().getFullYear()} ShopEase. All Rights Reserved.
      </p>
    </div>
  );
};

export default Footer;
