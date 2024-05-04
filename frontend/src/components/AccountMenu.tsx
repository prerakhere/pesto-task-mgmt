import React from "react";
import * as Menubar from "@radix-ui/react-menubar";
import * as Avatar from "@radix-ui/react-avatar";
import { useAuth } from "../context/AuthContext";

export default function AccountMenu() {
  const { signOut, user } = useAuth();

  function handleLogout() {
    signOut();
  }

  return (
    <div>
      <Menubar.Root className="flex p-1 rounded">
        <Menubar.Menu>
          <Menubar.Trigger className="MenubarTrigger">
            <Avatar.Root className="inline-flex items-center justify-center align-middle overflow-hidden select-none w-9 h-9 rounded-full border border-violet-700 text-violet-800 hover:bg-violet-100">
              <Avatar.Fallback className="h-full w-full flex items-center justify-center ">
                {user?.email![0].toUpperCase()}
              </Avatar.Fallback>
            </Avatar.Root>
          </Menubar.Trigger>
          <Menubar.Portal>
            <Menubar.Content
              className="min-w-[220px] max-w-[250px] rounded shadow-lg border bg-white flex flex-col"
              align="end"
              sideOffset={5}
              alignOffset={-4}
            >
              <Menubar.Item className="h-8 flex items-center px-2.5 py-4 cursor-default">
                {user?.email}
              </Menubar.Item>
              <Menubar.Item
                className="h-8 flex items-center hover:bg-violet-100 cursor-pointer px-2.5 py-4"
                onClick={handleLogout}
              >
                Logout
              </Menubar.Item>
            </Menubar.Content>
          </Menubar.Portal>
        </Menubar.Menu>
      </Menubar.Root>
    </div>
  );
}
