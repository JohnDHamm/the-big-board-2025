import BottomTicker from "../ui/bigboard/BottomTicker";
import Navbar from "../ui/bigboard/Navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="">
      <Navbar />
      <div className="flex w-full pt-20">{children}</div>
      <BottomTicker />
    </div>
  );
}