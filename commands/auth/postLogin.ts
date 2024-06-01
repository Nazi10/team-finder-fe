"use server";

import { publicAction } from "@/core/commandClient";
import { AuthError } from "next-auth";
import { signIn } from "@/core/auth";
import { z } from "zod";
import { zfd } from "zod-form-data";

const schema = zfd.formData({
  username: zfd.text(z.string()),
  password: zfd.text(
    z.string().min(8, "Password must be at least 8 characters")
  ),
});

export const postLogin = publicAction(schema, async (data) => {
  await signIn("credentials", { ...data, redirect: false }).catch(
    (e: AuthError) => {
      throw new Error(
        e.message?.replace(
          `Read more at https://errors.authjs.dev#${e.type.toLowerCase()}`,
          ""
        )
      );
    }
  );
});
