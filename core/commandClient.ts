import { createSafeActionClient } from "next-safe-action";

import { auth } from "./auth";
import { env } from "process";
import { ErrorType } from "./common/ErrorType";

export const publicAction = createSafeActionClient({
  handleReturnedServerError(e) {
    return e.message;
  },
});

export const privateAction = createSafeActionClient({
  async middleware(parsedInput: unknown) {
    const session = await auth();
    if (!session?.user?.token) throw new Error("Unauthorized");

    return parsedInput;
  },
  handleReturnedServerError(e) {
    return e.message;
  },
});

export async function mutate<TBody = unknown, TResult = unknown>(options: {
  url: string;
  method: "POST" | "PUT" | "DELETE";
  body?: TBody;
  headers?: Record<string, string>;
}): Promise<TResult> {
  const session = await auth();
  const res = await fetch(`${env.API_URL}/${options.url}`, {
    method: options.method,
    headers: {
      "Content-Type": "application/json",
      ...(session?.user?.token && {
        Authorization: "Bearer " + session?.user?.token,
      }),
      ...(options?.headers ?? {}),
    },
    cache: "no-cache",
    body: JSON.stringify(options.body),
  });
  if (!res) {
    throw new Error("No response");
  }
  if (!res.ok) {
    const errors = (await res.json()) as ErrorType[];
    console.log(errors);
    for (const error of errors) {
      throw new Error(error.message, { cause: error.code });
    }
  }
  return (await res.json()) as TResult;
}
