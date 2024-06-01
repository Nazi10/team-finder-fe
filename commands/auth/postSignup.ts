"use server";

import { mutate, publicAction } from "@/core/commandClient";
import { z } from "zod";
import { zfd } from "zod-form-data";

const schema = zfd
  .formData({
    username: zfd.text(
      z.string().min(3, "Username must be at least 3 characters")
    ),
    email: zfd.text(z.string().email()),
    password: zfd.text(
      z.string().min(8, "Password must be at least 8 characters")
    ),
    confirmPassword: zfd.text(z.string()),
    role: zfd.repeatable().pipe(z.array(z.string())),
  })
  .refine((fields) => fields.password === fields.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

export const postSignup = publicAction(schema, async (req) => {
  const body = {
    username: req.username,
    email: req.email,
    password: req.password,
    role: req.role,
  };
  const res = await mutate<Partial<z.infer<typeof schema>>, { token: string }>({
    url: `api/auth/signup`,
    body: body,
    method: "POST",
  });

  return res;
});
