import { Header } from "antd/es/layout/layout";
import Image from "next/image";

export default function MenuHeader() {
  return (
    <Header className="flex justify-between !sm:h-22 sticky top-0 z-10 h-13 w-auto items-center !bg-white sm:flex px-18">
      <div className="flex items-center">
        <Image src="/favicon.svg" alt="Team Finder" width={20} height={20} />
        <h1 className="text-2xl sm:text-3xl font-bold ml-2 text-yellow-300 drop-shadow-lg">
          Team Finder
        </h1>
      </div>
      <a href="/login" className="self-end">
        Login
      </a>
    </Header>
  );
}
