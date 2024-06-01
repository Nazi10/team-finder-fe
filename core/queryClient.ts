import { env } from "process";
import { auth, signOut } from "./auth";
import { ErrorType } from "./common/ErrorType";

export async function query<TResult = unknown>({
  url,
  tags,
  isProtected = false,
}: {
  url: string;
  tags: string[];
  isProtected?: boolean;
}): Promise<TResult> {
  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  if (isProtected) {
    const session = await auth();
    headers.append("Authorization", `Bearer ${session?.user?.token}`);
  }
  const res = await fetch(`${env.API_URL}/${url}`, {
    method: "GET",
    headers,
    next: { tags: [tags.reduce((acc, curr) => `${acc}-${curr}`)] },
  });
  console.log(headers);

  if (!res) throw new Error("No response");
  if (!res.ok) {
    console.log("negaaaa");

    //   const errors = (await res.json()) as ErrorType[];
    //   for (const error of errors) {
    //     if (error.code === 401 && error.message === "Unauthorized") {
    //       await signOut({ redirect: false });
    //     }
    //     console.error(error.message, { cause: error.code });
    //   }
    //   return errors as TResult;
  }
  return (await res.json()) as TResult;
}
