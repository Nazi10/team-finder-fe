import MenuHeader from "@/components/layout/Header";
import UserProfileForm from "@/components/layout/UserProfileForm";
import getSkills from "@/queries/skills/getSkills";

export default async function UserProfile() {
  const skills = await getSkills();
  return (
    <>
      <MenuHeader />
      <div className="flex justify-center gap-4 p-6">
        <div className="w-1/3 flex flex-col gap-4 justify-center">
          <h1 className="self-center text-3xl font-bold">
            Finish your profile setup
          </h1>
          <UserProfileForm skills={skills} />
        </div>
      </div>
    </>
  );
}
