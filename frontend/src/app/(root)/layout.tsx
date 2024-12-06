
export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
      <div className="max-w-7xl mx-auto">{children}</div>
    </main>
  );
}
