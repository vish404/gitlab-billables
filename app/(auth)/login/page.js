import React from "react";
import { Button, Center, Paper, Title } from "@mantine/core";
import { auth, signIn } from "@/auth";

export default async function page() {
  const session = await auth();
  console.log(session);
  return (
    <>
      <Title ta="center">Welcome back!</Title>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <form
          action={async () => {
            "use server";
            await signIn("gitlab", { redirectTo: "/" });
          }}
        >
          <Center>
          <Button variant="filled" type="submit">
            Sign in with gitlab
          </Button>
          </Center>
        </form>
      </Paper>
    </>
  );
}
