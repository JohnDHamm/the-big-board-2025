import Logo from "./ui/bigboard/Logo";
import MockLoginButton from "./ui/home/MockLoginButton";
import LeagueDropdown from "./ui/bigboard/LeagueDropdown";

export default async function Home() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <div className="w-2xs">
          <Logo />
        </div>
        <LeagueDropdown />
        <MockLoginButton text="mock login" />
      </main>
    </div>
  );
}
