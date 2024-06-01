"use client";

import { useRouter, useSearchParams } from "next/navigation";
import useCreateQueryString from "../utils/hooks/useCreateQueryString";

export default function Register() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { createQueryString } = useCreateQueryString(searchParams);
  return (
    <div className="flex justify-center py-2 gap-4">
      <a
        onClick={() => {
          router.push(`/signup?${createQueryString("role", "user")}`);
        }}
        className=" bg-yellow-300 hover:bg-yellow-500 text-black font-semibold py-3 px-8 rounded-full shadow-lg transition duration-300 cursor-pointer"
      >
        Register now
      </a>
      <a
        onClick={() => {
          router.push(`/signup?${createQueryString("role", "admin")}`);
        }}
        className=" bg-yellow-300 hover:bg-yellow-500 text-black font-semibold py-3 px-8 rounded-full shadow-lg transition duration-300 cursor-pointer"
      >
        Create your team
      </a>
    </div>
  );
}
