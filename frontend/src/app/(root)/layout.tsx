import BackToTop from "@/components/shared/BackToTop";
import NavigationMenu from "@/components/shared/NavigationMenu";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
      <div className="max-w-7xl mx-auto">
        <NavigationMenu />
        <div className="pt-20">{children}</div>
        <BackToTop />
      </div>
    </main>
  );
}
