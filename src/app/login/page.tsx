import { SessionProvider } from "next-auth/react";
import LoginPageComponent from "@/components/login";
import { useSession } from "next-auth/react";

export default function Home() {
  // const { data: session } = useSession(); // Get the current session

  return (
    // <SessionProvider session={session}>
    <LoginPageComponent />
    // </SessionProvider>
  );
}
