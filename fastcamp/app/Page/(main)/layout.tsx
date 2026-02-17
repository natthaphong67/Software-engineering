import Navbar from "./Navbar/page";


export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar/>
      <main>{children}</main>
    </>
  );
}
