import { query } from "@/core/queryClient";

export interface Skill {
  id: number;
  name: string;
}

export default async function getSkills(): Promise<Skill[]> {
  return await query<Skill[]>({
    url: `api/skills/all`,
    tags: ["skill"],
    isProtected: false,
  });
}
