import { useRouter } from "next/router";
import { useEffect } from "react";
import { getSession } from "next-auth/react";
import LoginPage from "./Components/LoginPage";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/login");
  },[router]);

  return (
    <div>
    </div>
  );
}
