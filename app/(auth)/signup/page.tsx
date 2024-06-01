import SignUp from "../../../components/form/SignUp";
import Image from "next/image";

type Props = {
  params: { role: string };
};

export default function SignUpPage({ params }: Props) {
  return (
    <div className="grid grid-cols-2 w-full h-screen">
      <SignUp role={params.role} />
      <Image
        src="/peopleConnecting.jpg"
        alt="People Connecting"
        className="w-full h-full object-cover"
        width={500}
        height={500}
      />
    </div>
  );
}
