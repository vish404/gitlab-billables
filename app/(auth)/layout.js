import { Center, Container } from "@mantine/core";

import React from "react";

export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Container className="w-[28rem]">{children}</Container>
    </div>
  );
}
