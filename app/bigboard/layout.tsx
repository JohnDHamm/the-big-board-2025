import Navbar from "../ui/bigboard/navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="">
      <Navbar />
      <div className="flex w-full pt-20">{children}</div>
    </div>
  );
}