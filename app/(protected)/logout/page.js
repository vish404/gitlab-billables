"use client";
import { signOut } from "next-auth/react";
import React, { useEffect } from "react";

export default function page() {
  useEffect(() => {
    signOut();
  }, []);
  return <div>Loging out</div>;
}
