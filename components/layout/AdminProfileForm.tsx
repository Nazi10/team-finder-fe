import { postProfile } from "@/commands/profile/postProfile";
import { useRouter } from "next/navigation";
import { notification } from "../ui/Notification";
import { useAction } from "next-safe-action/hooks";
import { Input } from "../ui/Input";
import FormDatePicker from "../form/FormDatePicker";
import Checkbox from "../ui/Checkbox";
import Select from "../ui/Select";
import { useState } from "react";
import { Radio } from "antd";

export default function AdminProfileForm() {
  const router = useRouter();
  const [options, setOptions] = useState([]);

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
    execute(input);
  }

  function onChange(value: number) {
    let options = [];
    options.push({ value });
  }
  return (
    <form onSubmit={onSubmit}>
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
        options={options}
        onChange={onChange}
      />
    </form>
  );
}
