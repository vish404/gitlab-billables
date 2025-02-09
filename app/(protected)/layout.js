import { auth } from "@/auth";
import Logo from "@/components/Logo";
import UserBar from "@/components/UserBar";
import {
  AppShell,
  AppShellHeader,
  AppShellNavbar,
  AppShellMain,
  Center,
  Container,
  Burger,
} from "@mantine/core";
import { SessionProvider } from "next-auth/react";

import React from "react";

export default async function AuthLayout({ children }) {
  const session = await auth();
  return (
    <SessionProvider session={session}>
      <AppShell
        header={{ height: 60 }}
        navbar={{
          width: 300,
          breakpoint: "sm",
        }}
        padding="md"
      >
        <AppShellHeader className="flex justify-between">
          <a href="/" className="flex items-center px-8"><Logo/></a>
          <UserBar />
        </AppShellHeader>

        <AppShellNavbar p="md"></AppShellNavbar>

        <AppShellMain className="bg-gray-100">{children}</AppShellMain>
      </AppShell>
    </SessionProvider>
  );
}
