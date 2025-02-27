"use client";
import { signOut, useSession } from "next-auth/react";
import LoginPage from './Components/LoginPage'
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const [userData, setUserData] = useState([]);
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/");
    }
  }, [status, router]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("https://jsonplaceholder.typicode.com/users");
        if (!response.ok) throw new Error("Failed to fetch users");
        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  return (
    <div className="container">
        <>
          <h1 className="dashboard-title">Dashboard</h1>
          <button
            className="logout-button"
            onClick={() => signOut({ callbackUrl: "/login" })}
          >
            Sign out
          </button>
          <div className="users-container" >
            {userData.map((user) => (
              <div key={user.id} className="user-card" >
                <h2 className="user-name">{user.name}</h2>
                <p className="user-username">{user.username}</p>
                <p className="user-email">{user.email}</p>
              </div>
            ))}
          </div>
        </>
    </div>
  );
}
