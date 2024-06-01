"use client";

import { postProfile } from "@/commands/profile/postProfile";
import { useRouter } from "next/navigation";
import { notification } from "../ui/Notification";
import { useAction } from "next-safe-action/hooks";
import { Input } from "../ui/Input";
import FormDatePicker from "../form/FormDatePicker";
import Checkbox from "../ui/Checkbox";
import Select from "../ui/Select";
import { SetStateAction, useState } from "react";
import { DefaultOptionType } from "antd/es/select";
import { Radio } from "antd";
import { Skill } from "@/queries/skills/getSkills";

export default function UserProfileForm({ skills }: { skills: Skill[] }) {
  const router = useRouter();
  const [options, setOptions] = useState<DefaultOptionType[]>();

  const { execute, result, status } = useAction(postProfile, {
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
    input.append("skills", JSON.stringify(options));
    execute(input);
  }

  let changingOptions: DefaultOptionType[] = [];
  function onChange(value: number) {
    changingOptions.push({ value: value });
    setOptions(changingOptions);
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-3">
      <Input name="name" placeholder="Name" label="Name" />
      <Input name="lastName" placeholder="Last Name" label="Last Name" />
      <Input
        name="phoneNumber"
        placeholder="Phone Number"
        label="Phone Number"
      />
      <Radio.Group className="flex gap-2">
        <Radio name="timeAvailability" value={"FULL_TIME"}>
          Full time
        </Radio>
        <Radio name="timeAvailability" value={"PART_TIME"}>
          Part Time
        </Radio>
      </Radio.Group>
      <FormDatePicker name={"birthday"} placeholder={"Birthday"} />
      <Select
        className="w-full rounded-full"
        mode="multiple"
        options={skills}
        onChange={onChange}
        placeholder={"Skills"}
      />
    </form>
  );
}
