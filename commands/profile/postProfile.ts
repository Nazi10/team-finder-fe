"use server";

import { mutate, publicAction } from "@/core/commandClient";
import { z } from "zod";
import { zfd } from "zod-form-data";

function isValidDate(dateString: string) {
  const regEx = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateString.match(regEx)) return false; // Invalid format
  const d = new Date(dateString);
  const dNum = d.getTime();
  if (!dNum && dNum !== 0) return false; // NaN value, Invalid date
  return d.toISOString().slice(0, 10) === dateString;
}

const schema = zfd.formData({
  name: zfd.text(z.string()),
  lastName: zfd.text(z.string()),
  birthday: zfd
    .text(
      z
        .string()
        .refine(
          (arg) => isValidDate(arg),
          "An Error happened with the date format"
        )
        .optional()
    )
    .optional(),
  phoneNumber: zfd.text(
    z.string().min(10, "Phone number must be at least 10 characters")
  ),
  skills: zfd.repeatable().pipe(z.array(z.number())),
  timeAvailability: zfd.text(z.string()),
});

export const postProfile = publicAction(schema, async (req) => {
  const body = {
    name: req.name,
    lastName: req.lastName,
    birthday: req.birthday,
    phoneNumber: req.phoneNumber,
    skills: req.skills,
    timeAvailability: req.timeAvailability,
  };
  const res = await mutate<Partial<z.infer<typeof schema>>, { token: string }>({
    url: `api/user-profile/add`,
    body: body,
    method: "POST",
  });

  return res;
});
