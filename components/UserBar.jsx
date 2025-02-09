"use client";

import {
  Avatar,
  Group,
  Menu,
  Stack,
  Text,
  UnstyledButton,
  useMantineTheme,
} from "@mantine/core";
import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { LockClosedIcon } from "@heroicons/react/24/solid";
import { signOut } from "next-auth/react";

export default function UserBar() {
  const theme = useMantineTheme();
  const [userMenuOpened, setUserMenuOpened] = useState(false);
  const { data: session } = useSession();
  const user = session?.user;
  return (
    <Menu
      position="bottom-end"
      transitionProps={{ transition: "pop-top-right" }}
      onClose={() => setUserMenuOpened(false)}
      onOpen={() => setUserMenuOpened(true)}
    >
      <Menu.Target>
        <UnstyledButton>
          <Group gap={7}>
            <Avatar
              src={user.avatar_url}
              alt={user.name}
              radius="xl"
              size={30}
            />
            <Stack  justify="center">
              <div>
              <Text fw={500} size="sm" lh={1} mr={3}>
                {user.name}
              </Text>
              <Text fw={100} size="sm">
                @{user.username}
              </Text>
              </div>
            </Stack>
          </Group>
        </UnstyledButton>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item
          color="red"
          leftSection={<LockClosedIcon stroke={1.5} />}
          onClick={() => signOut()}
        >
          Logout
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
