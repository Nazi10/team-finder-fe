"use client";

import { postLogin } from "@/commands/auth/postLogin";
import FormInput from "@/components/form/FormInput";
import FormPasswordInput from "@/components/form/FormPasswordInput";
import { notification } from "@/components/ui/Notification";
import { Button } from "antd";
import { useAction } from "next-safe-action/hooks";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const router = useRouter();
  const { execute, result, status } = useAction(postLogin, {
    onSuccess: async () => {
      router.push(`/dashboard`);
    },
    onError: (error) => {
      if (error.fetchError ?? error.serverError)
        notification.error(
          error.fetchError ?? error.serverError ?? "An unknown error occurred."
        );
    },
  });

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const input = new FormData(e.currentTarget);
    execute(input);
  }

  return (
    <div className="flex justify-center align-middle flex-col items-center p-2 gap-4">
      <h1 className="text-4xl font-bold">Login</h1>
      <form onSubmit={onSubmit} className="flex flex-col gap-1">
        <FormInput name="username" placeholder="Username" label="Username" />
        <FormPasswordInput
          name="password"
          placeholder="Password"
          label="Password"
        />
        <div className=" pt-3">
          <Button
            htmlType="submit"
            disabled={status === "executing"}
            type="primary"
            className="!flex w-full text-black !content-center !items-center !justify-center !rounded-full bg-primary-500 !py-[18px] !text-center !text-base sm:w-90"
          >
            Login
          </Button>
        </div>
      </form>
    </div>
  );
}
