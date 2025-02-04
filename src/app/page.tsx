"use client";
import { account, AppwriteService } from "@/libs/appwrite/config";

export default function Home() {
  const loginUser = async () => {
    const userService = new AppwriteService();
    const response = await userService.loginWithGoogle();
  };

  return (
    <div className="w-full min-h-screen bg-black text-white">
      <button onClick={loginUser}>Login with Google</button>
    </div>
  );
}
