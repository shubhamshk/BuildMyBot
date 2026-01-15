"use client";

import React from "react";
import { useRouter } from "next/navigation";

export function LoginRequiredModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const router = useRouter();

  if (!isOpen) return null;

  const handleClose = () => {
    onClose();
    router.push("/"); // Redirect to homepage
  };

  const handleLogin = () => {
    router.push("/auth/signin"); // Redirect to login page
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-white dark:bg-neutral-900 rounded-2xl p-8 max-w-sm w-full shadow-2xl text-center border border-neutral-200 dark:border-neutral-700">
        <h2 className="text-2xl font-bold mb-2 text-neutral-900 dark:text-white">Login Required</h2>
        <p className="text-neutral-700 dark:text-neutral-300 mb-6">You must be logged in to create a bot or access this page.</p>
        <button
          onClick={handleClose}
          className="w-full px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow transition-all mb-2"
        >
          Close
        </button>
        <button
          onClick={handleLogin}
          className="w-full px-6 py-3 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white font-semibold shadow transition-all"
        >
          Login / Sign Up
        </button>
      </div>
    </div>
  );
}
