import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import { FC } from "react";

interface BreadcrumbProps {
  items: {
    label: string;
    path?: string;
  }[];
  title: string;
}

const CustomBreadcrumb: FC<BreadcrumbProps> = ({ items, title }) => {
  return (
    <div className="bg-gradient-to-r from-primary to-secondary dark:from-secondary dark:to-primary py-6 px-8 rounded-md shadow-md text-background">
      <Breadcrumb className="flex items-center space-x-2 text-sm">
        {items.map((item, index) => (
          <BreadcrumbItem key={index}>
            {item.path ? (
              <Link
                href={item.path}
                className="text-primary-foreground hover:underline"
              >
                {item.label}
              </Link>
            ) : (
              <span className="text-muted-foreground">{item.label}</span>
            )}
            {index < items.length - 1 && (
              <BreadcrumbSeparator>/</BreadcrumbSeparator>
            )}
          </BreadcrumbItem>
        ))}
      </Breadcrumb>
      <h1 className="text-4xl font-bold mt-2 text-primary-foreground">
        {title}
      </h1>
    </div>
  );
};

export default CustomBreadcrumb;
