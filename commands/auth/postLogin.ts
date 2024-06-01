"use server";

import { mutate, publicAction } from "@/core/commandClient";
import { z } from "zod";
import { zfd } from "zod-form-data";

const schema = zfd.formData({
  username: zfd.text(z.string()),
  password: zfd.text(
    z.string().min(8, "Password must be at least 8 characters")
  ),
});

export const postLogin = publicAction(schema, async (req) => {
  const body = {
    username: req.username,
    password: req.password,
  };
  const res = await mutate<Partial<z.infer<typeof schema>>, { token: string }>({
    url: `api/auth/signin`,
    body: body,
    method: "POST",
  });

  return res;
});
