import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import  "../../styles/login.css";

export default function LoginButton() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [counter, setCounter] = useState(null);

  const handleLogin = async () => {
    if (!session) {
      await signIn("google", { callbackUrl: "/dashboard"});
    } else {
      setCounter(5);
    }
  };

  useEffect(() => {
    if (counter !== null && counter > 0) {
      const timer = setTimeout(() => setCounter(counter - 1), 1000);
      return () => clearTimeout(timer);
    }
    if (counter === 0) {
      router.replace("/dashboard");
    }
  }, [counter, router]);

  useEffect(() => {
    if (session && counter === null) {
      setCounter(5);
    }
  }, [session]);

  const renderContent = () => {
    if (session) {
      return (
        <>
          <p>👋 Welcome, {session.user.name}</p>
          <button onClick={handleLogin} className="dashboard-button">
            🚀 Go to Dashboard
          </button>
          <button onClick={() => signOut()} className="signout-button">
            🔓 Sign Out
          </button>
          {counter !== null && counter > 0 && (
            <p className="redirect-message">
              ⏳ Redirecting in <span className="counter">{counter}</span> seconds...
            </p>
          )}
        </>
      );
    } else {
      return (
        <button onClick={handleLogin} className="signin-button">
          🔑 Sign In with Google
        </button>
      );
    }
  };

  return (
    <div className="login-container">
      <div>
        {renderContent()}
      </div>
    </div>
  );
}